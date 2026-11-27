import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

import { Section } from "@/components/page-header";
import { RouteError, RouteNotFound } from "@/components/route-states";
import { useLang } from "@/lib/i18n";
import { portfolioQuery } from "@/lib/queries";

export const Route = createFileRoute("/portfolio/$userId")({
  loader: async ({ context, params }) => {
    if (!/^[0-9a-f-]{36}$/i.test(params.userId)) throw notFound();
    const data = await context.queryClient.ensureQueryData(portfolioQuery(params.userId));
    if (!data) throw notFound();
    return { name: data.profile.full_name, headline: data.profile.headline };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name || "Portfolio"} — Kakuma Skills to Success` },
          { name: "description", content: loaderData.headline || "A skills portfolio shared from Kakuma Skills to Success." },
          { property: "og:title", content: `${loaderData.name || "Portfolio"} — Kakuma Skills to Success` },
          { property: "og:description", content: loaderData.headline || "A skills portfolio shared from Kakuma Skills to Success." },
          { property: "og:type", content: "profile" },
          { name: "twitter:card", content: "summary" },
        ]
      : [{ title: "Portfolio — Kakuma Skills to Success" }, { name: "robots", content: "noindex" }],
  }),
  component: Portfolio,
  errorComponent: RouteError,
  notFoundComponent: RouteNotFound,
});

function Portfolio() {
  const { t } = useLang();
  const { userId } = Route.useParams();
  const { data } = useSuspenseQuery(portfolioQuery(userId));
  if (!data) return <RouteNotFound />;
  const { profile, items } = data;
  return (
    <>
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <p className="inline-block rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">{t("Portfolio", "Jalada la kazi")}</p>
          <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">{profile.full_name || t("Unnamed", "Bila jina")}</h1>
          {profile.headline ? <p className="mt-3 font-display text-xl text-accent">{profile.headline}</p> : null}
          {profile.bio ? <p className="mt-4 max-w-2xl whitespace-pre-line text-ink-foreground/90">{profile.bio}</p> : null}
        </div>
      </section>
      <Section className="max-w-4xl">
        <h2 className="text-2xl font-bold">{t("Work and achievements", "Kazi na mafanikio")}</h2>
        {items.length === 0 ? (
          <p className="mt-4 text-muted-foreground">{t("Nothing has been added yet.", "Bado hakuna kilichoongezwa.")}</p>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <article key={item.id} className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-lg font-bold">{item.title}</h3>
                {item.description ? <p className="mt-1 whitespace-pre-line text-muted-foreground">{item.description}</p> : null}
                {/^https?:\/\//.test(item.link) ? (
                  <a href={item.link} target="_blank" rel="noreferrer nofollow" className="mt-3 inline-flex items-center gap-1 font-bold text-primary underline">{t("View", "Tazama")} <ExternalLink className="size-4" /></a>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
