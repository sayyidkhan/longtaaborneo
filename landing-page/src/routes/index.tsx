import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { asset, makeWhatsAppUrl, whatsappUrl } from "../content";
import { useLanguage } from "../language";

const TreeJourneyScene = lazy(() =>
  import("../tree-journey-scene").then((module) => ({ default: module.TreeJourneyScene })),
);

const INVITATION_PROGRESS = 0.985;
const INVITATION_DURATION_MS = 500;

export const Route = createFileRoute("/")({ component: HomePage });

const treeCopy = {
  en: {
    stages: ["Begin above", "The village", "Stay and explore", "Heritage and planning", "Four ways to meet Long Taa", "Connected yet remote", "The threshold", "The invitation", "Begin a conversation"],
    loading: "Growing the journey.", canopy: "Canopy", progress: "Canopy · branches · roots · home", enter: "Enter the village",
    heroTitle: "Escape the city. Meet the real Borneo.", heroLead: "A Sebup longhouse stay shaped by rainforest, river and living heritage.", book: "Book on WhatsApp", explore: "Explore Long Taa", descend: "Scroll to descend",
    villageTitle: "Six hours from Miri. A world away from the ordinary.", villageText: "Long Taa is a traditional 20-door longhouse and home of the Indigenous Sebup community, in the rainforest interior of Baram, Sarawak.", villageTag: "A village, not a resort",
    stayExploreTitle: "Stay close. Explore further.", stay: "Stay", stayText: "Simple longhouse accommodation, local meals and practical costs.", stayLink: "View stay options", exploreText: "The Dapui River, rainforest and natural wonders beyond the usual route.",
    heritagePlanTitle: "Listen first. Plan together.", heritage: "Heritage", heritageText: "Understand the community context and how to visit with respect.", heritageLink: "Read the story", plan: "Plan", planText: "Turn interest into a qualified WhatsApp booking enquiry.", planLink: "Plan a visit",
    waysTitle: "The journey is part of the story.", waysText: "From longhouse life to river days, every visit is shaped by the place and the people who welcome you.", waysTag: "Four ways to meet Long Taa", river: "River", riverTitle: "Move with the water", forest: "Forest", forestTitle: "Walk beyond the road", heritageTitle: "Listen and learn", stayTitle: "Longhouse living",
    connectedTitle: "Connected yet remote.", connectedText: "Longhouse guests have 24-hour solar electricity, fresh mountain-sourced water and telecommunications connectivity, while living close to the forest and river.", connectedTag: "Stay close to the story",
    thresholdTitle: "The roots lead home.", thresholdText: "Keep scrolling to cross the longhouse threshold.", invitationKicker: "Long Taa is waiting", invitationTitle: "What are you waiting for?", invitationText: "Come join us on this journey.", keepScrolling: "Keep scrolling",
    closingTitle: "Come as a visitor. Leave with a story.", closingText: "Tell Clement when you hope to travel and what you would like to experience. Availability and activities are confirmed with the community.", closingTag: "Begin with a conversation", dates: "Check dates on WhatsApp", reverse: "Scroll up to return to the canopy", contactText: "A respectful visit begins with listening to the people and place that welcome you.",
  },
  ms: {
    stages: ["Bermula di atas", "Kampung", "Tinggal dan teroka", "Warisan dan perancangan", "Empat cara mengenali Long Taa", "Terhubung namun terpencil", "Ambang", "Jemputan", "Mulakan perbualan"],
    loading: "Membina perjalanan.", canopy: "Kanopi", progress: "Kanopi · dahan · akar · rumah", enter: "Masuk ke kampung",
    heroTitle: "Lari dari kota. Temui Borneo yang sebenar.", heroLead: "Penginapan rumah panjang Sebup yang dibentuk oleh hutan hujan, sungai dan warisan hidup.", book: "Tempah di WhatsApp", explore: "Teroka Long Taa", descend: "Skrol untuk turun",
    villageTitle: "Enam jam dari Miri. Dunia jauh daripada yang biasa.", villageText: "Long Taa ialah rumah panjang tradisional 20 pintu dan kediaman komuniti Orang Asal Sebup di pedalaman hutan hujan Baram, Sarawak.", villageTag: "Sebuah kampung, bukan resort",
    stayExploreTitle: "Tinggal dekat. Teroka lebih jauh.", stay: "Tinggal", stayText: "Penginapan rumah panjang yang ringkas, hidangan tempatan dan kos yang jelas.", stayLink: "Lihat pilihan penginapan", exploreText: "Sungai Dapui, hutan hujan dan keajaiban alam di luar laluan biasa.",
    heritagePlanTitle: "Dengar dahulu. Rancang bersama.", heritage: "Warisan", heritageText: "Fahami konteks komuniti dan cara berkunjung dengan penuh hormat.", heritageLink: "Baca kisahnya", plan: "Rancang", planText: "Ubah minat kepada pertanyaan tempahan WhatsApp yang jelas.", planLink: "Rancang kunjungan",
    waysTitle: "Perjalanan ialah sebahagian daripada kisah.", waysText: "Daripada kehidupan rumah panjang hingga hari di sungai, setiap kunjungan dibentuk oleh tempat ini dan orang yang menyambut anda.", waysTag: "Empat cara mengenali Long Taa", river: "Sungai", riverTitle: "Ikuti aliran air", forest: "Hutan", forestTitle: "Berjalan melepasi jalan", heritageTitle: "Dengar dan belajar", stayTitle: "Hidup di rumah panjang",
    connectedTitle: "Terhubung namun terpencil.", connectedText: "Tetamu rumah panjang menikmati elektrik solar 24 jam, air gunung segar dan sambungan telekomunikasi sambil hidup dekat dengan hutan dan sungai.", connectedTag: "Dekati kisah ini",
    thresholdTitle: "Akar membawa pulang.", thresholdText: "Teruskan skrol untuk melintasi ambang rumah panjang.", invitationKicker: "Long Taa menanti", invitationTitle: "Apa yang anda tunggu?", invitationText: "Mari sertai kami dalam perjalanan ini.", keepScrolling: "Teruskan skrol",
    closingTitle: "Datang sebagai pelawat. Pulang dengan sebuah kisah.", closingText: "Beritahu Clement bila anda ingin datang dan pengalaman yang anda harapkan. Ketersediaan serta aktiviti akan disahkan bersama komuniti.", closingTag: "Mulakan dengan perbualan", dates: "Semak tarikh di WhatsApp", reverse: "Skrol ke atas untuk kembali ke kanopi", contactText: "Kunjungan yang hormat bermula dengan mendengar orang dan tempat yang menyambut anda.",
  },
} as const;

