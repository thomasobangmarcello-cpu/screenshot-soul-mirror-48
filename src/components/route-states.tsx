import { Link, useRouter, type ErrorComponentProps } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export function RouteError({ reset }: ErrorComponentProps) {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">This page didn't load</h1>
      <p className="mt-2 text-muted-foreground">Please try again. / Tafadhali jaribu tena.</p>
      <Button className="mt-6" onClick={() => { void router.invalidate(); reset(); }}>Try again</Button>
    </div>
  );
}

export function RouteNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Not found</h1>
      <p className="mt-2 text-muted-foreground">This page does not exist or is private. / Ukurasa huu haupo au ni wa faragha.</p>
      <Button asChild className="mt-6"><Link to="/">Go home</Link></Button>
    </div>
  );
}
