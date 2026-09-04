import { Link, createFileRoute } from "@tanstack/react-router";
import { type CSSProperties, useState } from "react";

import { useLanguage } from "../language";
import {
  RumputMascot,
  type RumputAction,
  type RumputState,
} from "../rumput-mascot";

export const Route = createFileRoute("/rumput")({ component: RumputPage });

const pageCopy = {
  en: {
    eyebrow: "Long Taa’s digital ambassador",
    title: "Meet Rumput. Your journey starts here.",
    intro: "Part welcome guide, part trip planner. Rumput helps you understand Long Taa, make the important choices and prepare one useful enquiry for Clement.",
    pronunciation: "Pronounced “room-poot” · Malay for grass",
    ask: "Plan with Rumput",
    how: "See how it works",
    online: "Ambassador online",
    hello: "Hello! Tell me what kind of Long Taa experience you have in mind.",
    identityLabel: "Why Rumput exists",
    identityTitle: "A friendly first hello to somewhere extraordinary.",
    identityText: "A journey this remote naturally comes with questions. Rumput turns those questions into confidence without pretending the experience is ordinary, fixed or instant.",
    actionLabel: "Rumput action lab",
    actionTitle: "Meet every side of Rumput.",
    actionIntro: "Choose an action to see how Rumput reacts throughout the visitor conversation. Tap the selected action again to replay it.",
    replay: "Replay action",
    actions: [
      { state: "idle" as RumputState, label: "Idle", description: "Waits with a gentle fidget." },
      { state: "greeting" as RumputState, action: "wave" as RumputAction, label: "Greet", description: "Waves hello to a new visitor." },
      { state: "idle" as RumputState, action: "blink" as RumputAction, label: "Blink", description: "Adds a quick bit of personality." },
      { state: "thinking" as RumputState, label: "Think", description: "Works through the visitor’s choices." },
      { state: "responding" as RumputState, label: "Speak", description: "Explains the next planning step." },
      { state: "success" as RumputState, label: "Celebrate", description: "Marks a completed trip brief." },
      { state: "error" as RumputState, label: "Needs help", description: "Signals that something went wrong." },
      { state: "sleeping" as RumputState, label: "Sleep", description: "Takes a quiet break." },
    ],
    identityCards: [
      { number: "01", title: "Make the remote feel reachable", text: "He explains the six-hour 4WD journey, simple longhouse stay and what visitors should expect." },
      { number: "02", title: "Turn curiosity into clarity", text: "He helps people compare the choices that actually shape their stay—without overwhelming them." },
      { number: "03", title: "Bring people into the conversation", text: "He prepares the details. Clement and the community make the final confirmation." },
    ],
    plannerLabel: "Plan with Rumput",
    plannerTitle: "From “I’m interested” to a ready-to-confirm trip brief.",
    plannerIntro: "Tap through the three steps. Rumput changes with the conversation and keeps the planning focused.",
    steps: [
      {
        state: "idle" as RumputState,
        number: "01",
        label: "Start",
        title: "Tell Rumput what you know.",
        text: "Share your preferred dates, number of travellers and what draws you to Long Taa. An incomplete idea is enough to begin.",
        bubble: "When would you like to visit—and who is coming with you?",
        chips: ["Travel dates", "Group size", "Interests"],
      },
      {
        state: "thinking" as RumputState,
        number: "02",
        label: "Shape",
        title: "Build the right journey together.",
        text: "Choose your nights, stay option, one experience package, 4WD arrangement and whether river support is needed.",
        bubble: "Let’s match the stay, transport and one experience package to your group.",
        chips: ["Stay & meals", "Package 1 or 2", "4WD & river"],
      },
      {
        state: "success" as RumputState,
        number: "03",
        label: "Send",
        title: "Give Clement one useful brief.",
        text: "Rumput organises your choices, indicative estimate and open questions into a WhatsApp-ready enquiry—cutting out repeated back-and-forth.",
        bubble: "Your trip brief is ready. Clement can now confirm what is possible.",
        chips: ["Clear summary", "Indicative estimate", "Human confirmation"],
      },
    ],
    progress: "Planning progress",
    try: "Try Rumput now",
    promiseLabel: "The important boundary",
    promiseTitle: "Rumput guides. Long Taa confirms.",
    promiseText: "Rumput can explain, organise and prepare. Availability, activities, transport and final pricing are confirmed by Clement and the Long Taa community according to real conditions.",
    closingEyebrow: "Bring your curiosity",
    closingTitle: "You do not need a perfect plan. Just a place to begin.",
    closingText: "Answer a few simple questions and Rumput will help turn your idea into a journey Clement can act on.",
    explore: "Explore the stay first",
  },
  ms: {
    eyebrow: "Duta digital Long Taa",
    title: "Kenali Rumput. Perjalanan anda bermula di sini.",
    intro: "Sebahagian pemandu sambutan, sebahagian perancang perjalanan. Rumput membantu anda memahami Long Taa, membuat pilihan penting dan menyediakan satu pertanyaan berguna untuk Clement.",
    pronunciation: "Disebut “room-poot” · bermaksud rumput",
    ask: "Rancang bersama Rumput",
    how: "Lihat caranya",
    online: "Duta sedang aktif",
    hello: "Hai! Ceritakan pengalaman Long Taa yang anda bayangkan.",
    identityLabel: "Mengapa Rumput diwujudkan",
    identityTitle: "Sapaan mesra pertama ke tempat yang luar biasa.",
    identityText: "Perjalanan sejauh ini sememangnya menimbulkan soalan. Rumput menukar soalan itu menjadi keyakinan tanpa menggambarkan pengalaman ini sebagai biasa, tetap atau serta-merta.",
    actionLabel: "Makmal aksi Rumput",
    actionTitle: "Kenali setiap sisi Rumput.",
    actionIntro: "Pilih aksi untuk melihat reaksi Rumput sepanjang perbualan pelawat. Tekan aksi yang dipilih sekali lagi untuk mengulanginya.",
    replay: "Ulang aksi",
    actions: [
      { state: "idle" as RumputState, label: "Santai", description: "Menunggu dengan gerakan kecil." },
      { state: "greeting" as RumputState, action: "wave" as RumputAction, label: "Sapa", description: "Melambai kepada pelawat baharu." },
      { state: "idle" as RumputState, action: "blink" as RumputAction, label: "Kedip", description: "Menambah sedikit personaliti." },
      { state: "thinking" as RumputState, label: "Fikir", description: "Memproses pilihan pelawat." },
      { state: "responding" as RumputState, label: "Bercakap", description: "Menerangkan langkah perancangan seterusnya." },
      { state: "success" as RumputState, label: "Raikan", description: "Meraikan ringkasan perjalanan yang lengkap." },
      { state: "error" as RumputState, label: "Perlu bantuan", description: "Menunjukkan sesuatu tidak berjalan lancar." },
      { state: "sleeping" as RumputState, label: "Tidur", description: "Berehat seketika." },
    ],
    identityCards: [
      { number: "01", title: "Jadikan perjalanan terpencil mudah difahami", text: "Dia menerangkan perjalanan 4WD selama enam jam, penginapan rumah panjang yang sederhana dan jangkaan pelawat." },
      { number: "02", title: "Tukar rasa ingin tahu menjadi kejelasan", text: "Dia membantu orang membandingkan pilihan yang benar-benar membentuk penginapan mereka." },
      { number: "03", title: "Bawa manusia ke dalam perbualan", text: "Dia menyediakan butiran. Clement dan komuniti membuat pengesahan akhir." },
    ],
    plannerLabel: "Rancang bersama Rumput",
    plannerTitle: "Daripada “saya berminat” kepada ringkasan perjalanan sedia disahkan.",
    plannerIntro: "Tekan tiga langkah ini. Rumput berubah mengikut perbualan dan memastikan perancangan kekal fokus.",
    steps: [
      { state: "idle" as RumputState, number: "01", label: "Mula", title: "Beritahu Rumput apa yang anda tahu.", text: "Kongsi tarikh pilihan, bilangan pengembara dan apa yang menarik anda ke Long Taa. Idea yang belum lengkap sudah mencukupi.", bubble: "Bila anda ingin datang—dan siapa yang akan bersama anda?", chips: ["Tarikh perjalanan", "Saiz kumpulan", "Minat"] },
      { state: "thinking" as RumputState, number: "02", label: "Bentuk", title: "Bina perjalanan yang sesuai bersama-sama.", text: "Pilih malam, jenis penginapan, satu pakej pengalaman, aturan 4WD dan sama ada sokongan sungai diperlukan.", bubble: "Mari padankan penginapan, pengangkutan dan satu pakej pengalaman untuk kumpulan anda.", chips: ["Penginapan & makanan", "Pakej 1 atau 2", "4WD & sungai"] },
      { state: "success" as RumputState, number: "03", label: "Hantar", title: "Beri Clement satu ringkasan berguna.", text: "Rumput menyusun pilihan, anggaran indikatif dan soalan anda menjadi pertanyaan WhatsApp yang sedia dihantar.", bubble: "Ringkasan perjalanan anda sudah siap. Clement boleh mengesahkan apa yang boleh dilakukan.", chips: ["Ringkasan jelas", "Anggaran indikatif", "Pengesahan manusia"] },
    ],
    progress: "Kemajuan perancangan",
    try: "Cuba Rumput sekarang",
    promiseLabel: "Batasan yang penting",
    promiseTitle: "Rumput membimbing. Long Taa mengesahkan.",
    promiseText: "Rumput boleh menerangkan, menyusun dan menyediakan. Ketersediaan, aktiviti, pengangkutan serta harga akhir disahkan oleh Clement dan komuniti Long Taa mengikut keadaan sebenar.",
    closingEyebrow: "Bawa rasa ingin tahu anda",
    closingTitle: "Anda tidak memerlukan pelan yang sempurna. Hanya tempat untuk bermula.",
    closingText: "Jawab beberapa soalan mudah dan Rumput akan membantu menukar idea anda menjadi perjalanan yang boleh diusahakan oleh Clement.",
    explore: "Teroka penginapan dahulu",
  },
};

