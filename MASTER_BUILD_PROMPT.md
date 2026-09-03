# Long-Running Build Prompt: Long Taa Borneo Eco Stay Submission

Treat this as a long-running delivery task. Create a goal for the full objective and keep working until all achievable outputs are built, tested, integrated, and handed off. Do not stop after planning or producing mockups.

## Objective

Produce the complete Long Taa Borneo Eco Stay hackathon submission:

1. A public **3-minute pitch URL**, using a presentation deck or pitch link.
2. A polished **1-minute process video**, fun, bold, entertaining, and suitable for TikTok.
3. A public **working five-page website URL**.

The website, deck, and video must tell one coherent business story and directly optimize for every judging criterion.

## Required Team Structure

Act as primary coordinator. Spawn **exactly three subagents immediately**, one per workstream:

1. `website_builder` — build, test, and prepare deployment of the five-page website.
2. `pitch_builder` — create and visually verify the three-minute presentation deck and speaker script.
3. `video_builder` — create and verify the one-minute vertical process video.

Do not let subagents spawn more agents. Keep all three active in parallel. Continue coordinating, researching, reviewing, integrating, and resolving shared dependencies while they work.

Use messages and follow-up tasks to coordinate dependencies. Presentation and video agents should start from existing source materials, story, copy, and photography; they must not sit idle waiting for the website. Once the website reaches a stable visual state, send its preview URL and final screenshots to both agents for their last integration pass.

Only the primary coordinator commits, pushes, deploys shared output, updates shared documentation, and gives final completion status. Subagents should not commit or push.

## Mandatory Skills

- Website work: use the available website-building and hosting skills when applicable.
- Presentation work: use the `presentations` skill and follow its rendering and visual-QA requirements.
- Video work: read and use `hyperframes` first, then `product-launch-video` and other required HyperFrames skills. Render and inspect the final video.
- Image generation or editing: use the `imagegen` skill only when a missing visual is genuinely necessary. Prefer supplied authentic photographs.

## Repository Safety

- Work in `/Users/sayyid/Documents/github/longtaaborneo`.
- Read all relevant files under `docs/` before drafting or building.
- Preserve original `.docx` files and Markdown conversions.
- Preserve unrelated existing changes.
- `kimi/` is unrelated and untracked. Do not modify it, stage it, or read `kimi/.env`.
- Never commit secrets, `.env` files, credentials, temporary renders, browser profiles, or dependency caches.
- Before committing, inspect the exact staged file list.

## Source of Truth

Read these first:

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
- All files under `docs/assets/`

Use supplied Long Taa materials as the authority for business facts, pricing, contact details, facilities, activities, and booking conditions.

## Verified Submission Constraints

- Each judging criterion scores 1–5.
- Required submission time: **1:55 PM**. Date is not present in supplied material; do not invent it.
- Pitch: maximum 3 minutes; submit public presentation-deck URL or pitch URL.
- Process video: maximum 1 minute; fun, entertaining, bold, TikTok-suitable. Supplied screenshot does not prove whether the portal wants a file or URL, so produce both a final MP4 and a public direct URL when possible.
- Website: public working URL.
- Judging criteria explicitly refers to a **five-page website**. Do not deliver only one standalone landing page.

## Judging Criteria

1. **Business Understanding & Relevance** — address the beneficiary's real business challenge.
2. **Website Design & User Experience** — make the five-page website clear, usable, and visually coherent.
3. **AI-Assisted Execution & Functionality** — make the live demo work as intended and show a credible AI-assisted process.
4. **Business Value & CTA Effectiveness** — create value and move visitors to act.
5. **Presentation & Solution Communication** — communicate solution and impact clearly in pitch and Q&A.

## Business Thesis

Long Taa has a compelling community-led experience but high discovery, trust, planning, and booking friction. Remoteness makes visitors ask:

- What is Long Taa and why is it special?
- Is this a resort or a real village?
- What can visitors do?
- How long is the journey?
- What does it cost?
- What is included?
- What conditions or risks should visitors expect?
- How do they make a qualified booking enquiry?

Build a digital journey that answers these questions, creates emotional desire, sets honest expectations, and turns qualified visitors into structured WhatsApp enquiries.

Primary positioning:

> Escape the city. Experience the real Borneo.

Supporting lines:

> Come as a visitor. Leave with a story.

