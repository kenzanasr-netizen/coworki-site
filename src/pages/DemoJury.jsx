import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, Heart, Search } from "lucide-react";
import { PageHero, PageShell } from "../components/SiteLayout";

const journeys = [
  {
    title: "Trouver un espace",
    text: "Filtrez par ville, budget, services et ambiance pour repérer rapidement le lieu qui vous convient.",
    icon: <Search className="h-7 w-7" />,
    links: [["Explorer les espaces", "/spaces"], ["Voir les offres", "/offres"], ["Créer un compte", "/signup"]],
  },
  {
    title: "Réserver simplement",
    text: "Choisissez une date, une formule et envoyez votre demande de réservation en quelques clics.",
    icon: <CalendarCheck className="h-7 w-7" />,
    links: [["Réserver maintenant", "/spaces"], ["Se connecter", "/login"], ["Mes réservations", "/dashboard"]],
  },
  {
    title: "Garder ses favoris",
    text: "Ajoutez vos espaces préférés, suivez vos notifications et retrouvez vos réservations depuis votre espace.",
    icon: <Heart className="h-7 w-7" />,
    links: [["Mon espace", "/dashboard"], ["Mes favoris", "/dashboard#favoris"], ["Smart Matching", "/dashboard#smart-matching"]],
  },
];

function DemoJury() {
  return (
    <PageShell active="/spaces">
      <PageHero
        eyebrow="Guide utilisateur"
        title="Votre parcours CoWorki, simple et rapide."
        text="Trouvez un espace, réservez votre créneau et gardez toutes vos informations dans votre espace personnel."
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
