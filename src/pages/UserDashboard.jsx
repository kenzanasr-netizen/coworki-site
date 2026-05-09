import { useState } from "react";
import { Bell, Heart, MessageSquare, Star, Trophy, User } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHero, PageShell, StatusBadge } from "../components/SiteLayout";
import { matchingProfiles, profileUser } from "../data/platformData";
import { getMockSession, updateCurrentUser } from "../data/mockAuth";
import EmptyState from "../components/EmptyState";

function UserDashboard() {
  const session = getMockSession();
  const currentUser = {
    ...profileUser,
    ...session,
    role: session?.roleLabel || profileUser.role,
    interests: session?.interests?.length ? session.interests : profileUser.interests,
    points: session?.points ?? profileUser.points,
    hasConfirmedBooking: session?.hasConfirmedBooking ?? true,
  };
  const reservations = currentUser.reservations || [];
  const favorites = currentUser.favorites || [];

  return (
    <PageShell active="/dashboard/user">
      <PageHero eyebrow="Espace personnel" title={`Bonjour ${currentUser.name}.`} text="Retrouve tes réservations, favoris, avis, notifications et points CoWorki depuis un seul tableau de bord." />
      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[320px_1fr]">
        <aside className="h-fit rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#ECF8FC] text-[#0F6C8D]">
            <User className="h-9 w-9" />
          </div>
          <h2 className="mt-5 text-2xl font-black text-[#0F2A43]">{currentUser.name}</h2>
          <p className="mt-1 font-bold text-slate-500">{currentUser.role}</p>
          {currentUser.city && <p className="mt-1 text-sm font-bold text-[#0F6C8D]">{currentUser.city}</p>}
          <div className="mt-5 flex flex-wrap gap-2">
            {currentUser.interests.map((item) => <StatusBadge key={item}>{item}</StatusBadge>)}
          </div>
          <div className="mt-6 rounded-3xl bg-[#FBEFF3] p-5">
            <p className="flex items-center gap-2 font-black text-[#7A1E3A]"><Trophy className="h-5 w-5" /> Points CoWorki</p>
            <p className="mt-2 text-4xl font-black text-[#0F2A43]">{currentUser.points} pts</p>
          </div>
        </aside>

        <section className="space-y-8">
          <Card title="Réservations à venir" id="reservations">
            {reservations.length ? (
              <div className="grid gap-4">
                {reservations.map((item) => (
                  <div key={item.space} className="grid gap-3 rounded-3xl bg-[#F7FAFC] p-5 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <h3 className="font-black text-[#0F2A43]">{item.space}</h3>
                      <p className="mt-1 text-sm font-bold text-slate-500">{item.date} · {item.type} · {item.price}</p>
                    </div>
                    <StatusBadge tone={item.status === "Confirmée" ? "green" : "amber"}>{item.status}</StatusBadge>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="Vous n’avez pas encore de réservation." text="Explorez les espaces CoWorki et réservez votre premier créneau." />
            )}
          </Card>

          <Card title="Modifier mon profil">
            <ProfileForm user={currentUser} />
          </Card>

          <Card title="Notifications CoWorki" icon={<Bell className="h-5 w-5" />}>
            <EmptyState title="Aucune notification pour le moment." text="Les confirmations, promotions et messages Smart Matching apparaîtront ici." />
          </Card>

          <Card title="Smart Matching" icon={<MessageSquare className="h-5 w-5" />} id="smart-matching">
            {currentUser.hasConfirmedBooking ? (
              <>
                <p className="leading-7 text-slate-600">
                  Après votre réservation, CoWorki vous connecte avec des profils compatibles présents dans le même espace.
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {matchingProfiles.map((profile) => (
                    <div key={profile.name} className="rounded-3xl bg-[#F7FAFC] p-5">
                      <p className="text-xl font-black text-[#0F2A43]">{profile.name}</p>
                      <p className="mt-1 text-sm font-bold text-slate-500">{profile.field}</p>
                      <p className="mt-4 text-3xl font-black text-[#0F6C8D]">{profile.score} %</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {profile.interests.slice(0, 3).map((item) => (
                          <StatusBadge key={item} tone="red">{item}</StatusBadge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/smart-matching?access=confirmed"
                  className="mt-6 inline-flex justify-center rounded-full bg-[#0F6C8D] px-6 py-3 text-sm font-black text-white transition hover:bg-[#0C5874]"
                >
                  Rejoindre le chat
                </Link>
              </>
            ) : (
              <p className="rounded-3xl bg-[#F7FAFC] p-5 font-bold text-slate-600">
                Le Smart Matching est disponible après une réservation confirmée.
              </p>
            )}
          </Card>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card title="Espaces favoris" icon={<Heart className="h-5 w-5" />} id="favoris">
              <div className="grid gap-3">
                {favorites.length ? favorites.map((space) => (
                  <Link key={space.id} to={`/spaces/${space.id}`} className="flex items-center gap-3 rounded-2xl bg-[#F7FAFC] p-3 transition hover:bg-[#ECF8FC]">
                    <img src={space.images[0]} alt={space.name} className="h-14 w-16 rounded-2xl object-cover" />
                    <div>
                      <p className="font-black text-[#0F2A43]">{space.name}</p>
                      <p className="text-sm text-slate-500">{space.city} · {space.rating}</p>
                    </div>
                  </Link>
                )) : (
                  <EmptyState title="Aucun favori enregistré." text="Ajoutez vos premiers espaces favoris pour les retrouver rapidement." />
                )}
              </div>
            </Card>
            <Card title="Avis et notifications" icon={<Bell className="h-5 w-5" />}>
              {[
                [<Star className="h-4 w-4" />, "Laisse un avis sur Cogite Coworking Space."],
                [<MessageSquare className="h-4 w-4" />, "Mariem a accepté ta demande Smart Matching."],
                [<Bell className="h-4 w-4" />, "Promotion flash disponible à The Dot."],
              ].map(([icon, text]) => (
                <div key={text} className="mb-3 flex gap-3 rounded-2xl bg-[#F7FAFC] p-4 text-sm font-bold text-slate-600">
                  <span className="text-[#0F6C8D]">{icon}</span>
                  {text}
                </div>
              ))}
            </Card>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

function ProfileForm({ user }) {
  const [form, setForm] = useState({
    fullName: user.name || "",
    phone: user.phone || "",
    city: user.city || "",
    occupation: user.role || "",
    bio: user.profile?.bio || "",
  });
  const [message, setMessage] = useState("");

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    await updateCurrentUser({
      fullName: form.fullName,
      name: form.fullName,
      phone: form.phone,
      city: form.city,
      roleLabel: form.occupation,
      profile: {
        city: form.city,
        occupation: form.occupation,
        bio: form.bio,
      },
    });
    setMessage("Profil mis à jour avec succès.");
  };

  return (
    <form onSubmit={saveProfile} className="grid gap-4 md:grid-cols-2">
      {[
        ["Nom complet", "fullName"],
        ["Téléphone", "phone"],
        ["Ville", "city"],
        ["Occupation", "occupation"],
      ].map(([label, field]) => (
        <label key={field} className="grid gap-2 text-sm font-black text-[#0F2A43]">
          {label}
          <input
            value={form[field]}
            onChange={(event) => updateField(field, event.target.value)}
            className="rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]"
          />
        </label>
      ))}
      <label className="grid gap-2 text-sm font-black text-[#0F2A43] md:col-span-2">
        Bio
        <textarea
          value={form.bio}
          onChange={(event) => updateField("bio", event.target.value)}
          rows="4"
          className="rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]"
        />
      </label>
      {message && <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700 md:col-span-2">{message}</p>}
      <button className="rounded-2xl bg-[#7A1E3A] px-6 py-4 text-sm font-black text-white md:col-span-2">
        Enregistrer les modifications
      </button>
    </form>
  );
}

function Card({ title, icon, children, id }) {
  return (
    <div id={id} className="scroll-mt-28 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <h2 className="mb-5 flex items-center gap-2 text-2xl font-black text-[#0F2A43]">{icon}{title}</h2>
      {children}
    </div>
  );
}

export default UserDashboard;
