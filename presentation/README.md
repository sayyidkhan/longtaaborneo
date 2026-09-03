# Pitch Presentation Workspace

Use this folder for the three-minute pitch workstream.

## Expected Contents

- Editable presentation source.
- Speaker script timed to 180 seconds or less.
- Q&A preparation notes.
- Rendered slide images for visual review.
- Final PPTX and PDF under `exports/`.

For URL submission, copy the approved final PDF to:

`landing-page/public/submission/presentation.pdf`

After the Vercel deployment, it will be available at:

`/submission/presentation.pdf`

Do not commit credentials, environment files, or temporary render caches.

## Current Deck

- Source generator: `generate-deck.js`
- Editable deck: `exports/long-taa-borneo-pitch.pptx`
- PDF: `exports/long-taa-borneo-pitch.pdf`
- Timed script: `SPEAKER_SCRIPT.md`
- Delivery cues: `SPEAKER_NOTES.md`
- Q&A and source ledger: `QA_AND_SOURCES.md`

Regenerate the deck with the presentation toolchain prepared by the delivery environment:

```bash
node presentation/generate-deck.js
libreoffice --headless --convert-to pdf --outdir presentation/exports \
  presentation/exports/long-taa-borneo-pitch.pptx
```

Final website screenshots may be added only after the production mobile experience has been verified.
