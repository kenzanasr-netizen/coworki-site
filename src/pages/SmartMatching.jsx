import { MessageCircle, Send, UserRound } from "lucide-react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { PageHero, PageShell, StatusBadge } from "../components/SiteLayout";
import { matchingProfiles, profileUser } from "../data/platformData";

function SmartMatching() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const hasAccess =
    searchParams.get("access") === "confirmed" ||
    location.state?.access === "confirmed";

  if (!hasAccess) {
    return (
      <PageShell active="/profile">
        <PageHero
          eyebrow="Smart Matching"
          title="Une fonctionnalité débloquée après réservation."
          text="Le Smart Matching dépend de votre profil, de vos centres d’intérêt et de vos réservations confirmées."
        />
        <main className="mx-auto max-w-4xl px-6 py-14">
          <div className="rounded-[2rem] bg-white p-8 text-center shadow-sm ring-1 ring-slate-100">
            <UserRound className="mx-auto h-12 w-12 text-[#0F6C8D]" />
            <h2 className="mt-5 text-3xl font-black text-[#0F2A43]">
              Le Smart Matching est disponible après une réservation confirmée.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Connectez-vous, complétez votre profil, puis réservez un espace. CoWorki vous proposera ensuite des profils compatibles dans le bon contexte.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/login" className="rounded-full border border-slate-200 px-6 py-3 text-sm font-black text-[#0F2A43] transition hover:border-[#0F6C8D] hover:text-[#0F6C8D]">
                Connexion
              </Link>
              <Link to="/spaces" className="rounded-full bg-[#7A1E3A] px-6 py-3 text-sm font-black text-white transition hover:bg-[#64172F]">
                Réserver un espace
              </Link>
            </div>
          </div>
        </main>
      </PageShell>
    );
  }

  return (
    <PageShell active="/profile">
      <PageHero eyebrow="Smart Matching" title="Rencontre les bons profils dans les bons espaces." text="CoWorki connecte les utilisateurs qui partagent des centres d’intérêt similaires lorsqu’ils réservent ou travaillent dans le même espace." />
      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[320px_1fr_360px]">
        <aside className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <UserRound className="h-10 w-10 text-[#0F6C8D]" />
          <h2 className="mt-4 text-2xl font-black text-[#0F2A43]">{profileUser.name}</h2>
          <p className="mt-1 text-sm font-bold text-slate-500">{profileUser.role}</p>
          <div className="mt-5 flex flex-wrap gap-2">{profileUser.interests.map((item) => <StatusBadge key={item}>{item}</StatusBadge>)}</div>
        </aside>
        <section className="space-y-4">
          {matchingProfiles.map((profile) => (
            <div key={profile.name} className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-[#0F2A43]">{profile.name}</h3>
                  <p className="mt-1 font-bold text-slate-500">{profile.field}</p>
                </div>
                <StatusBadge tone="green">{profile.score}% compatibilité</StatusBadge>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">{profile.interests.map((item) => <StatusBadge key={item} tone="red">{item}</StatusBadge>)}</div>
              <button className="mt-5 rounded-2xl bg-[#0F6C8D] px-5 py-3 text-sm font-black text-white">Contacter</button>
            </div>
          ))}
        </section>
        <aside className="rounded-[2rem] bg-[#0F2A43] p-6 text-white shadow-sm">
          <h2 className="flex items-center gap-2 text-2xl font-black"><MessageCircle className="h-6 w-6" /> Chat communautaire</h2>
          <div className="mt-6 space-y-3 text-sm">
            <p className="rounded-2xl bg-white/10 p-3">Mariem : Quelqu’un travaille sur un projet IA cette semaine ?</p>
            <p className="rounded-2xl bg-[#0F6C8D] p-3">Lina : Oui, je serai à Cogite jeudi.</p>
            <p className="rounded-2xl bg-white/10 p-3">Yassine : On peut faire un mini meetup React aussi.</p>
          </div>
          <div className="mt-5 flex gap-2 rounded-2xl bg-white p-2">
            <input placeholder="Écrire un message..." className="min-w-0 flex-1 px-2 text-sm font-bold text-[#0F2A43] outline-none" />
            <button className="rounded-xl bg-[#7A1E3A] p-3"><Send className="h-4 w-4" /></button>
          </div>
        </aside>
      </main>
    </PageShell>
  );
}

export default SmartMatching;
