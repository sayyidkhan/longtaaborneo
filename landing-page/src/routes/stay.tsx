import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { asset, makeWhatsAppUrl } from "../content";

export const Route = createFileRoute("/stay")({
  component: StayPage,
});

function StayPage() {
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(2);
  const [stayType, setStayType] = useState<"self" | "meals">("meals");
  const [transfer, setTransfer] = useState(true);
  const [longboat, setLongboat] = useState(false);
  const groupUnits = Math.ceil(guests / 3);
  const stayCost = guests * nights * (stayType === "meals" ? 180 : 50);
  const transferCost = transfer ? groupUnits * 1500 : 0;
  const longboatCost = longboat ? groupUnits * 600 : 0;
  const total = stayCost + transferCost + longboatCost;
  const estimateMessage = `Hello Long Taa, I would like to check availability for ${guests} guest${guests === 1 ? "" : "s"}, ${nights} night${nights === 1 ? "" : "s"}, with ${stayType === "meals" ? "accommodation + local meals" : "accommodation only"}${transfer ? `, ${groupUnits} 4WD vehicle${groupUnits === 1 ? "" : "s"}` : ""}${longboat ? `, and ${groupUnits} longboat group${groupUnits === 1 ? "" : "s"} with local guide + porter` : ""}. My planning estimate is RM${total.toLocaleString()}. Please confirm what is available.`;
  return (
    <main>
      <section className="page-hero photo-page-hero stay-hero">
        <img className="page-hero-image" src={asset("journal/eco-03.webp")} width="637" height="478" alt="A Long Taa longhouse with palms and open sky" />
        <div className="page-hero-shade" />
        <div className="page-hero-content"><p className="eyebrow">Stay & experiences</p><h1>Stay in a Sebup longhouse. Experience everyday Long Taa.</h1><p className="lead">Simple, basic longhouse accommodation for travellers who value a real community stay over conventional hotel tourism.</p></div>
      </section>
      <section className="content-section rate-section" aria-labelledby="stay-options">
        <p className="section-label">Stay choices</p>
        <h2 id="stay-options">Choose how you would like to stay.</h2>
        <div className="option-grid">
          <article className="option-card">
            <span>Accommodation only</span><strong>RM50</strong><p>Per person, per night. Guests prepare their own meals; meals are not included.</p>
          </article>
          <article className="option-card featured">
            <span>Accommodation + local meals</span><strong>RM180</strong><p>Per person, per night, including breakfast, lunch and local dinner.</p>
          </article>
        </div>
        <p className="capacity-note">No minimum guest number. Maximum three guests per 4WD vehicle and per longboat. Larger groups need additional vehicles and longboats, subject to availability.</p>
      </section>
      <section className="content-section stay-photo-spread"><img src={asset("journal/eco-07.webp")} width="1194" height="672" loading="lazy" alt="A gathering in the Long Taa longhouse" /><div><p className="section-label">Simple, welcoming, real</p><h2>Stay close to everyday village life.</h2><p>Long Taa is not a conventional hotel. Guests stay within a working longhouse community, with fresh mountain-sourced water, 24-hour solar electricity and telecommunications connectivity.</p><p>The pace is quieter, and local guidance shapes the experience.</p></div></section>
      <section className="content-section experience-section">
        <p className="section-label">Choose your experience</p>
        <div className="experience-grid">
          <article><p className="card-kicker">Package 1</p><h2>River, culture & living heritage.</h2><p>Dapui River adventure, Tagang Fish Conservation Area, Sebup longhouse experience, living heritage, and rainforest and wildlife experience.</p><a className="text-link" href={makeWhatsAppUrl("Hello Long Taa, I would like to ask about the River, Culture & Living Heritage Experience.")} target="_blank" rel="noreferrer">Ask about Package 1 <span aria-hidden="true">→</span></a></article>
          <article><p className="card-kicker">Package 2</p><h2>Nature's wonders exploration.</h2><p>Acin Salt Spring, Batu Ukat, Batu Nginan, Batu Tatip and Batu Belacek. Ask what is suitable for your dates and conditions.</p><a className="text-link" href={makeWhatsAppUrl("Hello Long Taa, I would like to ask about the Nature's Wonders Exploration.")} target="_blank" rel="noreferrer">Ask about Package 2 <span aria-hidden="true">→</span></a></article>
        </div>
      </section>
      <section className="content-section estimator-section" aria-labelledby="estimate-title">
        <div><p className="section-label">Planning helper</p><h2 id="estimate-title">Build an indicative estimate.</h2><p>Use published rates to plan your enquiry. This is not a quote or a reservation; availability and applicable activities must be confirmed with Long Taa.</p></div>
        <form className="estimator" onSubmit={(event) => event.preventDefault()}>
          <label>Guests<input type="number" min="1" max="30" value={guests} onChange={(event) => setGuests(Math.max(1, Number(event.target.value)))} /></label>
          <label>Nights<input type="number" min="1" max="30" value={nights} onChange={(event) => setNights(Math.max(1, Number(event.target.value)))} /></label>
          <fieldset><legend>Stay option</legend><label><input type="radio" checked={stayType === "self"} onChange={() => setStayType("self")} /> Accommodation only · RM50 / person / night</label><label><input type="radio" checked={stayType === "meals"} onChange={() => setStayType("meals")} /> Accommodation + meals · RM180 / person / night</label></fieldset>
          <label className="check-label"><input type="checkbox" checked={transfer} onChange={(event) => setTransfer(event.target.checked)} /> Add 4WD return transfer · RM1,500 / vehicle ({groupUnits} needed for {guests} guests)</label>
          <label className="check-label"><input type="checkbox" checked={longboat} onChange={(event) => setLongboat(event.target.checked)} /> Add longboat + local guide + porter · RM600 / group ({groupUnits} needed for {guests} guests)</label>
          <div className="estimate-total"><span>Indicative total</span><strong>RM{total.toLocaleString()}</strong><small>Includes {transfer ? `RM${transferCost.toLocaleString()} for ${groupUnits} 4WD vehicle${groupUnits === 1 ? "" : "s"}` : "no 4WD transfer"}{longboat ? ` and RM${longboatCost.toLocaleString()} for ${groupUnits} longboat group${groupUnits === 1 ? "" : "s"}` : ""}. Package-specific or other unconfirmed costs are excluded.</small></div>
          <a className="primary-action dark-action" href={makeWhatsAppUrl(estimateMessage)} target="_blank" rel="noreferrer">Send this enquiry on WhatsApp</a>
        </form>
      </section>
      <section className="content-section inclusion-section"><div><h2>What is included depends on your selected booking.</h2><ul><li>Long Taa accommodation and self-cooking facilities for accommodation-only guests.</li><li>Three local meals per day for the accommodation + meals option.</li><li>4WD, longboat, local guide and porter when booked for relevant activities.</li></ul></div><div><h3>Not included</h3><ul><li>Flights to/from Miri and accommodation in Miri.</li><li>Travel and personal insurance, medication and personal outdoor equipment.</li><li>Personal expenses and activities not specified in the selected experience.</li></ul><Link className="text-link" to="/plan">Read booking conditions <span aria-hidden="true">→</span></Link></div></section>
    </main>
  );
}