function RumputPage() {
  const { language } = useLanguage();
  const copy = pageCopy[language];
  const [activeStep, setActiveStep] = useState(0);
  const [activeAction, setActiveAction] = useState(0);
  const [actionRun, setActionRun] = useState(0);
  const step = copy.steps[activeStep];
  const action = copy.actions[activeAction];
  const progress = ((activeStep + 1) / copy.steps.length) * 100;

  const openRumput = () => {
    window.dispatchEvent(new Event("longtaa:open-trip-planner"));
  };

  return (
    <main className="rumput-v2">
      <section className="rumput-v2-hero">
        <div className="rumput-v2-hero-copy">
          <p className="rumput-v2-eyebrow"><span />{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="rumput-v2-intro">{copy.intro}</p>
          <p className="rumput-v2-name">RUMPUT <span>{copy.pronunciation}</span></p>
          <div className="rumput-v2-actions">
            <button type="button" onClick={openRumput}>{copy.ask}<span>↗</span></button>
            <a href="#plan-with-rumput">{copy.how}<span>↓</span></a>
          </div>
        </div>

        <div className="rumput-v2-portrait">
          <div className="rumput-v2-signal" aria-hidden="true"><i /><i /><i /></div>
          <p className="rumput-v2-online"><span />{copy.online}</p>
          <RumputMascot
            state={action.state}
            action={"action" in action ? action.action : undefined}
            actionKey={actionRun}
            size={330}
          />
          <div className="rumput-v2-speech" aria-live="polite">
            <span>RUMPUT · {action.label}</span>
            <p>{activeAction === 0 ? copy.hello : action.description}</p>
          </div>
          <div className="rumput-v2-hero-action-tabs" role="tablist" aria-label={copy.actionLabel}>
            {copy.actions.map((item, index) => (
              <button
                key={item.label}
                type="button"
                role="tab"
                className={index === activeAction ? "is-active" : undefined}
                aria-selected={index === activeAction}
                onClick={() => {
                  setActiveAction(index);
                  setActionRun((current) => current + 1);
                }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </button>
            ))}
          </div>
          <p className="rumput-v2-portrait-label">LONG TAA<br />JOURNEY<br />COMPANION</p>
        </div>
      </section>

      <section className="rumput-v2-action-lab">
        <div className="rumput-v2-section-intro">
          <p>{copy.actionLabel}</p>
          <h2>{copy.actionTitle}</h2>
          <span>{copy.actionIntro}</span>
        </div>

        <div className="rumput-v2-action-layout">
          <div className="rumput-v2-action-stage" aria-live="polite">
            <header>
              <span>RUMPUT / ACTION {String(activeAction + 1).padStart(2, "0")}</span>
              <i>LIVE</i>
            </header>
            <div className="rumput-v2-action-portrait">
              <div className="rumput-v2-signal" aria-hidden="true"><i /><i /><i /></div>
              <RumputMascot
                state={action.state}
                action={"action" in action ? action.action : undefined}
                actionKey={actionRun}
                size={300}
              />
            </div>
            <div className="rumput-v2-action-caption">
              <div><span>{action.label}</span><p>{action.description}</p></div>
              <button
                type="button"
                onClick={() => setActionRun((current) => current + 1)}
              >
                {copy.replay} ↻
              </button>
            </div>
          </div>

          <div className="rumput-v2-action-grid" aria-label={copy.actionLabel}>
            {copy.actions.map((item, index) => (
              <button
                key={item.label}
                type="button"
                className={index === activeAction ? "is-active" : undefined}
                aria-pressed={index === activeAction}
                onClick={() => {
                  setActiveAction(index);
                  setActionRun((current) => current + 1);
                }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.label}</strong>
                <small>{item.description}</small>
                <i aria-hidden="true">{index === activeAction ? "●" : "○"}</i>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rumput-v2-identity">
        <div className="rumput-v2-section-intro">
          <p>{copy.identityLabel}</p>
          <h2>{copy.identityTitle}</h2>
          <span>{copy.identityText}</span>
        </div>
        <div className="rumput-v2-identity-grid">
          {copy.identityCards.map((card) => (
            <article key={card.number}>
              <span>{card.number}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="plan-with-rumput" className="rumput-v2-planner">
        <div className="rumput-v2-planner-heading">
          <p>{copy.plannerLabel}</p>
          <h2>{copy.plannerTitle}</h2>
          <span>{copy.plannerIntro}</span>
        </div>

        <div className="rumput-v2-planner-layout">
          <div className="rumput-v2-demo" aria-live="polite">
            <header><span><i />RUMPUT</span><small>{step.number} / 03</small></header>
            <div className="rumput-v2-demo-stage">
              <RumputMascot state={step.state} size={190} />
              <div className="rumput-v2-demo-bubble">{step.bubble}</div>
            </div>
            <div className="rumput-v2-demo-chips">
              {step.chips.map((chip) => <span key={chip}>{chip}</span>)}
            </div>
            <footer>
              <span>{copy.progress}</span>
              <i><b style={{ "--rumput-plan-progress": `${progress}%` } as CSSProperties} /></i>
            </footer>
          </div>

          <div className="rumput-v2-steps">
            {copy.steps.map((item, index) => (
              <button
                key={item.number}
                type="button"
                className={index === activeStep ? "is-active" : undefined}
                aria-pressed={index === activeStep}
                onClick={() => setActiveStep(index)}
              >
                <span>{item.number}<small>{item.label}</small></span>
                <span><strong>{item.title}</strong><small>{item.text}</small></span>
                <i aria-hidden="true">{index === activeStep ? "●" : "○"}</i>
              </button>
            ))}
            <button className="rumput-v2-try" type="button" onClick={openRumput}>{copy.try}<span>→</span></button>
          </div>
        </div>
      </section>

      <section className="rumput-v2-promise">
        <div className="rumput-v2-promise-mascot"><RumputMascot state="responding" size={170} /></div>
        <div><p>{copy.promiseLabel}</p><h2>{copy.promiseTitle}</h2><span>{copy.promiseText}</span></div>
      </section>

      <section className="rumput-v2-closing">
        <p>{copy.closingEyebrow}</p>
        <h2>{copy.closingTitle}</h2>
        <span>{copy.closingText}</span>
        <div className="rumput-v2-actions">
          <button type="button" onClick={openRumput}>{copy.ask}<span>↗</span></button>
          <Link to="/stay">{copy.explore}<span>→</span></Link>
        </div>
      </section>
    </main>
  );
}
