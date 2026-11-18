#!/usr/bin/env python3
"""Verify locally supplied PDF/DOCX exports without retaining or uploading their contents.

Usage:
    python tests/verify_exports.py --pdf "/path/to/private.pdf" --docx "/path/to/private.docx"

Requires PyMuPDF (fitz). This script performs read-only checks and prints only
counts and pass/fail results. Keep your documents outside the repository.
"""
import argparse
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pdf", type=Path, required=True, help="A local, private VesperFolio PDF")
    parser.add_argument("--docx", type=Path, required=True, help="A local, private VesperFolio Word document")
    args = parser.parse_args()
    if not args.pdf.is_file() or not args.docx.is_file():
        parser.error("Both local files must exist. Never copy private exports into this repository.")

    try:
        import fitz
    except ImportError as exc:
        parser.error("PyMuPDF is required for private local PDF verification (pip install pymupdf)")

    with fitz.open(args.pdf) as pdf:
        assert len(pdf) > 0, "PDF must contain pages"
        pdf_images = []
        for page in pdf:
            images = page.get_images(full=True)
            assert len(images) == 1, "Expected exactly one embedded image per PDF page"
            pdf_images.append(pdf.extract_image(images[0][0])["image"])
        count = len(pdf)

    with zipfile.ZipFile(args.docx) as z:
        assert z.testzip() is None, "DOCX failed ZIP CRC check"
        for name in z.namelist():
            if name.endswith((".xml", ".rels")):
                ET.fromstring(z.read(name))
        media = sorted((name for name in z.namelist()
                        if name.startswith("word/media/") and name.lower().endswith((".jpg", ".jpeg"))))
        assert len(media) == count, "DOCX image count does not match PDF pages"
        root = ET.fromstring(z.read("word/document.xml"))
        ns = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
              "wp": "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"}
        assert len(root.findall(".//wp:extent", ns)) == count, "DOCX drawing count mismatch"
        assert all(int(e.attrib["cx"]) > 0 and int(e.attrib["cy"]) > 0
                   for e in root.findall(".//wp:extent", ns)), "Invalid drawing dimensions"
        assert len(root.findall(".//w:sectPr", ns)) >= 1, "DOCX missing section definitions"
        assert sorted(pdf_images) == sorted(z.read(name) for name in media), "Embedded images differ between formats"

    print(f"PASS: {count} PDF pages and {len(media)} DOCX images; ZIP/XML valid; images match.")
    print("Input files were inspected locally only. No images or outputs were saved.")

if __name__ == "__main__":
    main()
