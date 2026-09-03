---
name: Long Taa Tree Journey Homepage
description: An editorial descent from rainforest canopy to a community-led longhouse welcome.
colors:
  rainforest-night: "#06150e"
  longhouse-panel: "#071b12"
  editorial-cream: "#f3efdf"
  forest-mist: "#c6cec3"
  living-leaf: "#b7df4b"
  canopy-green: "#2f7a45"
  tactile-timber: "#4c301d"
  doorway-warmth: "#ffad55"
typography:
  display:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(3.6rem, 6.7vw, 5.9rem)"
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(2.65rem, 4.6vw, 4.6rem)"
    fontWeight: 500
    lineHeight: 0.93
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "1.65rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, Avenir Next, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Manrope, Avenir Next, Segoe UI, sans-serif"
    fontSize: "0.66rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  square: "0"
  circular: "50%"
spacing:
  compact: "0.65rem"
  base: "1rem"
  comfortable: "1.45rem"
  story-panel: "clamp(1.15rem, 2.4vw, 1.75rem)"
components:
  action-primary:
    backgroundColor: "{colors.editorial-cream}"
    textColor: "{colors.rainforest-night}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0.78rem 1rem"
  action-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.editorial-cream}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0.78rem 1rem"
  story-panel:
    backgroundColor: "rgb(5 23 15 / 90%)"
    textColor: "{colors.editorial-cream}"
    rounded: "{rounded.square}"
    padding: "{spacing.story-panel}"
  branch-card:
    backgroundColor: "{colors.longhouse-panel}"
    textColor: "{colors.editorial-cream}"
    rounded: "{rounded.square}"
    padding: "{spacing.base}"
  contact-panel:
    backgroundColor: "{colors.editorial-cream}"
    textColor: "{colors.rainforest-night}"
    rounded: "{rounded.square}"
    padding: "clamp(1.4rem, 3vw, 2.3rem)"
---

# Design System: Long Taa Tree Journey Homepage

## Overview

**Creative North Star: "The Living Descent"**

This document is the durable design contract for the shipped landing-page homepage only. The tree is the navigation system: the visitor begins above the canopy, follows branch stories through village, stay, exploration, heritage, and planning, reaches the roots, and crosses a warmly lit longhouse threshold into a booking conversation. The experience is immersive but grounded—rainforest black-green, living leaf light, rough timber, documentary Long Taa photography, and restrained editorial overlays.

The visual world supports a real, community-led Sebup village experience rather than a luxury-resort fantasy. Typography and controls supply clarity over the atmospheric 3D scene; the scene supplies place, movement, and memory. The shipped finish-review verdict is `ship`, so these rules describe the incumbent homepage rather than a speculative direction.

**Key Characteristics:**

- One reversible, scroll-bound descent from canopy to community.
- Monumental tree and longhouse world behind concise, square-edged editorial panels.
- Bodoni Moda for story-scale expression; Manrope for actions, state, and practical copy.
- Living-leaf green used as a sparse signal for progress, location, links, and focus.
- Authentic documentary photographs embedded at story moments, never treated as generic tourism decoration.
- A persistent path to a human WhatsApp conversation, not an implied instant booking.

**The Tree-Is-Navigation Rule.** New homepage material must attach to the existing canopy-to-branches-to-roots-to-home journey; do not turn this surface into a conventional stack of tourism sections.

## Colors

The palette moves from cool rainforest darkness to warm human welcome, with cream editorial clarity and a single vivid leaf signal.

### Primary

- **Living Leaf:** The rare high-visibility accent for journey progress, stage connectors, metadata, contextual text links, selection, and keyboard focus.

### Secondary

- **Canopy Green:** The living mid-green of the low-poly foliage and imported tree materials; it builds the environmental world rather than behaving like a UI accent.
- **Doorway Warmth:** The emissive amber reserved for the longhouse threshold and its increasing sense of welcome near journey completion.

### Tertiary

- **Tactile Timber:** The rough bark and structural-wood anchor that keeps the world physical and non-luxurious.

### Neutral

- **Rainforest Night:** The fixed world background, fog base, scrollbar track, and dark field behind the full journey.
- **Longhouse Panel:** The dense inner surface for paired branch cards and open mobile navigation.
- **Editorial Cream:** Primary text, filled actions, loader marks, and the light closing contact panel.
- **Forest Mist:** Supporting prose on dark panels; it preserves hierarchy without reducing readability to decorative low contrast.

**The Leaf-Signal Rule.** Living Leaf is a locator and state color, not a broad fill. Its scarcity is what makes the journey legible.

**The Warmth-Has-a-Destination Rule.** Amber light belongs at the longhouse threshold; do not distribute it across earlier stages as a generic accent.

## Typography

**Display Font:** Bodoni Moda (with Georgia fallback)  
**Body Font:** Manrope (with Avenir Next and Segoe UI fallbacks)

