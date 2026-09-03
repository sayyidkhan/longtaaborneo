# Zo Computer Handoff — Long Taa Borneo Eco Stay

Treat this file as the durable operating brief for a long-running autonomous delivery task.

## Objective

Complete and ship the three coordinated hackathon deliverables:

1. A public presentation URL for a pitch of no more than three minutes.
2. A polished vertical process video of no more than 60 seconds.
3. A public, functional, mobile-first five-page website.

Do not stop after planning, research, or mockups. Continue building, testing, reviewing, integrating, committing, pushing, deploying, and verifying until every achievable deliverable is submission-ready.

The operator may be unavailable while travelling. Make sensible in-scope decisions without waiting unless genuinely blocked by credentials, external approval, or missing business facts that cannot be handled safely with qualified wording.

## Repository Setup on Zo Computer

- Repository: `https://github.com/sayyidkhan/longtaaborneo`
- Preferred local location: `~/Documents/github/longtaaborneo`
- Primary branch: `main`

If the repository is absent:

```bash
mkdir -p ~/Documents/github
cd ~/Documents/github
git clone https://github.com/sayyidkhan/longtaaborneo.git
cd longtaaborneo
```

If it already exists:

```bash
cd ~/Documents/github/longtaaborneo
git status
git switch main
git pull --ff-only origin main
```

If Zo Computer has a different established GitHub workspace, use that workspace instead. Do not create unnecessary duplicate clones.

Before editing, verify:

```bash
git remote -v
git status --short --branch
git log -1 --oneline
```

## First Actions

1. Initialize or update the local repository.
2. Read this file completely.
3. Read `MASTER_BUILD_PROMPT.md` completely.
4. Read all Markdown files under `docs/`.
5. Inspect all supplied media under `docs/assets/`.
6. Inspect `landing-page/`, `presentation/`, and `video/`.
7. Audit `https://longtaaborneo.vercel.app/` at mobile widths first.
8. Test every public route and record current failures or gaps.
9. Create a concrete execution plan.
10. Start implementation immediately.

## Current State

- GitHub remote: `sayyidkhan/longtaaborneo`
- Production is already configured and deployed on Vercel.
- Production URL: `https://longtaaborneo.vercel.app/`
- Vercel project: `longtaaborneo`
- Vercel root directory: `landing-page`
- Framework preset: TanStack Start
- No environment variables are currently required.
- Pushes to `main` should trigger the existing Vercel deployment.
- Do not create another Vercel project.
- Website stack: React, TypeScript, Vite, TanStack Start, TanStack Router, and Nitro.
- Existing routes: `/`, `/stay`, `/explore`, `/heritage`, and `/plan`.
- `kimi/` is unrelated and untracked. Do not read, modify, stage, or commit it.
- Never commit `.env` files, API keys, credentials, tokens, browser profiles, dependency caches, temporary renders, or other secrets.

## Source of Truth

Read and follow:

- `MASTER_BUILD_PROMPT.md`
- `docs/execution-plan.md`
- `docs/website-requirements-document.md`
- `docs/website-requirements-answers.md`
- `docs/judging-criteria.md`
- `docs/submission-list.md`
- `docs/resource-materials.md`
- `docs/LONG TAA BORNEO ECO STAY.md`
- `docs/LONG TAA BORNEO ECO STAY brochure.md`
- `docs/Pix.md`
- `docs/Poster.md`
- `docs/logo.md`
- All authentic media under `docs/assets/`

Supplied Long Taa materials are authoritative for business facts, prices, facilities, activities, contact details, and booking conditions.

Never invent:

- Missing package prices
- Availability
- Testimonials
- Wildlife sightings
- Safety guarantees
- Visitor counts or occupancy
- Revenue or conversion results
- Environmental-impact numbers
- Cultural claims
- Unapproved booking, payment, or cancellation policies

Clearly label estimates and conditional activities. Record anything requiring beneficiary confirmation.

## Agent Structure

Use multiple subagents aggressively where useful. A minimum of three subagents is required because the submission has three primary workstreams:

1. `website_builder`
   - Own the mobile-first website, interactions, accessibility, responsiveness, automated tests, and Vercel verification.
2. `pitch_builder`
   - Own the presentation source, final PDF, visual QA, speaker notes, and timed three-minute script.
3. `video_builder`
   - Own the vertical process video, storyboard, script, captions, audio, rendering, and final MP4.

Additional agents may handle bounded parallel work such as:

- Requirements and source-material auditing
- Business and content fact checking
- Mobile UX review
- Visual and motion direction
- Copywriting
- Asset selection and optimization
- Accessibility and performance testing
- Deployment verification
- Judging-criteria review
- Presentation visual QA
- Video render QA

