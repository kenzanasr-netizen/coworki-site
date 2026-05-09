import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo-coworki.png";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import HeaderActions from "./HeaderActions";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/85 backdrop-blur-2xl">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo CoWorki" className="h-14 w-auto sm:h-16 md:h-20" />
        </Link>

        <MobileNav />

        <DesktopNav />

        <HeaderActions />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_0.9fr_0.9fr_0.8fr]">
        <div>
          <img src={logo} alt="Logo CoWorki" className="h-20 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
            CoWorki aide les utilisateurs, entreprises et espaces partenaires à trouver, réserver et valoriser les meilleurs lieux de travail en Tunisie.
          </p>
        </div>
        <FooterColumn title="Liens rapides" links={[["Accueil", "/"], ["Espaces", "/spaces"], ["Events", "/events"], ["À propos", "/about"], ["Contact", "/contact"]]} />
        <FooterColumn title="Plateforme" links={[["Devenir partenaire", "/partenaires"], ["Entreprises", "/business"], ["Démo jury", "/demo"], ["Eco Boost", "/eco-visibility"]]} />
        <FooterColumn title="Confiance" links={[["Conditions générales", "/legal/terms"], ["Confidentialité", "/legal/privacy"], ["Mentions légales", "/legal/mentions"], ["Annulation", "/legal/cancellation"]]} />
        <div>
          <p className="font-black text-[#0F2A43]">Réseaux sociaux</p>
          <div className="mt-4 flex gap-3">
            {["in", "fb", "ig"].map((item) => (
              <span key={item} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ECF8FC] text-sm font-black text-[#0F6C8D]">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">© 2026 CoWorki</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <p className="font-black text-[#0F2A43]">{title}</p>
      <div className="mt-4 grid gap-3 text-sm font-bold text-slate-600">
        {links.map(([label, path]) => (
          <Link key={path} to={path} className="transition hover:text-[#0F6C8D]">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function PageShell({ active, children }) {
  return (
    <div className="min-h-screen bg-[#F7FAFC] text-slate-950">
      <SiteHeader active={active} />
      {children}
      <SiteFooter />
    </div>
  );
}

export function PageHero({ eyebrow, title, text, children }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#ECF8FC] via-white to-[#FBEFF3]">
      <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#9ED8E8]/45 blur-3xl" />
      <div className="absolute right-[-80px] bottom-[-120px] h-96 w-96 rounded-full bg-[#7A1E3A]/20 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20"
      >
        <p className="inline-flex rounded-full border border-[#9ED8E8]/70 bg-white/75 px-4 py-2 text-sm font-black text-[#0F6C8D] shadow-sm backdrop-blur">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-[-0.03em] text-[#0F2A43] md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{text}</p>
        {children}
      </motion.div>
    </section>
  );
}

export function StatusBadge({ children, tone = "teal" }) {
  const tones = {
    teal: "bg-[#ECF8FC] text-[#0F6C8D]",
    red: "bg-[#FBEFF3] text-[#7A1E3A]",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    navy: "bg-[#0F2A43] text-white",
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-black ${tones[tone]}`}>{children}</span>;
}
