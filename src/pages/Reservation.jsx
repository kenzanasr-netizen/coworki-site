import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo-coworki.png";
import { eventsData } from "../data/eventsData";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  User,
  Users,
  Wallet,
  CheckCircle2,
} from "lucide-react";

function Reservation() {
  const location = useLocation();
  const eventId = location.state?.eventId;
  const selectedEvent = eventId ? eventsData.find((event) => event.id === eventId) : null;

  const selectedSpace = selectedEvent
    ? {
        name: selectedEvent.title,
        city: selectedEvent.location,
        address: selectedEvent.location,
        type: selectedEvent.category,
        price: selectedEvent.price,
        duration: selectedEvent.time,
        rating: "4.8",
        image: selectedEvent.image,
        description: selectedEvent.description,
      }
    : {
        name: "WorkZone Sousse",
        city: "Sousse",
        address: "Route touristique, Sousse",
        type: "Poste individuel",
        price: 15,
        duration: "2 heures",
        rating: "4.8",
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
      };

  const isOrganiser = location.state?.action === "organiser";
  const eventPrice = typeof selectedSpace.price === "number" ? selectedSpace.price : null;
  const serviceFee = eventPrice !== null ? 2 : 0;
  const total = eventPrice !== null ? eventPrice + serviceFee : selectedSpace.price;

  return (
    <div className="min-h-screen bg-[#F7FAFC] text-slate-950">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-4">
            <img src={logo} alt="Logo CoWorki" className="h-20 w-auto" />
          </Link>

          <nav className="hidden items-center gap-7 rounded-full border border-slate-200/70 bg-white/80 px-6 py-3 text-sm font-black text-slate-600 shadow-sm lg:flex">
            <Link to="/" className="transition hover:text-[#0F6C8D]">
              Accueil
            </Link>

            <Link to="/spaces" className="transition hover:text-[#0F6C8D]">
              Espaces
            </Link>

            <Link to="/offres" className="transition hover:text-[#0F6C8D]">
              Offres
            </Link>

            <Link to="/connexion" className="transition hover:text-[#0F6C8D]">
              Connexion
            </Link>

            <Link to="/inscription" className="text-[#7A1E3A]">
              Inscription
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#ECF8FC] via-white to-[#FBEFF3]">
        <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-[#9ED8E8]/50 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-[#7A1E3A]/20 blur-3xl" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute -right-28 top-24 h-72 w-72 rounded-[4rem] border border-[#0F6C8D]/20 bg-white/20 backdrop-blur"
        />
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-10 top-28 hidden h-24 w-24 rounded-full bg-[#7A1E3A]/10 md:block"
        />

        <div className="relative mx-auto max-w-7xl px-6 py-12">
          <Link
            to={selectedEvent ? "/events" : "/spaces/1"}
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-3 text-sm font-black text-[#0F2A43] shadow-sm transition hover:text-[#0F6C8D]"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux détails
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#9ED8E8]/70 bg-white/75 px-4 py-2 text-sm font-black text-[#0F6C8D] shadow-sm backdrop-blur">
              <CalendarDays className="h-4 w-4" />
              {isOrganiser ? "Demande d'organisation" : "Finalisation de réservation"}
            </p>

            <h1 className="text-4xl font-black leading-tight tracking-[-0.04em] text-[#0F2A43] md:text-7xl">
              {isOrganiser ? "Organisez votre événement avec CoWorki" : "Confirmez votre réservation CoWorki."}
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {isOrganiser
                ? "Soumettez votre demande, partagez votre cahier des charges et laissez-nous vous aider à trouver l'espace idéal."
                : "Vérifiez les informations de l’espace, choisissez votre créneau et confirmez votre réservation en quelques étapes."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1fr_390px]">
        {/* FORM */}
        <main className="space-y-8">
          {/* STEP 1 */}
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ECF8FC] text-[#0F6C8D]">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#0F6C8D]">
                  Étape 1
                </p>
                <h2 className="text-2xl font-black text-[#0F2A43]">
                  Choisir le créneau
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-black text-[#0F2A43]">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-[#0F2A43]">
                  Durée
                </label>
                <select className="w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]">
                  <option>2 heures</option>
                  <option>Demi-journée</option>
                  <option>Journée complète</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-[#0F2A43]">
                  Nombre de personnes
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="1"
                  className="w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]"
                />
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FBEFF3] text-[#7A1E3A]">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#7A1E3A]">
                  Étape 2
                </p>
                <h2 className="text-2xl font-black text-[#0F2A43]">
                  Informations personnelles
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-black text-[#0F2A43]">
                  Nom complet
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 focus-within:border-[#0F6C8D]">
                  <User className="h-5 w-5 text-[#0F6C8D]" />
                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="w-full bg-transparent font-bold outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-[#0F2A43]">
                  Téléphone
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 focus-within:border-[#0F6C8D]">
                  <Phone className="h-5 w-5 text-[#0F6C8D]" />
                  <input
                    type="tel"
                    placeholder="+216 00 000 000"
                    className="w-full bg-transparent font-bold outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-black text-[#0F2A43]">
                  Email
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 focus-within:border-[#0F6C8D]">
                  <Mail className="h-5 w-5 text-[#0F6C8D]" />
                  <input
                    type="email"
                    placeholder="exemple@email.com"
                    className="w-full bg-transparent font-bold outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ECF8FC] text-[#0F6C8D]">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#0F6C8D]">
                  Étape 3
                </p>
                <h2 className="text-2xl font-black text-[#0F2A43]">
                  Paiement simulé
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {["Carte bancaire", "Paiement sur place", "Demande entreprise"].map(
                (method, index) => (
                  <label
                    key={method}
                    className="cursor-pointer rounded-3xl border border-slate-200 bg-[#F7FAFC] p-5 transition hover:border-[#0F6C8D] hover:bg-[#ECF8FC]"
                  >
                    <input
                      type="radio"
                      name="payment"
                      defaultChecked={index === 0}
                      className="mb-4"
                    />
                    <p className="font-black text-[#0F2A43]">{method}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Option utilisée pour simuler le parcours de réservation.
                    </p>
                  </label>
                )
              )}
            </div>
          </div>
        </main>

        {/* SUMMARY */}
        <aside className="h-fit rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-200/70 ring-1 ring-slate-100 lg:sticky lg:top-32">
          <div className="overflow-hidden rounded-[1.5rem]">
            <img
              src={selectedSpace.image}
              alt={selectedSpace.name}
              className="h-52 w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black text-[#0F2A43]">
                {selectedSpace.name}
              </h2>

              <div className="flex items-center gap-1 rounded-full bg-[#FFF7E8] px-3 py-1 text-sm font-black text-[#9A6A13]">
                <Star className="h-4 w-4 fill-[#D9A441] text-[#D9A441]" />
                {selectedSpace.rating}
              </div>
            </div>

            <p className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-500">
              <MapPin className="h-4 w-4 text-[#0F6C8D]" />
              {selectedSpace.address}
            </p>

            <div className="mt-5 grid gap-3">
              <div className="flex items-center justify-between rounded-2xl bg-[#F7FAFC] p-4">
                <span className="flex items-center gap-2 font-bold text-slate-600">
                  <Clock3 className="h-4 w-4 text-[#0F6C8D]" />
                  Durée
                </span>
                <span className="font-black text-[#0F2A43]">
                  {selectedSpace.duration}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-[#F7FAFC] p-4">
                <span className="flex items-center gap-2 font-bold text-slate-600">
                  <Users className="h-4 w-4 text-[#0F6C8D]" />
                  Personnes
                </span>
                <span className="font-black text-[#0F2A43]">1</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-[#F7FAFC] p-4">
                <span className="flex items-center gap-2 font-bold text-slate-600">
                  <Wallet className="h-4 w-4 text-[#0F6C8D]" />
                  Prix espace
                </span>
                <span className="font-black text-[#0F2A43]">
                  {typeof selectedSpace.price === "number" ? `${selectedSpace.price} TND` : selectedSpace.price}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-[#F7FAFC] p-4">
                <span className="font-bold text-slate-600">
                  Frais de service
                </span>
                <span className="font-black text-[#0F2A43]">
                  {serviceFee} TND
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-5">
              <span className="text-lg font-black text-[#0F2A43]">Total</span>
              <span className="text-3xl font-black text-[#7A1E3A]">
                {typeof total === "number" ? `${total} TND` : total}
              </span>
            </div>

            <button className="mt-6 w-full rounded-2xl bg-[#0F6C8D] px-5 py-4 text-sm font-black text-white shadow-xl shadow-[#0F6C8D]/20 transition hover:bg-[#0B5873]">
              Confirmer la réservation
            </button>

            <div className="mt-5 rounded-3xl bg-[#F7FAFC] p-5">
              <p className="flex items-center gap-2 font-black text-[#0F2A43]">
                <ShieldCheck className="h-5 w-5 text-[#0F6C8D]" />
                Prototype sécurisé
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Cette page simule le parcours de réservation dans le cadre du
                prototype CoWorki.
              </p>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-3xl bg-[#FBEFF3] p-4 text-sm font-bold text-[#7A1E3A]">
              <CheckCircle2 className="h-5 w-5" />
              Aucun paiement réel ne sera effectué.
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default Reservation;
