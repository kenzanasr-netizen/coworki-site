import { useState } from "react";
import { CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { PageHero, PageShell } from "../components/SiteLayout";

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell active="/contact">
      <PageHero eyebrow="Support CoWorki" title="Une question ? Parlons de votre besoin." text="Utilisateur, entreprise, partenaire ou support technique : l’équipe CoWorki vous répond rapidement." />
      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[1fr_360px]">
        <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
          {sent ? (
            <div className="rounded-[2rem] bg-emerald-50 p-10 text-center">
              <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />
              <h2 className="mt-5 text-3xl font-black text-[#0F2A43]">Message envoyé avec succès.</h2>
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                {["Nom complet", "Email", "Téléphone"].map((field) => <input key={field} placeholder={field} className="rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]" />)}
                <select className="rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]">
                  <option>Utilisateur</option><option>Entreprise</option><option>Partenaire</option><option>Support technique</option>
                </select>
              </div>
              <textarea placeholder="Votre message" className="mt-4 min-h-40 w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]" />
              <button onClick={() => setSent(true)} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#7A1E3A] px-7 py-4 text-sm font-black text-white">
                Envoyer <Send className="h-4 w-4" />
              </button>
            </>
          )}
        </section>
        <aside className="h-fit rounded-[2rem] bg-[#0F2A43] p-6 text-white">
          <Info icon={<Mail />} title="Email" text="contact@coworki.tn" />
          <Info icon={<Phone />} title="Téléphone" text="+216 71 000 000" />
          <Info icon={<MapPin />} title="Localisation" text="Tunis, Tunisie" />
        </aside>
      </main>
    </PageShell>
  );
}

function Info({ icon, title, text }) {
  return <div className="mb-6 flex gap-4"><span className="text-[#9ED8E8] [&_svg]:h-6 [&_svg]:w-6">{icon}</span><div><p className="font-black">{title}</p><p className="mt-1 text-sm text-white/75">{text}</p></div></div>;
}

export default Contact;
