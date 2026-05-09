import { CheckCircle2 } from "lucide-react";
import { PageHero, PageShell, StatusBadge } from "../components/SiteLayout";

const plans = [
  { name: "Gratuit", price: "0 TND", features: ["Référencement de base", "Gestion simple des informations", "Commission sur réservation"] },
  { name: "Premium", price: "49 TND/mois", popular: true, features: ["Visibilité renforcée", "Meilleur classement", "Statistiques avancées", "Promotions flash"] },
  { name: "Premium+", price: "99 TND/mois", features: ["Mise en avant prioritaire", "Accès aux demandes B2B", "Dashboard avancé", "Support prioritaire", "Participation recommandée aux CoWorki Events"] },
];

function Pricing() {
  return (
    <PageShell active="/pricing">
      <PageHero eyebrow="Abonnements partenaires" title="Choisissez l’offre adaptée à votre espace." text="Des formules claires pour gagner en visibilité, gérer vos réservations et accéder aux opportunités B2B." />
      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-14 md:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className={`relative rounded-[2rem] bg-white p-7 shadow-sm ring-1 ${plan.popular ? "ring-[#7A1E3A] shadow-2xl shadow-[#7A1E3A]/10" : "ring-slate-100"}`}>
            {plan.popular && <div className="absolute right-6 top-6"><StatusBadge tone="red">Populaire</StatusBadge></div>}
            <h2 className="text-3xl font-black text-[#0F2A43]">{plan.name}</h2>
            <p className="mt-4 text-4xl font-black text-[#7A1E3A]">{plan.price}</p>
            <div className="mt-8 space-y-4">
              {plan.features.map((feature) => (
                <p key={feature} className="flex gap-3 text-sm font-bold text-slate-600"><CheckCircle2 className="h-5 w-5 shrink-0 text-[#0F6C8D]" />{feature}</p>
              ))}
            </div>
            <button className="mt-8 w-full rounded-2xl bg-[#0F6C8D] px-5 py-4 text-sm font-black text-white">Choisir cette offre</button>
          </div>
        ))}
      </main>
    </PageShell>
  );
}

export default Pricing;
