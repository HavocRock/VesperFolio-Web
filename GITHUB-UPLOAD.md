# GitHub upload guide — VesperFolio Web v2.3.2

1. Keep the existing v2.1–v2.3.1 files and original v2.3.2 package as untouched backups. Do not edit the APK in place.
2. Inspect `LICENSING.md` before making a public repository or assigning reuse rights. When provenance is unresolved, use a private repository or development-only staging area.
3. Upload only the contents of `VesperFolio-Web-v2.3.2/` from the cleaned source ZIP. Keep `baseline/`, `tests/` text evidence, and documentation. The ZIP contains **no PDF, DOCX or page PNG files**.
4. Run or review the source guard: `python tools/release_guard.py VesperFolio-Web-v2.3.2-GitHub-Ready.zip` (from outside the archive, with Python installed).
5. If approved for public development preview, create tag `v2.3.2` and a **Pre-release** titled `VesperFolio Web v2.3.2 — Development Preview`. Paste `RELEASE-NOTES-v2.3.2.md` as the description.
6. Attach the **clean source ZIP** only. A separately supplied APK can be added later as an **experimental** asset after the Android checklist and permanent package/signing strategy are reviewed. Do not attach private exported files, input photographs, test screenshots, or build logs.
7. Re-download the published source ZIP and inspect its file list. Run the release guard again on the published copy. Verify checksums from your original local assets.

## Privacy promise for this preparation

The two private documents supplied for testing are not included in the source folder, ZIP, historical baselines or release notes. The public notes describe only technical structure and testing scope, not their text or images. Do not upload private exports later as issue attachments or example fixtures.

**Notes:** A GitHub repository is not an automatic grant of open-source reuse rights; choose a clear license only after establishing source rights. GitHub Pages serves an online copy, whereas local `index.html` remains the offline workflow. Do not advertise the experimental APK as a stable, upgradeable Android app until its package ID and signing key are stable.

## Private-document boundary and GitHub web upload

- Never upload the supplied student-work PDF/DOCX, originals, preview images, export logs or Android test-build keys. Those materials are not needed to publish the source code.
- On GitHub, first create a repository without an automatically generated README. If provenance/licensing is still being evaluated, begin with **Private** visibility.
- Extract this ZIP outside the private-document folder and upload **the contents** of `VesperFolio-Web-v2.3.2/`, retaining the `baseline/`, `tests/` and `tools/` subdirectories. GitHub's website does not import source files merely because a ZIP was uploaded as one file.
- Review `README.md` for the project's origin story, and do not publish an experimental APK as a stable Android release.
- `tests/verify_exports.py` takes locally stored `--pdf` and `--docx` inputs; its private fixtures are intentionally not included. It should not be run against sensitive files in public CI.
