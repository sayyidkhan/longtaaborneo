# Long Taa Borneo Eco Stay — Submission Workspace

This repository is organised around the three hackathon deliverables.

For an autonomous Zo Computer continuation, start with [`ZO_COMPUTER_HANDOFF.md`](./ZO_COMPUTER_HANDOFF.md).

## Folder Structure

| Folder | Purpose |
| --- | --- |
| `landing-page/` | Vercel-deployable TanStack Start website. Configure this as the Vercel project root directory. |
| `video/` | Process-video source files, scripts, storyboards, and final exports. |
| `presentation/` | Pitch-deck source files, speaker notes, and final exports. |
| `docs/` | Source material, research, requirements, judging criteria, and submission planning. |

## Local Website

```bash
cd landing-page
npm install
npm run dev
```

Open `http://localhost:3000/`. The root `/` route is implemented by `landing-page/src/routes/index.tsx`.

## Vercel Deployment

1. Import `sayyidkhan/longtaaborneo` into Vercel.
2. Set **Root Directory** to `landing-page`.
3. Confirm the detected framework is **TanStack Start**.
4. No environment variables are required by the starter.
5. Deploy and verify the generated URL at `/`.

The app also provides a public submission-assets directory at `landing-page/public/submission/`. When the final files are ready, copy them there using stable names such as:

- `presentation.pdf` → `/submission/presentation.pdf`
- `process-video.mp4` → `/submission/process-video.mp4`

This allows the website, pitch PDF, and process video to share one Vercel deployment when the submission portal accepts URLs.

## Validation

From `landing-page/`:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run start
```

Then verify `http://localhost:3000/` returns the homepage.

## Kimi Visitor Chatbot

The mobile-first visitor chatbot uses the Vercel AI SDK with Kimi's OpenAI-compatible API. The API key is read only by the TanStack server route and is never exposed through a `VITE_` variable.

The public interface tells visitors that their messages are processed by Kimi AI and asks them not to share sensitive information.

For local development:

```bash
cd landing-page
cp .env.example .env.local
```

Add your Kimi key to `landing-page/.env.local`:

```dotenv
KIMI_API_KEY=your_key_here
```

For production, add `KIMI_API_KEY` to the existing `longtaaborneo` Vercel project for Production and Preview, then redeploy. Optional `KIMI_MODEL` and `KIMI_BASE_URL` values are documented in `.env.example`.

Never commit `.env.local` or the key itself.
