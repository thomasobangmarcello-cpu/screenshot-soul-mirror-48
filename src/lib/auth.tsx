import type { User } from "@supabase/supabase-js";
import { useRouter } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { supabase } from "@/integrations/supabase/client";

type AuthState = { user: User | null; loading: boolean };
const AuthContext = createContext<AuthState>({ user: null, loading: true });

/** Where to go once a social sign-in round trip finishes. */
export const POST_AUTH_KEY = "kss-post-auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, loading: true });
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setState({ user: session?.user ?? null, loading: false });
      if (event === "SIGNED_OUT") void router.invalidate();
      if (event === "SIGNED_IN" && window.sessionStorage.getItem(POST_AUTH_KEY)) {
        window.sessionStorage.removeItem(POST_AUTH_KEY);
        void router.navigate({ to: "/dashboard" });
      }
    });
    void supabase.auth.getSession().then(({ data: s }) => {
      setState({ user: s.session?.user ?? null, loading: false });
    });
    return () => data.subscription.unsubscribe();
  }, [router]);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
