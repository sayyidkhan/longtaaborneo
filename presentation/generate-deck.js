const pptxgen = require("/home/.z/workspaces/con_PvHuETawG6FTHD7R/pitch-toolchain/node_modules/pptxgenjs");
const path = require("path");

const root = "/home/workspace/Github/longtaaborneo";
const asset = (...parts) => path.join(root, "docs", "assets", ...parts);
const out = path.join(root, "presentation", "exports", "long-taa-borneo-pitch.pptx");

const C = {
  ink: "15241E",
  forest: "183E34",
  river: "2E6A62",
  cream: "F5F0E6",
  paper: "E9E1D2",
  amber: "C8893F",
  white: "FFFFFF",
  muted: "A7B4A9",
  line: "D2C9B8",
};

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Long Taa Borneo Eco Stay";
pptx.company = "Long Taa Borneo Eco Stay";
pptx.subject = "AI Business Design Hackathon 2026 pitch";
pptx.title = "Long Taa Borneo Eco Stay: Experience the Real Borneo";
pptx.lang = "en-MY";
pptx.theme = {
  headFontFace: "Georgia",
  bodyFontFace: "Aptos",
  lang: "en-MY",
};
pptx.defineLayout({ name: "CUSTOM_WIDE", width: 13.333, height: 7.5 });
pptx.layout = "CUSTOM_WIDE";
pptx.defineSlideMaster({
  title: "BASE",
  background: { color: C.cream },
  objects: [
    { rect: { x: 0.46, y: 7.11, w: 12.4, h: 0.012, fill: { color: C.line }, line: { color: C.line } } },
    { text: { text: "LONG TAA BORNEO ECO STAY", options: { x: 0.46, y: 7.18, w: 3.8, h: 0.16, fontFace: "Aptos", fontSize: 5.8, charSpace: 1.3, color: C.forest, margin: 0, breakLine: false } } },
    { text: { text: "AI BUSINESS DESIGN HACKATHON 2026", options: { x: 9.1, y: 7.18, w: 3.75, h: 0.16, align: "right", fontFace: "Aptos", fontSize: 5.8, charSpace: 0.8, color: C.forest, margin: 0, breakLine: false } } },
  ],
  slideNumber: { x: 6.47, y: 7.16, color: C.forest, fontFace: "Aptos", fontSize: 5.8 },
});

function addText(slide, text, x, y, w, h, options = {}) {
  slide.addText(text, {
    x, y, w, h, margin: 0,
    breakLine: false,
    valign: "mid",
    fontFace: options.fontFace || "Aptos",
    fontSize: options.fontSize || 14,
    color: options.color || C.ink,
    bold: options.bold || false,
    italic: options.italic || false,
    align: options.align || "left",
    charSpace: options.charSpace || 0,
    fit: "shrink",
    ...options,
  });
}

function label(slide, text, x = 0.52, y = 0.42, color = C.amber) {
  addText(slide, text.toUpperCase(), x, y, 4.9, 0.2, { fontSize: 7.2, bold: true, color, charSpace: 1.8 });
}

function title(slide, text, x = 0.52, y = 0.83, w = 6.6, h = 1.3, color = C.ink) {
  addText(slide, text, x, y, w, h, { fontFace: "Georgia", fontSize: 29, bold: true, color, breakLine: false });
}

function body(slide, text, x, y, w, h, options = {}) {
  addText(slide, text, x, y, w, h, { fontSize: 12.6, color: C.ink, breakLine: false, valign: "top", paraSpaceAfterPt: 8, breakLine: false, ...options });
}

function image(slide, file, x, y, w, h, transparency = 0) {
  slide.addImage({ path: file, x, y, w, h, transparency });
}

function pageChip(slide, num, titleText) {
  slide.addShape(pptx.ShapeType.roundRect, { x: 0.53, y: 5.77, w: 0.55, h: 0.34, rectRadius: 0.05, fill: { color: C.forest }, line: { color: C.forest } });
  addText(slide, num, 0.53, 5.83, 0.55, 0.12, { fontSize: 7, bold: true, color: C.white, align: "center" });
  addText(slide, titleText, 1.19, 5.78, 2.4, 0.22, { fontSize: 9.5, bold: true, color: C.forest });
}

