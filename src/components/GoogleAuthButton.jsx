import { useState } from "react";
import { signInWithGoogle } from "../lib/googleAuth";

function GoogleAuthButton({ onError, label = "Continuer avec Google", role = "USER" }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    onError?.("");
    setLoading(true);

    try {
      await signInWithGoogle(role);
    } catch (error) {
      setLoading(false);
      onError?.(error.message || "Impossible de démarrer la connexion Google.");
    }
  };

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleGoogleLogin}
      className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-black text-[#0F2A43] shadow-sm transition hover:-translate-y-0.5 hover:border-[#9ED8E8] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-base font-black shadow-sm">
        <span className="text-[#4285F4]">G</span>
      </span>
      {loading ? "Redirection vers Google..." : label}
    </button>
  );
}

export default GoogleAuthButton;
