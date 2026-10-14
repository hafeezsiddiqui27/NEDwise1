
import os
import re
import time
import uuid
from io import BytesIO
from pathlib import Path

import pymupdf
import pytesseract
from PIL import Image
from dotenv import load_dotenv
from openai import OpenAI
from supabase import create_client


# ============================================================
# 1. CONFIGURATION
# ============================================================

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent
PDF_PATH = BASE_DIR / "UGProspectus2025.pdf"

FILENAME = "UGProspectus2025.pdf"

TESSERACT_PATH = (
    r"C:\Users\Hafeez Personal\AppData\Local"
    r"\Tesseract-OCR\tesseract.exe"
)

EMBEDDING_MODEL = os.getenv(
    "OPENROUTER_EMBEDDING_MODEL",
    "openai/text-embedding-3-small",
)

EMBEDDING_DIMENSIONS = 1536

CHUNK_SIZE = 1200
CHUNK_OVERLAP = 200

EMBED_BATCH_SIZE = 16
INSERT_BATCH_SIZE = 50
DELETE_BATCH_SIZE = 100
PAGE_BATCH_SIZE = 500

# A unique identifier for this indexing run.
RUN_ID = str(uuid.uuid4())


# ============================================================
# 2. ENVIRONMENT AND CLIENTS
# ============================================================

api_key = os.getenv("OPENROUTER_API_KEY")
supabase_url = os.getenv("SUPABASE_URL")

# Use your existing service-role key environment variable.
supabase_key = (
    os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    or os.getenv("SUPABASE_SERVICE_ROLE")
)

if not api_key:
    raise RuntimeError("OPENROUTER_API_KEY is missing from .env")

if not supabase_url or not supabase_key:
    raise RuntimeError(
        "SUPABASE_URL or the Supabase service-role key is missing."
    )

if not PDF_PATH.exists():
    raise FileNotFoundError(
        f"PDF not found: {PDF_PATH}\n"
        "Place UGProspectus2025.pdf inside the backend folder."
    )

pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH

if not Path(TESSERACT_PATH).exists():
    raise FileNotFoundError(
        f"Tesseract was not found at:\n{TESSERACT_PATH}"
    )

supabase = create_client(supabase_url, supabase_key)

embedding_client = OpenAI(
    api_key=api_key,
    base_url="https://openrouter.ai/api/v1",
)


# ============================================================
# 3. TEXT CLEANING
# ============================================================

def clean_text(text: str) -> str:
    """Remove common OCR whitespace artifacts."""

    text = text.replace("\x0c", " ")
    text = text.replace("\u00a0", " ")

    # Normalize line endings.
    text = text.replace("\r\n", "\n")
    text = text.replace("\r", "\n")

    # Remove excessive horizontal whitespace.
    text = re.sub(r"[ \t]+", " ", text)

    # Keep paragraphs, but remove excessive blank lines.
    text = re.sub(r"\n[ \t]*\n+", "\n\n", text)

    return text.strip()


# ============================================================
# 4. OCR
# ============================================================

def ocr_page(page) -> str:
    """Render one PDF page and extract English text using Tesseract."""

    pix = page.get_pixmap(
        matrix=pymupdf.Matrix(2.5, 2.5),
        alpha=False,
    )

    image = Image.open(
        BytesIO(pix.tobytes("png"))
    ).convert("RGB")

    extracted_text = pytesseract.image_to_string(
        image,
        lang="eng",
        config="--oem 3 --psm 3",
    )

    return clean_text(extracted_text)