const logo = asset("logo", "image-01.png");
const photos = {
  longhouse: asset("long-taa-borneo-eco-stay", "image-02.png"),
  river: asset("long-taa-borneo-eco-stay", "image-10.png"),
  forest: asset("long-taa-borneo-eco-stay", "image-14.png"),
  boat: asset("long-taa-borneo-eco-stay", "image-20.jpg"),
  journey: asset("long-taa-borneo-eco-stay", "image-25.jpg"),
  community: asset("long-taa-borneo-eco-stay", "image-21.png"),
  conservation: asset("long-taa-borneo-eco-stay", "image-23.png"),
  food: asset("long-taa-borneo-eco-stay", "image-07.jpg"),
};
const screens = {
  home: "/home/.z/workspaces/con_PvHuETawG6FTHD7R/_tmp/screens/home-390.png",
  stay: "/home/.z/workspaces/con_PvHuETawG6FTHD7R/_tmp/screens/stay-390.png",
  plan: "/home/.z/workspaces/con_PvHuETawG6FTHD7R/_tmp/screens/plan-390.png",
};

{
  const s = pptx.addSlide("BASE");
  s.background = { color: C.forest };
  image(s, photos.river, 0, 0, 13.333, 7.5);
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: "0C211B", transparency: 34 }, line: { color: "0C211B", transparency: 100 } });
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 4.85, w: 13.333, h: 2.65, fill: { color: "0C211B", transparency: 8 }, line: { color: "0C211B", transparency: 100 } });
  s.addImage({ path: logo, x: 0.55, y: 0.46, w: 0.68, h: 1.02, transparency: 4 });
  addText(s, "LONG TAA BORNEO ECO STAY", 1.44, 0.72, 4.8, 0.18, { fontSize: 7.2, bold: true, color: C.white, charSpace: 1.6 });
  addText(s, "Six hours from Miri.\nA world away from the ordinary.", 0.6, 2.2, 9.5, 1.6, { fontFace: "Georgia", fontSize: 33, bold: true, color: C.white, breakLine: false, valign: "mid" });
  addText(s, "A mobile-first digital journey for a living Sebup village, not a luxury resort.", 0.62, 4.34, 7.6, 0.44, { fontSize: 13.5, color: C.paper, bold: false });
  addText(s, "3-MINUTE PITCH  |  AI BUSINESS DESIGN HACKATHON 2026", 0.62, 6.3, 5.5, 0.18, { fontSize: 7.2, bold: true, color: C.amber, charSpace: 1.4 });
  addText(s, "Escape the city. Experience the real Borneo.", 8.5, 6.22, 4.22, 0.3, { fontSize: 9, italic: true, color: C.white, align: "right" });
}

{
  const s = pptx.addSlide("BASE");
  label(s, "The beneficiary challenge");
  title(s, "A powerful experience should not require detective work.", 0.52, 0.82, 7.4, 1.4);
  body(s, "Long Taa has a distinctive community-led offer. But for a traveller planning from Miri, essential answers were fragmented across brochures and social channels.", 0.55, 2.35, 6.25, 0.9, { fontSize: 13.2 });
  const items = [
    ["What is Long Taa?", "A living Sebup village, not a resort."],
    ["What does the journey involve?", "About six hours by 4WD from Miri."],
    ["What can I expect?", "Simple stay, clear costs, conditions and capacity."],
    ["How do I book?", "A qualified WhatsApp enquiry, not a false instant promise."],
  ];
  items.forEach((item, i) => {
    const y = 3.58 + i * 0.67;
    s.addShape(pptx.ShapeType.line, { x: 0.55, y: y + 0.12, w: 0.2, h: 0, line: { color: C.amber, width: 2 } });
    addText(s, item[0], 0.93, y, 2.47, 0.2, { fontSize: 10.4, bold: true, color: C.forest });
    addText(s, item[1], 3.45, y, 3.55, 0.28, { fontSize: 10.2, color: C.ink });
  });
  image(s, photos.journey, 8.06, 0.4, 4.73, 5.95);
  s.addShape(pptx.ShapeType.rect, { x: 8.06, y: 5.43, w: 4.73, h: 0.92, fill: { color: C.forest, transparency: 7 }, line: { color: C.forest, transparency: 100 } });
  addText(s, "Remoteness makes honest, practical planning content part of the experience.", 8.37, 5.65, 4.08, 0.34, { fontFace: "Georgia", fontSize: 13, bold: true, color: C.white, align: "center" });
}

