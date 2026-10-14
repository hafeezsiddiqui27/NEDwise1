
import fitz
from pathlib import Path

PDF_PATH = Path(__file__).resolve().parent / "UGProspectus2025.pdf"

if not PDF_PATH.exists():
    raise FileNotFoundError(f"PDF not found: {PDF_PATH}")

with fitz.open(PDF_PATH) as pdf:
    total_pages = len(pdf)
    pages_with_text = 0
    total_characters = 0

    print(f"PDF: {PDF_PATH.name}")
    print(f"Total pages: {total_pages}")

    for index, page in enumerate(pdf):
        text = page.get_text("text").strip()

        if len(text) >= 50:
            pages_with_text += 1

        total_characters += len(text)

    print(f"Pages containing usable amounts of text: {pages_with_text}")
    print(f"Total extracted characters: {total_characters}")

    # Inspect representative pages throughout the PDF.
    sample_pages = sorted(set([
        0,
        min(1, total_pages - 1),
        min(9, total_pages - 1),
        total_pages // 2,
        total_pages - 1,
    ]))

    for index in sample_pages:
        text = pdf[index].get_text("text").strip()

        print(f"\n{'=' * 20} PAGE {index + 1} {'=' * 20}")
        print(text[:1200] if text else "[NO SELECTABLE TEXT]")
