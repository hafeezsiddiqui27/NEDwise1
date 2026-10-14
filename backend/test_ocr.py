
from io import BytesIO
from pathlib import Path

import pymupdf
import pytesseract
from PIL import Image
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent
PDF_PATH = BASE_DIR / "UGProspectus2025.pdf"

pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Users\Hafeez Personal\AppData\Local"
    r"\Tesseract-OCR\tesseract.exe"
)


def extract_page_text(page):
    # Render the scanned page at a readable resolution.
    pix = page.get_pixmap(
        matrix=pymupdf.Matrix(2.5, 2.5),
        alpha=False,
    )

    image = Image.open(
        BytesIO(pix.tobytes("png"))
    ).convert("RGB")

    return pytesseract.image_to_string(
        image,
        lang="eng",
        config="--oem 3 --psm 3",
    ).strip()


with pymupdf.open(PDF_PATH) as pdf:
    print("Total pages:", len(pdf))

    for page_number in [1, 2, 10, 62, 122]:
        text = extract_page_text(pdf[page_number - 1])

        print(f"\n--- PAGE {page_number} ---")
        print(text[:2000] or "[No text extracted]")
        print("Characters:", len(text))
