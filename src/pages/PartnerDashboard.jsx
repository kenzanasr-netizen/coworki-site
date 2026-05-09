import { BarChart3, Megaphone, Star, Wallet } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PageHero, PageShell, StatusBadge } from "../components/SiteLayout";
import { b2bRequests, partnerReservations } from "../data/platformData";
import { getMockSession } from "../data/mockAuth";

function PartnerDashboard() {
  const [promoStatus, setPromoStatus] = useState("pending");
  const session = getMockSession();
  const partnerName = session?.space || session?.name || "votre espace";

  return (
    <PageShell active="/dashboard/partner">
      <PageHero eyebrow="Dashboard partenaire" title={`Pilotez ${partnerName} avec CoWorki.`} text="Réservations, revenus, disponibilité, demandes B2B, promotions flash et avis clients dans une interface claire." />
      <main className="mx-auto max-w-7xl px-6 py-14">
        {session?.validationStatus && (
          <div className="mb-8 rounded-[2rem] bg-[#FFF7E8] p-5 shadow-sm ring-1 ring-amber-100">
            <StatusBadge tone="amber">{session.validationStatus}</StatusBadge>
            <p className="mt-3 text-sm font-bold leading-6 text-slate-600">
              Votre espace est bien enregistré. La publication publique sera activée après validation par l’équipe CoWorki.
            </p>
          </div>
        )}
        <section className="grid gap-5 md:grid-cols-4">
          {[
            [<BarChart3 />, "Réservations ce mois", "124"],
            [<Wallet />, "Revenus générés", "3 850 TND"],
            [<Megaphone />, "Taux d’occupation", "68 %"],
            [<Star />, "Note moyenne", "4.8/5"],
            [<BarChart3 />, "Demandes B2B", "9"],
          ].map(([icon, label, value]) => (
            <div key={label} className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <span className="text-[#0F6C8D] [&_svg]:h-6 [&_svg]:w-6">{icon}</span>
              <p className="mt-4 text-sm font-black text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-black text-[#0F2A43]">{value}</p>
            </div>
          ))}
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
            {partnerReservations.map((item) => <Row key={item.name} item={item} />)}
          </Panel>
          <Panel title="Demandes B2B reçues">
            {b2bRequests.map((item) => (
              <div key={item.company} className="mb-3 rounded-2xl bg-[#F7FAFC] p-4">
                <p className="font-black text-[#0F2A43]">{item.company} · {item.event}</p>
                <p className="mt-1 text-sm text-slate-500">{item.city} · {item.people} participants · {item.budget}</p>
                <div className="mt-3 flex gap-2">
                  <button className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-black text-white">Valider</button>
                  <button className="rounded-full bg-[#7A1E3A] px-4 py-2 text-xs font-black text-white">Refuser</button>
                </div>
              </div>
            ))}
          </Panel>
        </section>
        <section className="mt-8 grid gap-8 lg:grid-cols-3">
          <Panel title="Avis clients">
            {["Très bon accueil et espace calme.", "Salle réunion bien équipée.", "Communauté active."].map((review) => (
              <p key={review} className="mb-3 rounded-2xl bg-[#F7FAFC] p-4 text-sm font-bold text-slate-600">{review}</p>
            ))}
          </Panel>
          <Panel title="Aperçu revenus">
            {["Individuel : 1 240 TND", "Salles : 1 710 TND", "Events B2B : 900 TND"].map((item) => (
              <p key={item} className="mb-3 rounded-2xl bg-[#F7FAFC] p-4 text-sm font-black text-[#0F2A43]">{item}</p>
            ))}
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
          <p className="font-black text-[#0F2A43]">{item.name}</p>
          <p className="mt-1 text-sm text-slate-500">{item.type} · {item.date} · {item.amount}</p>
        </div>
        <StatusBadge tone={item.status === "Confirmée" ? "green" : "amber"}>{item.status}</StatusBadge>
      </div>
    </div>
  );
}

export default PartnerDashboard;
