# Contributing to VesperFolio

Read the project documentation and understand the existing behaviour before changing or distributing a build. Contributions are welcome from learners and experienced developers. Careful review and practical testing are part of the work.

## Licensing contributions

This project is licensed under [MIT](LICENSE). Submit only material you have rights to license under MIT-compatible terms, identify outside code and its license, and preserve required legal notices. Contributions included in this project are intended to be distributed under MIT unless otherwise expressly agreed. The development credits in [ATTRIBUTION.md](ATTRIBUTION.md) are a record of contributions, not additional MIT conditions.

## Before making a change

Read README.md, QA.md, PRIVACY.md, SECURITY.md, TERMS.md, ATTRIBUTION.md and LICENSING.md. Check the recorded limitations and distinguish simulated tests, maintainer device reports and untested behaviour. Preserve a known working version and make changes separately. Use only images and test data you are authorised to process.

## Review and test the result

Keep changes focused and explain the problem, expected result and affected behaviour. Human-written and AI-assisted code can both contain errors. Read generated code and suggestions, understand relevant assumptions, and test the resulting application. A successful generation or automated run is evidence about that check; it does not establish complete product correctness.

Run the development checks relevant to the change. Verify changed user workflows in the intended browser or wrapper. For changes affecting editing or export, inspect actual PDF and DOCX outputs, page order, crop placement, rotation, margins and readability. Check Undo, Cancel and session loss where relevant. Verify offline operation and retain the privacy model. Any new dependency, network access or permission needs a documented reason. Do not test anyone else’s systems without proper authorisation.

## Report evidence honestly

State what changed, the version tested, device and browser or wrapper, checks performed, results and remaining limitations. Keep results from older versions labelled as such. Describe reproducible failures and useful fixes without blaming a person or tool in place of investigating the cause. Do not publish private documents, credentials, signing keys or sensitive logs in issues or test fixtures.

## Before a release

Inspect the release contents, keep attribution and required notices, confirm source rights and licensing, and label previews accurately. Do not promise flawless operation, complete security or verification beyond the evidence. Development documentation records the responsibilities and contributions behind the application; it is not a substitute for testing a specific build.