def extract_pdf_pages():
    """OCR every page and retain its original page number."""

    page_records = []

    with pymupdf.open(PDF_PATH) as pdf:
        total_pages = len(pdf)

        print("=" * 60)
        print("OCR STARTED")
        print("PDF:", PDF_PATH.name)
        print("Total pages:", total_pages)
        print("=" * 60)

        for index, page in enumerate(pdf):
            page_number = index + 1

            try:
                text = ocr_page(page)
            except Exception as exc:
                raise RuntimeError(
                    f"OCR failed on page {page_number}: {exc}"
                ) from exc

            # Ignore pages containing almost no readable text.
            if len(text) >= 40:
                page_records.append({
                    "page": page_number,
                    "text": text,
                })

            print(
                f"Page {page_number}/{total_pages}: "
                f"{len(text)} characters"
            )

    total_characters = sum(
        len(record["text"]) for record in page_records
    )

    print("\nPages with usable text:", len(page_records))
    print("Total extracted characters:", total_characters)

    if not page_records:
        raise RuntimeError("OCR did not extract usable text.")

    if total_characters < 10000:
        raise RuntimeError(
            "OCR output is unexpectedly short. "
            "Check Tesseract and the source PDF before indexing."
        )

    return page_records


# ============================================================
# 5. CHUNKING
# ============================================================

def split_text(text: str):
    """Split text into overlapping chunks at word boundaries."""

    chunks = []
    start = 0

    while start < len(text):
        end = min(start + CHUNK_SIZE, len(text))

        if end < len(text):
            boundary = text.rfind(" ", start, end)

            if boundary > start + CHUNK_SIZE // 2:
                end = boundary

        chunk = text[start:end].strip()

        if chunk:
            chunks.append(chunk)

        if end >= len(text):
            break

        # Move backwards to create overlap, without getting stuck.
        start = max(end - CHUNK_OVERLAP, start + 1)

    return chunks


def build_chunks(page_records):
    """Create chunks while preserving source filename and page."""

    all_chunks = []

    for record in page_records:
        page_number = record["page"]
        page_text = record["text"]

        page_chunks = split_text(page_text)

        for chunk_number, chunk_text in enumerate(
            page_chunks,
            start=1,
        ):
            all_chunks.append({
                "content": chunk_text,
                "metadata": {
                    "filename": FILENAME,
                    "page": page_number,
                    "chunk_on_page": chunk_number,
                    "index_version": RUN_ID,
                },
            })

    if not all_chunks:
        raise RuntimeError("No chunks were generated.")

    return all_chunks


# ============================================================
# 6. EMBEDDINGS
# ============================================================

def generate_embeddings(texts):
    """Generate and validate embeddings through OpenRouter."""

    response = embedding_client.embeddings.create(
        model=EMBEDDING_MODEL,
        input=texts,
    )

    # Keep embeddings aligned with their input text.
    ordered_results = sorted(
        response.data,
        key=lambda item: item.index,
    )

    embeddings = [
        item.embedding for item in ordered_results
    ]

    if len(embeddings) != len(texts):
        raise RuntimeError(
            "The embedding API returned an unexpected number "
            "of embeddings."
        )

    for index, embedding in enumerate(embeddings):
        if len(embedding) != EMBEDDING_DIMENSIONS:
            raise RuntimeError(
                f"Embedding {index} has {len(embedding)} dimensions; "
                f"expected {EMBEDDING_DIMENSIONS}."
            )

    return embeddings


def embed_all_chunks(chunks):
    """Finish every embedding before changing existing database data."""

    total = len(chunks)

    print("\n" + "=" * 60)
    print("EMBEDDING STARTED")
    print("Model:", EMBEDDING_MODEL)
    print("Total chunks:", total)
    print("=" * 60)

    for start in range(0, total, EMBED_BATCH_SIZE):
        batch = chunks[start:start + EMBED_BATCH_SIZE]

        texts = [
            item["content"] for item in batch
        ]

        embeddings = generate_embeddings(texts)

        for item, embedding in zip(batch, embeddings):
            item["embedding"] = embedding

        completed = min(start + len(batch), total)

        print(f"Embedded {completed}/{total} chunks")

        # Small pause between API requests.
        if completed < total:
            time.sleep(0.2)

    # Do not proceed unless every chunk has a valid embedding.
    for index, item in enumerate(chunks):
        if "embedding" not in item:
            raise RuntimeError(
                f"Chunk {index} has no embedding."
            )

    print("All embeddings generated successfully.")


