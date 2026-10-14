
import asyncio
import logging
import os
import shutil
import uuid
from pathlib import Path
from urllib.parse import urlparse

import httpx
import pypdfium2 as pdfium
import pytesseract
from dotenv import load_dotenv
from pypdf import PdfReader


# ============================================================
# NED UNIVERSITY PROSPECTUS OCR INDEXER
#
# 1. Extract selectable PDF text.
# 2. OCR scanned pages using Tesseract.
# 3. Split text into chunks while preserving page numbers.
# 4. Generate embeddings through OpenRouter.
# 5. Store the chunks in Supabase.
#
# Run locally on Windows:
#     python index_prospectus.py
# ============================================================

BASE_DIR = Path(__file__).resolve().parent
PDF_PATH = BASE_DIR / "UGProspectus2025.pdf"

load_dotenv(BASE_DIR / ".env", override=False)

# OpenRouter configuration
OPENROUTER_API_KEY = os.getenv(
    "OPENROUTER_API_KEY", ""
).strip()

EMBEDDING_MODEL = os.getenv(
    "OPENROUTER_EMBEDDING_MODEL",
    "openai/text-embedding-3-small",
).strip()

# Supabase configuration
SUPABASE_URL = os.getenv(
    "SUPABASE_URL", ""
).strip().rstrip("/")

SUPABASE_SERVICE_ROLE = os.getenv(
    "service_role", ""
).strip()

# Tesseract installation on your Windows computer
TESSERACT_EXE = (
    shutil.which("tesseract")
    or (
        r"C:\Users\Hafeez Personal\AppData\Local"
        r"\Tesseract-OCR\tesseract.exe"
    )
)

pytesseract.pytesseract.tesseract_cmd = TESSERACT_EXE

# Limits and chunking
MAX_PDF_SIZE = 50 * 1024 * 1024
CHUNK_SIZE = 800
CHUNK_OVERLAP = 100
EMBEDDING_DIMENSIONS = 1536
EMBEDDING_BATCH_SIZE = 16
INSERT_BATCH_SIZE = 50

OPENROUTER_EMBEDDINGS_URL = (
    "https://openrouter.ai/api/v1/embeddings"
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
)

logger = logging.getLogger("ned-prospectus-indexer")


# ============================================================
# CONFIGURATION
# ============================================================

def validate_configuration():
    if not OPENROUTER_API_KEY:
        raise RuntimeError(
            "OPENROUTER_API_KEY is missing from your .env file."
        )

    if not SUPABASE_URL:
        raise RuntimeError(
            "SUPABASE_URL is missing from your .env file."
        )

    if not SUPABASE_SERVICE_ROLE:
        raise RuntimeError(
            "service_role is missing from your .env file."
        )

    parsed = urlparse(SUPABASE_URL)

    if (
        parsed.scheme != "https"
        or not parsed.hostname
        or parsed.path not in ("", "/")
        or parsed.query
        or parsed.fragment
        or parsed.username
        or parsed.password
    ):
        raise RuntimeError(
            "SUPABASE_URL must be your Supabase project root URL."
        )

    if not Path(TESSERACT_EXE).is_file():
        raise RuntimeError(
            "Tesseract executable was not found.\n"
            f"Configured path: {TESSERACT_EXE}\n"
            "Install Tesseract or correct TESSERACT_EXE."
        )

    try:
        version = pytesseract.get_tesseract_version()
        logger.info("Tesseract version: %s", version)

        languages = pytesseract.get_languages(config="")
        if "eng" not in languages:
            raise RuntimeError(
                "English OCR language data is not installed. "
                "Install the English language data for Tesseract."
            )

    except Exception as exc:
        raise RuntimeError(
            "Tesseract could not start or its language data "
            "is unavailable. Check the installation."
        ) from exc


# ============================================================
# SUPABASE HELPERS
# ============================================================

def supabase_headers():
    return {
        "apikey": SUPABASE_SERVICE_ROLE,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE}",
        "Content-Type": "application/json",
    }


async def supabase_request(
    client: httpx.AsyncClient,
    method: str,
    path: str,
    **kwargs,
):
    headers = {
        **supabase_headers(),
        **kwargs.pop("headers", {}),
    }

    response = await client.request(
        method,
        f"{SUPABASE_URL}/rest/v1/{path.lstrip('/')}",
        headers=headers,
        **kwargs,
    )

    if not response.is_success:
        raise RuntimeError(
            f"Supabase request failed: {method} {path}\n"
            f"HTTP status: {response.status_code}\n"
            f"Response: {response.text[:1500]}"
        )

    if not response.content:
        return None

    return response.json()


