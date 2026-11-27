import { queryOptions } from "@tanstack/react-query";

import { getMentors, getOpportunities, getPortfolio } from "./public-data.functions";

export const opportunitiesQuery = queryOptions({
  queryKey: ["opportunities"],
  queryFn: () => getOpportunities(),
});

export const mentorsQuery = queryOptions({
  queryKey: ["mentors"],
  queryFn: () => getMentors(),
});

export const portfolioQuery = (userId: string) =>
  queryOptions({
    queryKey: ["portfolio", userId],
    queryFn: () => getPortfolio({ data: { userId } }),
  });

export type Opportunity = Awaited<ReturnType<typeof getOpportunities>>[number];
export type Mentor = Awaited<ReturnType<typeof getMentors>>[number];
