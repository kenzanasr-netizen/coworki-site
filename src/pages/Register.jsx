import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo-coworki.png";
import {
  User,
  Building2,
  BriefcaseBusiness,
  Mail,
  Phone,
  LockKeyhole,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

function Register() {
  const accountTypes = [
    {
      icon: <User className="h-6 w-6" />,
      title: "Utilisateur final",
      text: "Étudiant, freelance ou télétravailleur.",
    },
    {
      icon: <BriefcaseBusiness className="h-6 w-6" />,
      title: "Entreprise",
      text: "Réservation de salles et demandes B2B.",
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Gérant d’espace",
      text: "Gestion des espaces, réservations et revenus.",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#ECF8FC] via-white to-[#FBEFF3] text-slate-950">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full bg-[#9ED8E8]/50 blur-3xl" />
        <div className="absolute bottom-[-160px] right-[-120px] h-[480px] w-[480px] rounded-full bg-[#7A1E3A]/20 blur-3xl" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -right-44 top-20 h-[420px] w-[420px] rounded-[5rem] border border-[#0F6C8D]/20 bg-white/20 backdrop-blur"
        />
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-20 top-44 hidden h-36 w-36 rounded-full bg-[#7A1E3A]/10 md:block"
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
      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-120px)] max-w-7xl items-center gap-12 px-6 pb-16 lg:grid-cols-[0.9fr_1.1fr]">
        {/* LEFT SIDE */}
        <motion.section
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:block"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#9ED8E8]/80 bg-white/70 px-4 py-2 text-sm font-black text-[#0F6C8D] shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Rejoindre CoWorki
          </div>

          <h1 className="max-w-xl text-4xl font-black leading-[0.95] tracking-[-0.05em] text-[#0F2A43] md:text-6xl">
            Créez votre accès à l’écosystème CoWorki.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Un seul compte pour rechercher des espaces, réserver, gérer vos favoris,
            rejoindre des événements ou piloter un espace partenaire.
          </p>

          <div className="mt-10 grid max-w-xl gap-4">
            {[
              "Réservation simple et rapide",
              "Accès aux promotions flash",
              "Smart Matching et networking",
              "Tableaux de bord adaptés au profil",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-[1.5rem] border border-white/80 bg-white/70 p-4 font-black text-[#0F2A43] shadow-sm backdrop-blur"
              >
                <CheckCircle2 className="h-5 w-5 text-[#0F6C8D]" />
                {item}
              </div>
            ))}
          </div>
        </motion.section>

        {/* FORM CARD */}
        <motion.section
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto w-full max-w-2xl"
        >
          <div className="rounded-[2.5rem] border border-white/80 bg-white/85 p-8 shadow-2xl shadow-slate-300/60 backdrop-blur-2xl md:p-10">
            <div className="mb-8 text-center">
              <img
                src={logo}
                alt="Logo CoWorki"
                className="mx-auto h-24 w-auto"
              />

              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#0F2A43] md:text-4xl">
                Créer un compte
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Choisissez votre profil et complétez vos informations.
              </p>
            </div>

            {/* ACCOUNT TYPE */}
            <div className="mb-7">
              <p className="mb-3 text-sm font-black text-[#0F2A43]">
                Type de compte
              </p>

              <div className="grid gap-3 md:grid-cols-3">
                {accountTypes.map((type, index) => (
                  <label
                    key={type.title}
                    className="group cursor-pointer rounded-3xl border border-slate-200 bg-[#F7FAFC] p-4 transition hover:border-[#0F6C8D] hover:bg-[#ECF8FC]"
                  >
                    <input
                      type="radio"
                      name="accountType"
                      defaultChecked={index === 0}
                      className="mb-3"
                    />

                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#0F6C8D] shadow-sm group-hover:bg-[#0F6C8D] group-hover:text-white">
                      {type.icon}
                    </div>

                    <p className="font-black text-[#0F2A43]">{type.title}</p>
                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      {type.text}
                    </p>
                  </label>
                ))}
              </div>
            </div>

            {/* FORM */}
            <form className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-black text-[#0F2A43]">
                    Nom
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 focus-within:border-[#0F6C8D]">
                    <User className="h-5 w-5 text-[#0F6C8D]" />
                    <input
                      type="text"
                      placeholder="Votre nom"
                      className="w-full bg-transparent font-bold text-[#0F2A43] outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black text-[#0F2A43]">
                    Prénom
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 focus-within:border-[#0F6C8D]">
                    <User className="h-5 w-5 text-[#0F6C8D]" />
                    <input
                      type="text"
                      placeholder="Votre prénom"
                      className="w-full bg-transparent font-bold text-[#0F2A43] outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-[#0F2A43]">
                  Adresse email
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 focus-within:border-[#0F6C8D]">
                  <Mail className="h-5 w-5 text-[#0F6C8D]" />
                  <input
                    type="email"
                    placeholder="exemple@email.com"
                    className="w-full bg-transparent font-bold text-[#0F2A43] outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-[#0F2A43]">
                  Téléphone
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 focus-within:border-[#0F6C8D]">
                  <Phone className="h-5 w-5 text-[#0F6C8D]" />
                  <input
                    type="tel"
                    placeholder="+216 00 000 000"
                    className="w-full bg-transparent font-bold text-[#0F2A43] outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-black text-[#0F2A43]">
                    Mot de passe
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 focus-within:border-[#0F6C8D]">
                    <LockKeyhole className="h-5 w-5 text-[#0F6C8D]" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-transparent font-bold text-[#0F2A43] outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black text-[#0F2A43]">
                    Confirmer
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 focus-within:border-[#0F6C8D]">
                    <LockKeyhole className="h-5 w-5 text-[#0F6C8D]" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-transparent font-bold text-[#0F2A43] outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-600">
                <input type="checkbox" className="mt-1" />
                J’accepte les conditions d’utilisation et la politique de
                confidentialité de CoWorki.
              </label>

              <button
                type="button"
                className="group w-full rounded-2xl bg-[#7A1E3A] px-6 py-4 text-sm font-black text-white shadow-xl shadow-[#7A1E3A]/20 transition hover:bg-[#64172F]"
              >
                <span className="flex items-center justify-center gap-2">
                  Créer mon compte
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </button>
            </form>

            <div className="mt-8 rounded-3xl bg-[#F7FAFC] p-5 text-center">
              <p className="font-bold text-slate-600">
                Vous avez déjà un compte ?
              </p>

              <Link
                to="/connexion"
                className="mt-2 inline-block font-black text-[#0F6C8D] hover:underline"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default Register;
