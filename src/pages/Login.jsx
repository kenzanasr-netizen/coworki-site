import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import logo from "../assets/logo-coworki.png";
import {
  Mail,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users,
  Building2,
} from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login attempt:", { email, password });
  };
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#ECF8FC] via-white to-[#FBEFF3] text-slate-950">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full bg-[#9ED8E8]/50 blur-3xl" />
        <div className="absolute bottom-[-160px] right-[-120px] h-[480px] w-[480px] rounded-full bg-[#7A1E3A]/20 blur-3xl" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute -right-40 top-16 h-96 w-96 rounded-[5rem] border border-[#0F6C8D]/20 bg-white/20 backdrop-blur"
        />
        <motion.div
          animate={{ y: [0, -25, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-16 top-40 hidden h-32 w-32 rounded-full bg-[#7A1E3A]/10 md:block"
        />
      </div>

      {/* HEADER */}
      <header className="relative z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-4">
            <img src={logo} alt="Logo CoWorki" className="h-20 w-auto" />
          </Link>

          <Link
            to="/"
            className="rounded-full border border-slate-200 bg-white/80 px-5 py-3 text-sm font-black text-[#0F2A43] shadow-sm backdrop-blur transition hover:text-[#0F6C8D]"
          >
            Retour accueil
          </Link>
        </div>
      </header>

      {/* CONTENT */}
      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-120px)] max-w-7xl items-center gap-12 px-6 pb-16 lg:grid-cols-[0.95fr_1.05fr]">
        {/* LEFT */}
        <motion.section
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:block"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#9ED8E8]/80 bg-white/70 px-4 py-2 text-sm font-black text-[#0F6C8D] shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Votre espace CoWorki
          </div>

          <h1 className="max-w-xl text-4xl font-black leading-[0.95] tracking-[-0.05em] text-[#0F2A43] md:text-6xl">
            Connectez-vous à votre univers de travail.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Accédez à vos réservations, vos espaces favoris, vos demandes B2B ou votre tableau de bord partenaire selon votre profil.
          </p>

          <div className="mt-10 grid max-w-xl gap-4">
            {[
              [
                <Users className="h-6 w-6" />,
                "Utilisateur final",
                "Retrouvez vos réservations, favoris et recommandations.",
              ],
              [
                <Building2 className="h-6 w-6" />,
                "Gérant d’espace",
                "Suivez vos réservations, vos revenus et vos disponibilités.",
              ],
              [
                <ShieldCheck className="h-6 w-6" />,
                "Accès sécurisé",
                "Une interface claire pour chaque type de compte.",
              ],
            ].map(([icon, title, text]) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-[1.7rem] border border-white/80 bg-white/70 p-5 shadow-sm backdrop-blur"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECF8FC] text-[#0F6C8D]">
                  {icon}
                </div>

                <div>
                  <p className="font-black text-[#0F2A43]">{title}</p>
                  <p className="mt-1 leading-6 text-slate-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* FORM */}
        <motion.section
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto w-full max-w-xl"
        >
          <div className="rounded-[2.5rem] border border-white/80 bg-white/85 p-8 shadow-2xl shadow-slate-300/60 backdrop-blur-2xl md:p-10">
            <div className="mb-8 text-center">
              <img
                src={logo}
                alt="Logo CoWorki"
                className="mx-auto h-24 w-auto"
              />

              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#0F2A43] md:text-4xl">
                Connexion
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Connectez-vous pour accéder à votre espace personnel.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-black text-[#0F2A43]">
                  Adresse email
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 focus-within:border-[#0F6C8D]">
                  <Mail className="h-5 w-5 text-[#0F6C8D]" />
                  <input
                    type="email"
                    placeholder="exemple@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent font-bold text-[#0F2A43] outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-[#0F2A43]">
                  Mot de passe
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 focus-within:border-[#0F6C8D]">
                  <LockKeyhole className="h-5 w-5 text-[#0F6C8D]" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent font-bold text-[#0F2A43] outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 text-sm">
                <label className="flex items-center gap-2 font-bold text-slate-600">
                  <input type="checkbox" />
                  Se souvenir de moi
                </label>

                <a href="#" className="font-black text-[#7A1E3A] hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>

              <button
                type="submit"
                className="group w-full rounded-2xl bg-[#0F6C8D] px-6 py-4 text-sm font-black text-white shadow-xl shadow-[#0F6C8D]/20 transition hover:bg-[#0B5873]"
              >
                <span className="flex items-center justify-center gap-2">
                  Se connecter
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </button>
            </form>

            <div className="mt-8 rounded-3xl bg-[#F7FAFC] p-5 text-center">
              <p className="font-bold text-slate-600">
                Vous n’avez pas encore de compte ?
              </p>

              <Link
                to="/inscription"
                className="mt-2 inline-block font-black text-[#7A1E3A] hover:underline"
              >
                Créer un compte CoWorki
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default Login;
