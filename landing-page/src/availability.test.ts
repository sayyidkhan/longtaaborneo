import { describe, expect, it } from "vitest";

import { getSimulatedAvailability, getSimulatedSeasonalWindows } from "./availability";

describe("simulated availability", () => {
  it("creates a stable mix of available, unavailable and confirmation-needed dates", () => {
    const windows = getSimulatedSeasonalWindows(1, new Date(2030, 0, 1));
    expect(windows.map(({ status }) => status)).toEqual([
      "available",
      "unavailable",
      "confirm",
    ]);
    expect(windows.map(({ key }) => getSimulatedAvailability(key))).toEqual([
      "available",
      "unavailable",
      "confirm",
    ]);
  });

  it("routes ordinary unlisted dates to community confirmation", () => {
    expect(getSimulatedAvailability("2030-01-07")).toBe("confirm");
  });
});
