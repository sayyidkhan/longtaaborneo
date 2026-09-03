import { Link, createFileRoute } from "@tanstack/react-router";

import { asset, whatsappUrl } from "../content";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <section className="hero home-hero" aria-labelledby="hero-title">
        <img className="hero-image" src={asset("river-walk.webp")} width="790" height="445" alt="A quiet, tree-lined stretch of the Dapui River" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">Long Taa · Ulu Tinjar · Sarawak</p>
          <h1 id="hero-title">Escape the city. Experience the real Borneo.</h1>
          <p className="hero-copy">
            A Sebup longhouse stay shaped by rainforest, river, culture, adventure and living heritage.
          </p>
          <div className="actions">
            <a className="primary-action" href={whatsappUrl} target="_blank" rel="noreferrer">Book on WhatsApp</a>
            <Link className="secondary-action" to="/explore">Explore Long Taa</Link>
          </div>
        </div>
      </section>

      <section className="journey content-section" aria-labelledby="journey-title">
        <p className="section-label">A village, not a resort</p>
        <h2 id="journey-title">Six hours from Miri. A world away from the ordinary.</h2>
        <p className="lead">Long Taa is a traditional 20-door longhouse and home of the Indigenous Sebup community, in the rainforest interior of Baram, Sarawak.</p>
        <div className="pillars">
          <article>
            <span>01</span>
            <h3>Stay</h3>
            <p>Simple longhouse accommodation, local meals and practical costs.</p>
            <Link to="/stay">View stay options</Link>
          </article>
          <article>
            <span>02</span>
            <h3>Explore</h3>
            <p>The Dapui River, rainforest and natural wonders beyond the usual route.</p>
            <Link to="/explore">Explore Long Taa</Link>
          </article>
          <article>
            <span>03</span>
            <h3>Heritage</h3>
            <p>Understand the community context and how to visit with respect.</p>
            <Link to="/heritage">Read the story</Link>
          </article>
          <article>
            <span>04</span>
            <h3>Plan</h3>
            <p>Turn interest into a qualified WhatsApp booking enquiry.</p>
            <Link to="/plan">Plan a visit</Link>
          </article>
        </div>
      </section>
      <section className="image-statement content-section split-feature">
        <img src={asset("longhouse.webp")} width="801" height="451" loading="lazy" alt="Long Taa longhouse in its green surroundings" />
        <div>
          <p className="section-label">Stay close to the story</p>
          <h2>Connected yet remote.</h2>
          <p>Longhouse guests have 24-hour solar electricity, fresh mountain-sourced water and telecommunications connectivity, while living close to the forest and river.</p>
          <Link className="text-link" to="/stay">View stay options <span aria-hidden="true">→</span></Link>
        </div>
      </section>
      <section className="closing-panel content-section">
        <p className="section-label">Begin with a conversation</p>
        <h2>Come as a visitor. Leave with a story.</h2>
        <p>Tell Clement when you hope to travel and what you would like to experience. Availability and activities are confirmed with the community.</p>
        <a className="primary-action dark-action" href={whatsappUrl} target="_blank" rel="noreferrer">Check dates on WhatsApp</a>
      </section>
    </main>
  );
}
