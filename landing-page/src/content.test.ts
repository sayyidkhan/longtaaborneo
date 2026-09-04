import { describe, expect, it } from "vitest";

import { siteRoutes, whatsappUrl } from "./content";

describe("submission starter", () => {
  it("defines the site routes with the homepage at root", () => {
    expect(siteRoutes).toHaveLength(6);
    expect(siteRoutes[0].to).toBe("/");
    expect(new Set(siteRoutes.map((route) => route.to)).size).toBe(6);
  });

  it("targets the confirmed WhatsApp contact", () => {
    expect(whatsappUrl).toContain("wa.me/60198563536");
  });
});
