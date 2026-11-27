import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { publicClient } from "./supabase-public.server";

/** Verified opportunities only; the database hides unverified rows as well. */
export const getOpportunities = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("opportunities")
    .select("id, kind, title, organization, summary, location, deadline, apply_url")
    .eq("verified", true)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("opportunities", error.message);
    return [];
  }
  return data;
});

export const getMentors = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("mentors")
    .select("id, full_name, role_title, organization, expertise, bio")
    .eq("verified", true)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("mentors", error.message);
    return [];
  }
  return data;
});

/** A portfolio its owner chose to share; null when it is private or missing. */
export const getPortfolio = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ userId: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const db = publicClient();
    const { data: profile } = await db
      .from("profiles")
      .select("id, full_name, headline, bio")
      .eq("id", data.userId)
      .eq("portfolio_public", true)
      .maybeSingle();
    if (!profile) return null;
    const { data: items } = await db
      .from("portfolio_items")
      .select("id, title, description, link")
      .eq("user_id", data.userId)
      .order("created_at", { ascending: false });
    return { profile, items: items ?? [] };
  });
