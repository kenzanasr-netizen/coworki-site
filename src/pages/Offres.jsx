import logo from "../assets/logo-coworki.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MobileNav from "../components/MobileNav";
import DesktopNav from "../components/DesktopNav";
import HeaderActions from "../components/HeaderActions";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Users,
  Briefcase,
  Building2,
  ShieldCheck,
  Globe2,
  ChevronDown,
  Clock,
} from "lucide-react";
import { useState } from "react";

const heroHighlights = [
  {
    title: "Réservation confirmée",
    description: "Une confirmation instantanée pour vos journées de travail ou vos réunions.",
    accent: "bg-[#DCEFFE]/80 text-[#1160A0]",
  },
  {
    title: "Promotion flash -20%",
    description: "Profitez des meilleures offres du moment sur les espaces les plus demandés.",
    accent: "bg-[#FDE8EE]/80 text-[#7A1E3A]",
  },
  {
    title: "Event B2B disponible",
    description: "Des espaces prêts pour vos workshops, séminaires et rencontres professionnelles.",
    accent: "bg-[#E7F6EA]/80 text-[#1E6A3A]",
  },
  {
    title: "Espace partenaire boosté",
    description: "Plus de visibilité, plus de réservations et un taux d’occupation amélioré.",
    accent: "bg-[#F6E9FF]/80 text-[#5B2A7A]",
  },
];

const needsCards = [
  {
    icon: <Users className="h-6 w-6 text-[#0F6C8D]" />,
    title: "Pour travailler librement",
    description: "Trouvez un espace adapté à votre budget, votre ville et votre rythme.",
    points: ["Recherche rapide", "Réservation flexible", "Promotions flash", "Smart Matching"],
    cta: "Explorer les espaces",
    href: "/spaces",
    accent: "from-[#DCEFFE] to-white",
  },
  {
    icon: <Briefcase className="h-6 w-6 text-[#7A1E3A]" />,
    title: "Pour organiser vos événements",
    description: "Réservez des salles et espaces adaptés aux réunions, formations et workshops.",
    points: ["Espaces professionnels", "Comparaison simple", "Services complémentaires", "Facturation adaptée"],
    cta: "Demander un espace",
    href: "/reservation",
    accent: "from-[#E7F6EA] to-white",
  },
  {
    icon: <Building2 className="h-6 w-6 text-[#7A1E3A]" />,
    title: "Pour remplir et valoriser votre espace",
    description: "Gagnez en visibilité, recevez des réservations et développez vos revenus.",
    points: ["Visibilité renforcée", "Réservations centralisées", "Promotions intelligentes", "CoWorki Events"],
    cta: "Devenir partenaire",
    href: "/offres",
    accent: "from-[#FCE8F0] to-white",
  },
];

