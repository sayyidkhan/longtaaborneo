import { type CSSProperties, useState } from "react";

import { asset, makeWhatsAppUrl } from "./content";
import {
  getPackageJourney,
  type PackageJourneyId,
} from "./package-journeys";

export function PackageJourneyExplorer() {
  const [packageId, setPackageId] = useState<PackageJourneyId>("package1");
  const [stepIndex, setStepIndex] = useState(0);
  const journey = getPackageJourney(packageId);
  const step = journey.steps[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === journey.steps.length - 1;

  const choosePackage = (nextPackage: PackageJourneyId) => {
    setPackageId(nextPackage);
    setStepIndex(0);
  };

  const openTripPlanner = () => {
    window.dispatchEvent(new Event("longtaa:open-trip-planner"));
  };

  const enquiry = `Hello Clement, I am considering ${journey.number} — ${journey.name}. I understand the journey shown on the website is illustrative and the exact order, duration and activities depend on conditions and availability. Please help me build a suitable itinerary and quotation.`;

  return (
    <section className="package-walkthrough" aria-labelledby="package-journey-title">
      <div className="package-walkthrough-heading">
        <div>
          <p className="section-label">Walk through the expedition</p>
          <h2 id="package-journey-title">See the whole journey before you choose.</h2>
        </div>
        <p>
          Start on this website, travel from Miri, follow each experience, then
          return home. This is an illustrative sequence—not a fixed itinerary.
        </p>
      </div>

      <div className="package-switch" role="group" aria-label="Choose an experience package">
        {(["package1", "package2"] as const).map((id) => {
          const option = getPackageJourney(id);
          const selected = id === packageId;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={selected}
              onClick={() => choosePackage(id)}
            >
              <span>{option.number}</span>
              <strong>{option.name}</strong>
            </button>
          );
        })}
      </div>

      <div className="expedition-stage" key={`${packageId}-${stepIndex}`}>
        <figure className="expedition-visual">
          <img src={asset(step.image)} alt={step.imageAlt} width="900" height="900" />
          <figcaption>
            <span>{step.phase}</span>
            <strong>{String(stepIndex + 1).padStart(2, "0")} / {String(journey.steps.length).padStart(2, "0")}</strong>
          </figcaption>
        </figure>

        <div className="expedition-copy" aria-live="polite">
          <p className="expedition-package">{journey.number} · {journey.name}</p>
          <p className="expedition-promise">{journey.promise}</p>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
          <aside>{step.note}</aside>
          <div className="expedition-controls">
            <button
              type="button"
              disabled={isFirst}
              onClick={() => setStepIndex((current) => Math.max(0, current - 1))}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => {
                if (isLast) openTripPlanner();
                else setStepIndex((current) => Math.min(journey.steps.length - 1, current + 1));
              }}
            >
              {isLast ? "Build my trip brief" : "Next step"}
            </button>
          </div>
        </div>
      </div>

      <ol
        className="expedition-rail"
        aria-label={`${journey.number} journey steps`}
        style={{ "--journey-step-count": journey.steps.length } as CSSProperties}
      >
        {journey.steps.map((journeyStep, index) => (
          <li key={`${journeyStep.shortLabel}-${index}`}>
            <button
              type="button"
              className={index === stepIndex ? "is-active" : undefined}
              aria-current={index === stepIndex ? "step" : undefined}
              onClick={() => setStepIndex(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{journeyStep.shortLabel}</small>
            </button>
          </li>
        ))}
      </ol>

      <div className="expedition-handoff">
        <p>
          A 3-day, 2-night visit is a useful starting point. Clement confirms
          what fits your dates, conditions and selected package.
        </p>
        <div>
          <button type="button" onClick={openTripPlanner}>Build a complete enquiry</button>
          <a href={makeWhatsAppUrl(enquiry)} target="_blank" rel="noreferrer">Ask Clement about {journey.number}</a>
        </div>
      </div>
    </section>
  );
}