# ============================================================
# 7. FIND EXISTING SOURCE
# ============================================================

def get_existing_source_id() -> str:
    """Use the existing source record instead of creating another."""

    response = (
        supabase.table("sources")
        .select("id, filename")
        .eq("filename", FILENAME)
        .execute()
    )

    matches = response.data or []

    if len(matches) != 1:
        raise RuntimeError(
            f"Expected exactly one source record for {FILENAME}; "
            f"found {len(matches)}. No chunks were replaced. "
            "Check the sources table manually."
        )

    source_id = matches[0]["id"]

    print("\nExisting source found.")
    print("Filename:", matches[0]["filename"])
    print("Source ID:", source_id)

    return source_id


# ============================================================
# 8. PREPARE DATABASE ROWS
# ============================================================

def prepare_rows(chunks, source_id):
    """Build rows compatible with the existing document_chunks table."""

    rows = []

    for item in chunks:
        rows.append({
            "source_id": source_id,
            "content": item["content"],
            "metadata": item["metadata"],
            "embedding": item["embedding"],
        })

    return rows


# ============================================================
# 9. INSERT AND VERIFY THE NEW INDEX
# ============================================================

def insert_new_chunks(rows):
    """Insert the new version while retaining the old version."""

    total = len(rows)

    print("\n" + "=" * 60)
    print("INSERTING NEW CHUNKS")
    print("Index version:", RUN_ID)
    print("=" * 60)

    for start in range(0, total, INSERT_BATCH_SIZE):
        batch = rows[start:start + INSERT_BATCH_SIZE]

        supabase.table("document_chunks").insert(
            batch
        ).execute()

        completed = min(start + len(batch), total)

        print(f"Inserted {completed}/{total} chunks")


def verify_new_chunks(source_id, expected_count):
    """Verify that the entire new version exists in Supabase."""

    response = (
        supabase.table("document_chunks")
        .select("id, metadata", count="exact")
        .eq("source_id", source_id)
        .filter("metadata->>index_version", "eq", RUN_ID)
        .execute()
    )

    actual_count = response.count

    if actual_count is None:
        # Fallback if an exact count was not returned.
        actual_count = 0
        offset = 0

        while True:
            result = (
                supabase.table("document_chunks")
                .select("id, metadata")
                .eq("source_id", source_id)
                .filter(
                    "metadata->>index_version",
                    "eq",
                    RUN_ID,
                )
                .range(offset, offset + PAGE_BATCH_SIZE - 1)
                .execute()
            )

            records = result.data or []
            actual_count += len(records)

            if len(records) < PAGE_BATCH_SIZE:
                break

            offset += PAGE_BATCH_SIZE

    print("\nExpected new chunks:", expected_count)
    print("Verified new chunks:", actual_count)

    if actual_count != expected_count:
        raise RuntimeError(
            "Verification failed. Existing chunks were not deleted. "
            "Some new chunks may have been inserted; inspect Supabase "
            "before retrying."
        )

    print("New index verified successfully.")


# ============================================================
# 10. FIND OLD CHUNKS
# ============================================================

def find_old_chunk_ids(source_id):
    """
    Collect old chunk IDs before deleting anything.

    The new run is identified by metadata.index_version.
    """

    old_ids = []
    offset = 0

    while True:
        response = (
            supabase.table("document_chunks")
            .select("id, metadata")
            .eq("source_id", source_id)
            .order("id")
            .range(offset, offset + PAGE_BATCH_SIZE - 1)
            .execute()
        )

        records = response.data or []

        for record in records:
            metadata = record.get("metadata") or {}

            if metadata.get("index_version") != RUN_ID:
                old_ids.append(record["id"])

        if len(records) < PAGE_BATCH_SIZE:
            break

        offset += PAGE_BATCH_SIZE

    return old_ids