{
  const s = pptx.addSlide("BASE");
  label(s, "The solution");
  title(s, "Turn scattered information into one clear visitor journey.");
  body(s, "We built a mobile-first five-page website that moves visitors from discovery to a more informed booking conversation.", 0.55, 2.2, 7.1, 0.56, { fontSize: 14.1 });
  const steps = [
    ["01", "DISCOVER", "Home", "Authentic story + the journey inward"],
    ["02", "UNDERSTAND", "Stay & Packages", "Options, inclusions, costs and capacity"],
    ["03", "EXPLORE", "Explore Long Taa", "River, rainforest and natural wonders"],
    ["04", "TRUST", "Living Heritage", "Respectful community and conservation context"],
    ["05", "ACT", "Plan & Book", "Practical guidance + WhatsApp enquiry"],
  ];
  steps.forEach((step, i) => {
    const x = 0.56 + i * 2.48;
    s.addShape(pptx.ShapeType.roundRect, { x, y: 3.27, w: 2.18, h: 2.15, rectRadius: 0.06, fill: { color: i === 4 ? C.forest : C.paper }, line: { color: i === 4 ? C.forest : C.line, width: 0.5 } });
    addText(s, step[0], x + 0.17, 3.52, 0.54, 0.16, { fontSize: 7.5, bold: true, color: i === 4 ? C.amber : C.amber, charSpace: 1.1 });
    addText(s, step[1], x + 0.17, 3.89, 1.82, 0.18, { fontSize: 7.3, bold: true, color: i === 4 ? C.white : C.forest, charSpace: 1.0 });
    addText(s, step[2], x + 0.17, 4.28, 1.82, 0.35, { fontFace: "Georgia", fontSize: 12.7, bold: true, color: i === 4 ? C.white : C.ink });
    addText(s, step[3], x + 0.17, 4.84, 1.82, 0.35, { fontSize: 8.3, color: i === 4 ? C.paper : C.ink });
  });
  addText(s, "Designed for mobile first, then enhanced for larger screens.", 0.56, 6.04, 5.4, 0.26, { fontSize: 10.2, color: C.forest, bold: true });
}

{
  const s = pptx.addSlide("BASE");
  label(s, "Working demo");
  title(s, "The website makes the next decision obvious.", 0.52, 0.82, 7.3, 0.9);
  body(s, "Designed at phone scale, the live experience replaces vague inspiration with the facts that help a visitor decide whether Long Taa is right for them.", 0.55, 1.86, 7.5, 0.58, { fontSize: 13.1 });
  const shots = [
    [screens.home, "DISCOVER", "Authentic story + a visible WhatsApp CTA"],
    [screens.stay, "UNDERSTAND", "Simple longhouse stay and confirmed rates"],
    [screens.plan, "ACT", "Six-hour journey context + qualified enquiry"],
  ];
  shots.forEach((shot, i) => {
    const x = 0.9 + i * 4.13;
    s.addShape(pptx.ShapeType.roundRect, { x: x - 0.08, y: 2.72, w: 3.34, h: 3.65, rectRadius: 0.08, fill: { color: C.ink }, line: { color: C.ink, width: 0.7 } });
    image(s, shot[0], x, 2.82, 3.14, 3.16);
    addText(s, shot[1], x + 0.12, 6.07, 2.9, 0.12, { fontSize: 6.7, bold: true, color: C.amber, charSpace: 1.1, align: "center" });
    addText(s, shot[2], x + 0.15, 6.26, 2.84, 0.2, { fontSize: 7.1, color: C.white, align: "center" });
  });
  addText(s, "Mobile screenshots from the final local build. Demo fallback: the deck retains the same conversion path if connectivity is unreliable.", 0.56, 6.67, 10.2, 0.15, { fontSize: 6.8, italic: true, color: C.forest });
}

{
  const s = pptx.addSlide("BASE");
  label(s, "What changes for the visitor");
  title(s, "Clarity is the conversion strategy.", 0.52, 0.84, 5.7, 0.76);
  const points = [
    ["DISCOVERY", "A shareable, credible digital home for a distinctive destination."],
    ["EXPECTATIONS", "Honest accommodation, journey, capacity and condition information."],
    ["ENQUIRIES", "A structured WhatsApp prompt that starts with useful details."],
    ["TRUST", "Community-led conservation and living heritage framed with care."],
  ];
  points.forEach((p, i) => {
    const y = 2.14 + i * 0.93;
    s.addShape(pptx.ShapeType.line, { x: 0.56, y: y + 0.14, w: 0.42, h: 0, line: { color: C.amber, width: 2.5 } });
    addText(s, p[0], 1.2, y, 1.6, 0.18, { fontSize: 8.2, bold: true, color: C.forest, charSpace: 1.1 });
    addText(s, p[1], 2.98, y - 0.02, 4.25, 0.35, { fontSize: 11.2, color: C.ink });
  });
  image(s, photos.community, 8.05, 0.42, 4.75, 5.95);
  s.addShape(pptx.ShapeType.rect, { x: 8.05, y: 4.92, w: 4.75, h: 1.45, fill: { color: C.forest, transparency: 4 }, line: { color: C.forest, transparency: 100 } });
  addText(s, "No invented availability.\nNo invented package totals.\nEvery enquiry remains an availability check.", 8.46, 5.21, 3.92, 0.7, { fontFace: "Georgia", fontSize: 13.3, bold: true, color: C.white, align: "center" });
}

