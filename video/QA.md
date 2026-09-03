# Process Video QA

## Final Export

- **File:** `exports/long-taa-process-video.mp4`
- **Runtime:** 59.50 seconds
- **Video:** 1080 × 1920, H.264 High, yuv420p, 30 fps
- **Audio:** AAC LC, stereo, 48 kHz
- **Size:** 23,020,581 bytes (about 23 MB)
- **Audio check:** -17.1 LUFS integrated; -1.5 dBTP true peak

## Validation

- HyperFrames runtime: 0 errors, 0 warnings.
- HyperFrames layout: 0 issues across sampled scene frames.
- HyperFrames motion: 0 errors, 0 warnings.
- Contrast: 35 of 35 text checks pass WCAG AA.
- Final H.264/AAC delivery was inspected at 1.8s, 14.5s, 30.5s, 46.5s, and 57.5s.
- Captions are burned in, and `captions.srt` is supplied for platform accessibility/re-use.

## Reviewed Non-Blocking Lint Suggestions

- The single timeline contains nine sequential scenes and eight transition overlays. HyperFrames recommends splitting a larger timeline into sub-compositions; this does not affect render or playback.
- The opening and closing intentionally reuse the same authentic supplied community photograph; HyperFrames reports that as duplicate media discovery risk. The final output was visually verified.

## Workflow Note

- The installed HyperFrames and HyperFrames CLI skills were followed. No `product-launch-video` skill was available in the environment, so the project uses the general HyperFrames workflow.

## Public Delivery

Copy the final file to `landing-page/public/submission/process-video.mp4` before the Vercel deploy. The expected public URL is `https://longtaaborneo.vercel.app/submission/process-video.mp4`.
