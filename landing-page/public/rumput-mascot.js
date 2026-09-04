/* global document, HTMLElement, window, requestAnimationFrame, CustomEvent, clearTimeout, setTimeout, customElements */
const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
      --rumput-size: 240px;
      display: inline-block;
      width: var(--rumput-size);
      aspect-ratio: 13 / 18;
      contain: content;
    }

    .rumput-shell {
      width: 100%;
      height: 100%;
      position: relative;
      user-select: none;
      -webkit-user-select: none;
    }

    svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .body,
    .shadow {
      transform: none;
    }

    .character {
      transform-box: view-box;
      transform-origin: 128px 320px;
    }

    :host([state="idle"]) .character {
      animation: rumput-idle-fidget 4s ease-in-out infinite;
    }

    :host([state="greeting"]) .character {
      animation: none;
    }

    :host([state="greeting"]) .left-arm {
      animation: rumput-greeting-loop 3.4s cubic-bezier(.36, .02, .24, 1) infinite;
    }

    .arm {
      transform-box: view-box;
      will-change: transform;
    }

    .left-arm {
      transform-origin: 83px 222px;
    }

    .right-arm {
      transform-origin: 168px 224px;
    }

    .eye-open {
      transform-box: fill-box;
      transform-origin: center;
      transition: transform 70ms ease;
      animation: rumput-auto-blink 3.2s ease-in-out infinite;
    }

    .pupil {
      transform: translate(var(--eye-x, 0px), var(--eye-y, 0px));
      transition: transform 100ms ease-out;
      will-change: transform;
    }

    .rumput-shell.is-blinking .eye-open,
    :host([state="sleeping"]) .eye-open {
      animation: none;
      transform: scaleY(0.08);
    }

    .thought-bubble {
      pointer-events: none;
    }

    .thought-piece {
      opacity: 0;
      transform-box: fill-box;
      transform-origin: center;
      transform: scale(0.35);
    }

    :host([state="thinking"]) .thought-step-1 {
      animation: rumput-thought-loop-1 3.2s ease-in-out infinite;
    }

    :host([state="thinking"]) .thought-step-2 {
      animation: rumput-thought-loop-2 3.2s ease-in-out infinite;
    }

    :host([state="thinking"]) .thought-main {
      animation: rumput-thought-loop-main 3.2s ease-in-out infinite;
    }

    :host([state="thinking"]) .pupil {
      transform: translate(2px, -4px);
    }

    :host([state="error"]) .pupil {
      transform: translate(0, 4px);
    }

    .mouth-error,
    .mouth-sleeping {
      display: none;
    }

    :host([state="error"]) .mouth-default {
      display: none;
    }

    :host([state="error"]) .mouth-error {
      display: block;
    }

    :host([state="sleeping"]) .mouth-default {
      display: none;
    }

    :host([state="sleeping"]) .mouth-sleeping {
      display: block;
    }

    .rumput-shell.is-greeting .left-arm {
      animation: rumput-wave 1.65s cubic-bezier(.36, .02, .24, 1) both;
    }

    .rumput-shell.is-greeting .character {
      animation-play-state: paused;
    }

    :host([state="thinking"]) .left-arm {
      transform: rotate(-52deg);
    }

    :host([state="responding"]) .left-arm {
      animation: rumput-explain-left 1.2s ease-in-out infinite;
    }

    :host([state="responding"]) .right-arm {
      animation: rumput-explain-right 1.2s ease-in-out infinite;
    }

    .audio-waves,
    .audio-wave {
      opacity: 0;
      pointer-events: none;
    }

    .audio-wave {
      transform-box: fill-box;
      transform-origin: center left;
    }

    :host([state="responding"]) .audio-waves { opacity: 1; }
    :host([state="responding"]) .audio-wave-1 { animation: rumput-audio-wave 1.2s ease-out infinite 0s; }
    :host([state="responding"]) .audio-wave-2 { animation: rumput-audio-wave 1.2s ease-out infinite .18s; }
    :host([state="responding"]) .audio-wave-3 { animation: rumput-audio-wave 1.2s ease-out infinite .36s; }

    .success-face {
      display: none;
      transform-box: fill-box;
      transform-origin: center;
    }

    :host([state="success"]) .face {
      display: none;
    }

    :host([state="success"]) .success-face {
      display: block;
      animation: rumput-success-expression 650ms cubic-bezier(.2, .8, .2, 1) both;
    }

    :host([state="success"]) .left-arm {
      animation: rumput-success-hand-up 650ms cubic-bezier(.2, .8, .2, 1) both;
    }

    .error-mark,
    .sleep-symbols,
    .sleep-z {
      opacity: 0;
      pointer-events: none;
    }

    .error-mark,
    .sleep-z,
    .mouth-error,
    .mouth-sleeping {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host([state="error"]) .error-mark { animation: rumput-error-pop 1.35s ease-in-out infinite; }
    :host([state="error"]) .left-arm { animation: rumput-error-left 1.35s ease-in-out infinite; }
    :host([state="error"]) .right-arm { animation: rumput-error-right 1.35s ease-in-out infinite; }
    :host([state="error"]) .mouth-error { animation: rumput-error-mouth 1.35s ease-in-out infinite; }

    :host([state="sleeping"]) .character { animation: rumput-sleep-breathe 3s ease-in-out infinite; }
    :host([state="sleeping"]) .left-arm { transform: rotate(13deg); }
    :host([state="sleeping"]) .right-arm { transform: rotate(-13deg); }
    :host([state="sleeping"]) .sleep-symbols { opacity: 1; }
    :host([state="sleeping"]) .sleep-z-1 { animation: rumput-sleep-z 3s ease-out infinite 0s; }
    :host([state="sleeping"]) .sleep-z-2 { animation: rumput-sleep-z 3s ease-out infinite .55s; }
    :host([state="sleeping"]) .sleep-z-3 { animation: rumput-sleep-z 3s ease-out infinite 1.1s; }
    :host([state="sleeping"]) .mouth-sleeping { animation: rumput-sleep-mouth 3s ease-in-out infinite; }
    }

    @keyframes rumput-wave {
      0%, 100% { transform: rotate(0deg); }
      14% { transform: rotate(74deg); }
      28% { transform: rotate(108deg); }
      42% { transform: rotate(82deg); }
      56% { transform: rotate(112deg); }
      70% { transform: rotate(86deg); }
      84% { transform: rotate(104deg); }
    }

    @keyframes rumput-greeting-loop {
      0%, 10%, 82%, 100% { transform: rotate(0deg); }
      18% { transform: rotate(76deg); }
      28% { transform: rotate(110deg); }
      38% { transform: rotate(82deg); }
      48% { transform: rotate(112deg); }
      58% { transform: rotate(86deg); }
      68% { transform: rotate(104deg); }
      76% { transform: rotate(92deg); }
    }

    @keyframes rumput-auto-blink {
      0%, 86%, 100% { transform: scaleY(1); }
      90%, 95% { transform: scaleY(0.06); }
    }

    @keyframes rumput-idle-fidget {
      0%, 18%, 45%, 88%, 100% { transform: rotate(0deg) translateY(0); }
      23% { transform: rotate(-1.3deg) translateY(-1px); }
      29% { transform: rotate(0.9deg) translateY(0); }
      35% { transform: rotate(-0.5deg) translateY(-1px); }
      92% { transform: rotate(0.7deg) translateY(-1px); }
      96% { transform: rotate(-0.4deg) translateY(0); }
    }

    @keyframes rumput-thought-loop-1 {
      0%, 4%, 100% { opacity: 0; transform: scale(0.35); }
      10% { opacity: 1; transform: scale(1.16); }
      14%, 78% { opacity: 1; transform: scale(1); }
      88% { opacity: 0; transform: scale(0.7); }
    }

    @keyframes rumput-thought-loop-2 {
      0%, 12%, 100% { opacity: 0; transform: scale(0.35); }
      18% { opacity: 1; transform: scale(1.16); }
      22%, 78% { opacity: 1; transform: scale(1); }
      88% { opacity: 0; transform: scale(0.7); }
    }

    @keyframes rumput-thought-loop-main {
      0%, 22%, 100% { opacity: 0; transform: translateY(3px) scale(0.35); }
      30% { opacity: 1; transform: translateY(0) scale(1.08); }
      35% { opacity: 1; transform: translateY(0) scale(1); }
      55% { opacity: 1; transform: translateY(-3px) scale(1); }
      78% { opacity: 1; transform: translateY(0) scale(1); }
      88% { opacity: 0; transform: translateY(-2px) scale(0.92); }
    }

    @keyframes rumput-explain-left {
      0%, 100% { transform: rotate(-20deg); }
      50% { transform: rotate(-48deg); }
    }

    @keyframes rumput-explain-right {
      0%, 100% { transform: rotate(8deg); }
      50% { transform: rotate(34deg); }
    }

    @keyframes rumput-audio-wave {
      0%, 12% { opacity: 0; transform: translateX(-3px) scale(.72); }
      28%, 58% { opacity: 1; transform: translateX(0) scale(1); }
      82%, 100% { opacity: 0; transform: translateX(6px) scale(1.08); }
    }

    @keyframes rumput-success-expression {
      0% { transform: scale(.72); }
      68% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }

    @keyframes rumput-success-hand-up {
      0% { transform: rotate(0deg); }
      68% { transform: rotate(104deg); }
      100% { transform: rotate(92deg); }
    }

    @keyframes rumput-error-pop {
      0%, 14%, 100% { opacity: 0; transform: translateY(5px) scale(.45) rotate(-8deg); }
      22% { opacity: 1; transform: translateY(0) scale(1.18) rotate(5deg); }
      30%, 68% { opacity: 1; transform: translateY(0) scale(1); }
      75% { opacity: 1; transform: translateY(-2px) scale(1.04) rotate(-3deg); }
      84% { opacity: 0; transform: translateY(-7px) scale(.82) rotate(4deg); }
    }

    @keyframes rumput-error-left {
      0%, 100% { transform: rotate(18deg); }
      22%, 34% { transform: rotate(31deg); }
      28%, 40% { transform: rotate(23deg); }
      58% { transform: rotate(27deg); }
    }

    @keyframes rumput-error-right {
      0%, 100% { transform: rotate(-18deg); }
      22%, 34% { transform: rotate(-31deg); }
      28%, 40% { transform: rotate(-23deg); }
      58% { transform: rotate(-27deg); }
    }

    @keyframes rumput-error-mouth {
      0%, 100% { transform: translateY(0) scaleX(1); }
      24%, 38% { transform: translateY(2px) scaleX(.82); }
      31%, 48% { transform: translateY(0) scaleX(1.08); }
    }

    @keyframes rumput-sleep-breathe {
      0%, 100% { transform: scaleX(1) scaleY(1); }
      50% { transform: scaleX(1.018) scaleY(.992); }
    }

    @keyframes rumput-sleep-z {
      0%, 12% { opacity: 0; transform: translate(0, 5px) scale(.7); }
      24%, 58% { opacity: .9; transform: translate(-2px, 0) scale(1); }
      82%, 100% { opacity: 0; transform: translate(-5px, -13px) scale(1.08); }
    }

    @keyframes rumput-sleep-mouth {
      0%, 100% { transform: scaleX(.88); }
      50% { transform: scaleX(1.12); }
    }

    @media (prefers-reduced-motion: reduce) {
      .arm,
      .character,
      .eye-open,
      .pupil,
      .thought-piece,
      .success-face,
      .audio-wave,
      .error-mark,
      .sleep-z,
      .mouth-error,
      .mouth-sleeping {
        animation: none !important;
        transition: none !important;
      }


      :host([state="thinking"]) .thought-piece {
        opacity: 1;
        transform: none;
        animation: none !important;
      }


      :host([state="responding"]) .audio-wave {
        opacity: 1;
        transform: none;
        animation: none !important;
      }
    }
  </style>

  <div class="rumput-shell">
    <svg viewBox="0 0 260 360" role="img" aria-labelledby="rumput-title rumput-description">
      <title id="rumput-title">Rumput chatbot mascot</title>
      <desc id="rumput-description">A friendly single blade of grass with expressive eyes and leaf arms.</desc>
      <defs>
        <linearGradient id="body-green" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#c7f239" />
          <stop offset="0.48" stop-color="#82d91f" />
          <stop offset="1" stop-color="#45aa20" />
        </linearGradient>
        <linearGradient id="leaf-green" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#bdf13c" />
          <stop offset="1" stop-color="#55b923" />
        </linearGradient>
        <linearGradient id="eye-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#18352e" />
          <stop offset="0.62" stop-color="#071713" />
          <stop offset="1" stop-color="#4f971d" />
        </linearGradient>
        <filter id="shadow-blur" x="-30%" y="-100%" width="160%" height="300%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      <ellipse class="shadow" cx="128" cy="326" rx="48" ry="8" fill="#6d5a3b" opacity="0.18" filter="url(#shadow-blur)" />

      <g class="character">
      <g class="arm right-arm">
        <path d="M166 222 C190 220 211 232 222 254 C199 254 177 243 165 228 Z" fill="url(#leaf-green)" stroke="#247a20" stroke-width="4" stroke-linejoin="round" />
        <path d="M171 227 C187 233 202 242 213 250" fill="none" stroke="#8fdb2a" stroke-width="3" stroke-linecap="round" opacity="0.75" />
      </g>

      <g class="body">
        <path d="M126 320 C103 318 92 294 88 256 C82 204 84 151 101 107 C116 67 144 35 184 19 C166 63 158 109 160 160 C164 222 168 283 146 313 C141 319 134 321 126 320 Z" fill="url(#body-green)" stroke="#247a20" stroke-width="5" stroke-linejoin="round" />
        <path d="M119 307 C102 267 101 212 108 159 C115 107 135 67 168 35 C144 78 134 127 135 181 C136 235 142 279 132 312 Z" fill="#d7f84b" opacity="0.34" />
        <path d="M147 304 C158 263 154 215 153 164 C152 116 158 71 178 28" fill="none" stroke="#318d21" stroke-width="4" stroke-linecap="round" opacity="0.35" />
        <ellipse cx="159" cy="37" rx="10" ry="4" transform="rotate(-42 159 37)" fill="#f2ff9b" opacity="0.92" />
      </g>

      <g class="arm left-arm">
        <path d="M85 220 C61 216 40 225 27 247 C49 249 72 240 86 225 Z" fill="url(#leaf-green)" stroke="#247a20" stroke-width="4" stroke-linejoin="round" />
        <path d="M80 224 C62 229 48 236 36 244" fill="none" stroke="#8fdb2a" stroke-width="3" stroke-linecap="round" opacity="0.75" />
        <circle cx="85" cy="223" r="5" fill="#82d91f" />
      </g>

      <g class="face">
        <g class="eye-open left-eye">
          <ellipse cx="114" cy="164" rx="16" ry="23" fill="#efffdf" stroke="#10271d" stroke-width="3" />
          <g class="pupil">
            <circle cx="114" cy="165" r="10" fill="url(#eye-green)" />
            <circle cx="110" cy="159" r="3.2" fill="#ffffff" />
          </g>
        </g>
        <g class="eye-open right-eye">
          <ellipse cx="148" cy="164" rx="16" ry="23" fill="#efffdf" stroke="#10271d" stroke-width="3" />
          <g class="pupil">
            <circle cx="148" cy="165" r="10" fill="url(#eye-green)" />
            <circle cx="144" cy="159" r="3.2" fill="#ffffff" />
          </g>
        </g>
        <path class="mouth-default" d="M120 195 Q131 207 142 195 Q140 215 131 216 Q122 215 120 195 Z" fill="#13221e" />
        <path class="mouth-default" d="M125 208 Q131 204 137 208 Q135 214 131 214 Q127 214 125 208 Z" fill="#ff7184" />
        <path class="mouth-error" d="M121 208 Q131 198 141 208" fill="none" stroke="#13221e" stroke-width="5" stroke-linecap="round" />
        <path class="mouth-sleeping" d="M126 204 Q131 207 136 204" fill="none" stroke="#13221e" stroke-width="4" stroke-linecap="round" />
        <path d="M101 133 Q110 126 119 132" fill="none" stroke="#18362a" stroke-width="5" stroke-linecap="round" />
        <path d="M141 131 Q151 126 159 135" fill="none" stroke="#18362a" stroke-width="5" stroke-linecap="round" />
      </g>

      <g class="success-face" role="img" aria-label="Happy yay expression">
        <path d="M101 165 Q114 151 127 165" fill="none" stroke="#10271d" stroke-width="5" stroke-linecap="round" />
        <path d="M135 165 Q148 151 161 165" fill="none" stroke="#10271d" stroke-width="5" stroke-linecap="round" />
        <ellipse cx="131" cy="202" rx="15" ry="18" fill="#13221e" />
        <path d="M121 207 Q131 201 141 207 Q138 217 131 219 Q124 217 121 207 Z" fill="#ff7184" />
        <circle cx="98" cy="190" r="6" fill="#ff7184" opacity=".55" />
        <circle cx="164" cy="190" r="6" fill="#ff7184" opacity=".55" />
      </g>
      </g>

      <g class="error-mark" aria-hidden="true">
        <circle cx="86" cy="108" r="20" fill="#ef4444" stroke="#10271d" stroke-width="3" />
        <path d="M86 96 L86 110" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />
        <circle cx="86" cy="118" r="2.8" fill="#ffffff" />
      </g>

      <g class="audio-waves" role="img" aria-label="Sound coming from Rumput's mouth">
        <path class="audio-wave audio-wave-1" d="M146 196 Q153 202 146 208" fill="none" stroke="#10271d" stroke-width="3" stroke-linecap="round" />
        <path class="audio-wave audio-wave-2" d="M153 190 Q166 202 153 214" fill="none" stroke="#10271d" stroke-width="3" stroke-linecap="round" />
        <path class="audio-wave audio-wave-3" d="M161 184 Q180 202 161 220" fill="none" stroke="#10271d" stroke-width="3" stroke-linecap="round" />
      </g>

      <g class="thought-bubble" role="img" aria-label="Thinking bubble">
        <circle class="thought-piece thought-step-1" cx="174" cy="119" r="6" fill="#f8fff1" stroke="#247a20" stroke-width="2.5" />
        <circle class="thought-piece thought-step-2" cx="184" cy="103" r="4.5" fill="#f8fff1" stroke="#247a20" stroke-width="2.5" />
        <g class="thought-piece thought-main">
          <path d="M179 72 C179 53 194 40 216 40 C239 40 253 53 253 71 C253 90 238 102 216 102 C194 102 179 91 179 72 Z" fill="#f8fff1" stroke="#247a20" stroke-width="3" />
          <circle cx="201" cy="72" r="4" fill="#45aa20" />
          <circle cx="216" cy="72" r="4" fill="#45aa20" />
          <circle cx="231" cy="72" r="4" fill="#45aa20" />
        </g>
      </g>

      <g class="sleep-symbols" role="img" aria-label="Snoring">
        <text class="sleep-z sleep-z-1" x="179" y="153" fill="#247a20" font-size="14" font-weight="700">Z</text>
        <text class="sleep-z sleep-z-2" x="196" y="128" fill="#247a20" font-size="19" font-weight="700">Z</text>
        <text class="sleep-z sleep-z-3" x="217" y="97" fill="#247a20" font-size="25" font-weight="700">Z</text>
      </g>
    </svg>
  </div>