type TourStatus = "likely" | "limited" | "enquiry";

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function seasonalWindows() {
  const today = new Date();
  return [1, 2, 3].flatMap((offset) => {
    const first = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    const firstSaturday = new Date(first);
    firstSaturday.setDate(1 + ((6 - first.getDay() + 7) % 7));
    return [0, 7, 14].map((days, index) => {
      const date = new Date(firstSaturday);
      date.setDate(firstSaturday.getDate() + days);
      return { key: dateKey(date), status: (["likely", "limited", "enquiry"] as TourStatus[])[index] };
    });
  });
}

function SeasonCalendar({ language }: { language: "en" | "ms" }) {
  const windows = useMemo(seasonalWindows, []);
  const [selected, setSelected] = useState(windows[0].key);
  const today = new Date();
  const months = [1, 2, 3].map((offset) => new Date(today.getFullYear(), today.getMonth() + offset, 1));
  const labels = language === "ms"
    ? { title: "Tetingkap perjalanan musim", note: "Tarikh ini ialah andaian perancangan, bukan ketersediaan yang disahkan.", likely: "Kemungkinan sesuai", limited: "Terhad", enquiry: "Tanya komuniti", select: "Pilih tarikh", reserve: "Tanya tentang tarikh ini" }
    : { title: "Seasonal journey windows", note: "These dates are planning assumptions, not confirmed availability.", likely: "Likely suitable", limited: "Limited", enquiry: "Ask community", select: "Select a date", reserve: "Ask about this date" };
  const weekdays = language === "ms" ? ["I", "S", "R", "K", "J", "S", "A"] : ["M", "T", "W", "T", "F", "S", "S"];
  const selectedDate = new Date(`${selected}T12:00:00`);
  const formattedDate = new Intl.DateTimeFormat(language === "ms" ? "ms-MY" : "en-MY", { day: "numeric", month: "long", year: "numeric" }).format(selectedDate);
  const enquiry = language === "ms"
    ? `Hello Long Taa, saya ingin bertanya tentang perjalanan sekitar ${formattedDate}. Boleh sahkan ketersediaan dan pengalaman yang sesuai?`
    : `Hello Long Taa, I would like to ask about a journey around ${formattedDate}. Could you confirm availability and suitable experiences?`;

  return (
    <section className="season-calendar" aria-label={labels.title}>
      <div className="season-calendar-heading"><span>{labels.title}</span><p>{labels.note}</p></div>
      <div className="season-legend" aria-label="Calendar legend"><i className="is-likely" />{labels.likely}<i className="is-limited" />{labels.limited}<i className="is-enquiry" />{labels.enquiry}</div>
      <div className="season-months">
        {months.map((month) => {
          const offset = (month.getDay() + 6) % 7;
          const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
          return <article className="season-month" key={month.toISOString()}><h3>{new Intl.DateTimeFormat(language === "ms" ? "ms-MY" : "en-MY", { month: "long", year: "numeric" }).format(month)}</h3><div className="season-weekdays">{weekdays.map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}</div><div className="season-days">{Array.from({ length: offset }, (_, index) => <i key={`gap-${index}`} />)}{Array.from({ length: days }, (_, index) => {
            const key = dateKey(new Date(month.getFullYear(), month.getMonth(), index + 1));
            const window = windows.find((item) => item.key === key);
            return window ? <button key={key} type="button" aria-label={`${labels.select}: ${key}`} className={`is-${window.status}${selected === key ? " is-selected" : ""}`} onClick={() => setSelected(key)}>{index + 1}</button> : <span key={key}>{index + 1}</span>;
          })}</div></article>;
        })}
      </div>
      <div className="season-selection"><div><span>{labels.select}</span><strong>{formattedDate}</strong></div><a href={makeWhatsAppUrl(enquiry)} target="_blank" rel="noreferrer">{labels.reserve} <span aria-hidden="true">→</span></a></div>
    </section>
  );
}

