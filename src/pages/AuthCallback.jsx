import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, ShieldCheck } from "lucide-react";
import logo from "../assets/logo-coworki.png";
import { syncOAuthAccount } from "../data/mockAuth";
import { supabase } from "../lib/supabaseClient";

function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const searchParams = new URLSearchParams(window.location.search);
    const requestedRole = searchParams.get("role") || "USER";

    async function completeOAuth() {
      try {
        const code = searchParams.get("code");
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) throw exchangeError;
        }

        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        let session = data.session;
        if (!session) {
          await new Promise((resolve) => setTimeout(resolve, 450));
          const retry = await supabase.auth.getSession();
          if (retry.error) throw retry.error;
          session = retry.data.session;
        }

        const supabaseUser = session?.user;
        if (!session || !supabaseUser?.email) {
          throw new Error("Session Google introuvable. Réessayez depuis la page connexion.");
        }

        const metadata = supabaseUser.user_metadata || {};
        const coworkiSession = await syncOAuthAccount({
          email: supabaseUser.email,
          fullName: metadata.full_name || metadata.name || supabaseUser.email.split("@")[0],
          avatar: metadata.avatar_url || "",
          provider: "google",
          supabaseUserId: supabaseUser.id,
          accessToken: session.access_token,
          role: requestedRole,
        });

        if (!active) return;
        navigate(coworkiSession.nextStep || "/dashboard", { replace: true });
      } catch (authError) {
        if (active) setError(authError.message || "Impossible de finaliser la connexion Google.");
      }
    }

    completeOAuth();

    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#ECF8FC] via-white to-[#FBEFF3] px-6 text-slate-950">
      <div className="w-full max-w-xl rounded-[2.5rem] bg-white/95 p-8 text-center shadow-2xl shadow-slate-300/60 ring-1 ring-white">
        <img src={logo} alt="Logo CoWorki" className="mx-auto h-24 w-auto" />
        <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#ECF8FC] text-[#0F6C8D]">
          {error ? <ShieldCheck className="h-7 w-7" /> : <Loader2 className="h-7 w-7 animate-spin" />}
        </div>
        <h1 className="mt-6 text-3xl font-black text-[#0F2A43]">Connexion Google</h1>
        {error ? (
          <>
            <p className="mt-3 rounded-2xl bg-[#FBEFF3] px-4 py-3 text-sm font-black text-[#7A1E3A]">{error}</p>
            <Link to="/login" className="mt-6 inline-flex rounded-full bg-[#7A1E3A] px-6 py-3 text-sm font-black text-white">
              Retour à la connexion
            </Link>
          </>
        ) : (
          <p className="mt-3 text-sm font-bold leading-7 text-slate-600">
            Connexion Google réussie. Préparation de votre espace CoWorki…
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthCallback;
