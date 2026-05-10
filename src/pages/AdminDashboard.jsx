import { BarChart3, Building2, CreditCard, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import { PageHero, PageShell, StatusBadge } from "../components/SiteLayout";
import { apiFetch } from "../data/apiClient";

function AdminDashboard() {
  const [overview, setOverview] = useState(null);
  const [partners, setPartners] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notice, setNotice] = useState("");
  const [loadingAction, setLoadingAction] = useState("");

  useEffect(() => {
    let active = true;

    apiFetch("/api/admin/dashboard")
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.message || "Impossible de charger le tableau de bord admin.");
        return data;
      })
      .then((data) => {
        if (!active) return;
        setOverview(data.stats);
        setPartners(data.pendingPartners || []);
        setReservations(data.latestReservations || []);
        setNotifications(data.notifications || []);
      })
      .catch((error) => {
        if (active) setNotice(error.message);
      });

    return () => {
      active = false;
    };
  }, []);

  const updatePartnerStatus = async (partnerId, status) => {
    setLoadingAction(`${status}-${partnerId}`);
    setNotice("");
    try {
      const response = await apiFetch(`/api/admin/partners/${partnerId}/${status === "APPROVED" ? "approve" : "reject"}`, {
        method: "PATCH",
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Impossible de mettre à jour le partenaire.");
      setPartners((current) => current.filter((partner) => partner.id !== partnerId));
      setNotice(status === "APPROVED" ? "Partenaire approuvé et notifié." : "Partenaire refusé et notifié.");
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoadingAction("");
    }
  };

  const markNotificationRead = async (notificationId) => {
    setLoadingAction(`notification-${notificationId}`);
    setNotice("");
    try {
      const response = await apiFetch(`/api/admin/notifications/${notificationId}/read`, { method: "PATCH" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Impossible de marquer la notification.");
      setNotifications((current) => current.map((item) => (item.id === notificationId ? { ...item, read: true } : item)));
      setNotice("Notification marquée comme lue.");
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoadingAction("");
    }
  };

  const stats = [
    [<Users />, "Utilisateurs inscrits", overview?.users ?? "—"],
    [<Building2 />, "Partenaires", overview?.partners ?? "—"],
    [<BarChart3 />, "Réservations", overview?.reservations ?? "—"],
    [<CreditCard />, "Revenus estimés", `${overview?.monthRevenue ?? 0} TND`],
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
            ["Espaces", `${overview?.spaces ?? 0} espace(s) enregistrés dans la base.`, "green"],
            ["Notifications", `${overview?.unreadNotifications ?? 0} notification(s) admin non lue(s).`, "red"],
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
                    <button disabled={loadingAction === `APPROVED-${partner.id}`} onClick={() => updatePartnerStatus(partner.id, "APPROVED")} className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-black text-white disabled:opacity-60">Valider</button>
                    <button disabled={loadingAction === `REJECTED-${partner.id}`} onClick={() => updatePartnerStatus(partner.id, "REJECTED")} className="rounded-full bg-[#7A1E3A] px-4 py-2 text-xs font-black text-white disabled:opacity-60">Refuser</button>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState title="Aucun partenaire en attente." text="Les demandes créées depuis l’inscription partenaire apparaîtront ici." />
            )}
          </Panel>

          <Panel title="Gestion plateforme">
            {[
              ["Gestion des utilisateurs", "/admin/users"],
              ["Partenaires", "/admin/partners"],
              ["Espaces", "/admin/spaces"],
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

        <section className="mt-8 grid gap-8 lg:grid-cols-2">
          <Panel title="Réservations récentes">
            {reservations.length ? (
              reservations.map((reservation) => (
                <div key={reservation.id} className="mb-3 rounded-2xl bg-[#F7FAFC] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-black text-[#0F2A43]">{reservation.user?.fullName || "Utilisateur"}</p>
                      <p className="text-sm text-slate-500">{reservation.space?.name || "Espace"} · {new Date(reservation.date).toLocaleDateString("fr-FR")} · {reservation.total} TND</p>
                    </div>
                    <StatusBadge tone={reservation.status === "CONFIRMED" ? "green" : reservation.status === "CANCELLED" ? "red" : "amber"}>{reservation.status}</StatusBadge>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState title="Aucune réservation trouvée." text="Les réservations créées par les utilisateurs apparaîtront ici." />
            )}
          </Panel>
          <Panel title="Notifications admin">
            {notifications.length ? (
              notifications.map((notification) => (
                <div key={notification.id} className="mb-3 rounded-2xl bg-[#F7FAFC] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-black text-[#0F2A43]">{notification.title}</p>
                      <p className="mt-1 text-sm font-bold text-slate-500">{notification.message}</p>
                    </div>
                    <StatusBadge tone={notification.read ? "teal" : "amber"}>{notification.read ? "Lue" : "Non lue"}</StatusBadge>
                  </div>
                  {!notification.read && (
                    <button disabled={loadingAction === `notification-${notification.id}`} onClick={() => markNotificationRead(notification.id)} className="mt-3 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F6C8D] disabled:opacity-60">Marquer comme lu</button>
                  )}
                </div>
              ))
            ) : (
              <EmptyState title="Aucune notification admin." text="Les validations, inscriptions et réservations importantes apparaîtront ici." />
            )}
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
