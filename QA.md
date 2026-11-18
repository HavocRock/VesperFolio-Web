# QA results — 18 November 2026

Status: **v2.3.2 development pre-release candidate. The existing v2.3 script is unchanged, a subsequently supplied v2.3.2 test APK and two private export samples were independently inspected, and public-source packaging has been privacy-cleaned. Full-device regression testing, stable APK identity/signing plan and source licensing are still open.**

## GitHub publication preparation (documentation-only)

The README now includes the maintainer's personal reason for creating VesperFolio: a practical need to turn a student's photographed work into a PDF using a simple, private workflow. The application and preserved baselines were not modified.

The optional `tests/verify_exports.py` helper now takes `--pdf` and `--docx` paths pointing to **private files outside this repository**. It performs read-only PDF/DOCX checks without saving rendered pages or emitting document contents. No sample exports are distributed.

## Additional v2.3.2 release-preparation audit — 18 November 2026

The maintainer subsequently supplied a v2.3.2 Android test APK, its build log, and one locally generated PDF and DOCX. These items were used **only for private verification** and are **not bundled in this GitHub-ready source package**. Do not upload them into the repository or treat the two-page contents as public fixtures.

- **Source identity:** `assets/www/index.html` inside the supplied APK is byte-for-byte identical to the supplied standalone v2.3.2 web-app and the release ZIP `index.html` (SHA-256 `56bd4334d7b86442aa7e190cdfc282f1ed6dd062ee8fe7e8e99fbf1cf6e9ce4a`). Its inline application script matches v2.3, v2.3.1 and v2.3.2.
- **APK structure and identity:** APK ZIP CRC passes; binary AndroidManifest.xml contains package `org.turtle.app.p45bb2a2c586749018e07fe5a0477bd33`, application label `VesperFolio-Web`, version 1.0 (code 1), min API 26, target API 35, `allowBackup=false`, `usesCleartextTraffic=false`, and **no `uses-permission` declarations**. It includes nonrequired camera and microphone feature declarations, not permission requests.
- **APK signature:** the Android APK v2 signing block was parsed. The signer signature, certificate/public-key relationship and signed-content SHA-256 chunk digest verify cryptographically against the supplied APK. Certificate SHA-256: `e3d124f0d9926da6067e3bf98badcb3dd408cee123409b03fb70c098e195a478`. APK SHA-256: `ac5bf617165d680a503d415cbd8e7223df53d64f846f8b9b54d41ada72c38448`.
- **Locally supplied private exports:** PDF parses as exactly two A4 pages, each embedding one JPEG, with no searchable text layer. DOCX passes ZIP CRC and XML parsing and contains two image drawings and two section definitions. The embedded JPEG bytes match between PDF and DOCX in order. Page visuals were reviewed privately. This does **not** constitute OCR or exhaustive Word/Google Docs compatibility testing.
- **Release data minimisation:** the original source ZIP carried synthetic `tests/results/sample.pdf`, `sample.docx` and two rendered page PNGs. They were removed from the new GitHub-ready candidate, along with all other generated document/preview binaries. The release guard now rejects PDF/DOCX and generated page imagery from a package. Existing original ZIP and historical web-app versions were not modified.

**Scope:** the build log and sample-file audit are not substitutes for independent execution on the Android device. The sample exports demonstrate successful creation of two structurally valid documents, but a full v2.3.2 APK workflow regression (crop, rotation, undo, print, exit, large inputs and lifecycle behaviour) has not been documented. The short-lived generated Android package ID and signing key must be addressed before offering this as a dependable upgradeable Android app. Licensing/provenance clearance is also pending.

## v2.3.2 change verification

On 18 November 2026, “With Vesper” was added to the footer at the maintainer’s request. Detailed human and AI contributor credits remain in ATTRIBUTION.md; the displayed version label and presentation comment were updated.

