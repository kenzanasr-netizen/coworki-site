import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { PageHero, PageShell } from "../components/SiteLayout";

function BusinessRequest() {
  const [sent, setSent] = useState(false);
  const fields = ["Nom de l’entreprise", "Contact", "Email", "Téléphone", "Type d’événement", "Date souhaitée", "Nombre de participants", "Ville", "Budget approximatif"];
  const equipment = ["Projecteur", "Wi-Fi", "Café", "Tableau blanc", "Sonorisation", "Catering"];

  return (
    <PageShell active="/business">
      <PageHero eyebrow="Demande B2B" title="Décrivez votre besoin, CoWorki vous aide à trouver l’espace." text="Formulaire complet pour réunions, formations, séminaires, workshops et événements professionnels." />
      <main className="mx-auto max-w-5xl px-6 py-14">
        <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
          {sent ? (
            <div className="rounded-[2rem] bg-emerald-50 p-10 text-center">
              <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />
              <h2 className="mt-5 text-3xl font-black text-[#0F2A43]">Votre demande B2B a été envoyée avec succès.</h2>
              <p className="mt-3 text-slate-600">Un espace partenaire vous répondra prochainement.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-3">
                {fields.map((field) => (
                  <input key={field} placeholder={field} className="rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]" />
                ))}
              </div>
              <p className="mt-6 font-black text-[#0F2A43]">Équipements demandés</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {equipment.map((item) => (
                  <label key={item} className="rounded-full bg-[#ECF8FC] px-4 py-2 text-sm font-black text-[#0F6C8D]">
                    <input type="checkbox" className="mr-2" /> {item}
                  </label>
                ))}
              </div>
              <textarea placeholder="Message complémentaire" className="mt-5 min-h-36 w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]" />
              <button onClick={() => setSent(true)} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#7A1E3A] px-7 py-4 text-sm font-black text-white">
                Envoyer la demande <Send className="h-4 w-4" />
              </button>
            </>
          )}
        </section>
      </main>
    </PageShell>
  );
}

export default BusinessRequest;
