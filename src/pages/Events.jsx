import logo from "../assets/logo-coworki.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MobileNav from "../components/MobileNav";
import DesktopNav from "../components/DesktopNav";
import HeaderActions from "../components/HeaderActions";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Briefcase,
  Sparkles,
  Ticket,
  Building2,
  ArrowRight,
  Heart,
  Search,
} from "lucide-react";
import { useState } from "react";
import { eventsData, filterOptions } from "../data/eventsData";

const highlights = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Réseau de compétences",
    text: "Connectez-vous avec plus de 1200 participants et leaders du marché.",
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "Visibilité premium",
    text: "Donnez de la visibilité à vos espaces et événements dans toute la Tunisie.",
  },
  {
    icon: <Calendar className="h-5 w-5" />,
    title: "Calendrier engagé",
    text: "Suivez les meilleures dates pour workshops, meetups et événements B2B.",
  },
];

const advantages = [
  {
    icon: <Network className="h-6 w-6" />,
    title: "Développer son réseau professionnel",
    text: "Connectez-vous avec entrepreneurs, freelances, professionnels et explorez de nouvelles opportunités.",
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Découvrir de nouveaux espaces",
    text: "Visitez les meilleurs espaces de coworking partenaires et trouvez celui qui vous convient.",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Accéder à des formations pratiques",
    text: "Apprenez auprès d'experts et maîtrisez de nouvelles compétences professionnelles.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Trouver des collaborateurs",
    text: "Identifiez les bons partenaires et créez des projets collaboratifs grâce à la communauté.",
  },
];

const b2bBenefits = [
  { icon: <Search className="h-5 w-5" />, title: "Comparaison simple", text: "Trouvez rapidement l'espace idéal selon vos besoins." },
  {
    icon: <Ticket className="h-5 w-5" />,
    title: "Réservation flexible",
    text: "Adaptez capacité, équipements et horaires.",
  },
  { icon: <Briefcase className="h-5 w-5" />, title: "Services B2B", text: "Facturation et services adaptés aux professionnels." },
];

const partnerBenefits = [
  { icon: <Sparkles className="h-5 w-5" />, title: "Plus de visibilité", text: "Attirez de nouveaux visiteurs et utilisateurs." },
  { icon: <Users className="h-5 w-5" />, title: "Meilleur taux d'occupation", text: "Augmentez l'utilisation de vos espaces." },
  {
    icon: <Briefcase className="h-5 w-5" />,
    title: "Nouvelles opportunités B2B",
    text: "Développez vos revenus avec les événements professionnels.",
  },
];

function Network() {
  return <Users className="h-5 w-5" />;
}