Direct comparison confirms the entire application script is identical to v2.3.1 and the tested v2.3 source. The footer contains the requested signature; the current application file does not contain the detailed HavocRock, Claude or ChatGPT credits. The preceding v2.3.1 web-app is preserved byte-for-byte in baseline/ and as separate deliverables. The release ZIP passes integrity checks and its index.html matches the standalone v2.3.2 web-app.

No runtime tests were rerun for this footer-only update. At the time of that original footer-only QA record, no v2.3.2 phone appearance check or APK build had been performed. The subsequently supplied APK is evaluated in the additional v2.3.2 audit above. The device acceptance and 55 automated checks described below still refer to v2.3.

## v2.3.1 change verification

In v2.3.1 on 18 November 2026, the web-app footer was changed to retain only product wording; contribution names are documented in ATTRIBUTION.md and linked from README.md. The displayed version label and presentation comment were updated. CONTRIBUTING.md adds practical review, testing and release guidance. No new feature, runtime dependency, permission, network access or application behaviour was introduced.

Direct comparison confirms the entire application script is byte-for-byte identical to v2.3. That v2.3.1 web-app source contains no contributor names or contribution-credit line. The preceding v2.3 source is retained byte-for-byte in baseline/ and the separate v2.3 deliverables remain unchanged. The release ZIP passes integrity checks and its index.html matches the standalone v2.3.1 web-app.

The 55 automated checks, document export checks and device reports below were performed on v2.3; they were not rerun for this footer-only patch. No phone appearance check or new APK build was performed for v2.3.1. Existing APK evidence refers to the exact preceding v2.3 source.

## Maintainer acceptance of the preceding v2.2

The maintainer used **Chrome on an Android phone**. Exact phone model, Android version and Chrome version were not supplied for this run.

The maintainer reported that the first requested batch worked: offline opening, importing two photos, opening previews, portrait/landscape layout and retention of the two pages. They also saved PDF and DOCX files. The next requested editing batch was reported successful: rotate/crop/Undo, page reordering, Grey and Document filters, and Clear pages followed by Undo.

The attached real Test-VF.pdf and Test-VF.docx were inspected separately: PDF parsed without repair as two A4 pages with one image per page; DOCX passed ZIP CRC and XML parsing and contained two image drawings. Both documents contained identical JPEG bytes in the same order. Both PDF pages and both DOCX pages rendered and were visually inspected. DOCX was rendered with the available document renderer; this does not verify every Word processor. Personal test images are not bundled in this release.

The maintainer identified a usability issue: v2.2's crop preview was too small for precise editing on a phone. This prompted the separate v2.3 crop redesign. User reports are device evidence, separate from automated execution.

## Maintainer acceptance of v2.3 cropping

On 18 November 2026, using Chrome on an Android phone, the maintainer reported successful testing of all four crop edges and all four corners. They then confirmed the requested Fine tune +/− checks on each edge, Apply crop followed by Undo, and Cancel leaving the image unchanged. They reported no issues with any control or function tested so far.

These are maintainer-reported device results, separate from the simulated automated checks below. No exact Chrome version, phone model or Android version was provided for this test run. The report establishes acceptance of the requested crop controls on this setup; it does not establish universal compatibility, complete security or completion of every release test. Source code was not changed after the maintainer tested it.

## Maintainer APK wrapper acceptance

On 18 November 2026 the maintainer built an APK from VesperFolio-Web-v2.3.html with the HTML2APK converter 0.2.4 QA. After being asked to test cropping in portrait and landscape, Fine tune, Apply/Undo, Cancel, saving PDF/DOCX and opening them externally, Print and Exit, the maintainer reported: “All functions worked without any issues.” This is recorded as reported acceptance of the requested wrapper test, not independent execution by the development environment. Physical paper output and detailed rotation/session-reload behaviour were not separately described.

The build log identifies realme RMX5250, Android 16 / API 36, wrapper minimum API 26 and target API 35, app version 1.0 (1). The APK package is org.turtle.app.pf91979b25de64704bd9e36a62eb52fac. Its ZIP integrity passed. Its SHA-256 matches the build log, and assets/www/index.html is byte-for-byte identical to the delivered v2.3 web-app. The log reports local APK v2 signing and its builder signature verification; this review did not independently validate the cryptographic signature or audit wrapper behaviour.

