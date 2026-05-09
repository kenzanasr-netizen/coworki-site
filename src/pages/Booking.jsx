import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CalendarDays, CheckCircle2, Clock3, Users, Wallet } from "lucide-react";
import { PageHero, PageShell, StatusBadge } from "../components/SiteLayout";
import { spacesData } from "../data/spacesData";
import { matchingProfiles } from "../data/platformData";
import { getMockSession } from "../data/mockAuth";
import { apiFetch } from "../data/apiClient";

function Booking() {
  const { id } = useParams();
  const space = spacesData.find((item) => item.id === id) || spacesData[0];
  const [formula, setFormula] = useState("2h");
  const [people, setPeople] = useState(1);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("09:00 - 11:00");
  const [spaceType, setSpaceType] = useState("Poste individuel");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const session = getMockSession();

  const base = Number.parseInt(space.price, 10) || 15;
  const prices = { "2h": 15, "4h": 25, day: 40 };
  const total = Math.round((prices[formula] || base) + Math.max(0, people - 1) * 3);

  const confirmReservation = async () => {
    setError("");
    if (!date) {
      setError("Choisissez une date avant de confirmer.");
      return;
    }

    setLoading(true);
    try {
      const response = await apiFetch("/api/reservations", {
        method: "POST",
        body: JSON.stringify({
          spaceId: space.id,
          space,
          date,
          duration: formula,
          total,
          people,
          slot,
          spaceType,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Impossible d’enregistrer la réservation.");
      setSuccess(true);
    } catch (reservationError) {
      setError(reservationError.message || "Impossible d’enregistrer la réservation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell active="/spaces">
      <PageHero
        eyebrow="Tunnel de réservation"
        title={`Réserver chez ${space.name}`}
        text="Choisis ton créneau, ton type d’espace et confirme une réservation enregistrée dans ton espace CoWorki."
      />

      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[1fr_380px]">
        <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
          {!session ? (
            <div className="rounded-[2rem] bg-[#F7FAFC] p-8 text-center">
              <h2 className="text-3xl font-black text-[#0F2A43]">Connectez-vous ou créez un compte pour finaliser votre réservation.</h2>
              <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
                CoWorki garde votre réservation liée à votre profil pour confirmer le paiement et débloquer le Smart Matching.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/login" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-[#0F2A43]">Connexion</Link>
                <Link to="/signup" className="rounded-full bg-[#7A1E3A] px-6 py-3 text-sm font-black text-white">Créer un compte</Link>
              </div>
            </div>
          ) : success ? (
            <div className="space-y-6">
              <div className="rounded-[2rem] bg-emerald-50 p-8 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
                <h2 className="mt-4 text-3xl font-black text-[#0F2A43]">Votre réservation a été enregistrée avec succès.</h2>
                <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
                  CoWorki peut maintenant vous proposer des profils compatibles liés à cet espace.
                </p>
              </div>

              <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <StatusBadge>Smart Matching débloqué</StatusBadge>
                    <h3 className="mt-4 text-2xl font-black text-[#0F2A43]">Profils compatibles dans cet espace</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                      Ces recommandations sont simulées pour montrer le parcours après réservation.
                    </p>
                  </div>
                  <Link to="/smart-matching?access=confirmed" className="rounded-full bg-[#0F6C8D] px-5 py-3 text-sm font-black text-white">
                    Ouvrir le chat
                  </Link>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {matchingProfiles.map((profile) => (
                    <div key={profile.name} className="rounded-3xl bg-[#F7FAFC] p-5">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FBEFF3] text-lg font-black text-[#7A1E3A]">
                        {profile.name[0]}
                      </div>
                      <p className="text-lg font-black text-[#0F2A43]">{profile.name}</p>
                      <p className="mt-1 text-sm font-bold text-slate-500">{profile.field}</p>
                      <p className="mt-4 text-3xl font-black text-[#0F6C8D]">{profile.score}%</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {profile.interests.slice(0, 2).map((interest) => (
                          <span key={interest} className="rounded-full bg-[#ECF8FC] px-3 py-1 text-xs font-black text-[#0F6C8D]">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <Link to="/payment" className="mt-6 inline-flex rounded-full bg-[#7A1E3A] px-7 py-4 text-sm font-black text-white">
                  Continuer vers le paiement
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Date" type="date" icon={<CalendarDays />} value={date} onChange={setDate} />
              <Field label="Créneau horaire" as="select" icon={<Clock3 />} value={slot} onChange={setSlot} options={["09:00 - 11:00", "11:00 - 13:00", "14:00 - 18:00"]} />
              <Field label="Type d’espace" as="select" icon={<Users />} value={spaceType} onChange={setSpaceType} options={["Poste individuel", "Salle de réunion", "Espace événementiel"]} />
              <div>
                <label className="mb-2 block text-sm font-black text-[#0F2A43]">Nombre de personnes</label>
                <input value={people} onChange={(e) => setPeople(Number(e.target.value))} min="1" type="number" className="w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]" />
              </div>
              <div className="md:col-span-2">
                <p className="mb-3 text-sm font-black text-[#0F2A43]">Formule</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[["2h", "2h"], ["4h", "4h"], ["day", "Journée complète"]].map(([value, label]) => (
                    <button key={value} onClick={() => setFormula(value)} className={`rounded-2xl px-4 py-4 text-sm font-black transition ${formula === value ? "bg-[#0F6C8D] text-white" : "bg-[#F7FAFC] text-[#0F2A43]"}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        <aside className="h-fit rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-100">
          <StatusBadge>Résumé</StatusBadge>
          <h2 className="mt-4 text-2xl font-black text-[#0F2A43]">{space.name}</h2>
          <div className="mt-5 space-y-3 text-sm font-bold text-slate-600">
            <p>Formule : {formula === "day" ? "Journée complète" : formula}</p>
            <p>Personnes : {people}</p>
            <p>Type : poste, réunion ou événementiel</p>
          </div>
          <div className="mt-6 rounded-3xl bg-[#F7FAFC] p-5">
            <p className="flex items-center gap-2 text-sm font-black text-slate-500"><Wallet className="h-4 w-4" /> Prix total</p>
            <p className="mt-2 text-4xl font-black text-[#7A1E3A]">{total} TND</p>
          </div>
          {!success && (
            <button disabled={loading} onClick={confirmReservation} className="mt-6 w-full rounded-2xl bg-[#7A1E3A] px-5 py-4 text-sm font-black text-white transition hover:bg-[#64172F] disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "Enregistrement..." : "Confirmer la réservation"}
            </button>
          )}
          {error && <p className="mt-4 rounded-2xl bg-[#FBEFF3] px-4 py-3 text-sm font-black text-[#7A1E3A]">{error}</p>}
        </aside>
      </main>
    </PageShell>
  );
}

function Field({ label, type = "text", as, options = [], icon, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-[#0F2A43]">{label}</label>
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 focus-within:border-[#0F6C8D]">
        <span className="text-[#0F6C8D] [&_svg]:h-5 [&_svg]:w-5">{icon}</span>
        {as === "select" ? (
          <select value={value} onChange={(event) => onChange?.(event.target.value)} className="w-full bg-transparent font-bold outline-none">{options.map((option) => <option key={option}>{option}</option>)}</select>
        ) : (
          <input value={value} onChange={(event) => onChange?.(event.target.value)} type={type} className="w-full bg-transparent font-bold outline-none" />
        )}
      </div>
    </div>
  );
}

export default Booking;