Coordinate dependencies actively. Give the presentation and video agents the production URL and stable mobile screenshots as the website develops. They should begin from the supplied materials immediately instead of waiting idly for the final website.

Prefer one primary coordinator to integrate work, resolve conflicts, run final validation, commit, push, deploy, and report completion. Subagents should not independently commit or push unless the environment requires it.

## Judging Criteria

Continuously optimize every deliverable against:

1. **Business Understanding & Relevance** — address the beneficiary's real business challenge.
2. **Website Design & User Experience** — deliver a clear, usable, visually coherent five-page website.
3. **AI-Assisted Execution & Functionality** — ensure the live demo works and the process demonstrates credible AI-assisted execution.
4. **Business Value & CTA Effectiveness** — move qualified visitors toward action.
5. **Presentation & Solution Communication** — communicate the solution and impact clearly in the pitch and Q&A.

Mobile usability, performance, and conversion are core evidence for criteria 2, 3, and 4.

## Business Positioning

Primary message:

> Escape the city. Experience the real Borneo.

Supporting messages:

> Come as a visitor. Leave with a story.

> Six hours from Miri. A world away from the ordinary.

Position Long Taa as authentic, community-led, culturally respectful, nature-rich, and adventure-oriented. Do not position it as a luxury resort.

The website must reduce discovery, trust, planning, and booking friction by answering:

- What is Long Taa and why is it special?
- Is this a resort or a real village?
- What can visitors experience?
- How long and difficult is the journey?
- What accommodation is available?
- What does it cost and include?
- What conditions should visitors expect?
- How can they make a qualified booking enquiry?

## Mobile-First Product Requirement

The mobile website is the primary product experience. Tablet and desktop are secondary enhancements.

Do not create a desktop layout and merely shrink it. Begin with phone-sized layouts, interactions, typography, navigation, performance, and conversion flow, then progressively enhance for larger screens.

Primary target:

- Modern mobile browsers
- Widths from 360px to 430px
- Reference width of 390px
- Portrait orientation first
- Mid-range mobile devices
- Touch and one-handed use where practical
- Realistic 4G and inconsistent rural connectivity

Development order:

1. Design and implement at 390px.
2. Validate at 360px, 375px, 390px, and 430px.
3. Enhance for tablets.
4. Enhance for desktop.
5. Recheck that larger-screen enhancements did not regress mobile.

Mobile requirements:

- No horizontal overflow or clipped content.
- Readable typography without zooming.
- Comfortable line lengths and vertical rhythm.
- Touch targets of approximately 44 by 44 pixels or larger.
- No essential interaction that depends on hover.
- Simple, thumb-friendly navigation.
- A prominent WhatsApp booking CTA.
- A restrained sticky mobile CTA where it materially improves conversion.
- Safe-area support.
- Appropriate mobile input types and visible form labels.
- Touch and swipe support for galleries.
- Keyboard alternatives for interactive content.
- Scannable pricing, packages, inclusions, and conditions.
- A price estimator that is comfortable to operate with one hand.
- Concise, mobile-friendly WhatsApp enquiry messages.
- Lightweight, interruptible motion.
- `prefers-reduced-motion` support.
- No scroll-jacking.
- No essential content hidden behind animation.
- Responsive, subject-aware image cropping.
- No mobile CTA or navigation obscuring content.

Performance priorities:

- Fast initial render
- Minimal non-essential JavaScript
- Responsive image sizes and modern formats where appropriate
- Explicit media dimensions to reduce layout shift
- Lazy loading of non-critical media
- No unnecessary autoplay media
- No large decorative video blocking first render
- Smooth behaviour on mid-range devices
- Graceful behaviour on slow connections
- Functional content when animations are disabled
- Sensible font loading and fallbacks

Mobile clarity, conversion, and performance take priority over desktop decoration.

## Website Workstream

Build a production-quality five-page website while preserving the existing TanStack stack and file-based routes:

1. `/` — Home / Experience the Real Borneo
2. `/stay` — Stay and Packages
3. `/explore` — Explore Long Taa
4. `/heritage` — Our Story and Living Heritage
5. `/plan` — Plan and Book

Use consistent navigation and a consistent footer across all routes. Direct navigation and refresh must work in production on every route.

### Home