The attached VesperFolio-Test.pdf parses without repair as two A4 pages, each containing one image. VesperFolio-Test.docx passes ZIP CRC and XML parsing, contains two images, and renders as two pages. Both formats contain identical JPEG bytes in the same order. Every rendered page was visually inspected. Neither the APK nor the private image exports are bundled in this web-app source package.

The build log reports requested VIBRATE and POST_NOTIFICATIONS permissions. The current web-app has no vibration or notification feature. Disable these unused builder permissions before a public APK release unless a separate, intentional wrapper feature requires them. This is a release cleanup item, not an observed functional failure. Wrapper testing does not resume the separate native Android implementation.

## v2.3 automated evidence

`tests/qa.cjs`: **55 passing checks/groups** in a Node VM with a simulated DOM and real @napi-rs/canvas rendering. This is not browser rendering or a touchscreen test. The harness retains the previous image editing, export, print-error, memory-release and session-operation checks, including 180 document-layout combinations.

New checks cover eight crop handles and removal of crop sliders; viewport fit calculations; floating panel toggling; source-pixel precision on all edges; captured pointer-coordinate mapping including pointer-up coordinates; ignored secondary pointers; bounded selection movement; all eight handles under extreme movement; keyboard adjustments; selection preservation during resize; cancellation without changes or added Undo; crop apply and Undo at all four rotations; rotated pixel step size; Reset; and preview bitmap release.

`tests/verify_exports.py`: generated PDF parses and rasterises as two pages with one image each. DOCX ZIP CRC, XML parsing, two images, section count and positive drawing dimensions pass. Reproduction requires development-only @napi-rs/canvas and PyMuPDF; neither is a runtime dependency.

The v2.1 baseline matches BASELINE-SHA256.txt. The copied v2.2 source matches PREVIOUS-SHA256.txt and the separately supplied v2.2 web-app. v2.2 release files were not modified.

## Blocked and open checks

Playwright's bundled Chromium was absent. System Chromium could not start because the environment denied a required socket operation. Consequently no v2.3 real-browser execution was performed in the development environment. The maintainer subsequently tested the crop controls in Chrome on Android as recorded above. DOM simulation cannot establish CSS appearance or browser compatibility; screen-reader focus behaviour, zoomed text and performance measurements remain undocumented.

The subsequent APK test reported success for the requested wrapper functions, including Print and Exit. Dedicated Chrome-browser Print/Exit results, physical printer output, larger photo-collection memory behaviour, corrupt/unsupported/oversized image handling and screen-reader acceptance are not separately documented and remain open for the release. Existing automated print-error checks do not establish printing success. The maintainer's successful earlier export samples do not establish correctness for all future settings.

## Crop acceptance checklist for v2.3

1. Open the v2.3 web-app in Chrome. Import a photo, choose Crop, and confirm the larger image and reachable controls in portrait and landscape.
2. Drag a side and a corner, then drag inside to move the selection. Open Fine tune, choose an edge and use +/−; hide the panel again.
3. Try Cancel and confirm no change. Reopen, crop and Apply crop, then Undo. Repeat after rotating the photo.
4. Export PDF and DOCX and inspect page order and cropped content. Check that closing and reopening Crop preserves the exact selection until changed.

The maintainer has confirmed the requested crop-control checks above. Real PDF/DOCX samples from the subsequent APK test were supplied and inspected as recorded above. Detailed cross-setting export coverage and a sample demonstrating each particular crop operation were not documented. Keep the development-preview label while remaining release checks and upstream licensing are unresolved.

## Reproduce

Run `node tests/qa.cjs` with @napi-rs/canvas available, then `python3 tests/verify_exports.py` with PyMuPDF. Test tools are optional developer dependencies. No external runtime dependency or additional device permission was introduced.
