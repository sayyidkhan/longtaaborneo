import { Link, createFileRoute } from "@tanstack/react-router";

import { whatsappUrl } from "../content";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="eyebrow">Long Taa · Ulu Tinjar · Sarawak</div>
        <h1 id="hero-title">Experience the real Borneo.</h1>
        <p className="hero-copy">
          A community-led Sebup longhouse stay shaped by rainforest, river,
          culture, adventure, and living heritage.
        </p>
        <div className="actions">
          <a className="primary-action" href={whatsappUrl}>
            Plan on WhatsApp
          </a>
          <Link className="secondary-action" to="/explore">
            Discover Long Taa
          </Link>
        </div>
      </section>

      <section className="journey" aria-labelledby="journey-title">
        <p className="section-label">Five-page app boilerplate</p>
        <h2 id="journey-title">Six hours from Miri. A world away.</h2>
        <div className="pillars">
          <article>
            <span>01</span>
            <h3>Stay</h3>
            <p>Clear accommodation, meals, transport, and group information.</p>
            <Link to="/stay">View stay options</Link>
          </article>
          <article>
            <span>02</span>
            <h3>Explore</h3>
            <p>Rainforest, the Dapui River, and community-led conservation.</p>
            <Link to="/explore">Explore Long Taa</Link>
          </article>
          <article>
            <span>03</span>
            <h3>Heritage</h3>
            <p>A respectful introduction to a living Indigenous community.</p>
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
    </main>
  );
}