**Character:** Bodoni Moda gives the journey its storybook scale and editorial gravity. Manrope keeps navigation, practical detail, CTAs, and stage state contemporary and direct. Both fonts are locally served as variable-weight WOFF2 assets.

### Hierarchy

- **Display:** Medium-weight, tightly tracked, compact-line-height type for the hero promise and major closing statement. Mobile hero display scales independently to `clamp(3.25rem, 16vw, 4.7rem)` and the closing statement to `clamp(3.4rem, 15vw, 4.8rem)`.
- **Headline:** Medium-weight story titles, usually held near ten characters per line for a vertical, tree-adjacent silhouette. On mobile, use `clamp(2.3rem, 11vw, 3.5rem)`.
- **Title:** Medium-weight branch-card and contact titles; keep line height compact and do not substitute all-caps sans-serif styling.
- **Body:** Calm practical copy with a maximum measure of about 67 characters on story panels. Mobile body copy is `0.83rem` with `1.55` line height to keep panels inside the viewport without becoming cramped.
- **Label:** Compact uppercase metadata for place, branch names, scroll cues, progress, and controls. Letter spacing is deliberate; labels follow content and are not default pre-heading kickers.

**The Two-Voice Rule.** Bodoni tells the story; Manrope explains, locates, and enables action.

**The Metadata-After-Meaning Rule.** Uppercase labels may orient or qualify a story, but they must not replace the story heading or lead the page as ornamental jargon.

## Layout

The homepage occupies a `900svh` scroll range while its world, story layer, stage state, and progress rail remain fixed to the viewport. Eight exclusive stages are activated at scroll-progress thresholds; only the active stage is visible and interactive. Desktop story panels alternate left and right around the trunk, while a branch connector points from each story surface back into the tree. The gallery stage becomes a wide two-column editorial spread; the final room fills the viewport with booking copy and a contrasting contact panel.

Desktop story panels start from a fluid left gutter (`clamp(1rem, 6vw, 6rem)`) and are capped at `30rem`. The contact room uses an asymmetric two-column grid and a large responsive gap. The route chrome remains fixed above the world; the current-stage label is centered at the top, a one-pixel progress rail runs down the right side, and the separate “Enter the village” control stays available as a direct route to the final stage.

At widths below `700px`, story surfaces become translucent bottom sheets inset `1rem` from the left, `1.35rem` from the right, and `1rem` from the bottom. They may scroll internally and are capped to the available viewport height. The stage label compresses to the active name, the vertical rail moves to `0.65rem` from the edge, connector lines shorten, the gallery becomes two columns, the connected-story photograph becomes an `8rem` band, and the closing room becomes a single scrolling column. Header, menu, active-stage state, progress rail, and booking content must remain free of horizontal clipping.

The 3D world has a related performance breakpoint below `780px`: fewer leaves and fireflies, disabled shadow mapping, a lower pixel-ratio ceiling, higher exposure, and small camera offsets preserve legibility and frame rate. The background photograph remains a fixed fallback whenever WebGL is unavailable or still loading.

**The One-Stage Rule.** Exactly one story stage is perceivable and operable at a time; the rest remain present for continuity but are removed from interaction.

**The Tree-Must-Read Rule.** On mobile, content may become denser and more translucent, but the trunk and journey direction must remain visually legible behind it.

## Elevation & Depth

Depth comes primarily from the real-time scene: a perspective camera, volumetric fog, environmental and directional light, rough 3D materials, canopy layers, roots, and a point light that intensifies near the longhouse. UI surfaces stay glassless and restrained. Story panels use a deep translucent field and a broad ambient shadow (`0 26px 72px rgb(0 0 0 / 34%)`); the cream contact panel receives the strongest surface shadow (`0 30px 76px rgb(0 0 0 / 38%)`) because it marks arrival. Thin borders and one-pixel dividers separate editorial structures without simulating raised cards.

### Shadow Vocabulary

- **Story Ambient:** A broad, low-contrast black shadow for readable separation over the 3D scene.
- **Arrival Lift:** A slightly stronger broad shadow on the final cream contact panel, used only at the longhouse destination.

**The World-Provides-Depth Rule.** Do not add decorative card stacks, glass blur, or routine drop shadows; reserve surface lift for legibility over the world and emphasis at arrival.

## Shapes

The form language is square-edged, editorial, and architectural. Primary and secondary actions, the jump control, story panels, branch cards, gallery cells, and the closing contact panel use no corner rounding. One-pixel rules, image crops, and the vertical progress line reinforce the constructed longhouse character. Circular geometry is limited to organic or status details such as branch markers and fireflies. The loading state uses the supplied Long Taa Dapui logo in its native rectangular silhouette rather than a generic monogram.

**The Square-Control Rule.** Do not import the pill-shaped controls used elsewhere on the site into the tree-journey homepage.

## Components

### Actions