- Use authentic Long Taa imagery in the hero.
- Communicate the primary positioning immediately.
- Put a visible booking or planning CTA above the fold.
- Create a mobile-first scroll-controlled journey from Miri to Long Taa.
- Build one memorable reveal around “Six hours from Miri. A world away from the ordinary.”
- Present nature, culture, adventure, and living heritage.
- Include properly attributed award or conservation proof.
- Provide clear paths into packages, exploration, heritage, and booking.

### Stay and Packages

- Explain longhouse accommodation honestly.
- Compare accommodation-only and accommodation-plus-meals.
- Explain both experience groups without inventing package prices.
- Communicate inclusions, exclusions, guest limits, transport, and conditional availability.
- Add an accessible indicative price estimator.

Estimator rules:

- Default trip may use three days and two nights, but nights remain editable.
- Accommodation total = rate × guests × nights.
- Required 4WD vehicles = `ceil(guests / 3)` when selected.
- 4WD total = vehicles × RM1,500.
- Required longboats = `ceil(guests / 3)` when selected.
- Longboat, guide, and porter total = longboats × RM600.
- Display: `Indicative estimate — final availability and price confirmed by Long Taa.`
- Do not add Package 1 or Package 2 fees unless approved prices become available.

### Explore

Present the Dapui River, Tagang Fish Conservation Area, rainforest, wildlife, Acin Salt Spring, Batu Ukat or Ladder Rock, Batu Nginan, Batu Tatip, and Batu Belacek or Rock Door.

Use supplied authentic photographs. Do not guarantee fish sightings, wildlife sightings, weather, road conditions, river conditions, water levels, or activity availability.

The gallery must support touch, swipe, pointer, and keyboard input.

### Heritage

- Explain the Sebup community respectfully.
- Present the traditional 20-door longhouse as a living community.
- Explain living heritage without exoticizing residents.
- Explain community-led conservation and tourism.
- Include visitor etiquette and community rules.
- Flag final cultural wording and photography selection for community approval.

Never describe the community as primitive, an untouched tribe, a hidden tribe, or the last of its kind. Culture is living identity, not decoration.

### Plan and Book

- Explain the approximately six-hour 4WD journey from Miri.
- Set honest expectations about remoteness.
- Explain weather, road, river, availability, and safety dependencies.
- Provide preparation guidance only when supported by source material.
- Build a structured booking flow.
- Use WhatsApp number `60198563536`.
- Contact: Clement Langet.
- Email: `longtaaborneo@gmail.com`.
- TikTok and Facebook: `@visitlongtaaborneo`.
- Do not claim confirmed availability.

### Visual Direction

Create a cinematic editorial rainforest experience using:

- Warm off-white or bark-toned surfaces
- Deep rainforest and river greens
- Charcoal ink
- One restrained amber or clay accent
- Strong serif display typography paired with a clean sans serif
- Large documentary photography
- Deliberate negative space
- Subtle tactile grain
- Organic transitions inspired by river flow and forest canopy

Avoid:

- Generic travel-template styling
- Cards everywhere
- Excessive rounded rectangles
- AI-purple gradients
- Glassmorphism as the main language
- Fake dashboards
- Neon tropical palettes
- Unrelated stock photography
- Decorative 3D that competes with content
- Video backgrounds on every section
- Motion that traps scrolling or hides content
- Fake testimonials
- Unverified statistics

Never manipulate community faces, clothing, ceremonies, cultural objects, or environmental evidence with generative edits.

### Functional Requirements

- Shared navigation and footer
- Functional mobile menu
- Structured WhatsApp booking CTA
- Accessible price estimator
- Responsive gallery
- Keyboard navigation and visible focus states
- Reduced-motion support
- Direct-route navigation and refresh
- Useful loading and error states
- Metadata, social previews, and favicon
- External citations where required
- No broken links, missing images, or browser-console errors

### Website Validation

