import { AREA_IDS, CAREERS, TALENT_AREAS, type AreaId, type Career, type TalentId } from "./content";

export type Education = "none" | "primary" | "secondary" | "vocational" | "diploma" | "selftaught";

export type Answers = {
  education: Education;
  certificates: "using" | "unused" | "progress" | "none";
  skills: AreaId[];
  talents: TalentId[];
  work: "none" | "volunteer" | "informal" | "employed" | "own";
  interests: AreaId[];
  goal: "job" | "business" | "study" | "freelance";
};

export const isAreaId = (v: unknown): v is AreaId =>
  typeof v === "string" && (AREA_IDS as readonly string[]).includes(v);

/**
 * Ranks skill areas from a person's answers.
 * A practical skill counts 3, an interest 2 and each related talent 1, so what
 * someone can already do weighs more than what they only like.
 */
export function rankAreas(a: Pick<Answers, "skills" | "interests" | "talents">, limit = 3): AreaId[] {
  const score = new Map<AreaId, number>();
  const add = (id: AreaId, n: number) => score.set(id, (score.get(id) ?? 0) + n);
  a.skills.forEach((id) => add(id, 3));
  a.interests.forEach((id) => add(id, 2));
  a.talents.forEach((tid) => TALENT_AREAS[tid].forEach((id) => add(id, 1)));
  return AREA_IDS.filter((id) => (score.get(id) ?? 0) > 0)
    .sort((x, y) => (score.get(y) ?? 0) - (score.get(x) ?? 0))
    .slice(0, limit);
}

/** Whether this education level already meets what a career asks for. */
export function isReady(needs: Career["needs"], education: Education): boolean {
  if (needs === "none") return true;
  if (needs === "certificate") return education === "vocational" || education === "diploma";
  return education === "diploma";
}

export type CareerMatch = { career: Career; overlap: number; ready: boolean };

/** Careers that share at least one chosen area: careers open now first, then closest fit. */
export function matchCareers(areas: AreaId[], education: Education): CareerMatch[] {
  return CAREERS.map((career) => ({
    career,
    overlap: career.areas.filter((id) => areas.includes(id)).length,
    ready: isReady(career.needs, education),
  }))
    .filter((m) => m.overlap > 0)
    .sort((x, y) => Number(y.ready) - Number(x.ready) || y.overlap - x.overlap);
}

const EDU: Education[] = ["none", "primary", "secondary", "vocational", "diploma", "selftaught"];
export const isEducation = (v: unknown): v is Education =>
  typeof v === "string" && (EDU as string[]).includes(v);

/** Reads saved answers back from storage, dropping anything unexpected. */
export function parseAnswers(raw: unknown): Answers | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const list = (v: unknown) => (Array.isArray(v) ? v : []);
  if (!isEducation(r["education"])) return null;
  return {
    education: r["education"],
    certificates: (["using", "unused", "progress", "none"] as const).find((c) => c === r["certificates"]) ?? "none",
    skills: list(r["skills"]).filter(isAreaId),
    talents: list(r["talents"]).filter((v): v is TalentId => typeof v === "string" && v in TALENT_AREAS),
    work: (["none", "volunteer", "informal", "employed", "own"] as const).find((c) => c === r["work"]) ?? "none",
    interests: list(r["interests"]).filter(isAreaId),
    goal: (["job", "business", "study", "freelance"] as const).find((c) => c === r["goal"]) ?? "job",
  };
}