- **Shape:** Square corners, uppercase Manrope labels, and at least `48px` minimum height for primary and secondary story actions. The top-right journey shortcut is at least `44px` high.
- **Primary:** Editorial Cream fill and Rainforest Night text, with a one-pixel cream border.
- **Secondary:** Transparent fill, Editorial Cream text, and a one-pixel cream border.
- **Hover:** Both variants converge on Living Leaf fill and border with Rainforest Night text. The journey shortcut inverts to cream rather than borrowing the leaf treatment.
- **Focus:** A three-pixel Living Leaf outline with a four-pixel offset; never suppress it.

### Story Panels

Story surfaces are concise editorial cards over the world. They use a translucent rainforest field, a single cream top rule, no radius, responsive padding, and an ambient shadow. Branch stages carry a one-pixel connector ending in a leaf marker. On mobile they become scrollable bottom sheets while retaining tree visibility.

### Branch Cards

Paired Stay/Explore and Heritage/Plan cards form compact two-column groups separated by one-pixel rules. Each uses a Longhouse Panel field, Bodoni title, smaller practical copy, and a Living Leaf underlined route link. Preserve this pairing; it expresses complementary ways into the existing site.

### Documentary Story Cards

The four-card “ways to meet Long Taa” gallery uses authentic supplied photography, edge-to-edge crops, restrained saturation and brightness, a dark lower gradient, a small leaf category, and a compact Bodoni title. On mobile it becomes a two-by-two grid; do not collapse the set into an unrelated carousel.

### Journey Navigation

The navigation system combines a visible active-stage label, a reversible vertical progress rail, the contextual branch connector, the scroll cue, and the persistent direct-to-village control. These are mutually reinforcing orientation aids. They are not decoration and must remain synchronized with the active stage.

### Closing Contact Panel

The final cream panel is the one decisive material inversion. It carries the supplied Long Taa Dapui logo, the official name and brand pillars, respectful-visit note, official email, official WhatsApp number, and copyright. It sits beside the closing invitation and preserves the distinction between checking dates and confirming a booking.

### Signature 3D World

The scene combines procedural limbs, roots, foliage, fireflies, fog, light, a constructed longhouse, and imported low-poly models. `tree-oak.glb` comes from Kenney Nature Kit; `structure.glb` and `Textures/colormap.png` come from Kenney Survival Kit. Kenney distributes both under CC0 1.0, permitting personal, educational, and commercial use without required attribution. Keep `landing-page/public/models/kenney/ATTRIBUTION.md` with the assets as the durable provenance record even though attribution is optional.

The camera follows one Catmull–Rom route from canopy to longhouse interior and the target follows a corresponding path. Normal motion eases toward scroll progress with a `0.065` interpolation factor. Story transitions use `0.55s` with `cubic-bezier(.22, 1, .36, 1)`; the canvas reveals over `0.8s` with the same easing, and the loader clears over `0.55s`. Small marker emphasis, canopy rotation, fog compression, and doorway-light growth belong to the spatial narrative; do not add ornamental UI motion.

### Accessibility States

The canvas, vignette, fallback image, stage rail, progress rail, and loading logo are decorative and hidden from assistive technology. The adjacent “Growing the journey” message is the polite live status. Every story section has a labelled heading; inactive sections use both `aria-hidden` and `inert` so keyboard focus follows the visible stage. Documentary images keep meaningful alternative text, while decorative fallback imagery keeps an empty alternative. Under `prefers-reduced-motion: reduce`, smooth document scrolling and CSS fades/transforms are disabled, and the camera follows scroll progress directly rather than interpolating between positions.

## Do's and Don'ts

### Do:

- **Do** preserve the canopy → branches → roots → home sequence and all eight stage labels when adjusting the homepage journey.
- **Do** keep the original Long Taa promise, supplied logo, authentic photography, existing routes, official email, and WhatsApp number intact.
- **Do** describe Long Taa as a real, community-led Sebup village and keep community ownership ahead of tourism spectacle.
- **Do** qualify availability and activities through a human conversation with the community; keep weather, road, river, water level, and safety conditions visible wherever relevant.
- **Do** maintain keyboard-safe inactive stages, meaningful image alternatives, reliable text contrast, and minimum `44px` touch targets.
- **Do** retain the fixed fallback photograph and allow the content journey to remain usable if WebGL fails.
- **Do** keep the Kenney CC0 provenance file beside the 3D models when assets are moved or repackaged.

### Don't:

- **Don't** recast the homepage as a conventional stacked landing page or replace the tree with a decorative hero prop.
- **Don't** invent rates, package totals, availability, guarantees, testimonials, visitor metrics, environmental-impact metrics, access claims, cultural protocols, map pins, or booking policies.
- **Don't** imply that a WhatsApp enquiry is a confirmed booking.
- **Don't** exoticise the Sebup community or introduce luxury-resort language, gloss, glassmorphism, pill controls, or generic adventure imagery.
- **Don't** add ornamental interface animation, autoplay tours, or irreversible camera movement; scrolling must work in both directions and reduced-motion behavior must remain intact.
- **Don't** let mobile overlays, navigation, or the booking room obscure the entire tree, clip horizontally, or trap keyboard focus in an inactive stage.
