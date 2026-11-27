import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children?: ReactNode }) {
  return (
    <section className="border-b border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
        <p className="inline-block rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold text-foreground md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{intro}</p>
        {children}
      </div>
    </section>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 ${className}`}>{children}</section>;
}

/** Honest placeholder for areas that only show verified records. */
export function EmptyState({ title, body, children }: { title: string; body: string; children?: ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-border bg-muted p-8 text-center">
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-muted-foreground">{body}</p>
      {children ? <div className="mt-5 flex flex-wrap justify-center gap-3">{children}</div> : null}
    </div>
  );
}
