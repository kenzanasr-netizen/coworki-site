import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, CreditCard, Smartphone, Wallet } from "lucide-react";
import { PageHero, PageShell, StatusBadge } from "../components/SiteLayout";

function Payment() {
  const [method, setMethod] = useState("Carte bancaire");
  const [paid, setPaid] = useState(false);
  const fees = 2;
  const price = 30;

  return (
    <PageShell active="/spaces">
      <PageHero eyebrow="Paiement simulé" title="Confirme ton paiement CoWorki." text="Cette page simule le paiement pour présenter un parcours complet sans connecter un vrai prestataire." />
      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-14 lg:grid-cols-[1fr_360px]">
        <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
          {paid ? (
            <div className="rounded-[2rem] bg-emerald-50 p-10 text-center">
              <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />
              <h2 className="mt-5 text-3xl font-black text-[#0F2A43]">Paiement confirmé avec succès.</h2>
              <p className="mt-3 text-slate-600">Votre confirmation est prête dans votre espace personnel.</p>
              <div className="mx-auto mt-6 max-w-xl rounded-3xl bg-white p-5 text-left shadow-sm">
                <p className="font-black text-[#0F2A43]">Smart Matching débloqué</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Votre réservation est confirmée. Découvrez maintenant les profils compatibles disponibles dans cet espace.
                </p>
                <Link
                  to="/smart-matching?access=confirmed"
                  className="mt-4 inline-flex rounded-full bg-[#0F6C8D] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0C5874]"
                >
                  Voir les profils compatibles
                </Link>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-black text-[#0F2A43]">Choisir le moyen de paiement</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  [<CreditCard className="h-5 w-5" />, "Carte bancaire"],
                  [<Wallet className="h-5 w-5" />, "Konnect"],
                  [<Smartphone className="h-5 w-5" />, "Paiement mobile"],
                ].map(([icon, label]) => (
                  <button key={label} onClick={() => setMethod(label)} className={`rounded-3xl border p-5 text-left font-black transition ${method === label ? "border-[#0F6C8D] bg-[#ECF8FC] text-[#0F6C8D]" : "border-slate-200 bg-white text-[#0F2A43]"}`}>
                    {icon}
                    <span className="mt-3 block">{label}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setPaid(true)} className="mt-8 rounded-2xl bg-[#7A1E3A] px-7 py-4 text-sm font-black text-white">
                Payer maintenant
              </button>
            </>
          )}
        </section>
        <aside className="h-fit rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-100">
          <StatusBadge tone="navy">Récapitulatif</StatusBadge>
          <h3 className="mt-4 text-2xl font-black text-[#0F2A43]">Friends Lab Coworking Space</h3>
          <div className="mt-5 space-y-3 text-sm font-bold text-slate-600">
            <p>Date : 12 juin 2026</p>
            <p>Durée : 2 heures</p>
            <p>Prix : {price} TND</p>
            <p>Frais : {fees} TND</p>
          </div>
          <div className="mt-6 rounded-3xl bg-[#F7FAFC] p-5">
            <p className="text-sm font-black text-slate-500">Total</p>
            <p className="mt-2 text-4xl font-black text-[#7A1E3A]">{price + fees} TND</p>
          </div>
        </aside>
      </main>
    </PageShell>
  );
}

export default Payment;
