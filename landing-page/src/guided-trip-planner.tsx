import { type FormEvent, useMemo, useState } from "react";

import { getSimulatedAvailability, type SimulatedAvailabilityStatus } from "./availability";
import {
  buildTripBriefMessage,
  calculateTripEstimate,
  packageLabels,
  parsePositiveInteger,
  riverSupportLabels,
  stayLabels,
  transportLabels,
  type ExperiencePackage,
  type RiverSupportOption,
  type StayOption,
  type TransportOption,
  type TripBrief,
} from "./chat-planner";
import { makeWhatsAppUrl } from "./content";
import type { SiteLanguage } from "./language";

type StepKey = keyof TripBrief;

interface PlannerStep {
  key: StepKey;
  question: string;
  hint?: string;
  type: "text" | "date" | "number" | "textarea" | "choice";
  placeholder?: string;
  choices?: Array<{ value: string; label: string; detail?: string }>;
}

const stepsByLanguage: Record<SiteLanguage, PlannerStep[]> = {
  en: [
    { key: "name", question: "What name should Clement expect?", type: "text", placeholder: "Your name" },
    { key: "arrivalDate", question: "When would you like to arrive?", hint: "If your dates are flexible, enter your preferred date for now.", type: "date" },
    { key: "backupDate", question: "Do you have a backup arrival date?", hint: "A second option can reduce follow-up if your preferred date is unavailable.", type: "date" },
    { key: "guests", question: "How many guests are travelling?", hint: "One 4WD or longboat carries up to three guests.", type: "number", placeholder: "For example, 2" },
    { key: "nights", question: "How many nights would you like to stay?", hint: "Three days and two nights is a useful starting point, but other durations can be requested.", type: "number", placeholder: "For example, 2" },
    {
      key: "stayOption",
      question: "Choose your stay option.",
      type: "choice",
      choices: [
        { value: "meals", label: "Stay + local meals", detail: "RM180 per person/night" },
        { value: "accommodation", label: "Accommodation only", detail: "RM50 per person/night; prepare your own meals" },
      ],
    },
    {
      key: "experiencePackage",
      question: "Choose one experience package.",
      hint: "Package 1 and Package 2 are alternatives for this enquiry.",
      type: "choice",
      choices: [
        { value: "package1", label: "Package 1", detail: "River, culture & living heritage" },
        { value: "package2", label: "Package 2", detail: "Nature's wonders exploration" },
      ],
    },
    {
      key: "transport",
      question: "How will you travel from Miri?",
      hint: "Long Taa's return 4WD is the default for the remote route.",
      type: "choice",
      choices: [
        { value: "longTaa4wd", label: "Use Long Taa 4WD", detail: "RM1,500 per vehicle, return; up to 3 guests" },
        { value: "own4wd", label: "Request own-4WD approval", detail: "Must be terrain-suitable and approved first" },
      ],
    },
    {
      key: "riverSupport",
      question: "Should Clement arrange river/activity support?",
      hint: "The published RM600 covers a longboat, local guide and porter per group; its exact scope needs confirmation.",
      type: "choice",
      choices: [
        { value: "required", label: "Yes, include it", detail: "RM600 per group of up to 3" },
        { value: "discuss", label: "Please advise", detail: "Let Clement recommend what suits the visit" },
        { value: "notRequired", label: "Not required" },
      ],
    },
    { key: "specialRequirements", question: "Any dietary, accessibility, child-related or other needs?", type: "textarea", placeholder: "Share useful details, or skip this step" },
  ],
  ms: [
    { key: "name", question: "Apakah nama yang patut Clement jangkakan?", type: "text", placeholder: "Nama anda" },
    { key: "arrivalDate", question: "Bilakah anda ingin tiba?", hint: "Jika tarikh fleksibel, masukkan tarikh pilihan buat masa ini.", type: "date" },
    { key: "backupDate", question: "Adakah anda mempunyai tarikh ketibaan pilihan kedua?", hint: "Pilihan kedua boleh mengurangkan pertanyaan susulan jika tarikh utama tidak tersedia.", type: "date" },
    { key: "guests", question: "Berapa orang tetamu akan datang?", hint: "Satu 4WD atau bot panjang memuatkan sehingga tiga tetamu.", type: "number", placeholder: "Contohnya, 2" },
    { key: "nights", question: "Berapa malam anda ingin menginap?", hint: "Tiga hari dua malam ialah cadangan permulaan; tempoh lain boleh diminta.", type: "number", placeholder: "Contohnya, 2" },
    {
      key: "stayOption", question: "Pilih jenis penginapan.", type: "choice", choices: [
        { value: "meals", label: "Penginapan + makanan tempatan", detail: "RM180 seorang/malam" },
        { value: "accommodation", label: "Penginapan sahaja", detail: "RM50 seorang/malam; masak sendiri" },
      ],
    },
    {
      key: "experiencePackage", question: "Pilih satu pakej pengalaman.", hint: "Pakej 1 dan Pakej 2 ialah pilihan berasingan.", type: "choice", choices: [
        { value: "package1", label: "Pakej 1", detail: "Sungai, budaya & warisan hidup" },
        { value: "package2", label: "Pakej 2", detail: "Penerokaan keajaiban alam" },
      ],
    },
    {
      key: "transport", question: "Bagaimana anda akan bergerak dari Miri?", hint: "4WD pergi balik Long Taa ialah pilihan asal untuk laluan pedalaman.", type: "choice", choices: [
        { value: "longTaa4wd", label: "Guna 4WD Long Taa", detail: "RM1,500 sebuah, pergi balik; sehingga 3 tetamu" },
        { value: "own4wd", label: "Mohon guna 4WD sendiri", detail: "Mesti sesuai untuk medan dan diluluskan dahulu" },
      ],
    },
    {
      key: "riverSupport", question: "Perlukah Clement mengatur sokongan sungai/aktiviti?", hint: "Kadar RM600 yang diterbitkan merangkumi bot panjang, pemandu tempatan dan porter bagi setiap kumpulan; skop tepat perlu disahkan.", type: "choice", choices: [
        { value: "required", label: "Ya, sertakan", detail: "RM600 setiap kumpulan sehingga 3 orang" },
        { value: "discuss", label: "Minta cadangan", detail: "Clement cadangkan yang sesuai" },
        { value: "notRequired", label: "Tidak diperlukan" },
      ],
    },
    { key: "specialRequirements", question: "Ada keperluan diet, aksesibiliti, kanak-kanak atau keperluan lain?", type: "textarea", placeholder: "Kongsi maklumat berguna, atau langkau" },
  ],
};

