# Provenance and contributions

This file records contributions; it does not make AI tools legal copyright owners or add restrictions to the [MIT License](LICENSE).

1. **HavocRock:** Identified the need to turn a student's photographed work into PDF, commissioned the initial implementation, specified requirements, directed improvements, chose the VesperFolio identity and conducted and reported device testing.
2. **Claude:** Generated the initial application at HavocRock's request. Claude later stated that the code was generated for the conversation, rather than copied from a particular repository. It described its PDF, ZIP/DOCX, CRC-32, crop and layout implementations as based on public specifications and standard browser APIs. This statement was supplied by the maintainer and does not establish independently verified originality.
3. **ChatGPT (Vesper):** Received the Claude-generated application from HavocRock, then helped modify and develop later versions, including v2.2 interface work, v2.3 full-window crop controls, v2.3.1 interface-credit updates, v2.3.2 footer signature and release documentation.
4. **Android development:** At HavocRock's request, ChatGPT helped with an Android edition. The separately inspected experimental v2.3.2 APK was built using HTML2APK, and is not part of the repository source archive.

Earlier identity: **ImageToDocs Pocket Studio**. The checked v2.1 application is preserved, unchanged, in `baseline/`, alongside subsequent known working versions. The record does not establish line-by-line code authorship.

The implementation uses local CSS and a text-based mark informed by VesperFolio mockups; the mockup files are not distributed. Neither checked v2.1 nor current v2.3.2 includes a Google sign-in script or third-party bundled runtime library. Claude's separate mention of a Google sign-in script does not demonstrate its presence in those preserved versions. Node.js, @napi-rs/canvas and PyMuPDF were used for optional development checks, not as runtime dependencies.

At the maintainer's request, contributor names were removed from the task-focused interface in v2.3.1, while credits remained in the documentation. In v2.3.2, the footer reads **“With Vesper”**. This is a collaborative signature, not a claim of exclusive authorship.

Private student work, generated PDF/DOCX samples, source images and sensitive build materials are intentionally excluded from the repository. For testing claims see [QA.md](QA.md).
