import { useEffect, useMemo, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { asset, whatsappUrl } from "../content";
import { TreeJourneyScene } from "../tree-journey-scene";

export const Route = createFileRoute("/")({ component: HomePage });

const stageLabels = [
  "Begin above",
  "The village",
  "Stay and explore",
  "Heritage and planning",
  "Four ways to meet Long Taa",
  "Connected yet remote",
  "The threshold",
  "Begin a conversation",
];

function HomePage() {
  const [progress, setProgress] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);
  const [thresholdVideoDuration, setThresholdVideoDuration] = useState(0);
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

    const scrubStart = 0.85;
    const scrubEnd = 0.97;
    const scrubProgress = Math.min(1, Math.max(0, (progress - scrubStart) / (scrubEnd - scrubStart)));
    const targetTime = scrubProgress * Math.max(0, thresholdVideoDuration - 0.04);
    const frame = window.requestAnimationFrame(() => {
      if (Math.abs(video.currentTime - targetTime) > 1 / 48) video.currentTime = targetTime;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [progress, thresholdVideoDuration]);

  const activeStage = useMemo(() => {
    if (progress < 0.11) return 0;
    if (progress < 0.28) return 1;
    if (progress < 0.44) return 2;
    if (progress < 0.61) return 3;
    if (progress < 0.76) return 4;
    if (progress < 0.84) return 5;
    if (progress < 0.97) return 6;
    return 7;
  }, [progress]);

  const stageClass = (index: number) => `tree-story${activeStage === index ? " is-active" : ""}`;
  const thresholdVideoOpacity = Math.min(1, Math.max(0, (progress - 0.845) / 0.025));
  const thresholdCopyOpacity = Math.min(1, Math.max(0, 1 - (progress - 0.865) / 0.03));

  return (
    <main className={`tree-home${sceneReady ? " is-ready" : ""}`}>
      <div className="tree-world" aria-hidden="true">
        <img className="tree-world-fallback" src={asset("forest-canopy.webp")} alt="" />
        <TreeJourneyScene progress={progress} onReady={() => setSceneReady(true)} />
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
        <strong>Growing the journey.</strong>
      </div>
      <div className="tree-journey-state" aria-hidden="true"><span>Canopy</span><i /><strong>{stageLabels[activeStage]}</strong></div>
      <div className="tree-progress" aria-hidden="true"><span style={{ transform: `scaleY(${progress})` }} /><small>Canopy · branches · roots · home</small></div>

      <button className="tree-enter-button" type="button" onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })}>
        Enter the village
      </button>

      <div className="tree-story-layer">
        <section className={`${stageClass(0)} tree-intro`} aria-labelledby="hero-title" aria-hidden={activeStage !== 0} inert={activeStage !== 0}>
          <h1 id="hero-title">Escape the city. Meet the real Borneo.</h1>
          <p className="tree-lead">A Sebup longhouse stay shaped by rainforest, river and living heritage.</p>
          <p className="tree-location">Long Taa · Ulu Tinjar · Sarawak</p>
          <div className="tree-actions">
            <a className="tree-primary-action" href={whatsappUrl} target="_blank" rel="noreferrer">Book on WhatsApp</a>
            <Link className="tree-secondary-action tree-text-action" to="/explore">Explore Long Taa <span aria-hidden="true">→</span></Link>
          </div>
          <div className="tree-scroll-cue"><span />Scroll to descend</div>
        </section>

        <section className={stageClass(1)} aria-labelledby="journey-title" aria-hidden={activeStage !== 1} inert={activeStage !== 1}>
          <h2 id="journey-title">Six hours from Miri. A world away from the ordinary.</h2>
          <p>Long Taa is a traditional 20-door longhouse and home of the Indigenous Sebup community, in the rainforest interior of Baram, Sarawak.</p>
          <p className="tree-branch-name">A village, not a resort</p>
          <figure><img src={asset("journey-road.webp")} alt="A remote road bordered by dense rainforest" /></figure>
        </section>

        <section className={stageClass(2)} aria-labelledby="stay-explore-title" aria-hidden={activeStage !== 2} inert={activeStage !== 2}>
          <h2 id="stay-explore-title">Stay close. Explore further.</h2>
          <div className="tree-branch-pair">
            <article><h3>Stay</h3><p>Simple longhouse accommodation, local meals and practical costs.</p><Link to="/stay">View stay options</Link></article>
            <article><h3>Explore</h3><p>The Dapui River, rainforest and natural wonders beyond the usual route.</p><Link to="/explore">Explore Long Taa</Link></article>
          </div>
        </section>

        <section className={stageClass(3)} aria-labelledby="heritage-plan-title" aria-hidden={activeStage !== 3} inert={activeStage !== 3}>
          <h2 id="heritage-plan-title">Listen first. Plan together.</h2>
          <div className="tree-branch-pair">
            <article><h3>Heritage</h3><p>Understand the community context and how to visit with respect.</p><Link to="/heritage">Read the story</Link></article>
            <article><h3>Plan</h3><p>Turn interest into a qualified WhatsApp booking enquiry.</p><Link to="/plan">Plan a visit</Link></article>
          </div>
        </section>

        <section className={`${stageClass(4)} tree-visual-story`} aria-labelledby="ways-title" aria-hidden={activeStage !== 4} inert={activeStage !== 4}>
          <div>
            <h2 id="ways-title">The journey is part of the story.</h2>
            <p>From longhouse life to river days, every visit is shaped by the place and the people who welcome you.</p>
            <p className="tree-branch-name">Four ways to meet Long Taa</p>
          </div>
          <div className="tree-mini-gallery">
            <article><img src={asset("journal/eco-03.webp")} alt="A Long Taa longhouse with palms and open sky" /><span>Stay</span><h3>Longhouse living</h3></article>
            <article><img src={asset("journal/eco-14.webp")} alt="A longboat journey on the Dapui River" /><span>River</span><h3>Move with the water</h3></article>
            <article><img src={asset("journal/eco-13.webp")} alt="A visitor walking through the rainforest" /><span>Forest</span><h3>Walk beyond the road</h3></article>
            <article><img src={asset("journal/eco-07.webp")} alt="A gathering in the Long Taa longhouse" /><span>Heritage</span><h3>Listen and learn</h3></article>
          </div>
        </section>

        <section className={`${stageClass(5)} tree-connected-story`} aria-labelledby="connected-title" aria-hidden={activeStage !== 5} inert={activeStage !== 5}>
          <div>
            <h2 id="connected-title">Connected yet remote.</h2>
            <p>Longhouse guests have 24-hour solar electricity, fresh mountain-sourced water and telecommunications connectivity, while living close to the forest and river.</p>
            <p className="tree-branch-name">Stay close to the story</p>
            <Link to="/stay">View stay options</Link>
          </div>
        </section>

        <section className={`${stageClass(6)} tree-threshold`} aria-labelledby="threshold-title" aria-hidden={activeStage !== 6} inert={activeStage !== 6} style={activeStage === 6 ? { opacity: thresholdCopyOpacity } : undefined}>
          <h2 id="threshold-title">The roots lead home.</h2>
          <p>Keep scrolling to cross the longhouse threshold.</p>
        </section>

        <section className={`${stageClass(7)} tree-booking-room`} aria-labelledby="closing-title" aria-hidden={activeStage !== 7} inert={activeStage !== 7}>
          <div className="tree-booking-copy">
            <h2 id="closing-title">Come as a visitor. Leave with a story.</h2>
            <p>Tell Clement when you hope to travel and what you would like to experience. Availability and activities are confirmed with the community.</p>
            <p className="tree-branch-name">Begin with a conversation</p>
            <div className="tree-actions">
              <a className="tree-primary-action" href={whatsappUrl} target="_blank" rel="noreferrer">Check dates on WhatsApp</a>
              <Link className="tree-secondary-action tree-text-action" to="/plan">Plan a visit <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <div className="tree-contact-panel">
            <img src={asset("long-taa-dapui-logo-transparent.png")} alt="Long Taa Dapui Living Heritage Village logo" />
            <strong>Long Taa Borneo Eco Stay</strong>
            <p>Nature · Culture · Adventure · Living Heritage</p>
            <p>A respectful visit begins with listening to the people and place that welcome you.</p>
            <a href="mailto:longtaaborneo@gmail.com">longtaaborneo@gmail.com</a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">+60 19-856 3536</a>
            <small>© 2026 Long Taa Borneo Eco Stay. All rights reserved.</small>
          </div>
          <span className="tree-reverse-hint">Scroll up to return to the canopy</span>
        </section>
      </div>

      <div className="tree-scroll-track" aria-hidden="true" />
    </main>
  );
}