From `landing-page/`, run:

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
```

If a named script is unavailable, inspect `package.json` and use the correct equivalent. Never report an unavailable test as passing.

Test locally and in production:

- All five routes
- Mobile navigation
- Direct-route refresh
- WhatsApp CTA
- Estimator calculations
- Forms and validation
- Galleries
- Keyboard and touch interaction
- Visible focus states
- 360px, 375px, 390px, and 430px widths
- Portrait orientation
- Landscape sanity check
- Reduced-motion mode
- Slow-network behaviour
- Responsive images
- Browser-console errors
- Broken links
- HTTP response status
- Horizontal overflow

Use mobile screenshots as the primary QA and submission evidence.

## Presentation Workstream

Create a concise deck for a maximum three-minute pitch covering:

1. Long Taa and its community.
2. The real business problem.
3. Discovery, trust, planning, and booking friction.
4. The five-page mobile-first solution.
5. Important UX and AI-assisted execution decisions.
6. The conversion and WhatsApp enquiry flow.
7. Expected business value without fabricated results.
8. The working production website.
9. A strong closing CTA.

Use authentic photography, minimal text, strong hierarchy, and the same visual language as the website. Lead with mobile website screenshots; use desktop screenshots only as supporting evidence.

Deliver under `presentation/`:

- Editable presentation source
- Final PDF
- Speaker notes
- Timed three-minute script
- Rendered slide previews
- Presentation QA notes

Open and visually inspect every slide. Verify no clipping, overlap, illegible text, incorrect facts, inconsistent branding, or broken links. Confirm the spoken pitch remains within three minutes.

## Video Workstream

Create a maximum 60-second, 9:16 vertical process video suitable for TikTok.

Show:

- Raw source materials
- Discovery of the business problem
- AI-assisted research
- Design and code iterations
- Authentic image selection
- Mobile website interactions
- The five-page journey
- The estimator
- The WhatsApp booking CTA
- Production deployment
- The final mobile-first result
- A closing Long Taa CTA

Requirements:

- Maximum 60 seconds
- Strong opening hook
- Burned-in captions
- Large, legible mobile typography
- Safe caption positioning
- Clear visual pacing
- Appropriate licensed or generated audio
- Balanced audio levels
- No fabricated community footage
- No manipulation of culturally sensitive media
- No unverified claims
- Clear evidence of AI-assisted execution

Deliver under `video/`:

- Editable source
- Script
- Storyboard
- Final MP4
- Thumbnail or cover
- Render-validation notes

Inspect duration, cropping, caption legibility, mobile safe areas, audio balance, dropped frames, visual glitches, incorrect facts, and broken media.

## Public Submission Assets

When final, copy:

- Pitch PDF to `landing-page/public/submission/presentation.pdf`
- Process video to `landing-page/public/submission/process-video.mp4`

After deployment, verify public, no-login access at:

- `https://longtaaborneo.vercel.app/submission/presentation.pdf`
- `https://longtaaborneo.vercel.app/submission/process-video.mp4`

Update `docs/submission-list.md` with the verified presentation, process-video, and website URLs.

## Git and Deployment Authorization

You are authorized to:

- Modify intended project files.
- Run development servers, tests, and builds.
- Commit validated work to `main`.
- Push to `origin/main`.
- Trigger the existing Vercel deployment.
- Verify all public submission URLs.

Before every commit:

1. Run `git status`.
2. Review the diff.
3. Inspect the exact staged file list.
4. Exclude `.env` files, secrets, caches, and temporary artifacts.
5. Exclude `kimi/` completely.
6. Run relevant validation.
7. Use a descriptive commit message.
8. Push only validated work.

Never force-push or use destructive Git commands that could discard existing work. Do not modify GitHub or Vercel projects unrelated to `longtaaborneo`.

## Vercel Workflow

Vercel is already deployed. Do not create another Vercel project or change the production domain unless absolutely necessary.

For each production change:

1. Validate locally.
2. Review and commit the intended diff.
3. Push `main`.
4. Wait for the existing Vercel deployment.
5. Verify `https://longtaaborneo.vercel.app/`.
6. Verify all five routes and submission assets.
7. Confirm the deployed revision matches the pushed commit.
8. Check runtime errors, missing assets, and broken links.

If deployment fails, inspect the logs, reproduce the issue locally, fix the root cause, rerun validation, push the fix, and verify production again.

## Completion Standard

Do not declare completion until:

- The production website is publicly reachable.
- It delivers a polished mobile-first experience.
- All five routes work at 360–430px widths.
- Tablet and desktop layouts remain coherent.
- There is no horizontal overflow.
- Mobile navigation, forms, and touch targets work.
- WhatsApp booking and estimator flows work.
- Reduced-motion mode works.
- Direct-route loading and refresh work.
- Lint, typecheck, tests, and production build pass.
- The latest Vercel deployment is healthy.
- The presentation PDF is complete and publicly accessible.
- The pitch script fits within three minutes.
- The process video is complete, publicly accessible, and no longer than 60 seconds.
- `docs/submission-list.md` contains all three verified URLs.
- All intended files are committed and pushed.
- No secrets or unrelated `kimi/` files are committed.

## Final Handoff

Report:

- Production website URL
- Presentation URL
- Process-video URL
- Final commit hash
- Vercel deployment status
- Lint, typecheck, test, and build results
- Mobile viewport QA results
- Remaining beneficiary confirmations
- Remaining submission risks
- Exact files ready to submit
