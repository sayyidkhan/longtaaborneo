import { createFileRoute } from "@tanstack/react-router";

import { whatsappUrl } from "../content";

export const Route = createFileRoute("/plan")({
  component: PlanPage,
});

function PlanPage() {
  return (
    <main className="interior-page plan-page">
      <p className="eyebrow">Plan & book</p>
      <h1>Your journey starts with a conversation.</h1>
      <p className="lead">
        Long Taa is approximately six hours from Miri by 4WD. Advance booking
        is required so accommodation, transport, guides, and activities can be
        confirmed safely.
      </p>
      <dl className="facts">
        <div>
          <dt>Starting point</dt>
          <dd>Miri, Sarawak</dd>
        </div>
        <div>
          <dt>4WD transfer</dt>
          <dd>RM1,500 return · maximum 3 guests</dd>
        </div>
        <div>
          <dt>Longboat + guide + porter</dt>
          <dd>RM600 per group · maximum 3 guests</dd>
        </div>
      </dl>
      <a className="primary-action" href={whatsappUrl}>
        Start a WhatsApp enquiry
      </a>
    </main>
  );
}