> Six hours from Miri. A world away from the ordinary.

Do not position Long Taa as luxury. Position it as authentic, community-led, culturally respectful, nature-rich, and adventure-oriented.

## Content Truth and Guardrails

Use these facts:

- Destination: Long Taa, Dapui, Ulu Tinjar, Baram, Sarawak, Malaysia.
- Starting point: Miri, Sarawak.
- Journey: approximately six hours by 4WD.
- Community: Indigenous Sebup community; traditional 20-door longhouse.
- Facilities described by source: 24-hour solar electricity, fresh mountain-sourced water, telecommunications connectivity.
- Accommodation only: RM50 per person per night; guests prepare their own meals.
- Accommodation plus local meals: RM180 per person per night; breakfast, lunch, and local dinner included.
- Miri–Long Taa–Miri 4WD transfer: RM1,500 per vehicle; maximum three guests per vehicle.
- Longboat, local guide, and porter: RM600 per group; maximum three guests per longboat.
- No minimum guest count.
- Larger groups require additional vehicles and longboats, subject to availability.
- Activities depend on weather, road, river, water level, availability, and safety conditions.
- Contact: Clement Langet.
- WhatsApp: `+60 19-856 3536`.
- WhatsApp link number: `60198563536`.
- Email: `longtaaborneo@gmail.com`.
- TikTok and Facebook: `@visitlongtaaborneo`.

Experience group 1:

- Dapui River adventure
- Tagang Fish Conservation Area
- Sebup longhouse experience
- Living heritage
- Wildlife and rainforest experience

Experience group 2:

- Acin Salt Spring
- Batu Ukat / Ladder Rock
- Batu Nginan
- Batu Tatip
- Batu Belacek / Rock Door

Never invent:

- Package 1 or Package 2 prices not given in source materials
- Availability
- Wildlife sightings
- Safety guarantees
- Testimonials
- Visitor counts
- Occupancy
- Revenue
- Conversion results
- Environmental-impact numbers
- Cultural claims absent from approved material

Show estimates as indicative and require final confirmation through WhatsApp.

## Community and Cultural Responsibility

Follow community-based tourism principles:

- Community ownership and benefit lead the narrative.
- Culture is living identity, not visual decoration.
- Do not exoticize people or use language such as untouched, primitive, hidden tribe, or last of its kind.
- Use supplied images respectfully. Do not alter faces, clothing, ceremonies, cultural objects, or environmental evidence with generative edits.
- Do not claim that every cultural practice or location is available to visitors.
- Include visitor etiquette and explain that community rules, conservation zones, and local guidance apply.
- Flag final cultural wording and photography selection for Clement/community approval before public promotion.

## Strong External Proof

Use this as an attributed trust signal, not an unsupported badge:

- On 2026-09-01, The Borneo Post reported that Long Taa's Sebup community won the **Gamuda Inspiration Award for Environment and Wildlife** for work centered on the Dapui River tagang system and broader community conservation.
- The APPGM-SDG Annual Report 2024 separately records support for implementing the Tagang fish-conservation system in Dapui, Tinjar Baram, with the Sebup Development Committee as solution provider.

Sources:

- `https://www.theborneopost.com/2026/09/01/sebup-communitys-efforts-to-preserve-dapui-river-recognised-with-award/`
- `https://parlimen.gov.my/images/webuser/jkuasa/LAPORAN%20KRPPM/APPGM-SDG%20ANNUAL%20REPORT%202024.pdf`

Attribute the award source in the site and deck. Do not invent a Gamuda logo or imply certification.

## Shared Creative Direction

Create an editorial, cinematic rainforest experience built from authentic Long Taa photography.

Visual character:

- Warm off-white or bark-toned editorial surfaces
- Deep rainforest green and river green
- Charcoal ink
- One restrained amber or clay accent
- Strong serif display typography paired with a clean sans serif
- Large documentary photography
- Deliberate negative space
- Tactile grain used subtly
- Organic transitions inspired by river flow, forest canopy, and the long journey inward

Avoid:

- Generic travel-template cards everywhere
- AI-purple gradients
- Glassmorphism as the main language
- Excessive rounded rectangles
- Fake dashboards
- Neon tropical palettes
- Unrelated stock images
- Decorative 3D that competes with content
- Video backgrounds on every section
- Motion that traps scrolling or hides content

