import { describe, expect, it } from "vitest";

import {
  CHAT_CHARACTER_LIMIT,
  CHAT_MESSAGE_LIMIT,
  getFollowUpQuestions,
  isChatPayloadWithinLimits,
  longTaaGuideInstructions,
  shouldStartGuidedPlanner,
} from "./chat-config";

describe("Long Taa chat configuration", () => {
  it("keeps conversations within the public endpoint limits", () => {
    expect(isChatPayloadWithinLimits([{ role: "user", content: "Hello" }])).toBe(true);
    expect(isChatPayloadWithinLimits([])).toBe(false);
    expect(isChatPayloadWithinLimits(Array.from({ length: CHAT_MESSAGE_LIMIT + 1 }))).toBe(false);
    expect(isChatPayloadWithinLimits([{ content: "x".repeat(CHAT_CHARACTER_LIMIT) }])).toBe(false);
  });

  it("contains the factual and booking guardrails", () => {
    expect(longTaaGuideInstructions).toContain("RM50");
    expect(longTaaGuideInstructions).toContain("RM1,500");
    expect(longTaaGuideInstructions).toContain("Never invent Package 1 or Package 2 prices");
    expect(longTaaGuideInstructions).toContain("WhatsApp");
    expect(longTaaGuideInstructions).toContain("proactive trip-planning guide");
    expect(longTaaGuideInstructions).toContain("exactly one per enquiry");
    expect(longTaaGuideInstructions).toContain("return 4WD as the default");
    expect(longTaaGuideInstructions).toContain("river/activity support");
  });

  it("offers contextual next steps instead of ending the conversation", () => {
    expect(getFollowUpQuestions("How much is a stay?")).toContain(
      "Estimate 3 days for 2 guests",
    );
    expect(getFollowUpQuestions("How do I travel from Miri?")).toContain(
      "What does the 4WD transfer cost?",
    );
    expect(getFollowUpQuestions("What activities can I do?")).toContain(
      "Build a nature-focused 3-day plan",
    );
    expect(
      getFollowUpQuestions("Help me plan", "First, how many guests are travelling?"),
    ).toEqual(["1 guest", "2 guests", "3 guests"]);
  });

  it("routes complete planning and cost requests into the guided intake", () => {
    expect(shouldStartGuidedPlanner("Build my complete booking enquiry")).toBe(true);
    expect(shouldStartGuidedPlanner("Estimate my trip cost")).toBe(true);
    expect(shouldStartGuidedPlanner("What can I experience there?")).toBe(false);
  });
});
