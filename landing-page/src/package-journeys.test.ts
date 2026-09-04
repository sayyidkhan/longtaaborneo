import { describe, expect, it } from "vitest";

import { packageJourneys } from "./package-journeys";

describe("package journey walkthroughs", () => {
  it("walks both packages from website planning through the return home", () => {
    for (const journey of Object.values(packageJourneys)) {
      expect(journey.steps[0].shortLabel).toBe("Website");
      expect(journey.steps.at(-1)?.shortLabel).toBe("Home");
      expect(journey.steps.some((step) => step.shortLabel === "Miri")).toBe(true);
      expect(journey.steps.every((step) => step.note.length > 0)).toBe(true);
    }
  });

  it("keeps the two experience paths distinct", () => {
    const package1Labels = packageJourneys.package1.steps.map((step) => step.shortLabel);
    const package2Labels = packageJourneys.package2.steps.map((step) => step.shortLabel);

    expect(package1Labels).toContain("Tagang");
    expect(package1Labels).not.toContain("Batu Belacek");
    expect(package2Labels).toContain("Acin");
    expect(package2Labels).toContain("Batu Belacek");
  });
});
