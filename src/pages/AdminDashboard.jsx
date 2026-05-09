import { BarChart3, Building2, CreditCard, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHero, PageShell, StatusBadge } from "../components/SiteLayout";
import { adminSpaces } from "../data/platformData";

function AdminDashboard() {
  return (
    <PageShell active="/admin">
      <PageHero eyebrow="Administration CoWorki" title="Piloter la plateforme et valider l’écosystème." text="Vue globale des utilisateurs, espaces, réservations, avis, événements et abonnements premium." />
      <main className="mx-auto max-w-7xl px-6 py-14">
        <section className="grid gap-5 md:grid-cols-4">
          {[
            [<Users />, "Utilisateurs inscrits", "1 240"],
            [<Building2 />, "Espaces partenaires", "38"],
            [<BarChart3 />, "Réservations", "2 860"],
            [<CreditCard />, "Chiffre d’affaires", "71 640 TND"],
          ].map(([icon, label, value]) => (
            <div key={label} className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <span className="text-[#0F6C8D] [&_svg]:h-6 [&_svg]:w-6">{icon}</span>
              <p className="mt-4 text-sm font-black text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-black text-[#0F2A43]">{value}</p>
            </div>
          ))}
        </section>
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Validation requise", "2 espaces attendent une décision admin.", "amber"],
            ["Transaction payée", "TX-2048 a été confirmée avec succès.", "green"],
            ["Signalement", "1 avis nécessite une vérification.", "red"],
          ].map(([title, text, tone]) => (
            <div key={title} className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <StatusBadge tone={tone}>{title}</StatusBadge>
              <p className="mt-3 text-sm font-bold leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </section>
        <section className="mt-8 grid gap-8 lg:grid-cols-2">
          <Panel title="Espaces en attente de validation">
            {adminSpaces.map((space) => (
              <div key={space.name} className="mb-3 rounded-2xl bg-[#F7FAFC] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-black text-[#0F2A43]">{space.name}</p>
                    <p className="text-sm text-slate-500">{space.city} · {space.owner}</p>
                  </div>
                  <StatusBadge tone={space.status === "Validé" ? "green" : "amber"}>{space.status}</StatusBadge>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-black text-white">Valider</button>
                  <button className="rounded-full bg-[#7A1E3A] px-4 py-2 text-xs font-black text-white">Refuser</button>
                </div>
              </div>
            ))}
          </Panel>
          <Panel title="Gestion plateforme">
            {[
              ["Gestion des utilisateurs", "/admin/users"],
              ["Réservations récentes", "/admin/bookings"],
              ["Transactions", "/admin/transactions"],
              ["Avis et signalements", "/admin/reviews"],
              ["Gestion des événements", "/admin/events"],
              ["Abonnements premium", "/admin/partners"],
              ["Statistiques", "/admin/stats"],
            ].map(([item, path]) => (
              <div key={item} className="mb-3 flex items-center justify-between rounded-2xl bg-[#F7FAFC] p-4">
                <p className="font-black text-[#0F2A43]">{item}</p>
                <Link to={path} className="rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F6C8D]">Ouvrir</Link>
              </div>
            ))}
          </Panel>
        </section>
      </main>
    </PageShell>
  );
}

function Panel({ title, children }) {
  return <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100"><h2 className="mb-5 text-2xl font-black text-[#0F2A43]">{title}</h2>{children}</div>;
}

export default AdminDashboard;
