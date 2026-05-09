import { Link } from "react-router-dom";
import { Building2, Handshake, ShieldCheck, Sparkles, Users } from "lucide-react";
import { PageHero, PageShell, StatusBadge } from "../components/SiteLayout";

function About() {
  return (
    <PageShell active="/about">
      <PageHero
        eyebrow="À propos"
        title="CoWorki modernise l’accès aux espaces de travail en Tunisie."
        text="La plateforme relie utilisateurs, espaces partenaires et entreprises autour d’un parcours simple : trouver, comparer, réserver et valoriser les meilleurs lieux de coworking."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/spaces" className="rounded-full bg-[#7A1E3A] px-7 py-4 text-sm font-black text-white shadow-xl shadow-[#7A1E3A]/20">
            Explorer les espaces
          </Link>
          <Link to="/partenaires" className="rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-[#0F2A43]">
            Devenir partenaire
          </Link>
        </div>
      </PageHero>

      <main className="mx-auto max-w-7xl px-6 py-14">
        <section className="grid gap-6 md:grid-cols-4">
          {[
            ["Utilisateurs", "Étudiants, freelances, télétravailleurs et entrepreneurs.", <Users className="h-6 w-6" />],
            ["Partenaires", "Gérants d’espaces qui veulent plus de visibilité.", <Building2 className="h-6 w-6" />],
            ["Entreprises", "Réservations B2B pour réunions, formations et événements.", <Handshake className="h-6 w-6" />],
            ["Admin", "Supervision de la qualité, des espaces et des statistiques.", <ShieldCheck className="h-6 w-6" />],
          ].map(([title, text, icon]) => (
            <div key={title} className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ECF8FC] text-[#0F6C8D]">{icon}</div>
              <h2 className="text-xl font-black text-[#0F2A43]">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-sm ring-1 ring-slate-100">
          <StatusBadge tone="red">Vision PFE / startup</StatusBadge>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.03em] text-[#0F2A43]">Une marketplace pensée pour l’écosystème coworking tunisien.</h2>
          <p className="mt-5 max-w-4xl leading-8 text-slate-600">
            CoWorki ne se limite pas à afficher des espaces. Le projet structure un parcours complet avec réservation, événements, demandes B2B, dashboard partenaire, back-office admin, Smart Matching après réservation et visibilité responsable des espaces.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Réservation centralisée", "Données et taux d’occupation", "Communauté et événements"].map((item) => (
              <div key={item} className="rounded-3xl bg-[#F7FAFC] p-5">
                <Sparkles className="h-5 w-5 text-[#0F6C8D]" />
                <p className="mt-3 font-black text-[#0F2A43]">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}

export default About;
