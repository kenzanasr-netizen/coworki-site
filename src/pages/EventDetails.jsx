import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { eventsData } from "../data/eventsData";
import logo from "../assets/logo-coworki.png";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Sparkles, Ticket } from "lucide-react";

function EventDetails() {
  const { id } = useParams();
  const eventId = Number(id);
  const event = eventsData.find((item) => item.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-[#F7FAFC] text-slate-950">
        <header className="sticky top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
            <Link to="/events" className="flex items-center gap-4">
              <img src={logo} alt="Logo CoWorki" className="h-20 w-auto" />
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h1 className="text-4xl font-black text-[#0F2A43]">Événement introuvable</h1>
          <p className="mt-4 text-slate-600">Le lien que vous avez suivi ne correspond à aucun événement disponible.</p>
          <Link
            to="/events"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#0F6C8D] px-8 py-4 text-sm font-black text-white transition hover:bg-[#0B5873]"
          >
            Retour aux événements
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FAFC] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link to="/events" className="flex items-center gap-4">
            <img src={logo} alt="Logo CoWorki" className="h-20 w-auto" />
          </Link>
          <nav className="hidden items-center gap-7 rounded-full border border-slate-200/70 bg-white/80 px-6 py-3 text-sm font-black text-slate-600 shadow-sm lg:flex">
            <Link to="/" className="transition hover:text-[#0F6C8D]">
              Accueil
            </Link>
            <Link to="/spaces" className="transition hover:text-[#0F6C8D]">
              Espaces
            </Link>
            <Link to="/events" className="text-[#0F6C8D]">
              Events
            </Link>
            <Link to="/offres" className="transition hover:text-[#0F6C8D]">
              Offres
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#ECF8FC] via-white to-[#FBEFF3]">
        <div className="absolute -left-20 top-6 h-64 w-64 rounded-full bg-[#9ED8E8]/40 blur-3xl" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-[#7A1E3A]/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 py-12">
          <Link
            to="/events"
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-3 text-sm font-black text-[#0F2A43] shadow-sm transition hover:text-[#0F6C8D]"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux événements
          </Link>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#9ED8E8]/70 bg-white/75 px-4 py-2 text-sm font-black text-[#0F6C8D] shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Détails de l'événement
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-[-0.04em] text-[#0F2A43] md:text-6xl">
              {event.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {event.description}
            </p>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-16 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-12">
        <article className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-100">
            <img src={event.image} alt={event.title} className="h-96 w-full object-cover" />
            <div className="p-8">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-black text-slate-600">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#ECF8FC] px-4 py-2 text-[#0F6C8D]">
                  <Calendar className="h-4 w-4" /> {event.date}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#FBEFF3] px-4 py-2 text-[#7A1E3A]">
                  <Clock className="h-4 w-4" /> {event.time}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[#0F2A43] shadow-sm">
                  <MapPin className="h-4 w-4" /> {event.location}
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl bg-[#ECF8FC] p-6 text-center">
                  <p className="text-sm uppercase tracking-[0.2em] text-[#0F6C8D]">Catégorie</p>
                  <p className="mt-3 text-lg font-black text-[#0F2A43]">{event.category}</p>
                </div>
                <div className="rounded-3xl bg-[#FBEFF3] p-6 text-center">
                  <p className="text-sm uppercase tracking-[0.2em] text-[#7A1E3A]">Tarif</p>
                  <p className="mt-3 text-lg font-black text-[#0F2A43]">{event.price}</p>
                </div>
                <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Inscrits</p>
                  <p className="mt-3 text-lg font-black text-[#0F2A43]">{event.attendees || "—"}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-100">
            <h2 className="text-3xl font-black text-[#0F2A43]">Description</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">{event.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {event.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-full bg-[#F7FAFC] px-4 py-3 text-sm font-black text-[#0F6C8D]">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </article>

        <aside className="space-y-6 pt-8 lg:pt-0">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-100">
            <h3 className="text-2xl font-black text-[#0F2A43]">Réservez votre place</h3>
            <p className="mt-3 text-sm text-slate-600">Confirmez votre participation ou demandez une option sur mesure.</p>
            <div className="mt-8 space-y-4">
              <div className="rounded-3xl bg-[#ECF8FC] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[#0F6C8D]">Prochaine date</p>
                <p className="mt-3 text-lg font-black text-[#0F2A43]">{event.date} • {event.time}</p>
              </div>
              <div className="rounded-3xl bg-[#FBEFF3] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7A1E3A]">Lieu</p>
                <p className="mt-3 text-lg font-black text-[#0F2A43]">{event.location}</p>
              </div>
            </div>
            <Link
              to="/reservation"
              state={{ eventId: event.id, eventTitle: event.title }}
              className="mt-8 inline-flex w-full items-center justify-center rounded-3xl bg-[#0F6C8D] px-6 py-4 text-sm font-black text-white transition hover:bg-[#0B5873]"
            >
              {event.price === "Gratuit" ? "Participer maintenant" : "Réserver maintenant"}
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="rounded-[2rem] bg-[#0F6C8D] p-8 text-white shadow-sm">
            <h3 className="text-2xl font-black">Besoin d'aide ?</h3>
            <p className="mt-4 text-sm leading-7 text-white/80">
              Contactez nos conseillers pour organiser un événement sur mesure ou gérer votre réservation plus rapidement.
            </p>
            <div className="mt-6 space-y-3 text-sm font-black">
              <p>support@coworki.tn</p>
              <p>+216 71 000 000</p>
            </div>
          </motion.div>
        </aside>
      </main>
    </div>
  );
}

export default EventDetails;
