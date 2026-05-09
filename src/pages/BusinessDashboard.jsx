import { BriefcaseBusiness, CalendarDays, Users, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHero, PageShell, StatusBadge } from "../components/SiteLayout";
import { getMockSession } from "../data/mockAuth";

function BusinessDashboard() {
  const session = getMockSession();
  const companyName = session?.company || session?.name || "votre entreprise";

  return (
    <PageShell active="/dashboard/business">
      <PageHero
        eyebrow="Espace entreprise"
        title={`Gérez les réservations B2B de ${companyName}.`}
        text="Suivez vos demandes de salles, vos événements professionnels et les espaces recommandés pour votre équipe."
      />
      <main className="mx-auto max-w-7xl px-6 py-14">
        <section className="grid gap-5 md:grid-cols-4">
          {[
            [<BriefcaseBusiness />, "Demandes B2B", "6"],
            [<CalendarDays />, "Réservations à venir", "3"],
            [<Users />, "Participants prévus", "124"],
            [<Wallet />, "Budget estimé", "2 850 TND"],
          ].map(([icon, label, value]) => (
            <div key={label} className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <span className="text-[#0F6C8D] [&_svg]:h-6 [&_svg]:w-6">{icon}</span>
              <p className="mt-4 text-sm font-black text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-black text-[#0F2A43]">{value}</p>
            </div>
          ))}
        </section>

        <section id="requests" className="mt-8 scroll-mt-28 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-2xl font-black text-[#0F2A43]">Demandes B2B</h2>
          {[
            ["Formation équipe marketing", "The Dot", "22 juin 2026", "En attente"],
            ["Réunion direction", "Cogite", "28 juin 2026", "Confirmée"],
            ["Workshop IA", "Friends Lab", "5 juillet 2026", "En préparation"],
          ].map(([title, space, date, status]) => (
            <div key={title} className="mt-4 grid gap-3 rounded-2xl bg-[#F7FAFC] p-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="font-black text-[#0F2A43]">{title}</p>
                <p className="mt-1 text-sm font-bold text-slate-500">{space} · {date}</p>
              </div>
              <StatusBadge tone={status === "Confirmée" ? "green" : "amber"}>{status}</StatusBadge>
            </div>
          ))}
        </section>

        <section id="bookings" className="mt-8 scroll-mt-28 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-2xl font-black text-[#0F2A43]">Salles recommandées</h2>
          <p className="mt-2 text-slate-600">Des espaces adaptés aux réunions, formations et événements professionnels.</p>
          <Link to="/business/request" className="mt-5 inline-flex rounded-full bg-[#7A1E3A] px-6 py-3 text-sm font-black text-white">
            Envoyer une demande B2B
          </Link>
        </section>
      </main>
    </PageShell>
  );
}

export default BusinessDashboard;
