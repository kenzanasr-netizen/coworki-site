import { Link } from "react-router-dom";
import logo from "../assets/logo-coworki.png";
import MobileNav from "../components/MobileNav";
import { ArrowLeft, CalendarDays, Handshake, BadgePercent } from "lucide-react";

const pageContent = {
  offres: {
    title: "Offres",
    subtitle: "Des formules flexibles pour réserver plus simplement.",
    icon: BadgePercent,
  },
  events: {
    title: "Events",
    subtitle: "Les rencontres et ateliers coworking arrivent bientôt.",
    icon: CalendarDays,
  },
  partenaires: {
    title: "Partenaires",
    subtitle: "Un espace dédié aux collaborations et lieux partenaires.",
    icon: Handshake,
  },
};

function ComingSoon({ type }) {
  const content = pageContent[type] || pageContent.offres;
  const Icon = content.icon;

  return (
    <div className="min-h-screen bg-[#F7FAFC] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-4">
            <img src={logo} alt="Logo CoWorki" className="h-20 w-auto" />
          </Link>

          <MobileNav />

          <nav className="hidden items-center gap-7 rounded-full border border-slate-200/70 bg-white/80 px-6 py-3 text-sm font-black text-slate-600 shadow-sm lg:flex">
            <Link to="/" className="transition hover:text-[#0F6C8D]">
              Accueil
            </Link>
            <Link to="/spaces" className="transition hover:text-[#0F6C8D]">
              Espaces
            </Link>
            <Link to="/offres" className={type === "offres" ? "text-[#0F6C8D]" : "transition hover:text-[#0F6C8D]"}>
              Offres
            </Link>
            <Link to="/events" className={type === "events" ? "text-[#0F6C8D]" : "transition hover:text-[#0F6C8D]"}>
              Events
            </Link>
            <Link to="/partenaires" className={type === "partenaires" ? "text-[#0F6C8D]" : "transition hover:text-[#0F6C8D]"}>
              Partenaires
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative overflow-hidden bg-gradient-to-br from-[#ECF8FC] via-white to-[#FBEFF3]">
        <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-[#9ED8E8]/50 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-[#7A1E3A]/20 blur-3xl" />

        <section className="relative mx-auto flex min-h-[calc(100vh-105px)] max-w-5xl flex-col items-center justify-center px-6 py-20 text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-[#0F6C8D] shadow-xl shadow-slate-300/40">
            <Icon className="h-8 w-8" />
          </div>

          <p className="mb-4 inline-flex rounded-full border border-[#9ED8E8]/70 bg-white/75 px-4 py-2 text-sm font-black text-[#0F6C8D] shadow-sm backdrop-blur">
            Bientôt disponible
          </p>

          <h1 className="text-5xl font-black leading-tight text-[#0F2A43] md:text-7xl">
            {content.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            {content.subtitle}
          </p>

          <Link
            to="/spaces"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#7A1E3A] px-7 py-4 text-sm font-black text-white shadow-xl shadow-[#7A1E3A]/25 transition hover:bg-[#64172F]"
          >
            <ArrowLeft className="h-4 w-4" />
            Voir les espaces
          </Link>
        </section>
      </main>
    </div>
  );
}

export default ComingSoon;
