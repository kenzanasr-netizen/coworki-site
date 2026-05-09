import { BarChart3, Megaphone, Minus, Plus, Star, Wallet } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import { PageHero, PageShell, StatusBadge } from "../components/SiteLayout";
import { apiFetch } from "../data/apiClient";
import { getMockSession } from "../data/mockAuth";

function PartnerDashboard() {
  const [promoStatus, setPromoStatus] = useState("pending");
  const [dashboard, setDashboard] = useState(null);
  const [capacity, setCapacity] = useState(0);
  const [notice, setNotice] = useState("");
  const session = getMockSession();
  const partnerName = session?.space || session?.name || "votre espace";
  const partnerStatus = dashboard?.stats?.status || session?.partner?.status || "PENDING";
  const firstSpace = dashboard?.partner?.spaces?.[0] || null;

  useEffect(() => {
    if (!session?.id) return;

    let active = true;
    apiFetch(`/api/partner/${session.id}/dashboard`)
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.message || "Impossible de charger le dashboard partenaire.");
        if (active) {
          setDashboard(data);
          const todayCapacity = data.partner?.spaces?.[0]?.dailyCapacities?.[0]?.capacity || 0;
          setCapacity(todayCapacity);
        }
      })
      .catch((error) => {
        if (active) setNotice(error.message);
      });

    return () => {
      active = false;
    };
  }, [session?.id]);

  const stats = useMemo(
    () => [
      [<BarChart3 />, "Réservations aujourd’hui", dashboard?.stats?.todayReservations || 0],
      [<BarChart3 />, "Réservations ce mois", dashboard?.stats?.monthReservations || 0],
      [<Wallet />, "Revenus estimés", `${dashboard?.stats?.monthRevenue || 0} TND`],
      [<Megaphone />, "Taux d’occupation", `${dashboard?.stats?.occupancyRate || 0} %`],
      [<Star />, "Statut partenaire", partnerStatus === "APPROVED" ? "Approuvé" : partnerStatus === "REJECTED" ? "Refusé" : "En attente"],
    ],
    [dashboard, partnerStatus]
  );

  const updateCapacity = async (nextCapacity) => {
    const safeCapacity = Math.max(0, nextCapacity);
    setCapacity(safeCapacity);
    setNotice("");

    if (!firstSpace?.id) {
      setNotice("Ajoutez votre premier espace pour enregistrer la capacité en base.");
      return;
    }

    try {
      const response = await apiFetch(`/api/partner/capacity/${firstSpace.id}`, {
        method: "PATCH",
        body: JSON.stringify({ capacity: safeCapacity }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Impossible de mettre à jour la capacité.");
      }
      setNotice("Capacité journalière enregistrée.");
    } catch (error) {
      setNotice(error.message);
    }
  };

  return (
    <PageShell active="/dashboard/partner">
      <PageHero eyebrow="Dashboard partenaire" title={`Pilotez ${partnerName} avec CoWorki.`} text="Réservations, revenus, disponibilité, demandes B2B, promotions flash et avis clients dans une interface claire." />
      <main className="mx-auto max-w-7xl px-6 py-14">
        {(session?.validationStatus || partnerStatus === "PENDING") && (
          <div className="mb-8 rounded-[2rem] bg-[#FFF7E8] p-5 shadow-sm ring-1 ring-amber-100">
            <StatusBadge tone="amber">Compte partenaire en attente</StatusBadge>
            <p className="mt-3 text-sm font-bold leading-6 text-slate-600">
              Votre espace est bien enregistré. La publication publique sera activée après validation par l’équipe CoWorki.
            </p>
          </div>
        )}
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
        <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-black text-[#0F2A43]">Capacité disponible aujourd’hui</h2>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
                Ajustez la capacité du jour pour éviter les réservations au-delà de vos places disponibles.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-[#F7FAFC] p-2">
              <button onClick={() => updateCapacity(capacity - 1)} className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#0F2A43] shadow-sm">
                <Minus className="h-5 w-5" />
              </button>
              <span className="min-w-16 text-center text-3xl font-black text-[#0F6C8D]">{capacity}</span>
              <button onClick={() => updateCapacity(capacity + 1)} className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7A1E3A] text-white shadow-sm">
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>
        <div className="mt-8 rounded-[2rem] bg-[#FBEFF3] p-6">
          <p className="font-black text-[#7A1E3A]">Suggestion CoWorki : votre taux d’occupation est faible vendredi après-midi. Lancez une promotion flash de -20 %.</p>
          {promoStatus !== "pending" && (
            <p className="mt-2 text-sm font-black text-[#0F6C8D]">
              Statut : {promoStatus === "accepted" ? "promotion acceptée" : promoStatus === "edited" ? "modification demandée" : "suggestion ignorée"}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => setPromoStatus("accepted")} className="rounded-full bg-[#7A1E3A] px-5 py-3 text-sm font-black text-white">Accepter</button>
            <button onClick={() => setPromoStatus("edited")} className="rounded-full bg-white px-5 py-3 text-sm font-black text-[#0F2A43]">Modifier</button>
            <button onClick={() => setPromoStatus("ignored")} className="rounded-full bg-white px-5 py-3 text-sm font-black text-slate-500">Ignorer</button>
          </div>
        </div>
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Nouvelle demande B2B", "Startup Nova souhaite réserver un espace événementiel.", "amber"],
            ["Avis client", "Lina a laissé un avis 5 étoiles sur Friends Lab.", "green"],
            ["Premium", "Votre visibilité peut augmenter avec l’offre Premium.", "teal"],
          ].map(([title, text, tone]) => (
            <div key={title} className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <StatusBadge tone={tone}>{title}</StatusBadge>
              <p className="mt-3 text-sm font-bold leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </section>
        <section className="mt-8 grid gap-8 lg:grid-cols-2">
          <Panel title="Réservations récentes">
            {dashboard?.todayReservations?.length ? (
              dashboard.todayReservations.map((item) => <Row key={item.id} item={item} />)
            ) : (
              <EmptyState title="Aucune réservation pour aujourd’hui." text="Les réservations validées apparaîtront ici dès qu’un utilisateur réserve votre espace." />
            )}
          </Panel>
          <Panel title="Demandes B2B reçues">
            <EmptyState title="Aucune demande B2B reçue." text="Les demandes entreprise apparaîtront ici quand votre espace sera visible et validé." />
          </Panel>
        </section>
        <section className="mt-8 grid gap-8 lg:grid-cols-3">
          <Panel title="Avis clients">
            {dashboard?.reviews?.length ? (
              dashboard.reviews.map((review) => (
                <p key={review.id} className="mb-3 rounded-2xl bg-[#F7FAFC] p-4 text-sm font-bold text-slate-600">{review.comment}</p>
              ))
            ) : (
              <EmptyState title="Aucun avis pour le moment." text="Les avis vérifiés seront listés ici après les premières réservations." />
            )}
          </Panel>
          <Panel title="Aperçu revenus">
            <p className="mb-3 rounded-2xl bg-[#F7FAFC] p-4 text-sm font-black text-[#0F2A43]">Revenus du mois : {dashboard?.stats?.monthRevenue || 0} TND</p>
            <p className="rounded-2xl bg-[#F7FAFC] p-4 text-sm font-bold text-slate-500">Le détail par formule sera disponible dès les premières réservations.</p>
          </Panel>
          <Panel title="Premium">
            <p className="leading-7 text-slate-600">Boostez votre visibilité et accédez aux demandes B2B prioritaires.</p>
            <Link to="/dashboard/partner/premium" className="mt-4 inline-flex rounded-full bg-[#7A1E3A] px-5 py-3 text-sm font-black text-white">Voir les offres</Link>
          </Panel>
        </section>
        <Link to="/dashboard/partner/spaces/new" className="mt-8 inline-flex rounded-2xl bg-[#0F6C8D] px-6 py-4 text-sm font-black text-white">Ajouter / modifier un espace</Link>
      </main>
    </PageShell>
  );
}

function Panel({ title, children }) {
  return <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100"><h2 className="mb-5 text-2xl font-black text-[#0F2A43]">{title}</h2>{children}</div>;
}

function Row({ item }) {
  return (
    <div className="mb-3 rounded-2xl bg-[#F7FAFC] p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-black text-[#0F2A43]">{item.userId || "Réservation CoWorki"}</p>
          <p className="mt-1 text-sm text-slate-500">{new Date(item.date).toLocaleDateString("fr-FR")} · {item.total} TND</p>
        </div>
        <StatusBadge tone={item.status === "CONFIRMED" ? "green" : "amber"}>{item.status}</StatusBadge>
      </div>
    </div>
  );
}

export default PartnerDashboard;
