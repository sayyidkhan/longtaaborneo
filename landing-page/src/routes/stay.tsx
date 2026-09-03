import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/stay")({
  component: StayPage,
});

function StayPage() {
  return (
    <main className="interior-page">
      <p className="eyebrow">Stay & experiences</p>
      <h1>Stay inside the story.</h1>
      <p className="lead">
        Simple longhouse accommodation with the choice to prepare your own
        meals or enjoy three local meals each day.
      </p>
      <div className="option-grid">
        <article className="option-card">
          <span>Accommodation only</span>
          <strong>RM50</strong>
          <p>Per person, per night. Self-cooking facilities included.</p>
        </article>
        <article className="option-card featured">
          <span>Accommodation + meals</span>
          <strong>RM180</strong>
          <p>Per person, per night. Breakfast, lunch, and local dinner.</p>
        </article>
      </div>
      <Link className="text-link" to="/plan">
        Continue to trip planning →
      </Link>
    </main>
  );
}