Use reference materials selectively:

- MotionSites: one cinematic hero or peak, not video everywhere.
- Originkit: only components that fit the visual system after customization.
- Scroll Craft: scroll as narrative, one signature interaction, one engineered emotional peak, screenshot-based verification.
- ThreeUI Living Green: thematic inspiration only.
- Podium: full-bleed imagery, editorial pacing, confident type.
- Lenis: optional smooth scrolling with native and reduced-motion fallbacks.
- Image to 3JS and Rive: stretch goals only after all core gates pass.

## Workstream 1: Website

### Ownership

`website_builder` owns all website application code, tests, optimized web media, and deployment preparation under `landing-page/`. It must not edit `presentation/` or `video/`.

An existing Vercel-ready **TanStack Start + TanStack Router + React + TypeScript + Vite** app is provided under `landing-page/`. Preserve this stack and its package manager. Build the five real routes using TanStack Router file-based routing. Keep architecture small, server-rendered, and deployment-friendly. Preserve the Nitro Vite plugin required for Vercel. The Vercel project root must remain `landing-page/`.

### Required Routes

1. `/` — Home / Experience the Real Borneo
2. `/stay` — Stay & Packages
3. `/explore` — Explore Long Taa
4. `/heritage` — Our Story & Living Heritage
5. `/plan` — Plan & Book

Use consistent navigation and footer across all five pages. Direct navigation and refresh must work on every route after deployment.

### Home

- Hero with authentic imagery, primary positioning, and visible CTA.
- Scroll-controlled journey from Miri toward Long Taa as the signature interaction.
- Emotional peak: full-bleed reveal of river, longhouse, or community landscape with `Six hours from Miri. A world away from the ordinary.`
- Four pillars: nature, culture, adventure, living heritage.
- Award/conservation proof with citation link.
- Clear routes into packages, exploration, heritage, and booking.

### Stay & Packages

- Explain simple longhouse accommodation honestly.
- Compare accommodation-only and accommodation-plus-meals options.
- Explain both experience groups without inventing package prices.
- Clearly show inclusions, exclusions, guest limits, and conditional availability.
- Add an accessible indicative price estimator.

Estimator rules:

- Default trip may use three days/two nights, but nights remain editable.
- Accommodation total = rate × guests × nights.
- Required 4WD vehicles = `ceil(guests / 3)` when transport selected.
- 4WD total = vehicles × RM1,500.
- Required longboats = `ceil(guests / 3)` when longboat selected.
- Longboat/guide/porter total = longboats × RM600.
- Clearly label result `Indicative estimate — final availability and price confirmed by Long Taa.`
- Do not charge separate Package 1 or Package 2 fees unless the source gains approved prices.

### Explore

- Present Dapui River, Tagang conservation, wildlife, rainforest, salt spring, and rock formations.
- Use authentic gallery assets.
- Do not guarantee fish or wildlife sightings.
- Gallery must work with keyboard, touch, and pointer input.

### Heritage

- Explain living Sebup community, conservation, language, traditional knowledge, forest stewardship, and responsible tourism.
- Explain `living village, not a tourist resort`.
- Add visitor etiquette and community-respect section.
- Include attributed award and conservation history.

### Plan & Book

- Explain starting point, six-hour journey, transport, capacity, conditions, packing guidance, and FAQs.
- Provide visible contact information.
- Build short enquiry form: name, preferred date, guests, nights, stay option, experience interest, transport, longboat, notes.
- Do not store personal data or require backend submission.
- Generate a prefilled WhatsApp click-to-chat URL using official format:
  `https://wa.me/60198563536?text=<URL_ENCODED_MESSAGE>`
- Show generated enquiry summary before opening WhatsApp.

### Website Quality Gates

