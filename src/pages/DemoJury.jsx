import { Link } from "react-router-dom";
import { ArrowRight, Building2, ShieldCheck, Users } from "lucide-react";
import { PageHero, PageShell } from "../components/SiteLayout";

const journeys = [
  {
    title: "Parcours utilisateur",
    text: "Explorer un espace, réserver, payer puis accéder au profil et au Smart Matching.",
    icon: <Users className="h-7 w-7" />,
    links: [["Explorer les espaces", "/spaces"], ["Connexion utilisateur", "/login"], ["Dashboard user", "/dashboard/user"]],
  },
  {
    title: "Parcours partenaire",
    text: "Comprendre l’offre partenaire, voir le dashboard, les réservations, B2B, revenus et promotions.",
    icon: <Building2 className="h-7 w-7" />,
    links: [["Landing partenaires", "/partenaires"], ["Connexion partenaire", "/login"], ["Dashboard partenaire", "/dashboard/partner"]],
  },
  {
    title: "Parcours admin",
    text: "Superviser les utilisateurs, espaces à valider, réservations, transactions et statistiques.",
    icon: <ShieldCheck className="h-7 w-7" />,
    links: [["Connexion admin", "/login"], ["Dashboard admin", "/admin"], ["Statistiques", "/admin/stats"]],
  },
];

function DemoJury() {
  return (
    <PageShell active="/demo">
      <PageHero
        eyebrow="Démo jury"
        title="Trois parcours pour présenter CoWorki clairement."
        text="Cette page sert de guide de démonstration rapide pour montrer la plateforme comme un vrai produit multi-rôles."
      />
      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-14 lg:grid-cols-3">
        {journeys.map((journey) => (
          <article key={journey.title} className="rounded-[2.5rem] bg-white p-7 shadow-sm ring-1 ring-slate-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#ECF8FC] text-[#0F6C8D]">{journey.icon}</div>
            <h2 className="mt-6 text-3xl font-black text-[#0F2A43]">{journey.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{journey.text}</p>
            <div className="mt-7 grid gap-3">
              {journey.links.map(([label, path]) => (
                <Link key={path} to={path} className="flex items-center justify-between rounded-2xl bg-[#F7FAFC] px-5 py-4 text-sm font-black text-[#0F2A43] transition hover:bg-[#ECF8FC] hover:text-[#0F6C8D]">
                  {label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </article>
        ))}
      </main>
    </PageShell>
  );
}

export default DemoJury;
