# Changelog

## v2.3.2 development — 18 November 2026

- Added “With Vesper” as a simple footer signature at the maintainer’s request.
- Kept detailed contributor credits in ATTRIBUTION.md and documented Vesper as the conversational name for the ChatGPT collaborator.
- Updated the displayed version label. Application script remains identical to v2.3.1 and tested v2.3.
- Preserved v2.3.1 separately; no new APK build or phone test had been performed at the time of that footer-only patch.
- Later on 18 November, independently inspected a user-supplied v2.3.2 APK, checked its zero-permission Android manifest, verified its APK v2 signature and exact embedded web-app, and checked the structure of private two-page PDF/DOCX samples.
- Prepared a separately cleaned GitHub-ready source ZIP, excluding all generated PDF/DOCX sample files and page PNGs, and added a release guard. The functional application source and historical snapshots are unchanged.

## v2.3.1 development — 18 November 2026

- Removed human and AI contribution credits from the current application footer; retained product wording.
- Preserved the full attribution in ATTRIBUTION.md and added a documentation link from README.md.
- Added CONTRIBUTING.md with clear review, testing, evidence and release responsibilities.
- Retained v2.3 source and historical QA evidence unchanged; application script is identical to v2.3.
- This patch has not been rebuilt or device-tested as an APK.

## v2.3 development — 18 November 2026

- Recorded the maintainer’s successful subsequent APK wrapper test, real two-page export checks and exact embedded-source/build-hash matches. Flagged unused vibration/notification permissions selected by the builder for removal before public APK release. No application source or APK bytes were changed.

- Replaced small crop preview and percentage sliders with a full-window workspace.
- Added eight 48-CSS-pixel touch targets on the selection edges and corners, plus dragging inside to move the selection.
- Added a hideable semitransparent Fine tune panel near the lower centre, with edge selection and one-image-pixel adjustment buttons.
- Added keyboard arrow adjustment (Shift for ten image pixels), crop percentages and a composition grid.
- Retained crop fractions without percentage rounding when reopening; crop uses rotated-image coordinates and preserves Undo/Cancel behaviour.
- Fit the preview to the available viewport, including landscape and dynamic browser viewport height; retain the selection during resizing.
- Render the filtered source once per crop session; reuse it during dragging and release preview bitmaps, animation callbacks and pointer capture on close.
- Retained v2.1 and v2.2 source snapshots and recorded their hashes. No runtime library, network dependency or permission was added.
- Expanded simulated automated checks from 37 to 55. The maintainer subsequently confirmed all four crop edges, all four corners, Fine tune, Apply/Undo and Cancel in Chrome on Android, with no issues reported in the tested controls. Source code was unchanged after that device test.

## v2.2 development — 18 November 2026

- Updated app and documentation wording to “web-app”; retained required source syntax and file extensions.

- Preserved checked v2.1 bytes separately; recorded SHA-256.
- Introduced VesperFolio branding with navy, jade and gold styling, inspired by the supplied interface mockups.
- Added responsive page cards with text controls and one top-right Exit control.
- Added keyboard-accessible thumbnail previews using the existing PDF layout calculations.
- Added explicit Discard session, distinct from reversible Clear pages.
- Added active and retained-image memory budgets; release preview/crop canvases on close.
- Kept Exit locked during background operations after moving it outside main.
- Added a restrictive content security policy, skip link, reduced-motion rule, named dialogs and status announcements.
- Embedded privacy, use terms and disclaimer; supplied repository documentation and contribution credits.
- Kept existing image editing, layout, PDF/DOCX writers, sequential export, print and optional native hooks.

Deferred: camera scanning, custom borders, downloadable clipart, persistent sessions and OCR. Mockup controls for deferred features were not added as inactive promises.
