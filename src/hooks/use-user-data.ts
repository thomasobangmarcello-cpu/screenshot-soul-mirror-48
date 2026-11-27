import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

/** Learning activities the signed-in person has marked as done. */
export function useCompleted() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ["completed", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("completed_activities").select("activity_id");
      if (error) throw error;
      return data.map((r) => r.activity_id);
    },
  });
  const ids = query.data ?? [];
  const toggle = useMutation({
    mutationFn: async (id: string) => {
      if (!user) return;
      const res = ids.includes(id)
        ? await supabase.from("completed_activities").delete().eq("user_id", user.id).eq("activity_id", id)
        : await supabase.from("completed_activities").insert({ user_id: user.id, activity_id: id });
      if (res.error) throw res.error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["completed"] }),
  });
  return { ids, toggle, user };
}

/** Opportunities the signed-in person has saved. */
export function useSaved() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ["saved", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("saved_opportunities").select("opportunity_id");
      if (error) throw error;
      return data.map((r) => r.opportunity_id);
    },
  });
  const ids = query.data ?? [];
  const toggle = useMutation({
    mutationFn: async (id: string) => {
      if (!user) return;
      const res = ids.includes(id)
        ? await supabase.from("saved_opportunities").delete().eq("user_id", user.id).eq("opportunity_id", id)
        : await supabase.from("saved_opportunities").insert({ user_id: user.id, opportunity_id: id });
      if (res.error) throw res.error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["saved"] }),
  });
  return { ids, toggle, user };
}
