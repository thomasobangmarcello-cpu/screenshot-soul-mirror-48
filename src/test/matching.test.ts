import { describe, expect, it } from "vitest";

import { isReady, matchCareers, rankAreas } from "@/lib/matching";

describe("skill matching", () => {
  it("ranks what someone can already do above what they only like", () => {
    const top = rankAreas({ skills: ["tailoring"], interests: ["digital"], talents: [] });
    expect(top).toEqual(["tailoring", "digital"]);
  });

  it("lets talents alone suggest areas for people with no formal skills", () => {
    const top = rankAreas({ skills: [], interests: [], talents: ["hands"] });
    expect(top).toEqual(["trades", "tailoring", "farming"]);
  });

  it("returns nothing when nothing was chosen", () => {
    expect(rankAreas({ skills: [], interests: [], talents: [] })).toEqual([]);
  });

  it("treats careers needing a certificate as not yet open without one", () => {
    expect(isReady("certificate", "secondary")).toBe(false);
    expect(isReady("certificate", "vocational")).toBe(true);
    expect(isReady("diploma", "vocational")).toBe(false);
    expect(isReady("none", "none")).toBe(true);
  });

  it("matches only careers in the chosen areas and lists open ones first", () => {
    const matches = matchCareers(["trades"], "primary");
    expect(matches.length).toBeGreaterThan(0);
    expect(matches.every((m) => m.career.areas.includes("trades"))).toBe(true);
    const firstNotReady = matches.findIndex((m) => !m.ready);
    expect(matches.slice(firstNotReady).every((m) => !m.ready)).toBe(true);
    expect(matches.find((m) => m.career.id === "electrician")?.ready).toBe(false);
  });
});
