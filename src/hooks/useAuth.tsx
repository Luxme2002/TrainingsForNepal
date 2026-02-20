import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export type AppRole = "student" | "trainer" | "admin";

interface AuthState {
  user: User | null;
  role: AppRole | null;
  fullName: string;
  loading: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    role: null,
    fullName: "",
    loading: true,
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          // Fetch profile
          const { data: profile } = await supabase
            .from("profiles")
            .select("role, full_name")
            .eq("user_id", session.user.id)
            .single();

          setState({
            user: session.user,
            role: (profile?.role as AppRole) ?? "student",
            fullName: profile?.full_name ?? "",
            loading: false,
          });
        } else {
          setState({ user: null, role: null, fullName: "", loading: false });
        }
      }
    );

    // Initial check
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role, full_name")
          .eq("user_id", session.user.id)
          .single();

        setState({
          user: session.user,
          role: (profile?.role as AppRole) ?? "student",
          fullName: profile?.full_name ?? "",
          loading: false,
        });
      } else {
        setState({ user: null, role: null, fullName: "", loading: false });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { ...state, signOut };
}