const emptyBrief: Partial<TripBrief> = {};

function isComplete(brief: Partial<TripBrief>): brief is TripBrief {
  return Boolean(
    brief.name &&
    brief.arrivalDate &&
    brief.backupDate !== undefined &&
    brief.guests &&
    brief.nights &&
    brief.stayOption &&
    brief.experiencePackage &&
    brief.transport &&
    brief.riverSupport &&
    brief.specialRequirements !== undefined,
  );
}

function displayValue(key: StepKey, value: TripBrief[StepKey]) {
  if (key === "stayOption") return stayLabels[value as StayOption];
  if (key === "experiencePackage") return packageLabels[value as ExperiencePackage];
  if (key === "transport") return transportLabels[value as TransportOption];
  if (key === "riverSupport") return riverSupportLabels[value as RiverSupportOption];
  if (key === "guests") return `${value} guest${value === 1 ? "" : "s"}`;
  if (key === "nights") return `${value} night${value === 1 ? "" : "s"}`;
  if (key === "specialRequirements") return String(value || "None shared");
  return String(value);
}

export function GuidedTripPlanner({ language, onExit }: { language: SiteLanguage; onExit: () => void }) {
  const steps = stepsByLanguage[language];
  const [brief, setBrief] = useState<Partial<TripBrief>>(emptyBrief);
  const [stepIndex, setStepIndex] = useState(0);
  const [draftValue, setDraftValue] = useState("");
  const [error, setError] = useState("");
  const [showReview, setShowReview] = useState(false);
  const [returnToReview, setReturnToReview] = useState(false);
  const step = steps[stepIndex];
  const copy = language === "ms"
    ? {
        kicker: "Ringkasan perjalanan",
        intro: "Saya akan kumpulkan butiran penting dahulu supaya Clement boleh menyemak ketersediaan dan sebut harga tanpa banyak soalan susulan.",
        progress: "Langkah",
        next: "Seterusnya",
        skip: "Tiada keperluan khas",
        skipDate: "Tiada tarikh pilihan kedua",
        invalidNumber: "Masukkan nombor antara 1 dan 30.",
        required: "Sila isi jawapan ini.",
        reviewTitle: "Ringkasan anda sedia dihantar",
        reviewNote: "Ini anggaran perancangan berdasarkan kadar yang diterbitkan, bukan sebut harga atau tempahan yang disahkan.",
        estimate: "Anggaran kadar diketahui",
        send: "Minta ketersediaan & sebut harga",
        edit: "Ubah",
        restart: "Mula semula",
        ask: "Tanya soalan lain",
        dateSimulation: "Simulasi tarikh laman web",
        dateNote: "Ini bukan ketersediaan langsung. Clement masih perlu mengesahkan tarikh ini.",
        availability: { available: "Tersedia (simulasi)", unavailable: "Tidak tersedia (simulasi)", confirm: "Perlu pengesahan komuniti" },
      }
    : {
        kicker: "Trip brief",
        intro: "I’ll collect the practical details first, so Clement can check availability and quote with fewer follow-up questions.",
        progress: "Step",
        next: "Next",
        skip: "No special requirements",
        skipDate: "No backup date",
        invalidNumber: "Enter a whole number between 1 and 30.",
        required: "Please complete this answer.",
        reviewTitle: "Your enquiry brief is ready",
        reviewNote: "This is a planning estimate using published rates, not a quotation or confirmed booking.",
        estimate: "Known-rate estimate",
        send: "Request availability & quotation",
        edit: "Edit",
        restart: "Start over",
        ask: "Ask another question",
        dateSimulation: "Website date simulation",
        dateNote: "This is not live availability. Clement still needs to confirm this date.",
        availability: { available: "Available (simulated)", unavailable: "Unavailable (simulated)", confirm: "Community confirmation needed" },
      };

  const completedBrief = isComplete(brief) ? brief : null;
  const estimate = useMemo(
    () => (completedBrief ? calculateTripEstimate(completedBrief) : null),
    [completedBrief],
  );
  const isDateStep = step.key === "arrivalDate" || step.key === "backupDate";
  const draftAvailability = isDateStep && draftValue
    ? getSimulatedAvailability(draftValue)
    : null;
  const availabilityLabel = (status: SimulatedAvailabilityStatus) => copy.availability[status];

  const finishStep = (value: TripBrief[StepKey]) => {
    const updated = { ...brief, [step.key]: value };
    setBrief(updated);
    setDraftValue("");
    setError("");
    if (returnToReview || stepIndex === steps.length - 1) {
      setShowReview(true);
      setReturnToReview(false);
    } else {
      setStepIndex((current) => current + 1);
    }
  };

  const submitText = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = draftValue.trim();
    if ((step.type === "number")) {
      const parsed = parsePositiveInteger(value);
      if (parsed === null) {
        setError(copy.invalidNumber);
        return;
      }
      finishStep(parsed);
      return;
    }
    if (!value && step.key !== "specialRequirements") {
      setError(copy.required);
      return;
    }
    finishStep(value);
  };

  const editStep = (key: StepKey) => {
    const index = steps.findIndex((candidate) => candidate.key === key);
    const currentValue = brief[key];
    setStepIndex(index);
    setDraftValue(typeof currentValue === "string" || typeof currentValue === "number" ? String(currentValue) : "");
    setReturnToReview(true);
    setShowReview(false);
  };

  const restart = () => {
    setBrief(emptyBrief);
    setStepIndex(0);
    setDraftValue("");
    setError("");
    setShowReview(false);
    setReturnToReview(false);
  };

  if (showReview && completedBrief && estimate) {
    const message = buildTripBriefMessage(completedBrief);
    return (
      <div className="guided-planner planner-review">
        <div className="chat-message is-assistant planner-intro">
          <span>{copy.kicker}</span>
          <p>{copy.reviewTitle}</p>
        </div>
        <div className="planner-summary">
          {steps.map((reviewStep) => (
            <div key={reviewStep.key}>
              <span>{reviewStep.question}</span>
              <strong>{displayValue(reviewStep.key, completedBrief[reviewStep.key])}</strong>
              {(reviewStep.key === "arrivalDate" || reviewStep.key === "backupDate") && completedBrief[reviewStep.key] ? (
                <em className={`planner-date-inline is-${getSimulatedAvailability(completedBrief[reviewStep.key])}`}>
                  {availabilityLabel(getSimulatedAvailability(completedBrief[reviewStep.key]))}
                </em>
              ) : null}
              <button type="button" onClick={() => editStep(reviewStep.key)}>{copy.edit}</button>
            </div>
          ))}
        </div>
        <div className="planner-estimate">
          <span>{copy.estimate}</span>
          <strong>RM{estimate.knownRateTotal.toLocaleString("en-MY")}</strong>
          <p>{copy.reviewNote}</p>
          <p>Package/activity costs are excluded. River-support scope and final pricing require confirmation.</p>
        </div>
        <a className="planner-whatsapp" href={makeWhatsAppUrl(message)} target="_blank" rel="noreferrer">
          {copy.send}
        </a>
        <div className="planner-secondary-actions">
          <button type="button" onClick={restart}>{copy.restart}</button>
          <button type="button" onClick={onExit}>{copy.ask}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="guided-planner">
      <div className="chat-message is-assistant planner-intro">
        <span>{copy.kicker}</span>
        <p>{copy.intro}</p>
      </div>
      <div className="planner-progress" aria-label={`${copy.progress} ${stepIndex + 1} / ${steps.length}`}>
        <span>{copy.progress} {stepIndex + 1} / {steps.length}</span>
        <i style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }} />
      </div>
      <div className="planner-question">
        <h3>{step.question}</h3>
        {step.hint ? <p>{step.hint}</p> : null}
      </div>
      {step.type === "choice" ? (
        <div className="planner-choices">
          {step.choices?.map((choice) => (
            <button key={choice.value} type="button" onClick={() => finishStep(choice.value)}>
              <strong>{choice.label}</strong>
              {choice.detail ? <span>{choice.detail}</span> : null}
            </button>
          ))}
        </div>
      ) : (
        <form className="planner-input" onSubmit={submitText}>
          {step.type === "textarea" ? (
            <textarea
              autoFocus
              rows={3}
              maxLength={500}
              placeholder={step.placeholder}
              value={draftValue}
              onChange={(event) => setDraftValue(event.target.value)}
            />
          ) : (
            <input
              autoFocus
              type={step.type}
              inputMode={step.type === "number" ? "numeric" : undefined}
              min={step.type === "number" ? 1 : undefined}
              max={step.type === "number" ? 30 : undefined}
              maxLength={step.type === "text" ? 100 : undefined}
              placeholder={step.placeholder}
              value={draftValue}
              onChange={(event) => setDraftValue(event.target.value)}
            />
          )}
          {error ? <p className="planner-error" role="alert">{error}</p> : null}
          {draftAvailability ? (
            <div className={`planner-date-status is-${draftAvailability}`} role="status">
              <span>{copy.dateSimulation}</span>
              <strong>{availabilityLabel(draftAvailability)}</strong>
              <p>{copy.dateNote}</p>
            </div>
          ) : null}
          <div>
            {step.key === "backupDate" ? (
              <button type="button" className="planner-skip" onClick={() => finishStep("")}>{copy.skipDate}</button>
            ) : null}
            {step.key === "specialRequirements" ? (
              <button type="button" className="planner-skip" onClick={() => finishStep("")}>{copy.skip}</button>
            ) : null}
            <button type="submit" className="planner-next">{copy.next}</button>
          </div>
        </form>
      )}
      <button type="button" className="planner-exit" onClick={onExit}>{copy.ask}</button>
    </div>
  );
}