# ============================================================
# PDF TEXT EXTRACTION + OCR
# ============================================================

def extract_pdf_with_ocr():
    if not PDF_PATH.is_file():
        raise RuntimeError(
            f"PDF not found: {PDF_PATH}\n"
            "Place UGProspectus2025.pdf beside this script."
        )

    pdf_size = PDF_PATH.stat().st_size

    if pdf_size > MAX_PDF_SIZE:
        raise RuntimeError(
            "UGProspectus2025.pdf must be 50 MB or smaller."
        )

    logger.info(
        "Reading PDF: %s (%.2f MB)",
        PDF_PATH.name,
        pdf_size / (1024 * 1024),
    )

    # Extract existing text where possible.
    reader = PdfReader(str(PDF_PATH))

    # Open the PDF renderer used to create page images for OCR.
    pdf = pdfium.PdfDocument(str(PDF_PATH))

    documents = []

    try:
        total_pages = len(pdf)

        logger.info("Total PDF pages: %s", total_pages)

        for index in range(total_pages):
            page_number = index + 1
            page = pdf[index]

            try:
                native_text = (
                    reader.pages[index].extract_text() or ""
                ).strip()

                # Pages with little or no selectable text need OCR.
                if len(native_text) >= 40:
                    extracted_text = native_text

                    logger.info(
                        "Page %s/%s: using embedded text (%s chars)",
                        page_number,
                        total_pages,
                        len(extracted_text),
                    )

                else:
                    logger.info(
                        "Page %s/%s: running OCR...",
                        page_number,
                        total_pages,
                    )

                    # Render one page at a time to limit memory use.
                    image = page.render(
                        scale=2.0
                    ).to_pil()

                    try:
                        extracted_text = (
                            pytesseract.image_to_string(
                                image,
                                lang="eng",
                                config="--psm 3",
                            )
                        ).strip()
                    finally:
                        image.close()

                    logger.info(
                        "Page %s/%s: OCR extracted %s chars",
                        page_number,
                        total_pages,
                        len(extracted_text),
                    )

                if extracted_text:
                    documents.append(
                        {
                            "content": extracted_text,
                            "metadata": {
                                "page": page_number,
                                "filename": PDF_PATH.name,
                            },
                        }
                    )
                else:
                    logger.warning(
                        "Page %s contained no recognized text.",
                        page_number,
                    )

            finally:
                page.close()

    finally:
        pdf.close()

    if not documents:
        raise RuntimeError(
            "No readable text was extracted. Check the PDF scan "
            "quality, Tesseract installation, and language data."
        )

    logger.info(
        "Extracted text from %s pages.",
        len(documents),
    )

    return documents


# ============================================================
# TEXT CHUNKING
# ============================================================

def split_documents(documents):
    chunks = []

    for document in documents:
        text = " ".join(
            document["content"].split()
        ).strip()

        start = 0

        while start < len(text):
            end = min(
                start + CHUNK_SIZE,
                len(text),
            )

            content = text[start:end].strip()

            if content:
                chunks.append(
                    {
                        "content": content,
                        "metadata": document["metadata"],
                    }
                )

            if end >= len(text):
                break

            start = end - CHUNK_OVERLAP

    return chunks


# ============================================================
# OPENROUTER EMBEDDINGS
# ============================================================

async def create_embeddings(
    client: httpx.AsyncClient,
    texts: list[str],
):
    vectors = []

    for start in range(
        0,
        len(texts),
        EMBEDDING_BATCH_SIZE,
    ):
        batch = texts[
            start : start + EMBEDDING_BATCH_SIZE
        ]

        response = await client.post(
            OPENROUTER_EMBEDDINGS_URL,
            headers={
                "Authorization": (
                    f"Bearer {OPENROUTER_API_KEY}"
                ),
                "Content-Type": "application/json",
                "X-Title": "NED Prospectus Indexer",
            },
            json={
                "model": EMBEDDING_MODEL,
                "input": batch,
            },
        )

        if not response.is_success:
            raise RuntimeError(
                "OpenRouter embedding request failed.\n"
                f"HTTP status: {response.status_code}\n"
                f"Response: {response.text[:1500]}"
            )

        result = response.json()

        try:
            items = sorted(
                result["data"],
                key=lambda item: item["index"],
            )

            batch_vectors = [
                item["embedding"]
                for item in items
            ]

        except (KeyError, TypeError) as exc:
            raise RuntimeError(
                "Unexpected response from the OpenRouter "
                "embedding endpoint."
            ) from exc

        if len(batch_vectors) != len(batch):
            raise RuntimeError(
                "Embedding count does not match the input count."
            )

        for vector in batch_vectors:
            if (
                len(vector) != EMBEDDING_DIMENSIONS
                or not all(
                    isinstance(value, (int, float))
                    and not isinstance(value, bool)
                    for value in vector
                )
            ):
                raise RuntimeError(
                    "Embedding dimensions or values are invalid. "
                    "Check the model and Supabase vector schema."
                )

        vectors.extend(batch_vectors)

        logger.info(
            "Generated embeddings: %s/%s chunks",
            len(vectors),
            len(texts),
        )

    return vectors