`;

class RumputMascot extends HTMLElement {
  static get observedAttributes() {
    return ["state", "size"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shell = this.shadowRoot.querySelector(".rumput-shell");
    this.svg = this.shadowRoot.querySelector("svg");
    this.waveTimer = null;
    this.handlePointerMove = this.handlePointerMove.bind(this);
  }

  connectedCallback() {
    if (!this.hasAttribute("state")) this.state = "idle";
    this.syncSize();
    window.addEventListener("pointermove", this.handlePointerMove, { passive: true });
    requestAnimationFrame(() => this.wave());
    this.dispatchEvent(new CustomEvent("rumput-ready", { bubbles: true }));
  }

  disconnectedCallback() {
    window.removeEventListener("pointermove", this.handlePointerMove);
    clearTimeout(this.waveTimer);
  }

  attributeChangedCallback(name) {
    if (name === "size") this.syncSize();
  }

  get state() {
    return this.getAttribute("state") || "idle";
  }

  set state(value) {
    const allowed = ["idle", "greeting", "thinking", "responding", "success", "error", "sleeping"];
    this.setAttribute("state", allowed.includes(value) ? value : "idle");
  }

  setState(value) {
    this.state = value;
  }

  wave() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    clearTimeout(this.waveTimer);
    this.shell.classList.remove("is-greeting");
    void this.shell.offsetWidth;
    this.shell.classList.add("is-greeting");
    this.waveTimer = setTimeout(() => {
      this.shell.classList.remove("is-greeting");
      this.dispatchEvent(new CustomEvent("rumput-greeting-complete", { bubbles: true }));
    }, 1700);
  }

  blink() {
    if (this.state === "sleeping") return;
    this.shell.classList.add("is-blinking");
    setTimeout(() => this.shell.classList.remove("is-blinking"), 125);
  }

  handlePointerMove(event) {
    if (this.state === "sleeping" || this.state === "thinking") return;
    const rect = this.svg.getBoundingClientRect();
    const centerX = rect.left + rect.width * 0.5;
    const centerY = rect.top + rect.height * 0.46;
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    const distance = Math.hypot(dx, dy) || 1;
    const strength = Math.min(4.2, distance / 65);
    const x = (dx / distance) * strength;
    const y = (dy / distance) * strength;
    this.shell.style.setProperty("--eye-x", `${x.toFixed(2)}px`);
    this.shell.style.setProperty("--eye-y", `${y.toFixed(2)}px`);
  }

  syncSize() {
    const parsed = Number.parseFloat(this.getAttribute("size"));
    const size = Number.isFinite(parsed) ? Math.max(72, Math.min(640, parsed)) : 240;
    this.style.setProperty("--rumput-size", `${size}px`);
  }
}

if (!customElements.get("rumput-mascot")) {
  customElements.define("rumput-mascot", RumputMascot);
}
