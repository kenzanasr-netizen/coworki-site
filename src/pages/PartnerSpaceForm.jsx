import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import ImageUploadPanel from "../components/ImageUploadPanel";
import { PageHero, PageShell } from "../components/SiteLayout";

function PartnerSpaceForm() {
  const [published, setPublished] = useState(false);
  const fields = ["Nom de l’espace", "Adresse", "Ville", "Prix 2h", "Prix 4h", "Prix journée", "Capacité", "Horaires", "Disponibilité"];
  const services = ["Wi-Fi", "Café", "Salle réunion", "Climatisation", "Parking", "Imprimante", "Espace calme", "Terrasse"];

  return (
    <PageShell active="/dashboard/partner">
      <PageHero eyebrow="Espace partenaire" title="Publier ou modifier un espace." text="Un formulaire complet pour rendre votre espace visible sur CoWorki." />
      <main className="mx-auto max-w-5xl px-6 py-14">
        <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
          {published ? (
            <div className="rounded-[2rem] bg-emerald-50 p-10 text-center">
              <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />
              <h2 className="mt-5 text-3xl font-black text-[#0F2A43]">Votre espace a été publié en simulation.</h2>
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-3">
                {fields.map((field) => <input key={field} placeholder={field} className="rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]" />)}
              </div>
              <textarea placeholder="Description professionnelle de l’espace" className="mt-4 min-h-32 w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]" />
              <p className="mt-6 font-black text-[#0F2A43]">Services disponibles</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {services.map((service) => <label key={service} className="rounded-full bg-[#ECF8FC] px-4 py-2 text-sm font-black text-[#0F6C8D]"><input type="checkbox" className="mr-2" />{service}</label>)}
              </div>
              <ImageUploadPanel />
              <button onClick={() => setPublished(true)} className="mt-6 rounded-2xl bg-[#7A1E3A] px-7 py-4 text-sm font-black text-white">Publier l’espace</button>
            </>
          )}
        </section>
      </main>
    </PageShell>
  );
}

export default PartnerSpaceForm;
