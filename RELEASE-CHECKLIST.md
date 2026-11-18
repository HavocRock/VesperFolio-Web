# v2.3.2 release checklist

This checklist separates **verified**, **reported**, and **still open** facts. Do not replace the reported results with claims of independent device testing.

## Verified in private audit

- [x] Original source package ZIP CRC passed; source `index.html` equals standalone v2.3.2 app.
- [x] Historical v2.1, v2.2, v2.3 and v2.3.1 app hashes match records; originals untouched.
- [x] v2.3.2 app script unchanged from prior v2.3.
- [x] Supplied APK ZIP CRC passed, embedded web-app matches exactly.
- [x] APK Android v2 signing signature, public key and signed-content digest verified.
- [x] APK manifest inspected: **zero requested permissions**.
- [x] Privately supplied PDF and DOCX structural checks passed, with two matching embedded JPEGs in order.
- [x] New clean GitHub-ready source ZIP excludes all PDF/DOCX and generated page images.
- [x] Package preflight/release guard passes.

## To complete before claiming a stable public release

- [ ] Confirm ownership/provenance of the original v2.1 work and select a license if public reuse is intended (`LICENSING.md`).
- [ ] Test the exact v2.3.2 application in Chrome/Android and desktop browser at different viewport sizes, including Zoom and focus controls.
- [ ] Independently repeat the complete Android APK test matrix: import, order, crop/rotations, fine tune, preview, Undo, Clear, Discard, PDF, DOCX, print, Exit, offline, portrait/landscape, large/invalid inputs and lifecycle/resume.
- [ ] If publicly releasing APKs: choose a permanent application ID, display label and long-term signing key; document upgrade/backup strategy; inspect the wrapper and remove unnecessary optional camera/mic feature declarations if appropriate.
- [ ] Confirm that exported files open and print on representative target viewers and devices; test memory limits and interruptions.
- [ ] Decide whether this should be a development pre-release now or remain private while these checks are outstanding.
- [ ] Re-run `python tools/release_guard.py <release-zip>` on the exact candidate immediately before upload.
- [ ] Confirm **no private/generated documents, source photos, rendered previews, build logs, credentials or signing keys** are selected for upload.

Keep the main source ZIP and Android experimental APK as **separate** assets. Do not add private document evidence to either one.
