import { supabase } from "../lib/supabaseClient";

function GoogleAuthButton({ onError, label = "Continuer avec Google" }) {
  const handleGoogleLogin = async () => {
    onError?.("");

    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      onError?.("Connexion Google non configurée. Ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.");
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      onError?.(error.message || "Impossible de démarrer la connexion Google.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-black text-[#0F2A43] shadow-sm transition hover:-translate-y-0.5 hover:border-[#9ED8E8] hover:shadow-md"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-base font-black shadow-sm">
        <span className="text-[#4285F4]">G</span>
      </span>
      {label}
    </button>
  );
}

export default GoogleAuthButton;