# ============================================================
# 11. REMOVE OLD CHUNKS
# ============================================================

def delete_old_chunks(old_ids):
    """Delete old chunks only after successful insertion and verification."""

    total = len(old_ids)

    print("\n" + "=" * 60)
    print("REMOVING OLD CHUNKS")
    print("Old chunks found:", total)
    print("=" * 60)

    for start in range(0, total, DELETE_BATCH_SIZE):
        batch_ids = old_ids[start:start + DELETE_BATCH_SIZE]

        (
            supabase.table("document_chunks")
            .delete()
            .in_("id", batch_ids)
            .execute()
        )

        completed = min(start + len(batch_ids), total)

        print(f"Deleted {completed}/{total} old chunks")

    print("Old chunk cleanup completed.")


# ============================================================
# 12. MAIN
# ============================================================

def main():
    print("NEDWISE PROSPECTUS RE-INDEXER")
    print("Run ID:", RUN_ID)

    # Confirm the existing source before expensive OCR and embedding.
    source_id = get_existing_source_id()

    # Phase 1: OCR.
    page_records = extract_pdf_pages()

    print("\nOCR sample from page 2:")
    page_2 = next(
        (
            item["text"]
            for item in page_records
            if item["page"] == 2
        ),
        "",
    )
    print(page_2[:1500] or "[Page 2 text unavailable]")

    approval = input(
        "\nIs the OCR sample readable? Type INDEX to continue: "
    ).strip()

    if approval != "INDEX":
        print("Cancelled. Supabase was not modified.")
        return

    # Phase 2: Chunk.
    chunks = build_chunks(page_records)

    print("\nPages processed:", len(page_records))
    print("Chunks created:", len(chunks))

    # Phase 3: Embed everything before database modification.
    embed_all_chunks(chunks)

    # Phase 4: Prepare the complete new index.
    rows = prepare_rows(chunks, source_id)

    approval = input(
        f"\nReady to index {len(rows)} chunks in Supabase. "
        "Type REPLACE to continue: "
    ).strip()

    if approval != "REPLACE":
        print("Cancelled. Supabase was not modified.")
        return

    # Phase 5: Insert new version, retaining the old version.
    insert_new_chunks(rows)

    # Phase 6: Verify all newly inserted chunks.
    verify_new_chunks(source_id, len(rows))

    # Phase 7: Collect old IDs before deleting anything.
    old_ids = find_old_chunk_ids(source_id)

    print("\nNew version:", RUN_ID)
    print("New chunks verified:", len(rows))
    print("Old chunks to remove:", len(old_ids))

    final_approval = input(
        "\nNew index is verified. Remove the old chunks? "
        "Type DELETE OLD to continue: "
    ).strip()

    if final_approval != "DELETE OLD":
        print(
            "Old chunks were preserved. Both versions currently "
            "exist in Supabase. Do not run chatbot retrieval until "
            "you finish cleanup."
        )
        return

    # Phase 8: Remove old version only.
    delete_old_chunks(old_ids)

    # Phase 9: Final verification.
    final_check = (
        supabase.table("document_chunks")
        .select("id", count="exact")
        .eq("source_id", source_id)
        .filter("metadata->>index_version", "eq", RUN_ID)
        .execute()
    )

    if final_check.count != len(rows):
        raise RuntimeError(
            "Final verification failed. Check Supabase manually."
        )

    print("\n" + "=" * 60)
    print("RE-INDEXING COMPLETED SUCCESSFULLY")
    print("Filename:", FILENAME)
    print("Source ID preserved:", source_id)
    print("New chunks:", len(rows))
    print("Embedding dimensions:", EMBEDDING_DIMENSIONS)
    print("Index version:", RUN_ID)
    print("Existing RPC was not modified.")
    print("=" * 60)


if __name__ == "__main__":
    main()
