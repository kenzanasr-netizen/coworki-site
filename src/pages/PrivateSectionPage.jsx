import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import { PageHero, PageShell, StatusBadge } from "../components/SiteLayout";
import { apiFetch } from "../data/apiClient";

const sectionMeta = {
  partner: {
    spaces: ["Mes espaces", "Gérez les espaces réellement liés à votre compte partenaire."],
    bookings: ["Réservations reçues", "Suivez et traitez les réservations de vos espaces."],
    "b2b-requests": ["Demandes B2B", "Les demandes entreprise validées par CoWorki apparaîtront ici."],
    revenue: ["Revenus", "Suivez les revenus confirmés issus des réservations."],
    promotions: ["Promotions flash", "Préparez vos futures promotions depuis un espace structuré."],
    premium: ["Offres Premium", "Gérez votre visibilité partenaire et vos options premium."],
    capacity: ["Capacité", "Contrôlez la capacité journalière enregistrée en base."],
    reviews: ["Avis clients", "Consultez les avis laissés sur vos espaces."],
    notifications: ["Notifications", "Suivez les alertes réelles de votre compte partenaire."],
    profile: ["Profil partenaire", "Les informations publiques de votre espace partenaire."],
  },
  admin: {
    users: ["Utilisateurs", "Liste réelle des comptes inscrits."],
    partners: ["Partenaires", "Gérez les partenaires et leur statut."],
    spaces: ["Espaces", "Supervisez les espaces enregistrés sur CoWorki."],
    bookings: ["Réservations", "Suivez les réservations de la plateforme."],
    companies: ["Entreprises", "Liste réelle des comptes entreprise."],
    transactions: ["Transactions", "Les paiements réels apparaîtront ici après intégration paiement."],
    reviews: ["Avis / signalements", "Les signalements réels seront affichés ici."],
    events: ["Événements", "La gestion événementielle sera connectée lors de l’intégration backend dédiée."],
    stats: ["Statistiques", "Indicateurs calculés depuis la base."],
    notifications: ["Notifications", "Alertes admin sauvegardées en base."],
  },
};

