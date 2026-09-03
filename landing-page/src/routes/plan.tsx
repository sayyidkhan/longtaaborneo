import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { asset, bookingIntro, makeWhatsAppUrl, whatsappUrl } from "../content";

export const Route = createFileRoute("/plan")({ component: PlanPage });

function PlanPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const date = String(form.get("date") || "").trim();
    const guests = String(form.get("guests") || "").trim();
    const experience = String(form.get("experience") || "").trim();
    const note = String(form.get("message") || "").trim();
    const message = `${bookingIntro}\n\nName: ${name}\nPreferred date: ${date}\nGuests: ${guests}\nInterested in: ${experience}\nMessage: ${note || "No additional details"}\n\nI understand this is an availability enquiry, not a confirmed booking.`;
    setSubmitted(true);
    window.open(makeWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      <section className="page-hero photo-page-hero plan-hero"><img className="page-hero-image" src={asset("journal/eco-24.webp")} width="731" height="549" alt="A 4WD vehicle on the journey to Long Taa" /><div className="page-hero-shade" /><div className="page-hero-content"><p className="eyebrow">Plan & book</p><h1>Your journey starts with a conversation.</h1><p className="lead">Long Taa is approximately six hours from Miri by 4WD. Advance booking lets the community check accommodation, transport, guides and appropriate activities for your visit.</p><a className="primary-action dark-action" href={whatsappUrl} target="_blank" rel="noreferrer">Book on WhatsApp</a></div></section>
      <section className="content-section journey-facts"><div><p className="section-label">Getting here</p><h2>From Miri, into the Borneo interior.</h2><p>Destination: Long Taa, Dapui, Ulu Tinjar, Baram, Sarawak, Malaysia. The approximate six-hour 4WD journey from Miri is part of the experience.</p><img className="journey-photo" src={asset("journal/eco-20.webp")} width="593" height="445" loading="lazy" alt="A longboat travelling through a tree-lined river" /></div><dl className="facts"><div><dt>Starting point</dt><dd>Miri, Sarawak</dd></div><div><dt>4WD transfer</dt><dd>RM1,500 per vehicle, Miri–Long Taa–Miri. Maximum 3 guests.</dd></div><div><dt>Longboat + local guide + porter</dt><dd>RM600 per group. Maximum 3 guests per longboat.</dd></div><div><dt>Group size</dt><dd>No minimum guest number. Larger groups require additional vehicles and longboats, subject to availability.</dd></div></dl></section>
      <section className="content-section conditions-section"><p className="section-label">Before you enquire</p><h2>Plan for the conditions, not a fixed itinerary.</h2><div className="condition-grid"><article><h3>Advance booking is required</h3><p>Accommodation, meals, transport, local guides and porters are all subject to availability.</p></article><article><h3>Conditions shape activities</h3><p>Weather, river and water levels, road conditions and safety requirements can mean activities change, are postponed or are replaced.</p></article><article><h3>Bring the essentials</h3><p>Flights, Miri accommodation, insurance, personal outdoor equipment, medication and personal expenses are not included.</p></article></div></section>
      <section className="content-section booking-section" aria-labelledby="enquiry-title"><div><p className="section-label">Make an enquiry</p><h2 id="enquiry-title">Tell Long Taa what you are hoping for.</h2><p>This form opens a WhatsApp message to Clement Langet. It starts an enquiry only; a booking is confirmed only after availability is checked.</p><div className="contact-card"><strong>Clement Langet</strong><a href="tel:+60198563536">+60 19-856 3536</a><a href="mailto:longtaaborneo@gmail.com">longtaaborneo@gmail.com</a><span>TikTok & Facebook: @visitlongtaaborneo</span></div></div><form className="booking-form" onSubmit={handleSubmit}><label>Name<input name="name" autoComplete="name" required /></label><label>Preferred date<input name="date" type="date" required /></label><label>Number of guests<input name="guests" type="number" min="1" inputMode="numeric" required /></label><label>Preferred stay or experience<select name="experience" required defaultValue=""><option value="" disabled>Select an option</option><option>Accommodation only</option><option>Accommodation + local meals</option><option>River, Culture & Living Heritage Experience</option><option>Nature's Wonders Exploration</option><option>I would like advice</option></select></label><label>Anything else you would like to share?<textarea name="message" rows={4} placeholder="For example, your interests or questions" /></label><button className="primary-action dark-action" type="submit">Open WhatsApp enquiry</button>{submitted && <p className="form-status" role="status">Your WhatsApp enquiry has been opened in a new tab.</p>}</form></section>
    </main>
  );
}
