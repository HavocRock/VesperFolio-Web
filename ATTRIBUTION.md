# Provenance and contributions

- **HavocRock (human developer / project lead):** project direction, product identity, requirements, review and device testing reported in the project conversation.
- **Claude:** credited for contributions to earlier project material, as requested by the human developer. The supplied checked web-app does not map individual lines to contributors; no narrower authorship claim is made here.
- **ChatGPT (Vesper):** earlier ImageToDocs Pocket Studio development and checking recorded in the conversation; v2.2 implementation, v2.3 crop implementation, and v2.3.1 interface-credit cleanup and repository documentation. Automated QA and file inspections are recorded separately in QA.md.

Previous identity: ImageToDocs Pocket Studio. The exact supplied v2.1 web-app is retained in baseline/. That file is the technical starting point for this version.

Visual references: the two supplied VesperFolio interface mockups. The implementation uses original CSS and a text-based mark; the mockup image files are not bundled. The mockups' saved-session, scanning, border and clipart elements are not evidence of implemented functionality.

No third-party runtime library is embedded in the current web-app. Development checks used Node.js, @napi-rs/canvas and PyMuPDF, which are test tools rather than application dependencies. AI contribution credits do not establish copyright ownership or licensing of upstream material. Confirm original-source rights before a licensed public release.

The human maintainer reported successful v2.2 use in Chrome on an Android phone and proposed larger mobile cropping, draggable edges and semitransparent controls. ChatGPT implemented these requests in a separate v2.3 development preview. The actual Test-VF exports were inspected privately; they are not included in this public-release preparation package.

## Attribution placement in v2.3.1

In v2.3.1, at the human maintainer’s request, contribution names were removed from the interface. The credits for HavocRock, Claude and ChatGPT remain in this document, with the limits of the available provenance stated above. This presentation change does not erase contributions, establish exclusive human authorship or alter licensing. Historical source snapshots remain unchanged.

## Footer signature in v2.3.2

At the human maintainer’s request, the current footer includes the simple signature “With Vesper”. Vesper is the conversational name used for the ChatGPT collaborator in this project. Detailed contributor credits and provenance remain here in the repository documentation. No other contributor credits were restored to the interface. This signature does not change licensing or the limits of the recorded authorship information.