# ============================================================
# INDEXING
# ============================================================

async def main():
    validate_configuration()

    # Finish extraction and embedding generation before modifying
    # the existing database index.
    documents = extract_pdf_with_ocr()
    chunks = split_documents(documents)

    if not chunks:
        raise RuntimeError(
            "No text chunks were generated."
        )

    logger.info(
        "Total chunks to index: %s",
        len(chunks),
    )

    texts = [
        chunk["content"]
        for chunk in chunks
    ]

    async with httpx.AsyncClient(
        timeout=120.0
    ) as client:

        vectors = await create_embeddings(
            client,
            texts,
        )

        # Look up the existing prospectus source.
        existing = await supabase_request(
            client,
            "GET",
            "sources",
            params={
                "filename": f"eq.{PDF_PATH.name}",
                "select": "id,filename",
                "limit": "1",
            },
        )

        old_source_id = (
            str(existing[0]["id"])
            if existing
            else None
        )

        # Reuse the existing source ID where possible. This keeps
        # the source identifier stable for the current backend.
        source_id = old_source_id or str(uuid.uuid4())

        if old_source_id:
            logger.info(
                "Existing source found: %s",
                old_source_id,
            )

            # Delete old chunks before writing the replacement index.
            # Ensure your database policies permit this operation.
            await supabase_request(
                client,
                "DELETE",
                "document_chunks",
                params={
                    "source_id": f"eq.{source_id}",
                },
            )

        else:
            await supabase_request(
                client,
                "POST",
                "sources",
                headers={"Prefer": "return=minimal"},
                json={
                    "id": source_id,
                    "filename": PDF_PATH.name,
                    "source_type": "pdf",
                },
            )

        try:
            for start in range(
                0,
                len(chunks),
                INSERT_BATCH_SIZE,
            ):
                batch_chunks = chunks[
                    start : start + INSERT_BATCH_SIZE
                ]

                batch_vectors = vectors[
                    start : start + INSERT_BATCH_SIZE
                ]

                rows = []

                for chunk, vector in zip(
                    batch_chunks,
                    batch_vectors,
                ):
                    rows.append(
                        {
                            "source_id": source_id,
                            "content": chunk["content"],
                            "metadata": chunk["metadata"],
                            "embedding": (
                                "["
                                + ",".join(
                                    str(value)
                                    for value in vector
                                )
                                + "]"
                            ),
                        }
                    )

                await supabase_request(
                    client,
                    "POST",
                    "document_chunks",
                    headers={"Prefer": "return=minimal"},
                    json=rows,
                )

                logger.info(
                    "Stored chunks %s-%s of %s",
                    start + 1,
                    start + len(batch_chunks),
                    len(chunks),
                )

        except Exception:
            logger.exception(
                "Chunk insertion failed. The index may be incomplete."
            )

            # If this was a new source, clean it up.
            # For an existing source, keep its source record so that
            # the indexing script can be rerun using the same ID.
            if not old_source_id:
                try:
                    await supabase_request(
                        client,
                        "DELETE",
                        "document_chunks",
                        params={
                            "source_id": f"eq.{source_id}",
                        },
                    )

                    await supabase_request(
                        client,
                        "DELETE",
                        "sources",
                        params={
                            "id": f"eq.{source_id}",
                        },
                    )

                except Exception:
                    logger.exception(
                        "Could not clean up the new source."
                    )

            raise

    logger.info("=" * 60)
    logger.info("INDEXING COMPLETED SUCCESSFULLY")
    logger.info("Document: %s", PDF_PATH.name)
    logger.info("Pages with text: %s", len(documents))
    logger.info("Total chunks: %s", len(chunks))
    logger.info("Supabase source ID: %s", source_id)
    logger.info("=" * 60)


if __name__ == "__main__":
    asyncio.run(main())
