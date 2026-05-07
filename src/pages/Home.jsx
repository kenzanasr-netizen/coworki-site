import { Link } from "react-router-dom";
import logo from "../assets/logo-coworki.png";
import hero from "../assets/hero.png";
import { motion } from "framer-motion";
import ImageCarousel from "../components/ImageCarousel";
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
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wallet,
} from "lucide-react";

function Home() {
  const spaces = spacesData.slice(0, 3);

  const advantages = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Recherche intelligente",
      text: "Trouvez l’espace adapté selon la ville, le budget, les services et l’ambiance recherchée.",
    },
    {
      icon: <BadgePercent className="h-6 w-6" />,
      title: "Promotions flash",
      text: "Des créneaux sous-utilisés transformés en offres attractives pour les utilisateurs.",
    },
    {
      icon: <Network className="h-6 w-6" />,
      title: "Smart Matching",
      text: "Connectez-vous avec des profils qui partagent vos intérêts professionnels.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Espaces vérifiés",
      text: "Une sélection d’espaces partenaires fiables pour une expérience plus rassurante.",
    },
  ];

  const floatingCards = [
    {
      icon: <MapPin className="h-4 w-4" />,
      label: "Sousse",
      value: "12 espaces",
    },
    {
      icon: <BadgePercent className="h-4 w-4" />,
      label: "Promo",
      value: "-20% aujourd’hui",
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: "Matching",
      value: "8 profils proches",
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
      <header className="sticky top-0 z-50 border-b border-white/30 bg-white/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
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
                className="h-20 w-auto md:h-24"
              />
            </Link>
          </motion.div>

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
      <section className="relative min-h-[calc(100vh-96px)] overflow-hidden bg-gradient-to-br from-[#ECF8FC] via-white to-[#FBEFF3]">
        <div className="absolute inset-0 opacity-[0.45]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F6C8D10_1px,transparent_1px),linear-gradient(to_bottom,#7A1E3A10_1px,transparent_1px)] bg-[size:54px_54px]" />
        </div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          className="absolute -right-28 top-24 h-72 w-72 rounded-[4rem] border border-[#0F6C8D]/20 bg-white/20 backdrop-blur"
        />

        <motion.div
          animate={{ y: [0, -18, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-10 top-28 hidden h-24 w-24 rounded-full bg-[#7A1E3A]/10 md:block"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#9ED8E8]/80 bg-white/80 px-4 py-2 text-sm font-black text-[#0F6C8D] shadow-sm backdrop-blur"
            >
              <Sparkles className="h-4 w-4" />
              Nouvelle génération de réservation coworking
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1 }}
              className="max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.05em] text-[#0F2A43] md:text-7xl"
            >
              Réservez. Travaillez. Connectez-vous.
              <span className="mt-2 block bg-gradient-to-r from-[#0F6C8D] via-[#1CA6B8] to-[#7A1E3A] bg-clip-text text-transparent">
                En un seul espace digital.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-7 max-w-2xl text-lg leading-8 text-slate-600"
            >
              CoWorki transforme la recherche d’espaces de coworking en Tunisie
              grâce à une expérience fluide, des promotions intelligentes, des
              événements communautaires et un Smart Matching pensé pour créer de
              vraies opportunités.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-9 flex flex-col gap-4 sm:flex-row"
            >
              <Link to="/spaces">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative overflow-hidden rounded-full bg-[#0F6C8D] px-8 py-4 text-sm font-black text-white shadow-2xl shadow-[#0F6C8D]/25"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition duration-700 group-hover:translate-x-full" />
                  <span className="relative flex items-center justify-center gap-2">
                    Explorer les espaces
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </motion.button>
              </Link>

              <Link to="/partenaires">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full border border-[#7A1E3A]/20 bg-white/85 px-8 py-4 text-sm font-black text-[#7A1E3A] shadow-lg shadow-slate-200/60 backdrop-blur transition hover:bg-[#FBEFF3]"
                >
                  Ajouter mon espace
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-11 grid max-w-2xl grid-cols-3 gap-4"
            >
              {[
                ["+150", "espaces ciblés"],
                ["3", "acteurs connectés"],
                ["2026", "expérience digitale"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[1.7rem] border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur-xl"
                >
                  <p className="text-3xl font-black text-[#7A1E3A]">
                    {value}
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* HERO VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-[#0F6C8D]/20 via-white to-[#7A1E3A]/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2.6rem] border border-white/80 bg-white/75 p-3 shadow-2xl shadow-slate-300/70 backdrop-blur-2xl">
              <div className="relative overflow-hidden rounded-[2rem]">
                <img
                  src={hero}
                  alt="Espace de coworking moderne"
                  className="h-[400px] w-full object-cover md:h-[520px]"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A43]/80 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 rounded-[1.7rem] border border-white/20 bg-white/15 p-5 text-white backdrop-blur-xl">
                  <p className="text-sm font-bold text-white/70">
                    Suggestion intelligente
                  </p>

                  <div className="mt-2 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black">
                        Espace calme à Sousse
                      </h3>
                      <p className="mt-1 text-sm text-white/75">
                        Disponible aujourd’hui • 15 TND
                      </p>
                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-white px-3 py-2 text-sm font-black text-[#0F2A43]">
                      <Star className="h-4 w-4 fill-[#D9A441] text-[#D9A441]" />
                      4.8
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {floatingCards.map((card, index) => (
              <motion.div
                key={card.label}
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.4,
                }}
                className={`absolute hidden rounded-3xl border border-white/70 bg-white/80 p-4 shadow-2xl shadow-slate-300/60 backdrop-blur-xl md:block ${
                  index === 0
                    ? "-left-8 top-12"
                    : index === 1
                    ? "-right-6 top-32"
                    : "-left-4 bottom-20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ECF8FC] text-[#0F6C8D]">
                    {card.icon}
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase text-slate-400">
                      {card.label}
                    </p>
                    <p className="font-black text-[#0F2A43]">{card.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEARCH EXPERIENCE */}
      <section className="relative z-20 -mt-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-6xl rounded-[2.2rem] border border-white/80 bg-white/85 p-4 shadow-2xl shadow-slate-300/60 backdrop-blur-2xl"
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

      {/* ADVANTAGES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#7A1E3A]">
            Expérience CoWorki
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] text-[#0F2A43] md:text-5xl">
            Un site qui ne liste pas seulement les espaces, il active tout un
            écosystème.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {advantages.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              whileHover={{ y: -10, rotate: index % 2 === 0 ? 1 : -1 }}
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
      <section id="spaces" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-[#0F6C8D]">
                Espaces recommandés
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] text-[#0F2A43] md:text-5xl">
                Une sélection immersive et claire.
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
                  <ImageCarousel images={space.images} title={space.name} />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A43]/80 via-transparent to-transparent pointer-events-none" />

                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-black text-[#0F6C8D] backdrop-blur z-10">
                    {space.city}
                  </span>

                  <span className="absolute bottom-5 left-5 rounded-full bg-[#7A1E3A] px-4 py-2 text-xs font-black text-white z-10">
                    {space.type}
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

      {/* INNOVATION STRIP */}
      <section
        id="offers"
        className="relative overflow-hidden bg-[#0F2A43] py-24 text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#1CA6B855,transparent_32%),radial-gradient(circle_at_80%_60%,#7A1E3A88,transparent_30%)]" />

        <motion.div
          animate={{ x: [0, -900] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 flex whitespace-nowrap text-8xl font-black uppercase tracking-[-0.06em] text-white/[0.035]"
        >
          <span className="mx-8">
            Smart Matching • Promotions Flash • CoWorki Events • Eco Visibility •
          </span>
          <span className="mx-8">
            Smart Matching • Promotions Flash • CoWorki Events • Eco Visibility •
          </span>
        </motion.div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#9ED8E8]">
              Innovation 2026
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Une plateforme vivante, pas un simple catalogue.
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-slate-300">
              CoWorki combine réservation, données, recommandations, promotions
              et événements pour créer une expérience plus dynamique pour les
              utilisateurs et plus rentable pour les espaces partenaires.
            </p>
          </div>

          <div className="grid gap-5">
            {[
              [
                <BadgePercent className="h-6 w-6" />,
                "Promotions flash",
                "Activer les créneaux vides grâce à des offres limitées.",
              ],
              [
                <Users className="h-6 w-6" />,
                "Smart Matching",
                "Favoriser les rencontres entre profils compatibles.",
              ],
              [
                <HeartHandshake className="h-6 w-6" />,
                "CoWorki Events",
                "Transformer les espaces en lieux de networking.",
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
                  <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-white text-[#0F6C8D]">
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
      <section id="partners" className="bg-[#F7FAFC] py-24">
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

                <button className="mt-8 rounded-full bg-white px-7 py-4 text-sm font-black text-[#7A1E3A] transition hover:bg-[#FBEFF3]">
                  Devenir partenaire
                </button>
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

      {/* FOOTER */}
      <footer id="contact" className="bg-[#0F2A43] py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">
          <div>
            <img
              src={logo}
              alt="Logo CoWorki"
              className="h-24 w-auto rounded-2xl bg-white p-2"
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
              <a href="#">Utilisateurs</a>
              <a href="#">Entreprises</a>
              <a href="#">Espaces partenaires</a>
              <a href="#">Smart Matching</a>
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
