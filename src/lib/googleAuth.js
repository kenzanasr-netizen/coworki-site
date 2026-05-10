import { supabase } from "./supabaseClient";

const allowedRoles = new Set(["USER", "PARTNER", "COMPANY"]);

export async function signInWithGoogle(role = "USER") {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const normalizedRole = allowedRoles.has(String(role).toUpperCase()) ? String(role).toUpperCase() : "USER";

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Connexion Google non configurée. Ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.");
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback?role=${normalizedRole}`,
      queryParams: {
        prompt: "select_account",
      },
    },
  });

  if (error) {
    throw new Error(error.message || "Impossible de démarrer la connexion Google.");
  }
}
