import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/heritage")({
  component: HeritagePage,
});

function HeritagePage() {
  return (
    <main className="interior-page heritage-page">
      <p className="eyebrow">Our story & living heritage</p>
      <h1>A living village, not a tourist resort.</h1>
      <p className="lead">
        Long Taa is home to the Sebup community. A visit should support local
        livelihoods, respect community rules, and help protect river and
        rainforest ecosystems.
      </p>
      <blockquote>
        Come as a visitor. Leave with a story—and respect for the people and
        place that shared it.
      </blockquote>
      <Link className="text-link" to="/plan">
        Plan a respectful visit →
      </Link>
    </main>
  );
}