function HomePage() {
  const { language } = useLanguage();
  const copy = treeCopy[language];
  const [progress, setProgress] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);
  const [thresholdReady, setThresholdReady] = useState(false);
  const [thresholdVideoDuration, setThresholdVideoDuration] = useState(0);
  const [invitationPhase, setInvitationPhase] = useState<"idle" | "visible" | "complete">("idle");
  const thresholdVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      const maximum = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setProgress(Math.min(1, Math.max(0, window.scrollY / maximum)));
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const video = thresholdVideoRef.current;
    if (!video) return;

    const updateDuration = () => {
      if (Number.isFinite(video.duration)) setThresholdVideoDuration(video.duration);
    };
    updateDuration();
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("durationchange", updateDuration);
    return () => {
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("durationchange", updateDuration);
    };
  }, []);

  useEffect(() => {
    const video = thresholdVideoRef.current;
    if (!video || !thresholdVideoDuration) return;

    // The hornbill finishes entering the 3D doorway at 0.855. Start the film
    // afterward so its arrival remains visible before the real-world handoff.
    const scrubStart = 0.86;
    const scrubEnd = INVITATION_PROGRESS;
    const scrubProgress = Math.min(1, Math.max(0, (progress - scrubStart) / (scrubEnd - scrubStart)));
    const targetTime = scrubProgress * Math.max(0, thresholdVideoDuration - 0.04);
    const frame = window.requestAnimationFrame(() => {
      if (Math.abs(video.currentTime - targetTime) > 1 / 48) video.currentTime = targetTime;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [progress, thresholdVideoDuration]);

  useEffect(() => {
    setInvitationPhase((phase) => {
      if (progress < INVITATION_PROGRESS) return "idle";
      return phase === "idle" ? "visible" : phase;
    });
  }, [progress]);

  useEffect(() => {
    if (invitationPhase !== "visible") return;
    const timeout = window.setTimeout(() => setInvitationPhase("complete"), INVITATION_DURATION_MS);
    return () => window.clearTimeout(timeout);
  }, [invitationPhase]);

  const activeStage = useMemo(() => {
    if (progress < 0.11) return 0;
    if (progress < 0.28) return 1;
    if (progress < 0.44) return 2;
    if (progress < 0.61) return 3;
    if (progress < 0.76) return 4;
    if (progress < 0.84) return 5;
    if (progress < INVITATION_PROGRESS) return 6;
    if (invitationPhase !== "complete" || progress < 0.995) return 7;
    return 8;
  }, [invitationPhase, progress]);

  const stageClass = (index: number) => `tree-story${activeStage === index ? " is-active" : ""}`;
  const thresholdVideoOpacity = thresholdReady ? Math.min(1, Math.max(0, (progress - 0.855) / 0.04)) : 0;
  const thresholdCopyOpacity = Math.min(1, Math.max(0, 1 - (progress - 0.94) / 0.035));

  return (
    <main className={`tree-home${sceneReady ? " is-ready" : ""}`}>
      <div className="tree-world" aria-hidden="true">
        <img className="tree-world-fallback" src={asset("forest-canopy.webp")} alt="" />
        <Suspense fallback={null}>
          <TreeJourneyScene
            progress={progress}
            onReady={() => setSceneReady(true)}
            onThresholdReady={setThresholdReady}
          />
        </Suspense>
        <video
          ref={thresholdVideoRef}
          className="tree-threshold-video"
          src="/videos/longhouse-threshold.mp4"
          poster="/images/longhouse-threshold-poster.jpg"
          preload="auto"
          muted
          playsInline
          style={{ opacity: thresholdVideoOpacity }}
        />
        <div className="tree-world-vignette" />
      </div>

      <div className="tree-loader" role="status" aria-live="polite">
        <img className="tree-loader-logo" src={asset("long-taa-dapui-logo-transparent.png")} alt="" />
        <strong>{copy.loading}</strong>
      </div>
      <div className="tree-journey-state" aria-hidden="true"><span>{copy.canopy}</span><i /><strong>{copy.stages[activeStage]}</strong></div>
      <div className="tree-progress" aria-hidden="true"><span style={{ transform: `scaleY(${progress})` }} /><small>{copy.progress}</small></div>

      <button className="tree-enter-button" type="button" onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })}>
        {copy.enter}
      </button>

      <div className="tree-story-layer">
        <section className={`${stageClass(0)} tree-intro`} aria-labelledby="hero-title" aria-hidden={activeStage !== 0} inert={activeStage !== 0}>
          <h1 id="hero-title">
            {language === "en" ? <><span>Escape the city.</span><span className="hero-title-line">Meet the real Borneo.</span></> : copy.heroTitle}
          </h1>
          <p className="tree-lead">{copy.heroLead}</p>
          <p className="tree-location">Long Taa · Ulu Tinjar · Sarawak</p>
          <div className="tree-actions">
            <a className="tree-primary-action" href={whatsappUrl} target="_blank" rel="noreferrer">{copy.book}</a>
            <Link className="tree-secondary-action tree-text-action" to="/explore">{copy.explore} <span aria-hidden="true">→</span></Link>
          </div>
          <div className="tree-scroll-cue"><span />{copy.descend}</div>
        </section>

        <section className={stageClass(1)} aria-labelledby="journey-title" aria-hidden={activeStage !== 1} inert={activeStage !== 1}>
          <h2 id="journey-title">
            {language === "ms" ? <>Enam jam dari Miri. <span>Dunia jauh daripada yang biasa.</span></> : <>Six hours from Miri. <span>A world away from the ordinary.</span></>}
          </h2>
          <p>{copy.villageText}</p>
          <p className="tree-branch-name">{copy.villageTag}</p>
          <figure><img src={asset("journey-road.webp")} alt="A remote road bordered by dense rainforest" /></figure>
        </section>

        <section className={stageClass(2)} aria-labelledby="stay-explore-title" aria-hidden={activeStage !== 2} inert={activeStage !== 2}>
          <h2 id="stay-explore-title">{copy.stayExploreTitle}</h2>
          <div className="tree-branch-pair">
            <article><h3>{copy.stay}</h3><p>{copy.stayText}</p><Link to="/stay">{copy.stayLink}</Link></article>
            <article><h3>{copy.explore}</h3><p>{copy.exploreText}</p><Link to="/explore">{copy.explore}</Link></article>
          </div>
        </section>

        <section className={stageClass(3)} aria-labelledby="heritage-plan-title" aria-hidden={activeStage !== 3} inert={activeStage !== 3}>
          <h2 id="heritage-plan-title">{copy.heritagePlanTitle}</h2>
          <div className="tree-branch-pair">
            <article><h3>{copy.heritage}</h3><p>{copy.heritageText}</p><Link to="/heritage">{copy.heritageLink}</Link></article>
            <article><h3>{copy.plan}</h3><p>{copy.planText}</p><Link to="/plan">{copy.planLink}</Link></article>
          </div>
        </section>

        <section className={`${stageClass(4)} tree-visual-story`} aria-labelledby="ways-title" aria-hidden={activeStage !== 4} inert={activeStage !== 4}>
          <div>
            <h2 id="ways-title">
              {language === "ms" ? <>Perjalanan ialah <span>sebahagian daripada kisah.</span></> : <>The journey is <span>part of the story.</span></>}
            </h2>
            <p>{copy.waysText}</p>
            <p className="tree-branch-name">{copy.waysTag}</p>
          </div>
          <div className="tree-mini-gallery">
            <article><img src={asset("journal/eco-03.webp")} alt="A Long Taa longhouse with palms and open sky" /><span>{copy.stay}</span><h3>{copy.stayTitle}</h3></article>
            <article><img src={asset("journal/eco-14.webp")} alt="A longboat journey on the Dapui River" /><span>{copy.river}</span><h3>{copy.riverTitle}</h3></article>
            <article><img src={asset("journal/eco-13.webp")} alt="A visitor walking through the rainforest" /><span>{copy.forest}</span><h3>{copy.forestTitle}</h3></article>
            <article><img src={asset("journal/eco-07.webp")} alt="A gathering in the Long Taa longhouse" /><span>{copy.heritage}</span><h3>{copy.heritageTitle}</h3></article>
          </div>
        </section>

        <section className={`${stageClass(5)} tree-connected-story`} aria-labelledby="connected-title" aria-hidden={activeStage !== 5} inert={activeStage !== 5}>
          <div>
            <h2 id="connected-title">{copy.connectedTitle}</h2>
            <p>{copy.connectedText}</p>
            <p className="tree-branch-name">{copy.connectedTag}</p>
            <Link to="/stay">{copy.stayLink}</Link>
          </div>
        </section>

        <section className={`${stageClass(6)} tree-threshold`} aria-labelledby="threshold-title" aria-hidden={activeStage !== 6} inert={activeStage !== 6} style={activeStage === 6 ? { opacity: thresholdCopyOpacity } : undefined}>
          <h2 id="threshold-title">{copy.thresholdTitle}</h2>
          <p>{copy.thresholdText}</p>
        </section>

        <section
          className={`tree-invitation${activeStage === 7 ? " is-active" : ""}`}
          aria-labelledby="invitation-title"
          aria-hidden={activeStage !== 7}
          inert={activeStage !== 7}
        >
          <div>
            <p>{copy.invitationKicker}</p>
            <h2 id="invitation-title">{copy.invitationTitle}</h2>
            <strong>{copy.invitationText}</strong>
            <span>{copy.keepScrolling}</span>
          </div>
        </section>

        <section className={`${stageClass(8)} tree-booking-room`} aria-labelledby="closing-title" aria-hidden={activeStage !== 8} inert={activeStage !== 8}>
          <div className="tree-booking-copy">
            <h2 id="closing-title">{copy.closingTitle}</h2>
            <p>{copy.closingText}</p>
            <p className="tree-branch-name">{copy.closingTag}</p>
            <div className="tree-actions">
              <a className="tree-primary-action" href={whatsappUrl} target="_blank" rel="noreferrer">{copy.dates}</a>
              <Link className="tree-secondary-action tree-text-action" to="/plan">{copy.planLink} <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <SeasonCalendar language={language} />
          <span className="tree-reverse-hint">{copy.reverse}</span>
        </section>
      </div>

      <div className="tree-scroll-track" aria-hidden="true" />
    </main>
  );
}
