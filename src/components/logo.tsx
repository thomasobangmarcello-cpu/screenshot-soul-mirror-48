/** Brand mark: a rising sun over a path. The same shapes are used for the browser-tab icon. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" className="fill-primary" />
      <circle cx="32" cy="27" r="11" className="fill-accent" />
      <path d="M10 50c7-9 14-13 22-13s15 4 22 13" fill="none" strokeWidth="6" strokeLinecap="round" className="stroke-primary-foreground" />
    </svg>
  );
}