const offerTabs = {
  Utilisateurs: [
    {
      name: "Découverte",
      price: "Gratuit",
      badge: "Idéal pour commencer",
      description: "Créez votre compte, explorez les espaces et découvrez les événements CoWorki.",
      features: [
        "Consultation des espaces",
        "Accès aux fiches détaillées",
        "Filtres par ville, prix et services",
        "Accès aux avis",
        "Accès aux événements gratuits",
      ],
      cta: "Commencer gratuitement",
      accent: "bg-[#DCEFFE]/80 border-[#AAD6FF] text-[#0F6C8D]",
    },
    {
      name: "Flex",
      price: "Paiement à l’usage",
      badge: "Recommandé",
      description: "Réservez un poste, une salle ou un espace selon vos besoins.",
      features: [
        "Réservation 2h, demi-journée ou journée",
        "Promotions flash",
        "Favoris",
        "Notifications de réservation",
        "Historique personnel",
      ],
      cta: "Réserver un espace",
      accent: "bg-[#F8EBFF]/80 border-[#D6B4FF] text-[#7A1E3A]",
    },
    {
      name: "Community",
      price: "À partir de 10 TND / événement",
      badge: "Networking",
      description: "Participez aux workshops, meetups et événements organisés dans les espaces partenaires.",
      features: [
        "Accès aux événements CoWorki",
        "Networking ciblé",
        "Workshops professionnels",
        "Smart Matching communautaire",
        "Certificats ou badges de participation",
      ],
      cta: "Voir les événements",
      accent: "bg-[#FFF6E1]/80 border-[#FFE5A8] text-[#9A6A13]",
    },
  ],
  Entreprises: [
    {
      name: "Meeting",
      price: "Sur demande",
      badge: "Réunions",
      description: "Réservez rapidement une salle adaptée à vos réunions professionnelles.",
      features: [
        "Recherche par capacité",
        "Comparaison des espaces",
        "Équipements affichés",
        "Confirmation de disponibilité",
        "Paiement ou demande de devis",
      ],
      cta: "Demander une salle",
      accent: "bg-[#DCEFFE]/80 border-[#AAD6FF] text-[#0F6C8D]",
    },
    {
      name: "Event Pro",
      price: "Sur devis",
      badge: "Recommandé B2B",
      description: "Organisez formations, workshops, séminaires et événements professionnels.",
      features: [
        "Sélection d’espaces événementiels",
        "Services complémentaires",
        "Devis personnalisé",
        "Facturation adaptée",
        "Coordination avec l’espace partenaire",
      ],
      cta: "Organiser un événement",
      accent: "bg-[#E7F6EA]/80 border-[#AEDDCE] text-[#1E6A3A]",
    },
    {
      name: "Team Pack",
      price: "Offre personnalisée",
      badge: "Équipes",
      description: "Solution flexible pour les équipes qui réservent régulièrement des espaces.",
      features: [
        "Réservations récurrentes",
        "Espaces favoris d’entreprise",
        "Suivi des réservations",
        "Gestion multi-utilisateurs",
        "Support prioritaire",
      ],
      cta: "Contacter CoWorki",
      accent: "bg-[#FCE8F0]/80 border-[#F5C7DA] text-[#7A1E3A]",
    },
  ],
  Partenaires: [
    {
      name: "Starter",
      price: "Gratuit",
      badge: "Phase bêta",
      description: "Référencez votre espace sur CoWorki et testez la plateforme sans frais.",
      features: [
        "Fiche espace",
        "Photos et description",
        "Affichage des tarifs",
        "Réception des demandes",
        "Présence dans la recherche",
      ],
      cta: "Rejoindre la bêta",
      accent: "bg-[#DCEFFE]/80 border-[#AAD6FF] text-[#0F6C8D]",
    },
    {
      name: "Premium",
      price: "49 TND / mois",
      badge: "Visibilité",
      description: "Améliorez votre visibilité et attirez plus de réservations.",
      features: [
        "Mise en avant dans les résultats",
        "Badge Premium",
        "Statistiques de performance",
        "Promotions flash",
        "Priorité dans certains filtres",
      ],
      cta: "Choisir Premium",
      accent: "bg-[#E7F6EA]/80 border-[#AEDDCE] text-[#1E6A3A]",
    },
    {
      name: "Premium Plus",
      price: "99 TND / mois",
      badge: "Recommandé partenaire",
      description: "Une offre complète pour développer vos réservations, vos événements et votre visibilité B2B.",
      features: [
        "Meilleur positionnement",
        "Accès CoWorki Events",
        "Mise en avant B2B",
        "Analyse du taux d’occupation",
        "Recommandations de promotions",
        "Support prioritaire",
      ],
      cta: "Choisir Premium Plus",
      accent: "bg-[#FCE8F0]/80 border-[#F5C7DA] text-[#7A1E3A]",
    },
  ],
};

const comparisonRows = [
  { feature: "Fiche espace", starter: true, premium: true, premiumPlus: true },
  { feature: "Réception des demandes", starter: true, premium: true, premiumPlus: true },
  { feature: "Mise en avant dans la recherche", starter: false, premium: true, premiumPlus: true },
  { feature: "Badge Premium", starter: false, premium: true, premiumPlus: true },
  { feature: "Statistiques", starter: false, premium: true, premiumPlus: true },
  { feature: "Promotions flash", starter: false, premium: true, premiumPlus: true },
  { feature: "CoWorki Events", starter: false, premium: false, premiumPlus: true },
  { feature: "Visibilité B2B", starter: false, premium: true, premiumPlus: true },
  { feature: "Support prioritaire", starter: false, premium: false, premiumPlus: true },
];