function PrivateSectionPage({ area }) {
  const { section } = useParams();
  const [rows, setRows] = useState([]);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState("");
  const meta = sectionMeta[area]?.[section] || ["Section privée", "Cette section est prête pour les données backend CoWorki."];

  const endpoint = useMemo(() => getEndpoint(area, section), [area, section]);

  const loadRows = useCallback(() => {
    if (!endpoint) {
      queueMicrotask(() => {
        setRows([]);
        setLoading(false);
      });
      return undefined;
    }

    let active = true;
    apiFetch(endpoint)
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.message || "Impossible de charger cette section.");
        if (active) setRows(normalizeRows(area, section, data));
      })
      .catch((error) => {
        if (active) setNotice(error.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [area, endpoint, section]);

  useEffect(() => loadRows(), [loadRows]);

  const runAction = async (key, successMessage, action) => {
    setLoadingAction(key);
    setNotice("");
    try {
      await action();
      setNotice(successMessage);
      loadRows();
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoadingAction("");
    }
  };

  const handleAction = (row, action) => {
    if (action.type === "soon") {
      setNotice("Cette fonctionnalité sera bientôt disponible avec une action backend dédiée.");
      return;
    }

    if (action.confirm && !window.confirm(action.confirm(row))) return;

    runAction(`${action.type}-${row.id}`, action.success, async () => {
      const response = await apiFetch(action.path(row), {
        method: action.method || "PATCH",
        body: action.body ? JSON.stringify(action.body(row)) : undefined,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || action.error || "Action impossible.");
    });
  };

  return (
    <PageShell active={area === "admin" ? "/admin" : "/dashboard/partner"}>
      <PageHero eyebrow={area === "admin" ? "Administration" : "Espace partenaire"} title={meta[0]} text={meta[1]} />
      <main className="mx-auto max-w-7xl px-6 py-14">
        {notice && <div className="mb-8 rounded-[2rem] bg-white p-5 text-sm font-black text-[#0F6C8D] shadow-sm ring-1 ring-slate-100">{notice}</div>}
        {loading ? (
          <div className="rounded-[2rem] bg-white p-8 text-sm font-black text-slate-500 shadow-sm ring-1 ring-slate-100">Chargement des données...</div>
        ) : rows.length === 0 ? (
          <EmptyState title={emptyTitle(area, section)} text={emptyText(area, section)} />
        ) : (
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-100">
            <div className="grid gap-4 border-b border-slate-100 bg-[#F7FAFC] p-5 text-sm font-black text-[#0F2A43] md:grid-cols-4">
              <span>Nom</span>
              <span>Détail</span>
              <span>Info</span>
              <span>Statut</span>
            </div>
            {rows.map((row) => (
              <div key={row.id} className="grid gap-4 border-b border-slate-100 p-5 text-sm font-bold text-slate-600 last:border-b-0 md:grid-cols-4 md:items-center">
                <span className="font-black text-[#0F2A43]">{row.name}</span>
                <span>{row.detail}</span>
                <span>{row.info}</span>
                <span><StatusBadge tone={statusTone(row.status)}>{row.status}</StatusBadge></span>
                <div className="flex flex-wrap gap-2 md:col-span-4">
                  {row.actions?.map((action) =>
                    action.to ? (
                      <Link key={action.label} to={action.to(row)} className="rounded-full bg-[#ECF8FC] px-4 py-2 text-xs font-black text-[#0F6C8D]">
                        {action.label}
                      </Link>
                    ) : (
                      <button
                        key={action.label}
                        disabled={loadingAction === `${action.type}-${row.id}`}
                        onClick={() => handleAction(row, action)}
                        className={`rounded-full px-4 py-2 text-xs font-black disabled:opacity-60 ${action.danger ? "bg-[#FBEFF3] text-[#7A1E3A]" : "bg-[#ECF8FC] text-[#0F6C8D]"}`}
                      >
                        {action.label}
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </PageShell>
  );
}

function getEndpoint(area, section) {
  const endpoints = {
    partner: {
      spaces: "/api/partner/spaces",
      bookings: "/api/partner/reservations",
      capacity: "/api/partner/capacity",
      reviews: "/api/partner/reviews",
      notifications: "/api/partner/notifications",
      revenue: "/api/partner/dashboard",
    },
    admin: {
      users: "/api/admin/users",
      partners: "/api/admin/partners",
      spaces: "/api/admin/spaces",
      bookings: "/api/admin/reservations",
      companies: "/api/admin/companies",
      stats: "/api/admin/dashboard",
      notifications: "/api/admin/notifications",
    },
  };
  return endpoints[area]?.[section] || "";
}

function normalizeRows(area, section, data) {
  if (area === "partner") return normalizePartnerRows(section, data);
  return normalizeAdminRows(section, data);
}

function normalizePartnerRows(section, data) {
  if (section === "spaces") {
    return (data.spaces || []).map((space) => ({
      id: space.id,
      name: space.name,
      detail: `${space.city} · ${space.capacity || 0} places`,
      info: `${space.priceDay || 0} TND/jour`,
      status: space.isPublished ? "Publié" : "Non publié",
      actions: [
        { label: space.isPublished ? "Dépublier" : "Publier", type: "publish", path: (row) => `/api/partner/spaces/${row.id}/publish`, body: (row) => ({ isPublished: row.status !== "Publié" }), success: "Publication mise à jour." },
        { label: "Modifier", to: () => "/dashboard/partner/spaces/new" },
        { label: "Désactiver", type: "delete", method: "DELETE", path: (row) => `/api/partner/spaces/${row.id}`, success: "Espace désactivé.", danger: true, confirm: (row) => `Désactiver ${row.name} ?` },
      ],
    }));
  }
  if (section === "bookings") {
    return (data.reservations || []).map((reservation) => ({
      id: reservation.id,
      name: reservation.user?.fullName || "Utilisateur",
      detail: `${reservation.space?.name || "Espace"} · ${new Date(reservation.date).toLocaleDateString("fr-FR")}`,
      info: `${reservation.duration} · ${reservation.total} TND`,
      status: reservation.status,
      actions: [
        ...(reservation.status === "PENDING" ? [{ label: "Confirmer", type: "confirm", path: (row) => `/api/partner/reservations/${row.id}/confirm`, success: "Réservation confirmée." }] : []),
        ...(["PENDING", "CONFIRMED"].includes(reservation.status) ? [{ label: "Annuler", type: "cancel", path: (row) => `/api/partner/reservations/${row.id}/cancel`, success: "Réservation annulée.", danger: true }] : []),
        ...(reservation.status === "CONFIRMED" ? [{ label: "Terminée", type: "complete", path: (row) => `/api/partner/reservations/${row.id}/complete`, success: "Réservation terminée." }] : []),
      ],
    }));
  }
  if (section === "reviews") {
    return (data.reviews || []).map((review) => ({
      id: review.id,
      name: review.user?.fullName || "Client",
      detail: review.space?.name || "Espace",
      info: review.comment || "Sans commentaire",
      status: `${review.rating}/5`,
      actions: [],
    }));
  }
  if (section === "notifications") {
    return (data.notifications || []).map((notification) => ({
      id: notification.id,
      name: notification.title,
      detail: notification.message,
      info: new Date(notification.createdAt).toLocaleDateString("fr-FR"),
      status: notification.read ? "Lue" : "Non lue",
      actions: notification.read ? [] : [{ label: "Marquer comme lu", type: "read", path: (row) => `/api/partner/notifications/${row.id}/read`, success: "Notification lue." }],
    }));
  }
  if (section === "capacity") {
    return (data.capacities || []).map((capacity) => ({
      id: capacity.id,
      name: capacity.space?.name || "Espace",
      detail: new Date(capacity.date).toLocaleDateString("fr-FR"),
      info: `${capacity.remainingCapacity}/${capacity.capacity} disponibles`,
      status: "Active",
      actions: [],
    }));
  }
  if (section === "revenue") {
    return [{
      id: "revenue-month",
      name: "Revenus du mois",
      detail: `${data.stats?.monthReservations || 0} réservation(s)`,
      info: `${data.stats?.monthRevenue || 0} TND`,
      status: "Calculé",
      actions: [],
    }];
  }
  return [];
}

function normalizeAdminRows(section, data) {
  if (section === "users") {
    return (data.users || []).map((user) => ({
      id: user.id,
      name: user.fullName,
      detail: user.email,
      info: user.phone || "Téléphone non renseigné",
      status: user.role,
      actions: [{ label: "Voir profil", type: "soon" }],
    }));
  }
  if (section === "partners") {
    return (data.partners || []).map((partner) => ({
      id: partner.id,
      name: partner.companyName,
      detail: partner.user?.email || "Email non renseigné",
      info: `${partner.spaces?.length || 0} espace(s)`,
      status: partner.status,
      actions: [
        ...(partner.status !== "APPROVED" ? [{ label: "Valider", type: "approve", path: (row) => `/api/admin/partners/${row.id}/approve`, success: "Partenaire approuvé." }] : []),
        ...(partner.status !== "REJECTED" ? [{ label: "Refuser", type: "reject", path: (row) => `/api/admin/partners/${row.id}/reject`, success: "Partenaire refusé.", danger: true }] : []),
      ],
    }));
  }
  if (section === "spaces") {
    return (data.spaces || []).map((space) => ({
      id: space.id,
      name: space.name,
      detail: `${space.city} · ${space.partner?.companyName || "Sans partenaire"}`,
      info: `${space.reservations?.length || 0} réservation(s)`,
      status: space.isPublished ? "Publié" : "Non publié",
      actions: [{ label: space.isPublished ? "Dépublier" : "Publier", type: "publish", path: (row) => `/api/admin/spaces/${row.id}/publish`, body: (row) => ({ isPublished: row.status !== "Publié" }), success: "Publication mise à jour." }],
    }));
  }
  if (section === "bookings") {
    return (data.reservations || []).map((reservation) => ({
      id: reservation.id,
      name: reservation.user?.fullName || "Utilisateur",
      detail: `${reservation.space?.name || "Espace"} · ${new Date(reservation.date).toLocaleDateString("fr-FR")}`,
      info: `${reservation.total} TND`,
      status: reservation.status,
      actions: [],
    }));
  }
  if (section === "companies") {
    return (data.companies || []).map((company) => ({
      id: company.id,
      name: company.companyName,
      detail: company.user?.email || "Email non renseigné",
      info: company.billingAddress || company.taxNumber || "Infos à compléter",
      status: "Entreprise",
      actions: [{ label: "Voir détails", type: "soon" }],
    }));
  }
  if (section === "notifications") {
    return (data.notifications || []).map((notification) => ({
      id: notification.id,
      name: notification.title,
      detail: notification.message,
      info: new Date(notification.createdAt).toLocaleDateString("fr-FR"),
      status: notification.read ? "Lue" : "Non lue",
      actions: notification.read ? [] : [{ label: "Marquer comme lu", type: "read", path: (row) => `/api/admin/notifications/${row.id}/read`, success: "Notification lue." }],
    }));
  }
  if (section === "stats") {
    return Object.entries(data.stats || {}).map(([key, value]) => ({
      id: key,
      name: labelStat(key),
      detail: "Calculé depuis Prisma",
      info: String(value),
      status: "Réel",
      actions: [],
    }));
  }
  return [];
}

function labelStat(key) {
  const labels = {
    users: "Utilisateurs",
    partners: "Partenaires",
    pendingPartners: "Partenaires en attente",
    approvedPartners: "Partenaires approuvés",
    rejectedPartners: "Partenaires refusés",
    companies: "Entreprises",
    spaces: "Espaces",
    reservations: "Réservations",
    todayReservations: "Réservations du jour",
    monthReservations: "Réservations du mois",
    monthRevenue: "Revenus du mois",
    unreadNotifications: "Notifications non lues",
  };
  return labels[key] || key;
}

function emptyTitle(area, section) {
  if (section === "spaces") return area === "partner" ? "Aucun espace ajouté pour le moment." : "Aucun espace trouvé.";
  if (section === "bookings") return "Aucune réservation trouvée.";
  if (section === "notifications") return "Aucune notification pour le moment.";
  if (section === "reviews") return "Aucun avis client pour le moment.";
  if (section === "partners") return "Aucun partenaire trouvé.";
  return "Aucune donnée disponible pour le moment.";
}

function emptyText(area, section) {
  if (!getEndpoint(area, section)) return "Cette fonctionnalité sera bientôt disponible avec une action backend dédiée.";
  return "Cette vue est connectée au backend CoWorki et affichera les données dès qu’elles existeront.";
}

function statusTone(status) {
  if (["Actif", "Validé", "Confirmée", "CONFIRMED", "COMPLETED", "Publié", "APPROVED", "USER", "ADMIN", "Réel", "Calculé", "Active", "Lue", "Entreprise"].includes(status)) return "green";
  if (["En attente", "PENDING", "Non publié", "Non lue"].includes(status)) return "amber";
  if (["REJECTED", "CANCELLED", "Refusé"].includes(status)) return "red";
  return "teal";
}

export default PrivateSectionPage;