- Five routes complete, coherent, and linked.
- Responsive at approximately 375, 768, 1024, and 1440 CSS pixels.
- No horizontal overflow.
- Semantic headings, landmarks, labels, and alternative text.
- Full keyboard access and clear focus states.
- Tap targets meet WCAG 2.2 minimum guidance.
- Respect `prefers-reduced-motion`.
- Automatically moving content lasting more than five seconds has pause/stop control when applicable.
- Optimize images; specify dimensions to prevent layout shift.
- Lazy-load below-fold media.
- Avoid large autoplay video on mobile; provide poster and fallback.
- Target lab results near: LCP ≤2.5 s, CLS ≤0.1, and no major blocking tasks. Record actual results rather than claiming targets were met.
- No console errors, missing media, dead controls, or broken internal/external links.
- Add SEO metadata, Open Graph image, favicon, sitemap, robots file, and useful page titles/descriptions.
- Add lightweight event hooks or logs for `view_package`, `calculate_estimate`, `start_whatsapp_booking`, and navigation CTAs. Do not install invasive tracking without consent.
- Add automated tests for calculator rules and WhatsApp message generation.
- Add a smoke test covering all routes and primary CTA.

### Website Deployment

- Run all website package commands from `landing-page/`.
- Ensure `npm run check` and `npm run build` pass.
- Deploy early to Vercel from the `landing-page/` root directory, then redeploy final output.
- Confirm the Vercel framework preset is `tanstack-start`.
- Verify the generated deployment URL serves `/` successfully.
- `longtaaborneo.com` had no resolvable A or CNAME DNS record during research on 2026-09-03. Do not block on custom-domain configuration.
- Use the generated Vercel URL unless custom-domain access is already configured and verified.
- Verify the URL in a logged-out/no-login context.
- Verify direct route loads, not only client-side navigation.
- Record deployment steps in README.

## Workstream 2: Three-Minute Pitch

### Ownership

`pitch_builder` owns all source files and exports under `presentation/`. It must not edit `landing-page/` or `video/`. The coordinator alone may copy the approved PDF into `landing-page/public/submission/presentation.pdf` for public hosting.

Create:

- A polished `.pptx` deck.
- A PDF export for reliable public viewing.
- Speaker notes or a separate script timed to 180 seconds or less.
- A short Q&A preparation note with likely judge questions and evidence-based answers.

### Recommended Deck

Keep to 7–8 slides:

1. **Hook** — Six hours from Miri. A world away from the ordinary.
2. **Beneficiary challenge** — powerful experience, fragmented information, high planning and booking friction.
3. **Business understanding** — visitor questions and the conversion gap.
4. **Solution** — five-page story-led website and user journey.
5. **Working demo** — authentic visuals, package clarity, estimator, and WhatsApp booking.
6. **Business value** — better discovery, clearer expectations, fewer repetitive enquiries, more qualified leads.
7. **Community impact and proof** — living heritage, tagang conservation, and attributed 2026 award.
8. **Close** — Protect nature. Respect culture. Share our heritage. Include live website URL and CTA.

### Pitch Timing

- 0:00–0:15 — hook
- 0:15–0:40 — beneficiary problem
- 0:40–1:00 — solution
- 1:00–2:10 — live website demo
- 2:10–2:40 — business value
- 2:40–3:00 — community impact and close

### Pitch Quality Gates

- One idea per slide.
- Minimal copy; large readable typography.
- Same visual system as website and video.
- Real photos and final website screenshots only.
- No invented metrics or unsupported claims.
- Source citations in notes or restrained source line.
- Render every slide and inspect for clipping, overlap, bad contrast, missing glyphs, and inconsistent spacing.
- Rehearse script length; target approximately 165–175 seconds to leave buffer.
- Include working live-demo fallback screenshots in case connectivity fails.

### Pitch URL

After deck QA, produce a public no-login URL. Preferred low-friction fallback: copy the approved exported PDF to `landing-page/public/submission/presentation.pdf` and verify `/submission/presentation.pdf` on the Vercel deployment. If Google Slides or another approved public deck host is available, upload and verify access. Never return an unverified or permission-gated link.

## Workstream 3: One-Minute Process Video

### Ownership

`video_builder` owns all source files and exports under `video/`. It must not edit `landing-page/` or `presentation/`. The coordinator alone may copy the approved MP4 into `landing-page/public/submission/process-video.mp4` for public hosting.

Create a TikTok-native process film, not a slow corporate slideshow.

### Technical Specification

- Duration: 55–60 seconds; never exceed 60 seconds.
- Canvas: 1080 × 1920, 9:16 vertical.
- Format: H.264 MP4 with AAC audio.
- Resolution: at least 720p; target 1080p.
- Keep final file compact enough for normal upload and hosting; target under 50 MB without visible quality loss.
- Keep key text and faces inside TikTok UI-safe area.
- Use large burned-in captions.
- Include clear voice-over or licensed/royalty-free music with balanced levels.
- Do not use copyrighted music without permission.