function Events() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (eventId) => {
    setFavorites((prev) => ({ ...prev, [eventId]: !prev[eventId] }));
  };

  const filteredEvents = eventsData.filter((event) => {
    const query = searchQuery.toLowerCase();
    const eventText = `${event.title} ${event.location} ${event.description} ${event.tags.join(" ")}`.toLowerCase();
    if (!eventText.includes(query)) return false;
    if (activeFilter === "Tous") return true;
    if (activeFilter === "Gratuit") return event.price === "Gratuit";
    if (activeFilter === "Payant") return event.price !== "Gratuit" && event.price !== "Sur devis";
    return event.category === activeFilter || event.tags.includes(activeFilter);
  });

  return (
    <div className="min-h-screen bg-[#F7FAFC] text-slate-950">
      {/* BACKGROUND DECOR */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-[#9ED8E8]/40 blur-3xl" />
        <div className="absolute right-[-10%] top-[15%] h-[450px] w-[450px] rounded-full bg-[#7A1E3A]/20 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[30%] h-[420px] w-[420px] rounded-full bg-[#E7C05D]/20 blur-3xl" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/30 bg-white/70 backdrop-blur-2xl">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/">
              <img src={logo} alt="Logo CoWorki" className="h-16 w-auto sm:h-20 md:h-24" />
            </Link>
          </motion.div>

          <MobileNav />

          <DesktopNav />

          <HeaderActions />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#ECF8FC] via-white to-[#FBEFF3]">
        <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-[#9ED8E8]/50 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-[#7A1E3A]/20 blur-3xl" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -right-32 top-20 h-80 w-80 rounded-[4rem] border border-[#0F6C8D]/20 bg-white/20 backdrop-blur"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-[#9ED8E8]/70 bg-white/75 px-4 py-2 text-sm font-black text-[#0F6C8D] shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Networking • Workshops • Formations • Communauté
            </p>

            <h1 className="mx-auto max-w-4xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-[-0.04em] text-[#0F2A43]">
              Découvre les événements qui font vivre la communauté CoWorki.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-slate-600">
              Networking, workshops, formations et rencontres freelances dans
              les espaces de coworking les plus dynamiques en Tunisie.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
                <a href="#events" className="inline-flex items-center gap-2 rounded-3xl bg-[#0F6C8D] px-8 py-4 font-black text-white shadow-xl shadow-[#0F6C8D]/20 transition hover:bg-[#0B5873]">
                Explorer les événements
                <ArrowRight className="ml-2 inline h-5 w-5" />
              </a>
              <Link
                to="/reservation"
                state={{ source: "events", action: "organiser" }}
                className="inline-flex items-center gap-2 rounded-3xl border-2 border-[#0F6C8D] px-8 py-4 font-black text-[#0F6C8D] transition hover:bg-[#0F6C8D]/10"
              >
                Organiser un événement
              </Link>
            </motion.div>
          </motion.div>

          {/* FLOATING STATS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 sm:mt-20 grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4"
          >
            {[
              { number: "+40", label: "événements prévus" },
              { number: "+15", label: "espaces partenaires" },
              { number: "+1200", label: "participants attendus" },
              { number: "B2B", label: "& Communauté" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="rounded-3xl border border-white/40 bg-white/60 p-6 backdrop-blur"
              >
                <p className="text-3xl font-black text-[#0F6C8D]">{stat.number}</p>
                <p className="mt-2 text-sm font-black text-slate-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 sm:mt-14 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3"
          >
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[#0F6C8D] text-white">
                  {item.icon}
                </div>
                <h3 className="text-lg font-black text-[#0F2A43]">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FILTERS SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-black text-[#0F2A43]">Filtrer les événements</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_2fr]">
            <div className="relative rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un événement, un lieu ou un thème"
                className="w-full border-none bg-transparent pl-11 text-sm font-bold text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-5 py-3 text-sm font-black transition ${
                    activeFilter === filter
                      ? "bg-[#0F6C8D] text-white shadow-lg"
                      : "border border-slate-200 bg-white text-[#0F2A43] hover:border-[#0F6C8D]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* EVENTS CARDS */}
        <motion.div layout className="grid gap-6 sm:gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-slate-300/60"
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img src={event.image} alt={event.title} className="h-full w-full object-cover" />

                {/* Badges */}
                <div className="absolute left-4 top-4 flex gap-2">
                  <span className="inline-flex items-center rounded-full bg-[#0F6C8D] px-3 py-1 text-xs font-black text-white">
                    {event.category}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-black ${
                      event.price === "Gratuit"
                        ? "bg-green-100 text-green-800"
                        : event.type === "B2B"
                          ? "bg-[#7A1E3A] text-white"
                          : "bg-[#FFF7E8] text-[#9A6A13]"
                    }`}
                  >
                    {event.price === "Gratuit" ? "Gratuit" : event.type === "B2B" ? "B2B" : "Payant"}
                  </span>
                </div>

                {/* Heart */}
                <button
                  type="button"
                  onClick={() => toggleFavorite(event.id)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#7A1E3A] backdrop-blur transition hover:scale-105"
                  aria-label={favorites[event.id] ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                  <Heart
                    className={`h-5 w-5 transition ${favorites[event.id] ? "fill-[#7A1E3A] text-[#7A1E3A]" : "text-[#7A1E3A]"}`}
                  />
                </button>

                {/* Attendees */}
                {event.attendees > 0 && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-[#0F6C8D]/90 px-3 py-2 text-xs font-black text-white backdrop-blur">
                    <Users className="h-3 w-3" />
                    {event.attendees} inscrits
                  </div>
                )}
              </div>

              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-xl font-black text-[#0F2A43]">{event.title}</h3>

                <div className="mt-4 space-y-2 text-sm font-bold text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#0F6C8D]" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#0F6C8D]" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#0F6C8D]" />
                    {event.location}
                  </div>
                </div>

                <p className="mt-4 line-clamp-2 text-sm text-slate-600">{event.description}</p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center rounded-full bg-[#F7FAFC] px-3 py-1 text-xs font-bold text-[#0F6C8D]">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Link
                    to={`/events/${event.id}`}
                    className="rounded-2xl border-2 border-[#0F6C8D] px-4 py-3 text-center text-sm font-black text-[#0F6C8D] transition hover:bg-[#0F6C8D]/10"
                  >
                    Voir détails
                  </Link>
                  <Link
                    to="/reservation"
                    state={{ eventId: event.id, eventTitle: event.title }}
                    className="rounded-2xl bg-[#0F6C8D] px-4 py-3 text-sm font-black text-white transition hover:bg-[#0B5873]"
                  >
                    {event.price === "Gratuit" ? "Participer" : "Réserver"}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ADVANTAGES SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-black text-[#0F2A43]">Pourquoi participer aux événements CoWorki ?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Transformez chaque événement en opportunité de rencontre, d'apprentissage et de collaboration.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {advantages.map((adv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-lg hover:shadow-[#0F6C8D]/10"
            >
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-[#ECF8FC] p-3 text-[#0F6C8D]">
                {adv.icon}
              </div>
              <h3 className="text-lg font-black text-[#0F2A43]">{adv.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{adv.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* B2B SECTION */}
      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-4xl bg-gradient-to-br from-[#ECF8FC] to-[#E0F2FE] p-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-black text-[#0F2A43]">Organisez vos événements professionnels avec CoWorki</h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-700">
              CoWorki permet aux entreprises de trouver rapidement des espaces adaptés pour leurs réunions, formations,
              workshops, séminaires et événements professionnels.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {b2bBenefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F6C8D] text-white flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-[#0F2A43]">{benefit.title}</h3>
                    <p className="mt-1 text-sm text-slate-700">{benefit.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/reservation"
              state={{ source: "events", action: "demander_equipe" }}
              className="mt-10 inline-flex items-center gap-2 rounded-3xl bg-[#7A1E3A] px-8 py-4 font-black text-white shadow-lg shadow-[#7A1E3A]/20 transition hover:bg-[#64172F]"
            >
              Demander un espace pour mon événement
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-black text-[#0F2A43]">Un levier de visibilité pour les espaces partenaires</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Grâce aux événements CoWorki, les espaces de coworking peuvent attirer de nouveaux visiteurs, animer leur
            communauté et développer des revenus complémentaires.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-3">
          {partnerBenefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl border-2 border-[#0F6C8D] p-8 text-center"
            >
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#0F6C8D] text-white">
                {benefit.icon}
              </div>
              <h3 className="font-black text-[#0F2A43]">{benefit.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{benefit.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F2A43] to-[#0F6C8D] py-20">
        <div className="absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-[#7A1E3A]/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black text-white">Prêt à vivre l’expérience des événements CoWorki ?</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#ECF8FC]">
              Rejoignez les prochains événements et transformez chaque espace de coworking en opportunité de rencontre,
              d'apprentissage et de collaboration.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <a href="#events" className="rounded-3xl bg-white px-8 py-4 font-black text-[#0F6C8D] shadow-xl transition hover:bg-slate-100 inline-flex items-center gap-2">
                Explorer les événements
                <ArrowRight className="h-5 w-5" />
              </a>
              <Link
                to="/partenaires"
                className="rounded-3xl border-2 border-white px-8 py-4 font-black text-white transition hover:bg-white/10 inline-flex items-center gap-2"
              >
                Devenir partenaire
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-600">
          <p>© 2026 CoWorki. Tous droits réservés. | Plateforme de réservation et valorisation des espaces de coworking en Tunisie.</p>
        </div>
      </footer>
    </div>
  );
}

export default Events;