{
  const s = pptx.addSlide("BASE");
  label(s, "Community impact and proof");
  title(s, "The story starts with community ownership.", 0.52, 0.82, 7.2, 0.85);
  body(s, "Long Taa is a living Sebup village. The digital experience is designed to set respectful expectations before people arrive, while making community-led conservation visible.", 0.55, 1.92, 6.4, 0.8, { fontSize: 13.2 });
  image(s, photos.conservation, 8.05, 0.42, 4.75, 5.95);
  const cards = [
    ["LIVING HERITAGE", "Culture is presented as living identity, not tourist decoration."],
    ["CONSERVATION", "Tagang fish conservation and community stewardship are given context."],
    ["RESPONSIBLE VISITS", "Community rules, local guidance and conditions stay visible."],
  ];
  cards.forEach((c, i) => {
    const x = 0.55 + i * 2.43;
    s.addShape(pptx.ShapeType.roundRect, { x, y: 3.58, w: 2.15, h: 1.58, rectRadius: 0.05, fill: { color: C.paper }, line: { color: C.line, width: 0.5 } });
    addText(s, c[0], x + 0.16, 3.84, 1.83, 0.18, { fontSize: 7.2, bold: true, color: C.forest, charSpace: 0.9, align: "center" });
    addText(s, c[1], x + 0.17, 4.32, 1.81, 0.48, { fontSize: 8.5, color: C.ink, align: "center" });
  });
  addText(s, "Attribution: The Borneo Post (1 Sep 2026) reported the Sebup community received the Gamuda Inspiration Award for Environment and Wildlife. The APPGM-SDG Annual Report 2024 separately records Tagang implementation support in Dapui, Tinjar Baram.", 0.56, 5.73, 7.05, 0.46, { fontSize: 6.1, color: C.forest, italic: true });
}

{
  const s = pptx.addSlide("BASE");
  label(s, "Delivery and close");
  title(s, "Protect nature. Respect culture. Share our heritage.", 0.52, 0.82, 7.4, 1.18);
  body(s, "Long Taa now has a clearer mobile-first path from curiosity to a qualified booking enquiry: authentic imagery, practical planning and a direct WhatsApp conversation with Clement Langet.", 0.55, 2.22, 6.36, 0.82, { fontSize: 13.5 });
  s.addShape(pptx.ShapeType.roundRect, { x: 0.55, y: 3.55, w: 5.85, h: 0.74, rectRadius: 0.07, fill: { color: C.forest }, line: { color: C.forest } });
  addText(s, "LIVE SITE  longtaaborneo.vercel.app", 0.84, 3.79, 5.26, 0.22, { fontSize: 11.1, bold: true, color: C.white, align: "center" });
  addText(s, "BOOKING ENQUIRIES  +60 19-856 3536  |  Clement Langet", 0.6, 4.72, 6.05, 0.2, { fontSize: 9.3, bold: true, color: C.forest });
  addText(s, "Availability and final quotations are confirmed through WhatsApp.", 0.6, 5.12, 5.7, 0.2, { fontSize: 9.3, color: C.ink });
  image(s, photos.river, 8.05, 0.42, 4.75, 5.95);
  s.addShape(pptx.ShapeType.rect, { x: 8.05, y: 4.74, w: 4.75, h: 1.63, fill: { color: C.forest, transparency: 8 }, line: { color: C.forest, transparency: 100 } });
  addText(s, "Come as a visitor.\nLeave with a story.", 8.55, 5.16, 3.76, 0.64, { fontFace: "Georgia", fontSize: 18, bold: true, color: C.white, align: "center" });
}

pptx.writeFile({ fileName: out });
