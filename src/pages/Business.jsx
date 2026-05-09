import { Link } from "react-router-dom";
import { Building2, CreditCard, FileText, Search, ShieldCheck, Users } from "lucide-react";
import { PageHero, PageShell, StatusBadge } from "../components/SiteLayout";
import { recommendedRooms } from "../data/platformData";

function Business() {
  return (
    <PageShell active="/business">
      <PageHero eyebrow="CoWorki Entreprises" title="Réservez des espaces professionnels sans perdre de temps." text="Comparez les salles, vérifiez les équipements, estimez le budget et envoyez une demande B2B en quelques minutes.">
        <Link to="/signup?type=business" className="mt-8 inline-flex rounded-full bg-[#7A1E3A] px-7 py-4 text-sm font-black text-white shadow-xl shadow-[#7A1E3A]/20">
          Créer un compte entreprise
        </Link>
      </PageHero>
      <main className="mx-auto max-w-7xl px-6 py-14">
        <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-2xl font-black text-[#0F2A43]">Recherche B2B</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {["Ville", "Nombre de participants", "Type d’événement", "Date", "Budget", "Équipements nécessaires"].map((label) => (
              <input key={label} placeholder={label} className="rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]" />
            ))}
          </div>
        </section>
        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {recommendedRooms.map((room) => (
            <div key={room.name} className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <StatusBadge>{room.city}</StatusBadge>
              <h3 className="mt-4 text-2xl font-black text-[#0F2A43]">{room.name}</h3>
              <p className="mt-2 font-bold text-slate-500">{room.space} · {room.capacity}</p>
              <p className="mt-4 text-xl font-black text-[#7A1E3A]">{room.price}</p>
              <Link to="/business/request" className="mt-6 inline-flex w-full justify-center rounded-2xl bg-[#0F6C8D] px-5 py-3 text-sm font-black text-white">Demander</Link>
            </div>
          ))}
        </section>
        <section className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            [<Search />, "Comparaison centralisée"],
            [<FileText />, "Tarifs transparents"],
            [<Building2 />, "Espaces équipés"],
            [<CreditCard />, "Facturation adaptée"],
            [<ShieldCheck />, "Paiement sécurisé"],
            [<Users />, "Services complémentaires"],
          ].map(([icon, title]) => (
            <div key={title} className="flex gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <span className="text-[#0F6C8D] [&_svg]:h-6 [&_svg]:w-6">{icon}</span>
              <p className="font-black text-[#0F2A43]">{title}</p>
            </div>
          ))}
        </section>
      </main>
    </PageShell>
  );
}

export default Business;