const whyCards = [
  {
    title: "Accessible",
    text: "Des offres gratuites ou à l’usage pour réduire les freins à l’adoption.",
    icon: <Globe2 className="h-5 w-5" />,
  },
  {
    title: "Flexible",
    text: "Des réservations adaptées aux étudiants, freelances, entreprises et équipes.",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    title: "Rentable",
    text: "Un modèle qui aide les espaces à améliorer leur taux d’occupation.",
    icon: <TrendingUpIcon className="h-5 w-5" />,
  },
  {
    title: "Évolutif",
    text: "Une structure prête pour la bêta, puis pour le lancement public.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

const faqItems = [
  {
    question: "Est-ce que l’inscription est gratuite ?",
    answer:
      "Oui, l’inscription est gratuite pour les utilisateurs et les espaces partenaires pendant la phase bêta.",
  },
  {
    question: "Est-ce que CoWorki prend une commission ?",
    answer:
      "À terme, CoWorki prévoit une commission sur les réservations confirmées via la plateforme. Pendant la bêta, le modèle peut être testé progressivement.",
  },
  {
    question: "Les entreprises peuvent-elles organiser des événements ?",
    answer:
      "Oui, CoWorki permet aux entreprises de demander des espaces pour réunions, formations, workshops et événements professionnels.",
  },
  {
    question: "Les espaces doivent-ils payer dès le début ?",
    answer:
      "Non, l’offre Starter est gratuite pendant la phase pilote. Les offres Premium et Premium Plus sont prévues pour renforcer la visibilité après validation du modèle.",
  },
  {
    question: "Peut-on participer à des événements ?",
    answer:
      "Oui, la page Events permet de découvrir les prochains workshops, meetups et événements communautaires.",
  },
];

function TrendingUpIcon(props) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M14 7h7v7" />
  </svg>;
}

function Offres() {
  const [activeTab, setActiveTab] = useState("Utilisateurs");
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-[#F7FAFC] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-2xl">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link to="/" className="flex items-center gap-4">
            <img src={logo} alt="Logo CoWorki" className="h-16 w-auto sm:h-20 md:h-24" />
          </Link>

          <MobileNav />

          <DesktopNav />

          <HeaderActions />
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#ECF8FC] via-white to-[#FBEFF3] px-6 py-16 sm:px-8 lg:px-12">
        <div className="absolute left-[-80px] top-0 h-72 w-72 rounded-full bg-[#9ED8E8]/40 blur-3xl" />
        <div className="absolute right-[-80px] bottom-0 h-96 w-96 rounded-full bg-[#7A1E3A]/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-8 sm:gap-12 px-4 sm:px-6 py-12 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#9ED8E8]/70 bg-white/80 px-4 py-2 text-sm font-black text-[#0F6C8D] shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Offres B2C • B2B • Partenaires
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-[-0.04em] text-[#0F2A43] sm:text-5xl lg:text-6xl">
              Des offres flexibles pour travailler, réserver et grandir avec CoWorki
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Que vous soyez étudiant, freelance, entreprise ou espace de coworking, CoWorki vous propose une solution simple pour accéder aux meilleurs espaces, organiser vos événements et développer votre visibilité.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/offres"
                className="inline-flex items-center gap-2 rounded-3xl bg-[#0F6C8D] px-7 py-4 text-sm font-black text-white shadow-xl shadow-[#0F6C8D]/20 transition hover:bg-[#0B5873]"
              >
                Découvrir les offres
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="inline-flex items-center justify-center rounded-3xl border border-[#0F6C8D] bg-white px-7 py-4 text-sm font-black text-[#0F6C8D] transition hover:bg-[#0F6C8D]/10">
                Rejoindre la bêta
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="absolute left-4 top-8 h-36 w-36 rounded-[2.5rem] bg-white/80 shadow-2xl shadow-slate-200/50 backdrop-blur-xl" />
            <div className="absolute right-0 top-24 h-44 w-44 rounded-[2.5rem] bg-[#0F6C8D]/10 shadow-2xl shadow-[#0F6C8D]/10" />
            <div className="grid gap-5 sm:grid-cols-2">
              {heroHighlights.map((card, index) => (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 180, damping: 16 }}
                  className={`relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl ${card.accent}`}
                  style={{ zIndex: heroHighlights.length - index }}
                >
                  <div className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">{index === 0 ? "Confirmé" : index === 1 ? "Promo" : index === 2 ? "B2B" : "Partenaire"}</div>
                  <h2 className="mt-4 text-lg font-black text-slate-950">{card.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-xs font-black text-slate-700 shadow-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#0F6C8D]" />
                    Disponible maintenant
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="needs" className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#0F6C8D]">Une offre pour chaque besoin</p>
          <h2 className="mt-4 text-4xl font-black text-[#0F2A43]">Des solutions claires, instantanées et adaptées à votre profil</h2>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {needsCards.map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-2xl"
            >
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${card.accent}`}>
                {card.icon}
              </div>
              <h3 className="mt-6 text-2xl font-black text-[#0F2A43]">{card.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{card.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                {card.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0F6C8D] text-white">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                to={card.href}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0F6C8D] px-6 py-3 text-sm font-black text-white transition hover:bg-[#0B5873]"
              >
                {card.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="toggle" className="bg-[#F0F7FF] py-16 px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-[#0F6C8D]">Offres interactives</p>
              <h2 className="mt-4 text-4xl font-black text-[#0F2A43]">Choisissez votre catégorie et découvrez l’offre idéale</h2>
            </div>
            <div className="flex flex-wrap gap-3 rounded-full border border-slate-200 bg-white/90 p-2 shadow-sm">
              {Object.keys(offerTabs).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-5 py-3 text-sm font-black transition ${
                    activeTab === tab ? "bg-[#0F6C8D] text-white shadow-lg" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {offerTabs[activeTab].map((offer) => (
              <motion.div
                key={offer.name}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-[#F7FAFC] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                    {offer.badge}
                  </span>
                  <span className="text-sm font-black text-slate-500">{offer.price}</span>
                </div>
                <h3 className="mt-6 text-2xl font-black text-[#0F2A43]">{offer.name}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{offer.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  {offer.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0F6C8D] text-white">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-3xl border px-5 py-3 font-black transition ${offer.accent}`}
                >
                  {offer.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="comparaison" className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="mb-10 text-center">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#0F6C8D]">Comparaison</p>
          <h2 className="mt-4 text-4xl font-black text-[#0F2A43]">Tableau comparatif pour les partenaires</h2>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="hidden lg:grid grid-cols-4 gap-0 border-b border-slate-200 bg-[#F8FBFF] px-6 py-4 text-sm font-black text-slate-600">
            <div>Fonctionnalité</div>
            <div className="text-center">Starter</div>
            <div className="text-center">Premium</div>
            <div className="text-center">Premium Plus</div>
          </div>

          <div className="lg:hidden space-y-4 p-6">
            {['Starter', 'Premium', 'Premium Plus'].map((plan) => {
              const key = plan === 'Premium Plus' ? 'premiumPlus' : plan.toLowerCase();
              return (
                <div key={plan} className="rounded-[1.75rem] border border-slate-200 bg-[#F8FBFF] p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between gap-3 text-sm font-black text-slate-700">
                    <span>{plan}</span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.3em] text-slate-500">
                      Plan
                    </span>
                  </div>
                  <div className="space-y-3">
                    {comparisonRows.map((row) => (
                      <div key={row.feature} className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                        <span>{row.feature}</span>
                        <span className="flex items-center justify-center text-[#0F6C8D]">
                          {row[key] ? <CheckCircle2 className="h-5 w-5" /> : '—'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden lg:block">
            {comparisonRows.map((row) => (
              <div key={row.feature} className="grid grid-cols-4 gap-0 border-b border-slate-200 px-6 py-4 text-sm text-slate-700 last:border-none">
                <div>{row.feature}</div>
                <div className="flex items-center justify-center">{row.starter ? <CheckCircle2 className="h-5 w-5 text-[#0F6C8D]" /> : '—'}</div>
                <div className="flex items-center justify-center">{row.premium ? <CheckCircle2 className="h-5 w-5 text-[#0F6C8D]" /> : '—'}</div>
                <div className="flex items-center justify-center">{row.premiumPlus ? <CheckCircle2 className="h-5 w-5 text-[#0F6C8D]" /> : '—'}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pourquoi" className="bg-[#F0F7FF] py-16 px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#0F6C8D]">Pourquoi ces offres sont adaptées à la Tunisie ?</p>
            <h2 className="mt-4 text-4xl font-black text-[#0F2A43]">Une proposition locale, flexible et motivante</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-4">
            {whyCards.map((card) => (
              <motion.div
                key={card.title}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[#0F6C8D] text-white">
                  {card.icon}
                </div>
                <h3 className="text-xl font-black text-[#0F2A43]">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="beta" className="relative overflow-hidden bg-gradient-to-br from-[#0F2A43] via-[#1A5273] to-[#7A1E3A] px-6 py-20 sm:px-8 lg:px-12">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7A1E3A]/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl text-white">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#A4D7FF]">Offre spéciale bêta privée</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
              Offre spéciale bêta privée
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#E3F3FF]">
              Pendant la phase pilote, les espaces partenaires peuvent rejoindre CoWorki gratuitement et bénéficier d’une visibilité anticipée auprès des premiers utilisateurs.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {[
              "Référencement gratuit",
              "Accompagnement à la création de la fiche",
              "Participation possible aux premiers CoWorki Events",
            ].map((benefit) => (
              <div key={benefit} className="rounded-[2rem] border border-white/20 bg-white/10 p-6 text-sm backdrop-blur">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/15 text-white">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="text-base font-black text-white">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <button className="inline-flex items-center gap-2 rounded-3xl bg-white px-8 py-4 text-sm font-black text-[#0F2A43] shadow-xl shadow-[#000000]/10 transition hover:bg-slate-100">
              Devenir espace pilote
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="mb-10 text-center">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#0F6C8D]">FAQ</p>
          <h2 className="mt-4 text-4xl font-black text-[#0F2A43]">Toutes les réponses sur nos offres</h2>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <motion.button
                key={item.question}
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : index)}
                initial={false}
                className="flex w-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-left text-base font-black text-[#0F2A43]">{item.question}</span>
                  <ChevronDown className={`h-5 w-5 text-[#0F6C8D] transition ${isOpen ? "rotate-180" : ""}`} />
                </div>
                {isOpen && <p className="mt-4 text-sm leading-7 text-slate-600">{item.answer}</p>}
              </motion.button>
            );
          })}
        </div>
      </section>

      <section className="bg-[#FFFFFF] px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-[#F8FBFF] p-10 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-[#0F6C8D]">Prêt à commencer</p>
              <h2 className="mt-4 text-4xl font-black text-[#0F2A43]">Choisissez l’offre qui correspond à votre besoin</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                Commencez gratuitement, testez CoWorki et participez à la construction du futur réseau de coworking en Tunisie.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/offres"
                className="inline-flex items-center gap-2 rounded-3xl bg-[#0F6C8D] px-7 py-4 text-sm font-black text-white shadow-xl shadow-[#0F6C8D]/20 transition hover:bg-[#0B5873]"
              >
                Rejoindre la bêta
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/spaces"
                className="inline-flex items-center gap-2 rounded-3xl border border-[#0F6C8D] bg-white px-7 py-4 text-sm font-black text-[#0F6C8D] transition hover:bg-[#0F6C8D]/10"
              >
                Explorer les espaces
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="inline-flex items-center gap-2 rounded-3xl bg-[#7A1E3A] px-7 py-4 text-sm font-black text-white shadow-xl shadow-[#7A1E3A]/20 transition hover:bg-[#64172F]">
                Devenir partenaire
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-600">
          © 2026 CoWorki. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}

export default Offres;