### Recommended Storyboard

- **0:00–0:03 — Hook:** `One remote village. No digital journey.`
- **0:03–0:08 — Source challenge:** rapid reveal of original documents, poster, logo, and scattered photos.
- **0:08–0:16 — AI-assisted understanding:** extraction, structuring, business problem, five-page plan.
- **0:16–0:32 — Build montage:** design system, real images, route structure, calculator, and WhatsApp logic.
- **0:32–0:48 — Product reveal:** desktop and mobile site, signature scroll moment, packages, estimator, booking flow.
- **0:48–0:56 — Business and community value:** discovery, clarity, conservation, living heritage.
- **0:56–1:00 — Close:** `From a remote longhouse to a bookable digital destination.` plus Long Taa logo.

Introduce proposition within first three seconds and deliver strong hook within first six seconds.

### Video Quality Gates

- Show authentic workflow and real output; do not fabricate an AI process that did not occur.
- Match website/deck visual system.
- Fast pacing with readable captions.
- Avoid prolonged static frames.
- Inspect representative frames and transitions.
- Check text safe zones, spelling, color contrast, and mobile readability.
- Listen to full audio mix for clipping, silence, and dialogue/music balance.
- Verify exact runtime and codec using a media probe.
- Render final MP4 and retain project source.

### Video URL

Produce the final upload-ready MP4 under `video/exports/`. If submission expects a URL, copy the approved compressed MP4 to `landing-page/public/submission/process-video.mp4` and verify `/submission/process-video.mp4` on the Vercel deployment. If the portal expects direct upload, keep the same verified MP4 ready.

## Coordinator Responsibilities

While subagents work:

1. Create or refine a shared production brief from source material.
2. Resolve copy, factual, cultural, and pricing conflicts.
3. Maintain one cross-deliverable story and visual vocabulary.
4. Keep a claim/source ledger for award and conservation claims.
5. Track unresolved dependencies without blocking independent work.
6. Review each subagent's output; send precise fixes and request another pass when needed.
7. Integrate final website screenshots into pitch and video.
8. Copy the final deck PDF and process MP4 into `landing-page/public/submission/` when URL submission needs them.
9. Deploy final website and verify all three public links.
10. Update `docs/submission-list.md` with verified final URLs or explicit blockers.
11. Add a concise root README covering local run, build, test, and deployment.
12. Commit only intended files and push the current branch after all verification succeeds.

## Final Integrated QA

Perform these checks after all workstreams finish:

- Compare every deliverable against all five judging criteria.
- Confirm same positioning, facts, prices, spelling, and CTA across website, deck, and video.
- Confirm all five website pages are distinct and complete.
- Test calculator boundary cases: 1, 3, 4, and larger guest counts.
- Test WhatsApp URL encoding and displayed enquiry summary.
- Test mobile and desktop website layouts.
- Test reduced-motion behavior.
- Confirm no private, generated, or irrelevant files are staged.
- Confirm `kimi/.env` remains untouched and untracked.
- Verify public website, deck, and video links without relying on an authenticated session.
- Confirm pitch script ≤180 seconds.
- Confirm process video ≤60 seconds, 9:16, 1080×1920, H.264/AAC.
- Confirm community/cultural approval items are clearly flagged if approval has not occurred.

## Definition of Done

Do not mark the goal complete until:

- Five-page website is implemented and locally verified.
- Website has a public working URL, or deployment is genuinely blocked after exhausting configured options.
- Presentation deck, PDF, speaker script, and Q&A notes exist and pass visual QA.
- Public pitch/deck URL is verified, or exact hosting blocker is documented.
- One-minute process video project and final MP4 exist and pass runtime, visual, and audio QA.
- Public video URL or upload-ready file is verified according to available submission method.
- `docs/submission-list.md` contains final links or explicit blockers.
- Intended changes are committed and pushed, without `kimi/` or secrets.
- Final response reports outputs, verified URLs, commit, remaining approval items, and only real blockers.

If external authentication, domain DNS, community approval, or submission-portal access blocks one last step, finish every local and deployable component first. Then report the exact blocker and the smallest user action needed. Do not stop early because one external step is unavailable.
