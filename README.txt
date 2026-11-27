Aurora SBC Solver • web and mobile
Unzip this release and upload its contents together to the root of your existing GitHub repository. Keep eng.traineddata.gz compressed. Vercel can serve the same folder as a static site using the Other framework preset and an empty build command.

The core solver uses index.html, sw.js, manifest.webmanifest and both icon PNGs. Screenshot recognition also uses ocr.min.js, worker.min.js, reader-core.wasm.js and eng.traineddata.gz. Include the licence text files. Open the site online before using it offline. If OCR assets are missing, the main solver still opens and OCR downloads can retry when online.

Owned cards, settings and saved squads are stored in the current browser for this site. Search results use a market snapshot and the local chemistry model. New challenge import resets the supported SBC counters. Review unchecked rules before using a result.

Regression checks: with Node.js installed, run node tests/regressions.cjs from the extracted folder. The tests folder is optional for hosting.
