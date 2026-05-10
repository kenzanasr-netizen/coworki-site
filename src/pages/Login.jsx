import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import logo from "../assets/logo-coworki.png";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { loginWithCredentials, roleHomeRoutes } from "../data/mockAuth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const session = await loginWithCredentials(email, password);
      navigate(roleHomeRoutes[session.role]);
    } catch (authError) {
      setError(authError.message || "Impossible de se connecter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#ECF8FC] via-white to-[#FBEFF3] text-slate-950">
      <header className="relative z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-4">
            <img src={logo} alt="Logo CoWorki" className="h-20 w-auto" />
          </Link>
          <Link to="/signup" className="rounded-full bg-[#7A1E3A] px-5 py-3 text-sm font-black text-white shadow-xl shadow-[#7A1E3A]/20">
            Créer un compte
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 pb-20 pt-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.section initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65 }}>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#9ED8E8]/80 bg-white/70 px-4 py-2 text-sm font-black text-[#0F6C8D] shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Accès sécurisé CoWorki
          </p>
          <h1 className="mt-6 max-w-xl text-5xl font-black tracking-[-0.05em] text-[#0F2A43] md:text-7xl">
            Connexion à CoWorki
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Connectez-vous pour accéder à votre espace utilisateur, entreprise, partenaire ou administration.
          </p>

          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
            {[
              "Accès sécurisé",
              "Réservations synchronisées",
              "Profil personnalisé",
              "Données protégées",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/75 p-4 shadow-sm ring-1 ring-white">
                <CheckCircle2 className="h-5 w-5 text-[#0F6C8D]" />
                <span className="text-sm font-black text-[#0F2A43]">{item}</span>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }} className="rounded-[2.5rem] bg-white/95 p-7 shadow-2xl shadow-slate-300/60 ring-1 ring-white backdrop-blur-2xl sm:p-9">
          <div className="mb-7 rounded-[2rem] bg-[#F7FAFC] p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECF8FC] text-[#0F6C8D]">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-2xl font-black text-[#0F2A43]">Bienvenue sur CoWorki</h2>
                <p className="mt-1 text-sm font-bold text-slate-500">Connectez-vous avec votre email et votre mot de passe.</p>
              </div>
            </div>
          </div>

          <form onSubmit={submitLogin} className="space-y-5">
            <GoogleAuthButton onError={setError} role="USER" />
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">ou</span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-black text-[#0F2A43]">Email</label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 focus-within:border-[#0F6C8D]">
                <Mail className="h-5 w-5 text-[#0F6C8D]" />
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="votre@email.com" className="w-full bg-transparent font-bold outline-none" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-black text-[#0F2A43]">Mot de passe</label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 focus-within:border-[#0F6C8D]">
                <LockKeyhole className="h-5 w-5 text-[#0F6C8D]" />
                <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="••••••••" className="w-full bg-transparent font-bold outline-none" />
              </div>
            </div>
            {error && (
              <p className="rounded-2xl bg-[#FBEFF3] px-4 py-3 text-sm font-black text-[#7A1E3A]">
                {error}
              </p>
            )}
            <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0F6C8D] px-5 py-4 text-sm font-black text-white shadow-xl shadow-[#0F6C8D]/20 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "Connexion..." : "Se connecter"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-5 text-center text-sm font-bold text-slate-600">
            Pas encore de compte ? <Link to="/signup" className="font-black text-[#7A1E3A]">Créer un compte</Link>
          </p>
        </motion.section>
      </main>
    </div>
  );
}

export default Login;
