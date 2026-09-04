import { getSimulatedAvailability, simulatedAvailabilityLabels } from "./availability";

export type StayOption = "accommodation" | "meals";
export type ExperiencePackage = "package1" | "package2";
export type TransportOption = "longTaa4wd" | "own4wd";
export type RiverSupportOption = "required" | "notRequired" | "discuss";

export interface TripBrief {
  name: string;
  arrivalDate: string;
  backupDate: string;
  guests: number;
  nights: number;
  stayOption: StayOption;
  experiencePackage: ExperiencePackage;
  transport: TransportOption;
  riverSupport: RiverSupportOption;
  specialRequirements: string;
}

export interface TripEstimate {
  groupUnits: number;
  stayRate: number;
  stayCost: number;
  transportCost: number;
  riverSupportCost: number;
  knownRateTotal: number;
}

export const stayLabels: Record<StayOption, string> = {
  accommodation: "Accommodation only — RM50 per person/night",
  meals: "Accommodation + local meals — RM180 per person/night",
};

export const packageLabels: Record<ExperiencePackage, string> = {
  package1: "Package 1 — River, culture & living heritage",
  package2: "Package 2 — Nature's wonders exploration",
};

export const transportLabels: Record<TransportOption, string> = {
  longTaa4wd: "Long Taa return 4WD from Miri",
  own4wd: "Own terrain-suitable 4WD — approval requested",
};

export const riverSupportLabels: Record<RiverSupportOption, string> = {
  required: "Required",
  notRequired: "Not required",
  discuss: "Please advise",
};

export function calculateTripEstimate(brief: TripBrief): TripEstimate {
  const groupUnits = Math.ceil(brief.guests / 3);
  const stayRate = brief.stayOption === "meals" ? 180 : 50;
  const stayCost = brief.guests * brief.nights * stayRate;
  const transportCost = brief.transport === "longTaa4wd" ? groupUnits * 1500 : 0;
  const riverSupportCost = brief.riverSupport === "required" ? groupUnits * 600 : 0;

  return {
    groupUnits,
    stayRate,
    stayCost,
    transportCost,
    riverSupportCost,
    knownRateTotal: stayCost + transportCost + riverSupportCost,
  };
}

export function buildTripBriefMessage(brief: TripBrief) {
  const estimate = calculateTripEstimate(brief);
  const plural = (count: number, singular: string, pluralForm = `${singular}s`) =>
    `${count} ${count === 1 ? singular : pluralForm}`;
  const estimateLines = [
    `- Stay: RM${estimate.stayCost.toLocaleString("en-MY")} (${brief.guests} × ${brief.nights} × RM${estimate.stayRate})`,
  ];

  if (brief.transport === "longTaa4wd") {
    estimateLines.push(
      `- Return 4WD: RM${estimate.transportCost.toLocaleString("en-MY")} (${plural(estimate.groupUnits, "vehicle")})`,
    );
  } else {
    estimateLines.push("- Return 4WD: excluded — requesting approval to use own suitable 4WD");
  }

  if (brief.riverSupport === "required") {
    estimateLines.push(
      `- River/activity support: RM${estimate.riverSupportCost.toLocaleString("en-MY")} (${plural(estimate.groupUnits, "group")})`,
    );
  } else if (brief.riverSupport === "discuss") {
    estimateLines.push("- River/activity support: excluded until Long Taa advises what is suitable");
  } else {
    estimateLines.push("- River/activity support: not requested");
  }

  return [
    "Hello Clement, I would like to request availability and a quotation for a Long Taa visit.",
    "",
    `Name: ${brief.name}`,
    `Preferred arrival: ${brief.arrivalDate}`,
    `Website date signal: ${simulatedAvailabilityLabels[getSimulatedAvailability(brief.arrivalDate)]} (simulation only)`,
    `Backup arrival: ${brief.backupDate || "None supplied"}${brief.backupDate ? ` — ${simulatedAvailabilityLabels[getSimulatedAvailability(brief.backupDate)]} (simulation only)` : ""}`,
    `Group: ${plural(brief.guests, "guest")}`,
    `Duration: ${plural(brief.nights, "night")}`,
    `Stay: ${stayLabels[brief.stayOption]}`,
    `Experience: ${packageLabels[brief.experiencePackage]}`,
    `Transport: ${transportLabels[brief.transport]}`,
    `River/activity support: ${riverSupportLabels[brief.riverSupport]}`,
    `Special requirements: ${brief.specialRequirements || "None shared"}`,
    "",
    "Indicative known-rate estimate:",
    ...estimateLines,
    `Planning total: RM${estimate.knownRateTotal.toLocaleString("en-MY")}`,
    "",
    "Package/activity costs are not included because they require a quotation. The exact scope of the RM600 river/activity support fee also requires confirmation.",
    "",
    "Please confirm availability, a suitable itinerary and the final quotation. I understand this is an enquiry, not a confirmed booking.",
  ].join("\n");
}

export function parsePositiveInteger(value: string, maximum = 30) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= maximum ? parsed : null;
}
