import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { asset, makeWhatsAppUrl } from "../content";

const gallery = [
  { src: "river-walk.webp", width: 790, height: 445, alt: "A tranquil, tree-lined river in Long Taa" },
  { src: "forest-canopy.webp", width: 730, height: 974, alt: "Looking up through the rainforest canopy" },
  { src: "river-swimmer.webp", width: 790, height: 1053, alt: "A visitor beside a calm stretch of river" },
  { src: "forest-trail.webp", width: 405, height: 540, alt: "A forest trail through the Long Taa landscape" },
  { src: "dapui-river.webp", width: 468, height: 623, alt: "A guide by the Dapui River" },
  { src: "journey-road.webp", width: 731, height: 549, alt: "The road towards Long Taa through the green interior" },
];

export const Route = createFileRoute("/explore")({ component: ExplorePage });

function ExplorePage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((index) => index === null ? null : (index + 1) % gallery.length);
      if (event.key === "ArrowLeft") setActiveIndex((index) => index === null ? null : (index - 1 + gallery.length) % gallery.length);
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
      <section className="content-section wonders-section"><p className="section-label">Natural wonders</p><h2>Walk further into the Dapui landscape.</h2><div className="wonders-grid"><article><h3>Acin Salt Spring</h3><p>A natural salt spring in the rainforest, known locally as Acin.</p></article><article><h3>Batu Ukat</h3><p>Ladder Rock, a distinctive ladder-like natural formation.</p></article><article><h3>Batu Nginan</h3><p>A gigantic natural rock formation within the Dapui landscape.</p></article><article><h3>Batu Tatip</h3><p>A narrow natural passage surrounded by local stories.</p></article><article><h3>Batu Belacek</h3><p>The Rock Door, a doorway-like rock formation in the wilderness.</p></article></div></section>
      <section className="content-section gallery-section" aria-labelledby="gallery-title"><div className="gallery-heading"><div><p className="section-label">From the field</p><h2 id="gallery-title">A place best met slowly.</h2></div><p>Tap a photograph to view it larger. Images are from the supplied Long Taa library.</p></div><div className="gallery-grid">{gallery.map((image, index) => <button key={image.src} type="button" className="gallery-card" onClick={() => setActiveIndex(index)} aria-label={`View larger image: ${image.alt}`}><img src={asset(image.src)} width={image.width} height={image.height} loading="lazy" alt={image.alt} /></button>)}</div></section>
      <section className="closing-panel content-section"><p className="section-label">Conditions matter</p><h2>Weather, river, water level, road and safety conditions shape every visit.</h2><p>Activities can change, be postponed or be replaced when conditions are considered unsuitable. Talk to Long Taa about the experience you hope to have.</p><Link className="primary-action dark-action" to="/plan">Plan your journey</Link></section>
      {activeIndex !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer"><button className="lightbox-close" type="button" onClick={() => setActiveIndex(null)}>Close <span aria-hidden="true">×</span></button><button className="lightbox-nav prev" type="button" onClick={() => setActiveIndex((activeIndex - 1 + gallery.length) % gallery.length)} aria-label="Previous image">←</button><figure><img src={asset(gallery[activeIndex].src)} width={gallery[activeIndex].width} height={gallery[activeIndex].height} alt={gallery[activeIndex].alt} /><figcaption>{gallery[activeIndex].alt}</figcaption></figure><button className="lightbox-nav next" type="button" onClick={() => setActiveIndex((activeIndex + 1) % gallery.length)} aria-label="Next image">→</button></div>}
    </main>
  );
}
