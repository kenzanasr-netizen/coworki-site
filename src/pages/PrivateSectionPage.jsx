import { useParams } from "react-router-dom";
import { PageHero, PageShell, StatusBadge } from "../components/SiteLayout";
import { adminSections, partnerSections } from "../data/mockDashboard";
import EmptyState from "../components/EmptyState";

function PrivateSectionPage({ area }) {
  const { section } = useParams();
  const data = area === "admin" ? adminSections[section] : partnerSections[section];

  if (!data) {
    return (
      <PageShell active={area === "admin" ? "/admin" : "/dashboard/partner"}>
        <PageHero eyebrow="Espace privé" title="Section en préparation." text="Cette route existe pour éviter les erreurs 404 pendant la démonstration." />
      </PageShell>
    );
  }

  return (
    <PageShell active={area === "admin" ? "/admin" : "/dashboard/partner"}>
      <PageHero eyebrow={data.eyebrow} title={data.title} text="Interface mockée propre pour présenter le parcours privé CoWorki devant le jury." />
      <main className="mx-auto max-w-7xl px-6 py-14">
        {data.rows.length === 0 ? (
          <EmptyState title="Aucune donnée dans cette section." text="Cette vue est prête pour recevoir les données du backend CoWorki." />
        ) : (
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-100">
            <div className="grid gap-4 border-b border-slate-100 bg-[#F7FAFC] p-5 text-sm font-black text-[#0F2A43] md:grid-cols-4">
              <span>Nom</span>
              <span>Détail</span>
              <span>Info</span>
              <span>Statut</span>
            </div>
            {data.rows.map((row) => (
              <div key={row.join("-")} className="grid gap-4 border-b border-slate-100 p-5 text-sm font-bold text-slate-600 last:border-b-0 md:grid-cols-4 md:items-center">
                {row.map((cell, index) => (
                  <span key={`${cell}-${index}`} className={index === 0 ? "font-black text-[#0F2A43]" : ""}>
                    {index === 3 ? <StatusBadge tone={statusTone(cell)}>{cell}</StatusBadge> : cell}
                  </span>
                ))}
                <div className="flex flex-wrap gap-2 md:col-span-4">
                  {data.actions.map((action) => (
                    <button key={action} className={`rounded-full px-4 py-2 text-xs font-black ${action === "Refuser" || action === "Suspendre" ? "bg-[#FBEFF3] text-[#7A1E3A]" : "bg-[#ECF8FC] text-[#0F6C8D]"}`}>
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </PageShell>
  );
}

function statusTone(status) {
  if (["Actif", "Validé", "Confirmée", "Payée", "Publié", "Active", "Recommandé", "Prioritaire"].includes(status)) return "green";
  if (["En attente", "À vérifier", "Suggérée", "En préparation"].includes(status)) return "amber";
  return "teal";
}

export default PrivateSectionPage;
