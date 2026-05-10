import { Link } from "react-router-dom";
import logo from "../assets/logo-coworki.png";
import coworkiHero from "../assets/hero/coworki-binome.png";
import smartMatchingCoworki from "../assets/hero/smart-matching-coworki.png";
import { motion } from "framer-motion";
import MobileNav from "../components/MobileNav";
import DesktopNav from "../components/DesktopNav";
import HeaderActions from "../components/HeaderActions";
import SEO from "../components/SEO";
import { spacesData } from "../data/spacesData";
import {
  ArrowRight,
  BadgePercent,
  Building2,
  CheckCircle2,
  HeartHandshake,
  MapPin,
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
  CalendarDays,
  ShieldCheck,
  CreditCard,
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
      title: "Événements & networking",
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

  const heroSearchItems = [
    { icon: <MapPin className="h-4 w-4" />, label: "Ville", value: "Tunis ou Sousse" },
    { icon: <CalendarDays className="h-4 w-4" />, label: "Date", value: "Aujourd’hui" },
    { icon: <Building2 className="h-4 w-4" />, label: "Type", value: "Poste, salle..." },
    { icon: <Wallet className="h-4 w-4" />, label: "Budget", value: "À partir de 15 TND" },
  ];

  const trustBadges = [
    { icon: <Clock3 className="h-4 w-4" />, label: "Disponibilité en temps réel" },
    { icon: <CreditCard className="h-4 w-4" />, label: "Paiement sécurisé" },
    { icon: <ShieldCheck className="h-4 w-4" />, label: "Avis vérifiés" },
    { icon: <BadgePercent className="h-4 w-4" />, label: "Offres flash" },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#F7FAFC] text-slate-950">
      <SEO
        title="CoWorki - Réservez votre espace de coworking en Tunisie"
        description="Trouvez, comparez et réservez des espaces de coworking en Tunisie avec disponibilité en temps réel, offres flash, événements et parcours partenaires."
      />
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

          <DesktopNav />

          <HeaderActions />
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
              className="max-w-4xl text-[2.85rem] font-black leading-[0.98] tracking-normal sm:text-6xl md:text-7xl lg:text-[5.25rem]"
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
              CoWorki centralise les espaces de coworking en Tunisie avec
              disponibilité en temps réel, réservation simple, offres flash et
              networking intelligent après réservation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.26 }}
              className="mt-7 rounded-[2rem] border border-white/80 bg-white/85 p-3 shadow-xl shadow-slate-200/70 backdrop-blur-xl"
            >
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
                {heroSearchItems.map((item) => (
                  <Link
                    key={item.label}
                    to="/spaces"
                    className="flex items-center gap-3 rounded-2xl bg-[#F7FAFC] px-4 py-3 transition hover:bg-[#ECF8FC]"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0F6C8D] shadow-sm">
                      {item.icon}
                    </span>
                    <span>
                      <span className="block text-[0.68rem] font-black uppercase tracking-[0.18em] text-slate-400">
                        {item.label}
                      </span>
                      <span className="block text-sm font-black text-[#0F2A43]">
                        {item.value}
                      </span>
                    </span>
                  </Link>
                ))}
                <Link
                  to="/spaces"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#7A1E3A] px-5 py-4 text-sm font-black text-white shadow-lg shadow-[#7A1E3A]/20 transition hover:-translate-y-0.5 hover:bg-[#64172F] sm:col-span-2 lg:col-span-1"
                >
                  Rechercher
                  <Search className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34 }}
              className="mt-5 flex flex-wrap gap-2"
            >
              {trustBadges.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-3 py-2 text-xs font-black text-slate-600 shadow-sm backdrop-blur"
                >
                  <span className="text-[#0F6C8D]">{badge.icon}</span>
                  {badge.label}
                </span>
              ))}
            </motion.div>

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
                    Explorer les espaces
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
                  Voir les événements
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

      {/* DIFFERENT */}
      <section className="bg-white px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#0F6C8D]">
              Différence CoWorki
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] text-[#0F2A43] md:text-5xl">
              Pourquoi CoWorki est différent ?
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              CoWorki n’est pas seulement une vitrine d’espaces. La plateforme vous aide à passer rapidement de la recherche à la réservation, avec des favoris, des notifications et des recommandations utiles.
            </p>
            <Link
              to="/spaces"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#7A1E3A] px-7 py-4 text-sm font-black text-white shadow-xl shadow-[#7A1E3A]/20 transition hover:bg-[#64172F]"
            >
              Explorer les espaces
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Recherche claire", "Ville, budget, services et ambiance sont faciles à comparer.", <Users className="h-6 w-6" />],
              ["Réservation rapide", "Un parcours court pour choisir un créneau et envoyer une demande.", <BriefcaseBusiness className="h-6 w-6" />],
              ["Networking utile", "Le Smart Matching apparaît après réservation, au bon moment.", <Network className="h-6 w-6" />],
              ["Suivi personnel", "Réservations, favoris et notifications restent accessibles depuis votre espace.", <CalendarCheck className="h-6 w-6" />],
            ].map(([title, text, icon]) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="rounded-[2rem] bg-[#F7FAFC] p-6 shadow-sm ring-1 ring-slate-100"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ECF8FC] text-[#0F6C8D]">{icon}</div>
                <h3 className="text-xl font-black text-[#0F2A43]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
              </motion.div>
            ))}
          </div>
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
            Événements CoWorki • Networking • Ateliers • Communauté •
          </span>
          <span className="mx-8">
            Événements CoWorki • Networking • Ateliers • Communauté •
          </span>
        </motion.div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#9ED8E8]">
              Événements CoWorki
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

      {/* SMART MATCHING PREVIEW */}
      <section className="relative overflow-hidden bg-[#F7FAFC] px-6 py-20 sm:py-24">
        <div className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-[#9ED8E8]/35 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#7A1E3A]/15 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#0F6C8D] shadow-sm">
              <Network className="h-6 w-6" />
            </div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#7A1E3A]">
              Fonction intelligente
            </p>
            <h2 className="mt-4 max-w-xl text-4xl font-black tracking-[-0.03em] text-[#0F2A43] md:text-5xl">
              Le networking commence après la réservation.
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-slate-600">
              Sur CoWorki, le Smart Matching ne s’affiche pas comme une page publique. Il se débloque quand votre réservation est confirmée, avec des profils pertinents liés au même espace ou à vos centres d’intérêt.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/spaces"
                className="rounded-full bg-[#7A1E3A] px-6 py-3 text-sm font-black text-white shadow-xl shadow-[#7A1E3A]/20 transition hover:bg-[#64172F]"
              >
                Réserver un espace
              </Link>
              <Link
                to="/dashboard"
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-[#0F2A43] transition hover:border-[#0F6C8D] hover:text-[#0F6C8D]"
              >
                Voir mon espace
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-2xl shadow-slate-300/60 ring-1 ring-slate-100">
              <div className="relative h-[460px] overflow-hidden rounded-[2rem] bg-[#0F2A43]">
                <img src={smartMatchingCoworki} alt="Groupe CoWorki qui échange via la plateforme avec des bulles de messages" className="h-full w-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A43] via-[#0F2A43]/30 to-transparent" />

                <div className="absolute left-5 top-5 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0F6C8D]">Réservation confirmée</p>
                  <p className="mt-1 font-black text-[#0F2A43]">Friends Lab • Aujourd’hui</p>
                </div>

                <div className="absolute bottom-5 left-5 right-5 grid gap-3 md:grid-cols-3">
                  {[
                    ["01", "Espace réservé"],
                    ["02", "Centres d’intérêt lus"],
                    ["03", "Profils proposés"],
                  ].map(([number, text]) => (
                    <div key={text} className="rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur">
                      <p className="text-xs font-black text-[#7A1E3A]">{number}</p>
                      <p className="mt-1 text-sm font-black text-[#0F2A43]">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-24 hidden rounded-[1.7rem] bg-white p-5 shadow-2xl shadow-slate-300/70 ring-1 ring-slate-100 md:block"
            >
              <p className="text-sm font-black text-[#0F2A43]">3 profils compatibles</p>
              <div className="mt-3 flex -space-x-2">
                {["M", "Y", "N"].map((letter) => (
                  <span key={letter} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#FBEFF3] text-sm font-black text-[#7A1E3A]">
                    {letter}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
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
              <Link to="/events">Événements</Link>
            </div>
          </div>

          <div>
            <p className="font-black">Solutions</p>
            <div className="mt-4 grid gap-3 text-slate-300">
              <Link to="/spaces">Utilisateurs</Link>
              <Link to="/business">Entreprises</Link>
              <Link to="/partenaires">Espaces partenaires</Link>
              <Link to="/dashboard/user">Espace utilisateur</Link>
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
