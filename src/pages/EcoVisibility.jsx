import { Leaf, ShieldCheck } from "lucide-react";
import { PageHero, PageShell, StatusBadge } from "../components/SiteLayout";
import { ecoSpaces } from "../data/platformData";

function EcoVisibility() {
  return (
    <PageShell active="/eco-visibility">
      <PageHero eyebrow="Responsabilité" title="Eco-Visibility Boost" text="Les espaces engagés dans des pratiques durables bénéficient d’une meilleure visibilité sur CoWorki." />
      <main className="mx-auto max-w-7xl px-6 py-14">
        <section className="grid gap-5 md:grid-cols-5">
          {["Gestion de l’énergie", "Réduction des déchets", "Confort et bien-être", "Accessibilité", "Environnement sain"].map((item) => (
            <div key={item} className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <Leaf className="h-6 w-6 text-emerald-600" />
              <p className="mt-4 font-black text-[#0F2A43]">{item}</p>
            </div>
          ))}
        </section>
        <section className="mt-10 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-2xl font-black text-[#0F2A43]">Standards de référence</h2>
          <div className="mt-5 flex flex-wrap gap-3">{["EDGE", "WELL", "ISO 14001"].map((item) => <StatusBadge key={item} tone="green">{item}</StatusBadge>)}</div>
        </section>
        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {ecoSpaces.map((space) => (
            <div key={space.name} className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <ShieldCheck className="h-8 w-8 text-emerald-600" />
              <h3 className="mt-4 text-2xl font-black text-[#0F2A43]">{space.name}</h3>
              <p className="mt-1 font-bold text-slate-500">{space.city}</p>
              <div className="mt-5 flex items-center justify-between"><StatusBadge tone="green">{space.badge}</StatusBadge><span className="text-2xl font-black text-emerald-700">{space.score}</span></div>
            </div>
          ))}
        </section>
      </main>
    </PageShell>
  );
}

export default EcoVisibility;
