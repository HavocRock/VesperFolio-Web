# VesperFolio Web v2.3.2 — Development pre-release

**VesperFolio is a private, offline-first image-to-document web-app.** Arrange photographs, edit pages, and export image-based PDF or Word documents without accounts, telemetry, online libraries or mandatory internet connectivity. Download `index.html` to run locally in a compatible browser.

## What is included

- Responsive document workspace with page ordering, rotation, preview, Grey and Document filters.
- Full-window crop editor with eight touch handles, movable selection, one-image-pixel fine tuning, Apply/Cancel and Undo.
- A4, US Letter or image-fit sizing; orientation, margins and JPEG quality.
- PDF, image-based DOCX and print controls. No OCR or searchable-text conversion.
- Local-first processing and a footer signature: **With Vesper**.

## Release verification

The v2.3.2 application script matches v2.3, whose developer-simulation and maintainer device checks are documented in `QA.md`. A subsequently supplied v2.3.2 Android test APK was structurally inspected: embedded HTML matched exactly, its manifest requested no permissions, and its Android v2 signature and signed-content digest verified. Two privately provided PDF/Word exports contained matching image data and valid document structures. Full cross-device regression testing is not complete.

**Privacy:** Generated sample documents, personal photos, preview images, and private build logs are not included in this source archive or release evidence. The app does not upload user images; exports and print actions follow the destination or print service you choose.

## Important limits

Development pre-release; up to 24 pages, a 24-million-active-pixel budget, 35 MB input-file limit, and 2200-pixel processed image limit. Content is held for the current session; export before closing. DOCX uses images, not editable text. Browser or Android wrapper behaviour varies; see `README.md`, `QA.md`, `PRIVACY.md` and `SECURITY.md`.

**Source license:** MIT, Copyright (c) 2026 HavocRock; see `LICENSE`, `LICENSING.md`, and `ATTRIBUTION.md` for terms, provenance and contributors. This does not replace device QA or establish independently verified originality. Any experimental Android APK should be distributed as a clearly labelled test build until its stable package identity, signing-key custody and device QA are resolved.
