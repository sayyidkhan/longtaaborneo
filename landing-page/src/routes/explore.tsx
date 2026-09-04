import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { asset, makeWhatsAppUrl } from "../content";
import { fieldJournal } from "../photo-library";

export const Route = createFileRoute("/explore")({ component: ExplorePage });

const naturalWonders = [
  {
    name: "Acin Salt Spring",
    description: "A natural salt spring in the rainforest, known locally as Acin.",
    image: "wonders/acin-salt-spring.jpg",
    alt: "Illustrative view of a mineral spring emerging from the Borneo rainforest floor",
  },
  {
    name: "Batu Ukat",
    description: "Ladder Rock, a distinctive ladder-like natural formation.",
    image: "wonders/batu-ukat.jpg",
    alt: "Illustrative view of a naturally stepped rock formation surrounded by rainforest",
  },
  {
    name: "Batu Nginan",
    description: "A gigantic natural rock formation within the Dapui landscape.",
    image: "wonders/batu-nginan.jpg",
    alt: "Illustrative view of a monumental rock formation rising through dense rainforest",
  },
  {
    name: "Batu Tatip",
    description: "A narrow natural passage surrounded by local stories.",
    image: "wonders/batu-tatip.jpg",
    alt: "Illustrative view through a narrow natural stone passage in the rainforest",
  },
  {
    name: "Batu Belacek",
    description: "The Rock Door, a doorway-like rock formation in the wilderness.",
    image: "wonders/batu-belacek.jpg",
    alt: "Illustrative view of a doorway-like natural rock formation in the rainforest",
  },
] as const;

function ExplorePage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeWonder, setActiveWonder] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((index) => index === null ? null : (index + 1) % fieldJournal.length);
      if (event.key === "ArrowLeft") setActiveIndex((index) => index === null ? null : (index - 1 + fieldJournal.length) % fieldJournal.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <main>
      <section className="page-hero explore-hero">
        <p className="eyebrow">Explore Long Taa</p>
        <h1>Nature beyond the usual tourist trail.</h1>
        <p className="lead">Follow the Dapui River into a landscape of rainforest, conservation and natural formations. What is possible on the day depends on local conditions.</p>
      </section>
      <section className="content-section feature-copy">
        <div><p className="section-label">The Dapui River</p><h2>Let the river set the pace.</h2></div>
        <div><p>Longboat journeys, river scenery and swimming in refreshing waters may be part of a Long Taa visit where appropriate. River, water-level and safety conditions always guide what happens next.</p><a className="text-link" href={makeWhatsAppUrl("Hello Long Taa, I would like to ask about a Dapui River experience.")} target="_blank" rel="noreferrer">Ask about the river <span aria-hidden="true">→</span></a></div>
      </section>
      <section className="content-section conservation-panel">
        <img src={asset("fish-conservation.webp")} width="240" height="705" loading="lazy" alt="Native freshwater fish at the Long Taa Tagang Fish Conservation Area" />
        <div><p className="section-label">Community conservation</p><h2>A river protected by its community.</h2><p>The Long Taa Tagang Fish Conservation Area is a community-managed area. Visitors may see native freshwater fish including Semah, Empurau, Sultan, Adong and Kaloi, subject to river and water-level conditions.</p><p className="fine-print">Please follow local guidance and conservation rules at all times.</p></div>
      </section>
      <section className="content-section wonders-section" aria-labelledby="wonders-title">
        <div className="wonders-heading">
          <div><p className="section-label">Natural wonders</p><h2 id="wonders-title">Walk further into the Dapui landscape.</h2></div>
          <p>Select a landmark to reveal its story and an illustrative view.</p>
        </div>
        <div className="wonders-accordion">
          {naturalWonders.map((wonder, index) => {
            const isOpen = activeWonder === index;
            const panelId = `wonder-panel-${index}`;
            const triggerId = `wonder-trigger-${index}`;
            return (
              <article className={isOpen ? "is-open" : ""} key={wonder.name}>
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setActiveWonder(isOpen ? null : index)}
                  >
                    <span><small>{String(index + 1).padStart(2, "0")}</small>{wonder.name}</span>
                    <i aria-hidden="true" />
                  </button>
                </h3>
                <div
                  className="wonders-panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                >
                  <div className="wonders-panel-inner">
                    <figure>
                      <img src={asset(wonder.image)} width="1672" height="941" loading="lazy" alt={wonder.alt} />
                      <figcaption>Illustrative visualisation · Confirm exact access and conditions locally</figcaption>
                    </figure>
                    <div><p>{wonder.description}</p><span>Activities and access remain subject to weather, local guidance and safety conditions.</span></div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="content-section gallery-section" aria-labelledby="gallery-title"><div className="gallery-heading"><div><p className="section-label">The full field journal</p><h2 id="gallery-title">A place best met slowly.</h2></div><p>Every supplied Long Taa photograph is here. Tap any image to view it larger.</p></div><div className="gallery-grid field-journal-grid">{fieldJournal.map((image, index) => <button key={image.src} type="button" className="gallery-card" onClick={() => setActiveIndex(index)} aria-label={`View larger image: ${image.alt}`}><img src={asset(image.src)} width={image.width} height={image.height} loading="lazy" alt={image.alt} /></button>)}</div></section>
      <section className="closing-panel content-section"><p className="section-label">Conditions matter</p><h2>Weather, river, water level, road and safety conditions shape every visit.</h2><p>Activities can change, be postponed or be replaced when conditions are considered unsuitable. Talk to Long Taa about the experience you hope to have.</p><Link className="primary-action dark-action" to="/plan">Plan your journey</Link></section>
      {activeIndex !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer"><button className="lightbox-close" type="button" onClick={() => setActiveIndex(null)}>Close <span aria-hidden="true">×</span></button><button className="lightbox-nav prev" type="button" onClick={() => setActiveIndex((activeIndex - 1 + fieldJournal.length) % fieldJournal.length)} aria-label="Previous image">←</button><figure><img src={asset(fieldJournal[activeIndex].src)} width={fieldJournal[activeIndex].width} height={fieldJournal[activeIndex].height} alt={fieldJournal[activeIndex].alt} /><figcaption>{fieldJournal[activeIndex].alt}</figcaption></figure><button className="lightbox-nav next" type="button" onClick={() => setActiveIndex((activeIndex + 1) % fieldJournal.length)} aria-label="Next image">→</button></div>}
    </main>
  );
}
