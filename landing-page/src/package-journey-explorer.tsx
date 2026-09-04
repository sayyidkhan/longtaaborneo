import { type CSSProperties, useEffect, useRef, useState } from "react";

import { asset, makeWhatsAppUrl } from "./content";
import {
  getPackageJourney,
  type PackageJourneyId,
} from "./package-journeys";

export function PackageJourneyExplorer() {
  const [packageId, setPackageId] = useState<PackageJourneyId>("package1");
  const [stepIndex, setStepIndex] = useState(0);
  const routeTrackRef = useRef<HTMLDivElement>(null);
  const mobileStepRefs = useRef<Array<HTMLElement | null>>([]);
  const touchStartX = useRef<number | null>(null);
  const journey = getPackageJourney(packageId);
  const step = journey.steps[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === journey.steps.length - 1;
  const trackProgress = journey.steps.length > 1
    ? (stepIndex / (journey.steps.length - 1)) * 100
    : 0;
  const progress = Math.round(trackProgress);
  const viewedProgress = Math.round(((stepIndex + 1) / journey.steps.length) * 100);

  const choosePackage = (nextPackage: PackageJourneyId) => {
    setPackageId(nextPackage);
    setStepIndex(0);
  };

  const openTripPlanner = () => {
    window.dispatchEvent(new Event("longtaa:open-trip-planner"));
  };

  const previousStep = () => {
    setStepIndex((current) => Math.max(0, current - 1));
  };

  const nextStep = () => {
    setStepIndex((current) => Math.min(journey.steps.length - 1, current + 1));
  };

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const track = routeTrackRef.current;
      const activeStep = track?.querySelector<HTMLElement>('[aria-current="step"]');
      if (!track || !activeStep) return;
      const left = activeStep.offsetLeft + activeStep.offsetWidth / 2 - track.clientWidth / 2;
      track.scrollTo({
        left: Math.max(0, left),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [packageId, stepIndex]);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 999px)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.stepIndex);
        if (Number.isInteger(index)) setStepIndex(index);
      },
      { rootMargin: "-28% 0px -42%", threshold: [0, 0.25, 0.5, 0.75] },
    );
    mobileStepRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });
    return () => observer.disconnect();
  }, [packageId]);

  const enquiry = `Hello Clement, I am considering ${journey.number} — ${journey.name}. I understand the journey shown on the website is illustrative and the exact order, duration and activities depend on conditions and availability. Please help me build a suitable itinerary and quotation.`;

  return (
    <section className="package-walkthrough" aria-labelledby="package-journey-title">
      <div className="package-walkthrough-heading">
        <div>
          <p className="section-label">Your expedition track</p>
          <h2 id="package-journey-title">Follow the journey, checkpoint by checkpoint.</h2>
        </div>
        <p>
          Trace the experience from planning in Miri to Long Taa and home again.
          Select any checkpoint to see what happens there.
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

      <div className="route-dashboard">
        <div className="route-dashboard-title">
          <span>Illustrative route · not GPS navigation</span>
          <strong>Miri → Long Taa → Miri</strong>
        </div>
        <dl>
          <div>
            <dt>Checkpoints</dt>
            <dd>{journey.steps.length}</dd>
          </div>
          <div>
            <dt>Travel in</dt>
            <dd>≈6h by 4WD</dd>
          </div>
          <div>
            <dt>Journey viewed</dt>
            <dd>{progress}%</dd>
          </div>
        </dl>
      </div>

      <div className="journey-mobile">
        <div className="journey-mobile-progress" aria-live="polite">
          <div>
            <span>{journey.number}</span>
            <strong>{step.shortLabel}</strong>
            <small>{String(stepIndex + 1).padStart(2, "0")} / {String(journey.steps.length).padStart(2, "0")}</small>
          </div>
          <i aria-hidden="true"><b style={{ width: `${viewedProgress}%` }} /></i>
        </div>

        <div className="journey-mobile-stack">
          {journey.steps.map((journeyStep, index) => (
            <article
              key={`${packageId}-${journeyStep.shortLabel}-${index}`}
              ref={(node) => { mobileStepRefs.current[index] = node; }}
              data-step-index={index}
              className={index === stepIndex ? "is-active" : undefined}
            >
              <figure>
                <img
                  src={asset(journeyStep.image)}
                  alt={journeyStep.imageAlt}
                  width="900"
                  height="900"
                  loading={index > 1 ? "lazy" : "eager"}
                />
                <figcaption>
                  <span>{String(index + 1).padStart(2, "0")} / {String(journey.steps.length).padStart(2, "0")}</span>
                  <small>{journeyStep.phase}</small>
                  <strong>{journeyStep.shortLabel}</strong>
                </figcaption>
              </figure>
              <div className="journey-mobile-copy">
                <h3>{journeyStep.title}</h3>
                <details>
                  <summary>Journey details <span>+</span></summary>
                  <p>{journeyStep.description}</p>
                  <small>{journeyStep.note}</small>
                </details>
                {index === journey.steps.length - 1 ? (
                  <button type="button" onClick={openTripPlanner}>Build my trip brief →</button>
                ) : (
                  <p className="journey-mobile-cue" aria-hidden="true">
                    Scroll to {journey.steps[index + 1].shortLabel} <span>↓</span>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="route-explorer">
        <div
          className="route-track"
          ref={routeTrackRef}
          role="navigation"
          aria-label={`${journey.number} expedition checkpoints`}
          style={{
            "--route-progress": `${trackProgress}%`,
            "--route-length": `${(journey.steps.length - 1) * 6.75}rem`,
            "--route-stop-count": journey.steps.length,
          } as CSSProperties}
        >
          <div className="route-track-line" aria-hidden="true"><i /></div>
          <ol>
            {journey.steps.map((journeyStep, index) => {
              const active = index === stepIndex;
              const complete = index < stepIndex;
              return (
                <li
                  key={`${journeyStep.shortLabel}-${index}`}
                  className={active ? "is-active" : complete ? "is-complete" : undefined}
                >
                  <button
                    type="button"
                    aria-current={active ? "step" : undefined}
                    aria-label={`Checkpoint ${index + 1}: ${journeyStep.shortLabel}`}
                    onClick={() => setStepIndex(index)}
                  >
                    <span className="route-marker">{String(index + 1).padStart(2, "0")}</span>
                    <span className="route-stop-copy">
                      <small>{journeyStep.phase}</small>
                      <strong>{journeyStep.shortLabel}</strong>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div
          className="expedition-stage"
          key={`${packageId}-${stepIndex}`}
          style={{ "--stage-progress": `${progress}%` } as CSSProperties}
        >
          <figure
            className="expedition-visual"
            onTouchStart={(event) => {
              touchStartX.current = event.changedTouches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return;
              const distance = event.changedTouches[0]?.clientX - touchStartX.current;
              touchStartX.current = null;
              if (distance < -55 && !isLast) nextStep();
              if (distance > 55 && !isFirst) previousStep();
            }}
          >
            <img src={asset(step.image)} alt={step.imageAlt} width="900" height="900" />
            <div className="expedition-photo-status" aria-hidden="true">
              <span>You are here</span>
              <strong>{progress}%</strong>
            </div>
            <p className="expedition-swipe-hint" aria-hidden="true">
              Swipe the scene <span>↔</span>
            </p>
            <figcaption>
              <span>{step.phase}</span>
              <strong>{step.shortLabel}</strong>
            </figcaption>
          </figure>

          <div className="expedition-copy" aria-live="polite">
            <div className="expedition-step-count">
              <span>Checkpoint {String(stepIndex + 1).padStart(2, "0")}</span>
              <span>of {String(journey.steps.length).padStart(2, "0")}</span>
            </div>
            <p className="expedition-package">{journey.number} · {journey.name}</p>
            <p className="expedition-promise">{journey.promise}</p>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <aside>{step.note}</aside>
            <div className="expedition-controls">
              <button
                type="button"
                disabled={isFirst}
                onClick={previousStep}
              >
                Previous stop
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isLast) openTripPlanner();
                  else nextStep();
                }}
              >
                {isLast ? "Build my trip brief" : "Continue the route →"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="expedition-handoff">
        <p>
          A 3-day, 2-night visit is a useful starting point. Clement confirms
          the exact order, timing and activities for your dates and conditions.
        </p>
        <div>
          <button type="button" onClick={openTripPlanner}>Build a complete enquiry</button>
          <a href={makeWhatsAppUrl(enquiry)} target="_blank" rel="noreferrer">Ask Clement about {journey.number}</a>
        </div>
      </div>
    </section>
  );
}
