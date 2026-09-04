import { describe, expect, it } from "vitest";

import {
  buildTripBriefMessage,
  calculateTripEstimate,
  parsePositiveInteger,
  type TripBrief,
} from "./chat-planner";

const completeBrief: TripBrief = {
  name: "Amina",
  arrivalDate: "2026-11-14",
  backupDate: "2026-11-21",
  guests: 4,
  nights: 2,
  stayOption: "meals",
  experiencePackage: "package1",
  transport: "longTaa4wd",
  riverSupport: "required",
  specialRequirements: "One vegetarian guest",
};

describe("guided trip planner", () => {
  it("calculates published rates using one vehicle/group per three guests", () => {
    expect(calculateTripEstimate(completeBrief)).toEqual({
      groupUnits: 2,
      stayRate: 180,
      stayCost: 1_440,
      transportCost: 3_000,
      riverSupportCost: 1_200,
      knownRateTotal: 5_640,
    });
  });

  it("excludes transport and undecided river support from the known-rate estimate", () => {
    const estimate = calculateTripEstimate({
      ...completeBrief,
      guests: 2,
      transport: "own4wd",
      riverSupport: "discuss",
    });

    expect(estimate.transportCost).toBe(0);
    expect(estimate.riverSupportCost).toBe(0);
    expect(estimate.knownRateTotal).toBe(720);
  });

  it("builds a complete availability-and-quotation handoff", () => {
    const message = buildTripBriefMessage(completeBrief);

    expect(message).toContain("Name: Amina");
    expect(message).toContain("Website date signal:");
    expect(message).toContain("Backup arrival: 2026-11-21");
    expect(message).toContain("Package 1");
    expect(message).toContain("Return 4WD: RM3,000");
    expect(message).toContain("Planning total: RM5,640");
    expect(message).toContain("One vegetarian guest");
    expect(message).toContain("not a confirmed booking");
  });

  it("accepts only sensible whole-number inputs", () => {
    expect(parsePositiveInteger("3")).toBe(3);
    expect(parsePositiveInteger("0")).toBeNull();
    expect(parsePositiveInteger("2.5")).toBeNull();
    expect(parsePositiveInteger("31")).toBeNull();
  });
});
