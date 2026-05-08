import { Link } from "react-router-dom";
import logo from "../assets/logo-coworki.png";
import coworkiHero from "../assets/hero/coworki-binome.png";
import { motion } from "framer-motion";
import MobileNav from "../components/MobileNav";
import { spacesData } from "../data/spacesData";
import {
  ArrowRight,
  BadgePercent,
  Building2,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  MousePointer2,
  Network,
  Search,
  Star,
  Users,
  Wallet,
  Zap,
  Clock3,
  Building,
  GraduationCap,
  BriefcaseBusiness,
  CalendarCheck,
} from "lucide-react";

function Home() {
  const spaces = spacesData.slice(0, 3);

  const steps = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Cherchez",
      text: "Choisissez votre ville, votre budget et le type d’espace dont vous avez besoin.",
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Comparez",
      text: "Consultez les prix, les photos, les avis, les équipements et les disponibilités.",
    },
    {
      icon: <CalendarCheck className="h-6 w-6" />,
      title: "Réservez",
      text: "Confirmez votre place en quelques clics et gagnez du temps.",
    },
  ];

  const targets = [
    {
      icon: <GraduationCap className="h-7 w-7" />,
      title: "Étudiants & freelances",
      text: "Trouvez un endroit calme, flexible et abordable pour étudier, travailler ou créer.",
    },
    {
      icon: <BriefcaseBusiness className="h-7 w-7" />,
      title: "Entreprises",
      text: "Réservez des salles pour réunions, formations, workshops et événements professionnels.",
    },
    {
      icon: <Building className="h-7 w-7" />,
      title: "Espaces partenaires",
      text: "Gagnez en visibilité, remplissez vos créneaux disponibles et développez vos revenus.",
    },
  ];

  const advantages = [
    {
      icon: <Clock3 className="h-6 w-6" />,
      title: "Disponibilités en temps réel",
      text: "Visualisez rapidement les espaces disponibles sans appels ni messages inutiles.",
    },
    {
      icon: <Wallet className="h-6 w-6" />,
      title: "Prix clairs",
      text: "Comparez les tarifs et choisissez l’espace adapté à votre budget.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Réservation simple",
      text: "Un parcours rapide, fluide et pensé pour aller directement à l’essentiel.",
    },
    {
      icon: <Network className="h-6 w-6" />,
      title: "Events & networking",
      text: "Découvrez des événements et connectez-vous avec des profils proches de vos intérêts.",
    },
  ];

  const floatingCards = [
    {
      icon: <MapPin className="h-4 w-4" />,
      value: "Espaces proches",
    },
    {
      icon: <BadgePercent className="h-4 w-4" />,
      value: "Promos flash",
    },
    {
      icon: <Users className="h-4 w-4" />,
      value: "Networking",
    },
    {
      icon: <Zap className="h-4 w-4" />,
      value: "Réservation rapide",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#F7FAFC] text-slate-950">
      {/* BACKGROUND DECOR */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-[#9ED8E8]/40 blur-3xl" />
        <div className="absolute right-[-10%] top-[15%] h-[450px] w-[450px] rounded-full bg-[#7A1E3A]/20 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[30%] h-[420px] w-[420px] rounded-full bg-[#E7C05D]/20 blur-3xl" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/30 bg-white/75 backdrop-blur-2xl">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <Link to="/">
              <img
                src={logo}
                alt="Logo CoWorki"
                className="h-16 w-auto sm:h-20 md:h-24"
              />
            </Link>
          </motion.div>

          <MobileNav />

          <nav className="hidden items-center gap-7 rounded-full border border-slate-200/70 bg-white/80 px-6 py-3 text-sm font-black text-slate-600 shadow-sm lg:flex">
            <Link to="/" className="text-[#0F6C8D]">
              Accueil
            </Link>

            <Link to="/spaces" className="transition hover:text-[#0F6C8D]">
              Espaces
            </Link>

            <Link to="/offres" className="transition hover:text-[#0F6C8D]">
              Offres
            </Link>

            <Link to="/events" className="transition hover:text-[#0F6C8D]">
              Events
            </Link>

            <Link to="/partenaires" className="transition hover:text-[#0F6C8D]">
              Partenaires
            </Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/connexion"
              className="rounded-full px-5 py-3 text-sm font-black text-[#0F2A43] transition hover:bg-white"
            >
              Connexion
            </Link>

            <Link to="/inscription">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full bg-[#7A1E3A] px-6 py-3 text-sm font-black text-white shadow-xl shadow-[#7A1E3A]/25 transition hover:bg-[#64172F]"
              >
                Inscription
              </motion.button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#F8FBFC]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0F6C8D0D_1px,transparent_1px),linear-gradient(to_bottom,#7A1E3A0A_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_18%_18%,#9ED8E84D,transparent_34%),radial-gradient(circle_at_78%_24%,#7A1E3A24,transparent_30%),linear-gradient(115deg,#FFFFFF_0%,#ECF8FC_48%,#FBEFF3_100%)]" />
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-16 hidden w-[620px] max-w-none opacity-[0.055] blur-[1.5px] lg:block"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-12 sm:py-16 lg:grid-cols-[1.04fr_0.96fr] lg:py-20">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#9ED8E8]/80 bg-white/85 px-3 py-2 pr-5 text-xs font-black text-[#0F6C8D] shadow-sm backdrop-blur sm:text-sm"
            >
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
                <img src={logo} alt="CoWorki" className="h-8 w-8 object-contain" />
              </span>
              Plateforme tunisienne de coworking
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1 }}
              className="max-w-4xl text-[3rem] font-black leading-[0.96] tracking-normal sm:text-6xl md:text-7xl lg:text-[5.6rem]"
            >
              <span className="block text-[#0F2A43]">Cherche moins,</span>
              <span className="mt-2 block text-[#7A1E3A]">bosse mieux...</span>
              <span className="mt-3 block text-[#0F6C8D]">
                CoWorki yjiblek{" "}
                <span className="text-[#0F2A43]">le bon lieu.</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-7 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8"
            >
              Trouvez, comparez et réservez les meilleurs espaces de coworking
              en Tunisie. Une expérience simple, rapide et pensée pour les
              étudiants, freelances, entreprises et espaces partenaires.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <Link to="/spaces">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative w-full overflow-hidden rounded-full bg-[#0F6C8D] px-7 py-4 text-sm font-black text-white shadow-2xl shadow-[#0F6C8D]/25 sm:w-auto"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition duration-700 group-hover:translate-x-full" />
                  <span className="relative flex items-center justify-center gap-2">
                    Trouver mon espace
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </motion.button>
              </Link>

              <Link to="/events">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full rounded-full border border-[#7A1E3A]/20 bg-white/90 px-7 py-4 text-sm font-black text-[#7A1E3A] shadow-lg shadow-slate-200/60 backdrop-blur transition hover:-translate-y-0.5 hover:bg-[#FBEFF3] sm:w-auto"
                >
                  Découvrir les events
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-9 grid max-w-2xl grid-cols-3 gap-3 sm:gap-4"
            >
              {[
                ["3", "clics pour réserver"],
                ["24/7", "accès rapide"],
                ["100%", "simple à utiliser"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[1.4rem] border border-white/70 bg-white/70 p-4 text-center shadow-sm backdrop-blur-xl sm:rounded-[1.7rem] sm:p-5"
                >
                  <p className="text-2xl font-black text-[#7A1E3A] sm:text-3xl">
                    {value}
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-500 sm:text-sm">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* HERO VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative z-10 mx-auto w-full max-w-xl lg:max-w-none"
          >
            <div className="absolute -inset-6 rounded-[3rem] bg-[#9ED8E8]/25 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/80 bg-white/85 p-3 shadow-2xl shadow-slate-300/60 backdrop-blur-2xl sm:rounded-[2.75rem]">
              <div className="relative overflow-hidden rounded-[1.9rem]">
                <img
                  src={coworkiHero}
                  alt="Binôme travaillant sur un ordinateur avec le logo CoWorki"
                  className="h-[390px] w-full object-cover object-center sm:h-[500px] lg:h-[560px]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0F2A43]/85 via-[#0F2A43]/25 to-transparent" />

                <div className="absolute left-5 top-5 flex items-center gap-3 rounded-full border border-white/50 bg-white/90 px-3 py-2 shadow-lg backdrop-blur">
                  <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white">
                    <img src={logo} alt="CoWorki" className="h-9 w-9 object-contain" />
                  </span>
                  <span className="pr-2 text-sm font-black text-[#0F2A43]">
                    CoWorki en action
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/20 bg-white/15 p-5 text-white backdrop-blur-xl">
                  <p className="text-sm font-bold text-[#9ED8E8]">
                    Trouver, comparer, réserver
                  </p>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black sm:text-2xl">
                        Un binôme, un PC, le bon espace.
                      </h3>
                      <p className="mt-1 text-sm text-white/75">
                        CoWorki vous rapproche du lieu qui convient.
                      </p>
                    </div>
                    <div className="hidden rounded-full bg-white px-4 py-2 text-sm font-black text-[#7A1E3A] sm:block">
                      3 clics
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {floatingCards.map((card, index) => (
              <motion.div
                key={card.value}
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.4,
                }}
                className={`absolute hidden rounded-3xl border border-white/70 bg-white/85 p-4 shadow-2xl shadow-slate-300/60 backdrop-blur-xl md:block ${
                  index === 0
                    ? "-left-8 top-14"
                    : index === 1
                    ? "-right-8 top-28"
                    : index === 2
                    ? "-left-4 bottom-24"
                    : "right-0 -bottom-7"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ECF8FC] text-[#0F6C8D]">
                    {card.icon}
                  </div>

                  <div>
                    <p className="font-black text-[#0F2A43]">{card.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEARCH EXPERIENCE */}
      <section className="relative z-20 -mt-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-6xl rounded-[2rem] border border-white/80 bg-white/90 p-4 shadow-2xl shadow-slate-300/60 backdrop-blur-2xl"
        >
          <div className="grid gap-3 md:grid-cols-5">
            {[
              [<MapPin className="h-5 w-5" />, "Ville", "Sousse"],
              [<Building2 className="h-5 w-5" />, "Type", "Poste individuel"],
              [<CalendarDays className="h-5 w-5" />, "Date", "Aujourd’hui"],
              [<Wallet className="h-5 w-5" />, "Budget", "20 TND"],
            ].map(([icon, label, value]) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-3xl bg-[#F7FAFC] px-4 py-4 transition hover:bg-[#ECF8FC]"
              >
                <div className="text-[#0F6C8D]">{icon}</div>
                <div>
                  <p className="text-xs font-black uppercase text-slate-400">
                    {label}
                  </p>
                  <p className="font-black text-[#0F2A43]">{value}</p>
                </div>
              </div>
            ))}

            <Link to="/spaces">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group h-full w-full rounded-3xl bg-[#7A1E3A] px-6 py-4 font-black text-white shadow-xl shadow-[#7A1E3A]/20 transition hover:bg-[#64172F]"
              >
                <span className="flex items-center justify-center gap-2">
                  Rechercher
                  <MousePointer2 className="h-4 w-4 transition group-hover:rotate-12" />
                </span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#7A1E3A]">
            Comment ça marche ?
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] text-[#0F2A43] md:text-5xl">
            Trois étapes. Zéro galère.
          </h2>
          <p className="mt-5 text-slate-600">
            CoWorki simplifie tout le parcours : vous cherchez, vous comparez,
            vous réservez.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-7 shadow-sm ring-1 ring-slate-100 transition hover:shadow-xl hover:shadow-slate-200"
            >
              <div className="absolute right-5 top-5 text-6xl font-black text-[#0F6C8D]/5">
                0{index + 1}
              </div>

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ECF8FC] text-[#0F6C8D]">
                {item.icon}
              </div>

              <h3 className="text-2xl font-black text-[#0F2A43]">
                {item.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOR WHO */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#0F6C8D]">
              Pour qui ?
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] text-[#0F2A43] md:text-5xl">
              Une plateforme pour tout l’écosystème coworking.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {targets.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -10, rotate: index === 1 ? 0 : index === 0 ? -1 : 1 }}
                className="group rounded-[2rem] border border-slate-100 bg-[#F7FAFC] p-7 shadow-sm transition hover:bg-white hover:shadow-2xl hover:shadow-slate-200/70"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-[#7A1E3A] shadow-sm transition group-hover:bg-[#7A1E3A] group-hover:text-white">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-black text-[#0F2A43]">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY COWORKI */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#7A1E3A]">
              Pourquoi CoWorki ?
            </p>

            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.03em] text-[#0F2A43] md:text-5xl">
              Moins d’incertitude. Plus de choix. Plus d’action.
            </h2>
          </div>

          <Link
            to="/spaces"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-[#0F2A43] shadow-sm transition hover:border-[#0F6C8D] hover:text-[#0F6C8D]"
          >
            Explorer maintenant
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {advantages.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-7 shadow-sm ring-1 ring-slate-100"
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#9ED8E8]/25 transition group-hover:bg-[#7A1E3A]/15" />

              <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ECF8FC] text-[#0F6C8D] transition group-hover:bg-[#7A1E3A] group-hover:text-white">
                {item.icon}
              </div>

              <h3 className="relative text-xl font-black text-[#0F2A43]">
                {item.title}
              </h3>

              <p className="relative mt-3 leading-7 text-slate-600">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SPACES */}
      <section id="spaces" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-[#0F6C8D]">
                Espaces populaires
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] text-[#0F2A43] md:text-5xl">
                Des spots prêts à vous accueillir.
              </h2>
            </div>

            <Link
              to="/spaces"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-[#0F2A43] shadow-sm transition hover:border-[#0F6C8D] hover:text-[#0F6C8D]"
            >
              Voir tous les espaces
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {spaces.map((space, index) => (
              <motion.div
                key={space.name}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                whileHover={{ y: -12 }}
                className="group overflow-hidden rounded-[2.3rem] border border-slate-100 bg-white shadow-sm transition hover:shadow-2xl hover:shadow-slate-300/60"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={space.images[0]}
                    alt={space.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F2A43]/45 via-transparent to-transparent" />

                  <span className="absolute left-5 top-5 z-10 rounded-full bg-white/90 px-4 py-2 text-xs font-black text-[#0F6C8D] backdrop-blur">
                    {space.city}
                  </span>

                  <span className="absolute bottom-5 left-5 z-10 rounded-full bg-[#7A1E3A] px-4 py-2 text-xs font-black text-white">
                    Disponible
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-[#0F2A43]">
                        {space.name}
                      </h3>

                      <p className="mt-1 font-bold text-slate-500">
                        À partir de{" "}
                        <span className="text-[#7A1E3A]">{space.price}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-[#FFF7E8] px-3 py-1 text-sm font-black text-[#9A6A13]">
                      <Star className="h-4 w-4 fill-[#D9A441] text-[#D9A441]" />
                      {space.rating}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-sm text-slate-500">
                    <p>{space.address}</p>
                    <p>{space.reviews}</p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {space.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link to={`/spaces/${space.id}`}>
                    <button className="mt-6 w-full rounded-2xl bg-[#0F2A43] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0F6C8D]">
                      Voir détails
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="relative overflow-hidden bg-[#0F2A43] py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#1CA6B855,transparent_32%),radial-gradient(circle_at_80%_60%,#7A1E3A88,transparent_30%)]" />

        <motion.div
          animate={{ x: [0, -900] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 flex whitespace-nowrap text-7xl font-black uppercase tracking-[-0.06em] text-white/[0.035] md:text-8xl"
        >
          <span className="mx-8">
            CoWorki Events • Networking • Workshops • Community •
          </span>
          <span className="mx-8">
            CoWorki Events • Networking • Workshops • Community •
          </span>
        </motion.div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#9ED8E8]">
              CoWorki Events
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Plus qu’un espace, une communauté.
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-slate-300">
              Découvrez des workshops, rencontres et événements pensés pour
              connecter étudiants, freelances et entreprises.
            </p>

            <Link to="/events">
              <button className="mt-8 rounded-full bg-white px-7 py-4 text-sm font-black text-[#7A1E3A] transition hover:bg-[#FBEFF3]">
                Voir les events
              </button>
            </Link>
          </div>

          <div className="grid gap-5">
            {[
              [
                <BadgePercent className="h-6 w-6" />,
                "Workshops utiles",
                "Des rencontres concrètes pour apprendre, pratiquer et évoluer.",
              ],
              [
                <Users className="h-6 w-6" />,
                "Networking ciblé",
                "Des événements pour rencontrer les bons profils au bon moment.",
              ],
              [
                <HeartHandshake className="h-6 w-6" />,
                "Espaces dynamisés",
                "Des lieux plus vivants, plus visibles et plus attractifs.",
              ],
            ].map(([icon, title, text], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#0F6C8D]">
                    {icon}
                  </div>

                  <div>
                    <h3 className="text-xl font-black">{title}</h3>
                    <p className="mt-2 leading-7 text-slate-300">{text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="bg-[#F7FAFC] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0F6C8D] via-[#0F2A43] to-[#7A1E3A] p-8 text-white shadow-2xl shadow-slate-300/60 md:p-12">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-white/70">
                  Pour les partenaires
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-5xl">
                  Votre espace mérite plus que de la visibilité.
                </h2>

                <p className="mt-6 leading-8 text-white/80">
                  CoWorki aide les espaces de coworking à attirer de nouveaux
                  clients, centraliser les réservations, répondre aux demandes B2B
                  et optimiser les créneaux disponibles.
                </p>

                <Link to="/partenaires">
                  <button className="mt-8 rounded-full bg-white px-7 py-4 text-sm font-black text-[#7A1E3A] transition hover:bg-[#FBEFF3]">
                    Devenir partenaire
                  </button>
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Réservations centralisées",
                  "Promotions intelligentes",
                  "Demandes entreprises",
                  "Suivi des revenus",
                  "Avis clients",
                  "Événements partenaires",
                ].map((text, index) => (
                  <motion.div
                    key={text}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 font-black backdrop-blur"
                  >
                    <CheckCircle2 className="h-5 w-5 text-[#9ED8E8]" />
                    {text}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-slate-100 bg-gradient-to-br from-[#ECF8FC] via-white to-[#FBEFF3] p-8 text-center shadow-2xl shadow-slate-200/70 sm:p-12">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#7A1E3A]">
            Prêt à commencer ?
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-[#0F2A43] md:text-6xl">
            Prêt à trouver votre prochain spot de travail ?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
            Avec CoWorki, comparez, choisissez et réservez en quelques clics.
          </p>

          <Link to="/spaces">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 rounded-full bg-[#7A1E3A] px-8 py-4 text-sm font-black text-white shadow-xl shadow-[#7A1E3A]/25 transition hover:bg-[#64172F]"
            >
              Trouver mon espace
            </motion.button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-[#0F2A43] py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">
          <div>
            <img
              src={logo}
              alt="Logo CoWorki"
              className="h-16 w-auto rounded-2xl bg-white p-2 sm:h-20 md:h-24"
            />

            <p className="mt-4 leading-7 text-slate-300">
              Plateforme de réservation et de valorisation des espaces de
              coworking en Tunisie.
            </p>
          </div>

          <div>
            <p className="font-black">Navigation</p>
            <div className="mt-4 grid gap-3 text-slate-300">
              <Link to="/">Accueil</Link>
              <Link to="/spaces">Espaces</Link>
              <Link to="/offres">Offres</Link>
              <Link to="/events">Events</Link>
            </div>
          </div>

          <div>
            <p className="font-black">Solutions</p>
            <div className="mt-4 grid gap-3 text-slate-300">
              <Link to="/spaces">Utilisateurs</Link>
              <Link to="/events">Entreprises</Link>
              <Link to="/partenaires">Espaces partenaires</Link>
              <Link to="/offres">Smart Matching</Link>
            </div>
          </div>

          <div>
            <p className="font-black">Contact</p>
            <div className="mt-4 grid gap-3 text-slate-300">
              <p>contact@coworki.tn</p>
              <p>Tunisie</p>
              <p>Facebook • Instagram • LinkedIn</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
