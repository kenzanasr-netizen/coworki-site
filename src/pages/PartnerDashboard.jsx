import { BarChart3, Bell, Megaphone, Minus, Plus, Star, Wallet } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import { PageHero, PageShell, StatusBadge } from "../components/SiteLayout";
import { apiFetch } from "../data/apiClient";
import { getMockSession } from "../data/mockAuth";

function PartnerDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [capacity, setCapacity] = useState(0);
  const [notice, setNotice] = useState("");
  const [loadingAction, setLoadingAction] = useState("");
  const session = getMockSession();
  const partnerName = session?.space || session?.name || "votre espace";
  const partnerStatus = dashboard?.stats?.status || session?.partner?.status || "PENDING";
  const firstSpace = dashboard?.partner?.spaces?.[0] || null;

  const loadDashboard = useCallback(() => {
    let active = true;
    apiFetch("/api/partner/dashboard")
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.message || "Impossible de charger le tableau de bord partenaire.");
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
  }, []);

  useEffect(() => {
    if (!session?.id) return;
    return loadDashboard();
  }, [loadDashboard, session?.id]);

  const stats = useMemo(
    () => [
      [<BarChart3 />, "Réservations aujourd’hui", dashboard?.stats?.todayReservations || 0],
      [<BarChart3 />, "Réservations ce mois", dashboard?.stats?.monthReservations || 0],
      [<Wallet />, "Revenus estimés", `${dashboard?.stats?.monthRevenue || 0} TND`],
      [<Megaphone />, "Taux d’occupation", `${dashboard?.stats?.occupancyRate || 0} %`],
      [<Bell />, "Notifications non lues", dashboard?.stats?.unreadNotifications || 0],
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

  const runAction = async (key, successMessage, action) => {
    setLoadingAction(key);
    setNotice("");
    try {
      await action();
      setNotice(successMessage);
      loadDashboard();
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoadingAction("");
    }
  };

  const updateReservationStatus = (reservationId, action) => {
    const labels = {
      confirm: "Réservation confirmée.",
      cancel: "Réservation annulée.",
      complete: "Réservation marquée comme terminée.",
    };
    return runAction(`${action}-${reservationId}`, labels[action], async () => {
      const response = await apiFetch(`/api/partner/reservations/${reservationId}/${action}`, { method: "PATCH" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Impossible de modifier la réservation.");
    });
  };

  const toggleSpacePublication = (space) => {
    const nextStatus = !space.isPublished;
    return runAction(`publish-${space.id}`, nextStatus ? "Espace publié." : "Espace dépublié.", async () => {
      const response = await apiFetch(`/api/partner/spaces/${space.id}/publish`, {
        method: "PATCH",
        body: JSON.stringify({ isPublished: nextStatus }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Impossible de changer la publication.");
    });
  };

  const disableSpace = (space) => {
    if (!window.confirm(`Désactiver ${space.name} ? Il ne sera plus visible publiquement.`)) return;
    return runAction(`delete-${space.id}`, "Espace désactivé.", async () => {
      const response = await apiFetch(`/api/partner/spaces/${space.id}`, { method: "DELETE" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Impossible de désactiver l’espace.");
    });
  };

  const readNotification = (notificationId) => {
    return runAction(`notification-${notificationId}`, "Notification marquée comme lue.", async () => {
      const response = await apiFetch(`/api/partner/notifications/${notificationId}/read`, { method: "PATCH" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Impossible de marquer la notification.");
    });
  };

  const readAllNotifications = () => {
    return runAction("notifications-read-all", "Toutes les notifications sont marquées comme lues.", async () => {
      const response = await apiFetch("/api/partner/notifications/read-all", { method: "PATCH" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Impossible de marquer les notifications.");
    });
  };

  const showSoon = (feature) => {
    setNotice(`${feature} sera bientôt disponible. Les données essentielles restent connectées au backend CoWorki.`);
  };

  return (
    <PageShell active="/dashboard/partner">
      <PageHero eyebrow="Tableau de bord partenaire" title={`Pilotez ${partnerName} avec CoWorki.`} text="Réservations, revenus, disponibilité, demandes B2B, promotions flash et avis clients dans une interface claire." />
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
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => showSoon("Les promotions flash")} className="rounded-full bg-[#7A1E3A] px-5 py-3 text-sm font-black text-white">Créer une promotion</button>
            <button onClick={() => showSoon("La modification des promotions")} className="rounded-full bg-white px-5 py-3 text-sm font-black text-[#0F2A43]">Modifier</button>
            <button onClick={() => setNotice("Suggestion ignorée pour cette session.")} className="rounded-full bg-white px-5 py-3 text-sm font-black text-slate-500">Ignorer</button>
          </div>
        </div>
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <InfoCard title="Espaces publiés" tone="green" text={`${dashboard?.partner?.spaces?.filter((space) => space.isPublished).length || 0} espace(s) visible(s) publiquement.`} />
          <InfoCard title="Avis clients" tone="teal" text={`${dashboard?.stats?.reviews || 0} avis réel(s), note moyenne ${dashboard?.stats?.averageRating || 0}/5.`} />
          <InfoCard title="Demandes B2B" tone="amber" text="Les demandes entreprise apparaîtront ici dès qu’elles seront enregistrées dans la base." />
        </section>
        <section className="mt-8 grid gap-8 lg:grid-cols-2">
          <Panel title="Réservations récentes">
            {dashboard?.reservations?.length ? (
              dashboard.reservations.slice(0, 6).map((item) => (
                <Row
                  key={item.id}
                  item={item}
                  loadingAction={loadingAction}
                  onConfirm={() => updateReservationStatus(item.id, "confirm")}
                  onCancel={() => updateReservationStatus(item.id, "cancel")}
                  onComplete={() => updateReservationStatus(item.id, "complete")}
                />
              ))
            ) : (
              <EmptyState title="Aucune réservation pour aujourd’hui." text="Les réservations validées apparaîtront ici dès qu’un utilisateur réserve votre espace." />
            )}
          </Panel>
          <Panel title="Mes espaces">
            {dashboard?.partner?.spaces?.length ? (
              dashboard.partner.spaces.map((space) => (
                <div key={space.id} className="mb-3 rounded-2xl bg-[#F7FAFC] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-black text-[#0F2A43]">{space.name}</p>
                      <p className="text-sm font-bold text-slate-500">{space.city} · capacité {space.capacity || 0}</p>
                    </div>
                    <StatusBadge tone={space.isPublished ? "green" : "amber"}>{space.isPublished ? "Publié" : "Non publié"}</StatusBadge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button disabled={loadingAction === `publish-${space.id}`} onClick={() => toggleSpacePublication(space)} className="rounded-full bg-[#0F6C8D] px-4 py-2 text-xs font-black text-white disabled:opacity-60">
                      {space.isPublished ? "Dépublier" : "Publier"}
                    </button>
                    <Link to="/dashboard/partner/spaces/new" className="rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F6C8D]">Modifier</Link>
                    <button disabled={loadingAction === `delete-${space.id}`} onClick={() => disableSpace(space)} className="rounded-full bg-[#FBEFF3] px-4 py-2 text-xs font-black text-[#7A1E3A] disabled:opacity-60">Désactiver</button>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState title="Aucun espace ajouté pour le moment." text="Ajoutez votre premier espace pour commencer à recevoir des réservations." />
            )}
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
        <section className="mt-8 grid gap-8 lg:grid-cols-2">
          <Panel title="Notifications">
            {dashboard?.notifications?.length ? (
              <>
                <button onClick={readAllNotifications} disabled={loadingAction === "notifications-read-all"} className="mb-4 rounded-full bg-[#ECF8FC] px-4 py-2 text-xs font-black text-[#0F6C8D] disabled:opacity-60">Tout marquer comme lu</button>
                {dashboard.notifications.map((notification) => (
                  <div key={notification.id} className="mb-3 rounded-2xl bg-[#F7FAFC] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-black text-[#0F2A43]">{notification.title}</p>
                        <p className="mt-1 text-sm font-bold text-slate-500">{notification.message}</p>
                      </div>
                      <StatusBadge tone={notification.read ? "teal" : "amber"}>{notification.read ? "Lue" : "Non lue"}</StatusBadge>
                    </div>
                    {!notification.read && (
                      <button onClick={() => readNotification(notification.id)} className="mt-3 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F6C8D]">Marquer comme lu</button>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <EmptyState title="Aucune notification pour le moment." text="Les confirmations, réservations et alertes apparaîtront ici." />
            )}
          </Panel>
          <Panel title="Actions avancées">
            <div className="grid gap-3">
              <button onClick={() => showSoon("Les promotions flash")} className="rounded-2xl bg-[#FBEFF3] p-4 text-left text-sm font-black text-[#7A1E3A]">Créer une promotion flash</button>
              <button onClick={() => showSoon("Les demandes B2B")} className="rounded-2xl bg-[#ECF8FC] p-4 text-left text-sm font-black text-[#0F6C8D]">Gérer les demandes B2B</button>
              <button onClick={() => showSoon("Le rapport de revenus détaillé")} className="rounded-2xl bg-[#F7FAFC] p-4 text-left text-sm font-black text-[#0F2A43]">Exporter les revenus</button>
            </div>
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

function InfoCard({ title, text, tone }) {
  return (
    <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <StatusBadge tone={tone}>{title}</StatusBadge>
      <p className="mt-3 text-sm font-bold leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function Row({ item, onConfirm, onCancel, onComplete, loadingAction }) {
  return (
    <div className="mb-3 rounded-2xl bg-[#F7FAFC] p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-black text-[#0F2A43]">{item.user?.fullName || "Réservation CoWorki"}</p>
          <p className="mt-1 text-sm text-slate-500">{item.space?.name ? `${item.space.name} · ` : ""}{new Date(item.date).toLocaleDateString("fr-FR")} · {item.duration} · {item.total} TND</p>
        </div>
        <StatusBadge tone={item.status === "CONFIRMED" ? "green" : "amber"}>{item.status}</StatusBadge>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {item.status === "PENDING" && (
          <button disabled={loadingAction === `confirm-${item.id}`} onClick={onConfirm} className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-black text-white disabled:opacity-60">Confirmer</button>
        )}
        {["PENDING", "CONFIRMED"].includes(item.status) && (
          <button disabled={loadingAction === `cancel-${item.id}`} onClick={onCancel} className="rounded-full bg-[#FBEFF3] px-4 py-2 text-xs font-black text-[#7A1E3A] disabled:opacity-60">Annuler</button>
        )}
        {item.status === "CONFIRMED" && (
          <button disabled={loadingAction === `complete-${item.id}`} onClick={onComplete} className="rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F6C8D] disabled:opacity-60">Terminée</button>
        )}
      </div>
    </div>
  );
}

export default PartnerDashboard;
