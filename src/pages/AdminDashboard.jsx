import { BarChart3, Building2, CreditCard, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import { PageHero, PageShell, StatusBadge } from "../components/SiteLayout";
import { apiFetch } from "../data/apiClient";
import { adminSpaces } from "../data/platformData";

function AdminDashboard() {
  const [overview, setOverview] = useState(null);
  const [partners, setPartners] = useState([]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;

    Promise.all([
      apiFetch("/api/admin/overview").then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.message || "Impossible de charger les statistiques admin.");
        return data.stats;
      }),
      apiFetch("/api/admin/partners?status=PENDING").then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.message || "Impossible de charger les partenaires.");
        return data.partners || [];
      }),
    ])
      .then(([stats, pendingPartners]) => {
        if (!active) return;
        setOverview(stats);
        setPartners(pendingPartners);
      })
      .catch((error) => {
        if (active) setNotice(error.message);
      });

    return () => {
      active = false;
    };
  }, []);

  const updatePartnerStatus = async (partnerId, status) => {
    setNotice("");
    try {
      const response = await apiFetch(`/api/admin/partners/${partnerId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Impossible de mettre à jour le partenaire.");
      setPartners((current) => current.filter((partner) => partner.id !== partnerId));
      setNotice(status === "APPROVED" ? "Partenaire approuvé et notifié." : "Partenaire refusé et notifié.");
    } catch (error) {
      setNotice(error.message);
    }
  };

  const stats = [
    [<Users />, "Utilisateurs inscrits", overview?.users ?? "—"],
    [<Building2 />, "Partenaires", overview?.partners ?? "—"],
    [<BarChart3 />, "Réservations", overview?.reservations ?? "—"],
    [<CreditCard />, "Entreprises", overview?.companies ?? "—"],
  ];

  return (
    <PageShell active="/admin">
      <PageHero eyebrow="Administration CoWorki" title="Piloter la plateforme et valider l’écosystème." text="Vue globale des utilisateurs, espaces, réservations, avis, événements et abonnements premium." />
      <main className="mx-auto max-w-7xl px-6 py-14">
        {notice && (
          <div className="mb-8 rounded-[2rem] bg-white p-5 text-sm font-black text-[#0F6C8D] shadow-sm ring-1 ring-slate-100">
            {notice}
          </div>
        )}

        <section className="grid gap-5 md:grid-cols-4">
          {stats.map(([icon, label, value]) => (
            <div key={label} className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <span className="text-[#0F6C8D] [&_svg]:h-6 [&_svg]:w-6">{icon}</span>
              <p className="mt-4 text-sm font-black text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-black text-[#0F2A43]">{value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Validation requise", `${overview?.pendingPartners ?? 0} partenaire(s) attendent une décision admin.`, "amber"],
            ["Transactions", "Les transactions seront visibles après les premiers paiements.", "green"],
            ["Signalements", "Les avis signalés apparaîtront ici dès qu’ils existent.", "red"],
          ].map(([title, text, tone]) => (
            <div key={title} className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <StatusBadge tone={tone}>{title}</StatusBadge>
              <p className="mt-3 text-sm font-bold leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-2">
          <Panel title="Partenaires en attente de validation">
            {partners.length ? (
              partners.map((partner) => (
                <div key={partner.id} className="mb-3 rounded-2xl bg-[#F7FAFC] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-black text-[#0F2A43]">{partner.companyName}</p>
                      <p className="text-sm text-slate-500">{partner.user?.email} · {partner.user?.phone || "Téléphone non renseigné"}</p>
                    </div>
                    <StatusBadge tone="amber">{partner.status}</StatusBadge>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => updatePartnerStatus(partner.id, "APPROVED")} className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-black text-white">Valider</button>
                    <button onClick={() => updatePartnerStatus(partner.id, "REJECTED")} className="rounded-full bg-[#7A1E3A] px-4 py-2 text-xs font-black text-white">Refuser</button>
                  </div>
                </div>
              ))
            ) : adminSpaces.length ? (
              adminSpaces.map((space) => (
                <div key={space.name} className="mb-3 rounded-2xl bg-[#F7FAFC] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-black text-[#0F2A43]">{space.name}</p>
                      <p className="text-sm text-slate-500">{space.city} · {space.owner}</p>
                    </div>
                    <StatusBadge tone={space.status === "Validé" ? "green" : "amber"}>{space.status}</StatusBadge>
                  </div>
                  <p className="mt-3 text-xs font-bold text-slate-500">Donnée de démonstration affichée si aucun partenaire réel n’est en attente.</p>
                </div>
              ))
            ) : (
              <EmptyState title="Aucun partenaire en attente." text="Les demandes créées depuis l’inscription partenaire apparaîtront ici." />
            )}
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
