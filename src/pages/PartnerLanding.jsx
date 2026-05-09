import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Eye,
  Leaf,
  MessageSquare,
  ShieldCheck,
  Star,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import logo from "../assets/logo-coworki.png";
import ImageUploadPanel from "../components/ImageUploadPanel";
import { PageShell, StatusBadge } from "../components/SiteLayout";

const heroImage =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80";

const challenges = [
  ["Manque de visibilité digitale", "Votre espace est bon, mais difficile à trouver au bon moment.", <Eye className="h-6 w-6" />],
  ["Réservations encore manuelles", "Les demandes arrivent par téléphone, WhatsApp ou messages dispersés.", <MessageSquare className="h-6 w-6" />],
  ["Taux d’occupation variable", "Certains créneaux restent vides alors qu’ils pourraient être valorisés.", <BarChart3 className="h-6 w-6" />],
  ["Difficulté à attirer les entreprises", "Les besoins B2B demandent une présentation claire et professionnelle.", <BriefcaseBusiness className="h-6 w-6" />],
];

const benefits = [
  ["Améliorer votre visibilité", "Votre espace apparaît sur une plateforme dédiée aux étudiants, freelances, télétravailleurs et entreprises.", <Eye className="h-6 w-6" />],
  ["Centraliser vos réservations", "Les utilisateurs consultent vos disponibilités, choisissent un créneau et réservent plus facilement.", <CalendarCheck className="h-6 w-6" />],
  ["Optimiser votre taux d’occupation", "CoWorki vous aide à mieux remplir vos créneaux creux grâce aux promotions flash.", <TrendingUp className="h-6 w-6" />],
  ["Attirer des clients B2B", "Les entreprises peuvent réserver vos salles pour réunions, formations, séminaires et événements.", <BriefcaseBusiness className="h-6 w-6" />],
  ["Valoriser votre image", "Avis vérifiés, photos, services, badges qualité et Eco-Visibility Boost renforcent votre crédibilité.", <ShieldCheck className="h-6 w-6" />],
];

const steps = [
  ["Inscription partenaire", "Vous créez votre compte partenaire en quelques minutes."],
  ["Ajout de votre espace", "Vous ajoutez les informations de votre espace : photos, adresse, tarifs, horaires et services."],
  ["Validation par CoWorki", "Notre équipe vérifie les informations afin de garantir la qualité et la fiabilité des espaces référencés."],
  ["Réservations et suivi", "Votre espace devient visible sur CoWorki et vous suivez vos réservations depuis votre tableau de bord."],
];

const partnerEvents = [
  ["Freelance Meetup", "18 juin 2026", "Networking", "45 participants", "Friends Lab"],
  ["Startup Pitch Night", "29 juin 2026", "Startup", "80 participants", "The Dot"],
  ["Workshop IA", "22 juin 2026", "Formation", "35 participants", "Cogite"],
];

const pricingPlans = [
  {
    name: "Gratuit",
    price: "0 TND",
    features: ["Référencement de base", "Présentation de l’espace", "Réception des réservations", "Commission sur réservation"],
  },
  {
    name: "Premium",
    price: "49 TND",
    badge: "Populaire",
    features: ["Visibilité renforcée", "Meilleur classement dans les résultats", "Statistiques avancées", "Promotions flash", "Mise en avant dans certaines pages"],
  },
  {
    name: "Premium+",
    price: "99 TND",
    features: ["Mise en avant prioritaire", "Accès aux demandes B2B", "Dashboard avancé", "Support prioritaire", "Participation recommandée aux CoWorki Events", "Badge partenaire premium"],
  },
];

const testimonials = [
  ["Friends Lab Coworking Space", "Sousse", "CoWorki nous aide à mieux valoriser nos créneaux disponibles et à toucher une clientèle plus large."],
  ["Cogite Coworking Space", "Tunis", "La plateforme simplifie la visibilité, les réservations et la relation avec les utilisateurs."],
  ["Coworky Sousse", "Sousse", "Les événements et les demandes B2B représentent une vraie opportunité pour dynamiser notre espace."],
];

const faqs = [
  ["Est-ce que l’inscription partenaire est gratuite ?", "Oui, le référencement de base est gratuit. CoWorki applique une commission sur les réservations effectuées via la plateforme."],
  ["Comment CoWorki gagne de l’argent ?", "Grâce à une commission sur les réservations, aux abonnements Premium et aux services B2B/événementiels."],
  ["Est-ce que je peux gérer mes disponibilités ?", "Oui, le partenaire peut mettre à jour ses disponibilités depuis son tableau de bord."],
  ["Est-ce que CoWorki peut m’aider à attirer des entreprises ?", "Oui, la plateforme propose une logique B2B permettant aux entreprises de réserver des salles pour réunions, formations, séminaires ou événements."],
  ["Est-ce que je peux accepter ou refuser une demande B2B ?", "Oui, le gérant garde le contrôle sur les demandes spécifiques."],
  ["Est-ce que je peux lancer des promotions ?", "Oui, CoWorki peut suggérer des promotions flash selon le taux d’occupation, mais le gérant reste libre de les accepter ou non."],
];

function PartnerLanding() {
  const [formSent, setFormSent] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [promoStatus, setPromoStatus] = useState("pending");
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSent(true);
  };

  return (
    <PageShell active="/partenaires">
      <HeroSection />

      <section className="scroll-mt-28 bg-white px-6 py-20 sm:py-24">
        <SectionIntro
          eyebrow="Constat terrain"
          title="Les défis des espaces de coworking aujourd’hui"
          text="De nombreux espaces disposent d’une offre de qualité, mais restent peu visibles en ligne et utilisent encore des canaux dispersés comme le téléphone, WhatsApp ou les réseaux sociaux."
        />
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          {challenges.map(([title, text, icon], index) => (
            <AnimatedCard key={title} delay={index * 0.06}>
              <IconBubble>{icon}</IconBubble>
              <h3 className="mt-5 text-xl font-black text-[#0F2A43]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </AnimatedCard>
          ))}
        </div>
      </section>

      <section id="avantages" className="scroll-mt-28 bg-[#F7FAFC] px-6 py-20 sm:py-24">
        <SectionIntro
          eyebrow="Solution CoWorki"
          title="CoWorki transforme votre espace en une offre visible, réservée et optimisée"
        />
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 lg:grid-cols-5">
          {benefits.map(([title, text, icon], index) => (
            <AnimatedCard key={title} delay={index * 0.06} className="bg-white">
              <IconBubble tone={index === 3 ? "red" : "teal"}>{icon}</IconBubble>
              <h3 className="mt-5 text-lg font-black text-[#0F2A43]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </AnimatedCard>
          ))}
        </div>
      </section>

      <section id="fonctionnement" className="scroll-mt-28 bg-white px-6 py-20 sm:py-24">
        <SectionIntro eyebrow="Parcours partenaire" title="Comment ça marche ?" />
        <div className="mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-4">
          {steps.map(([title, text], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="relative rounded-[2rem] border border-slate-100 bg-[#F7FAFC] p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F2A43] text-sm font-black text-white">
                0{index + 1}
              </span>
              <h3 className="mt-5 text-xl font-black text-[#0F2A43]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <DashboardPreview promoStatus={promoStatus} setPromoStatus={setPromoStatus} />
      <EventsForPartners />
      <EcoBoostSection />
      <PricingSection selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
      <Testimonials />
      <PartnerForm formSent={formSent} handleSubmit={handleSubmit} />
      <FaqSection openFaq={openFaq} setOpenFaq={setOpenFaq} />
      <FinalCta />
    </PageShell>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#ECF8FC] via-white to-[#FBEFF3]">
      <div className="absolute -left-28 top-6 h-80 w-80 rounded-full bg-[#9ED8E8]/45 blur-3xl" />
      <div className="absolute right-[-120px] bottom-[-80px] h-96 w-96 rounded-full bg-[#7A1E3A]/18 blur-3xl" />
      <img src={logo} alt="" aria-hidden="true" className="pointer-events-none absolute -right-20 top-10 hidden w-[520px] opacity-[0.05] blur-sm lg:block" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_0.9fr] lg:py-20">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <p className="inline-flex rounded-full border border-[#9ED8E8]/70 bg-white/80 px-4 py-2 text-sm font-black text-[#0F6C8D] shadow-sm backdrop-blur">
            Programme partenaires CoWorki
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-[-0.04em] text-[#0F2A43] md:text-7xl">
            Devenez partenaire CoWorki
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Augmentez la visibilité de votre espace, optimisez vos réservations et attirez de nouveaux clients grâce à une plateforme pensée pour le coworking en Tunisie.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signup?type=partner" className="inline-flex items-center gap-2 rounded-full bg-[#7A1E3A] px-7 py-4 text-sm font-black text-white shadow-xl shadow-[#7A1E3A]/25 transition hover:-translate-y-1 hover:bg-[#64172F]">
              Référencer mon espace <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#avantages" className="rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-[#0F2A43] shadow-sm transition hover:-translate-y-1 hover:border-[#0F6C8D] hover:text-[#0F6C8D]">
              Découvrir les avantages
            </a>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              ["+ de visibilité", <Eye className="h-5 w-5" />],
              ["Réservations centralisées", <CalendarCheck className="h-5 w-5" />],
              ["Accès clients B2B", <BriefcaseBusiness className="h-5 w-5" />],
            ].map(([label, icon]) => (
              <div key={label} className="rounded-3xl bg-white/85 p-4 shadow-sm ring-1 ring-white">
                <span className="text-[#0F6C8D]">{icon}</span>
                <p className="mt-2 text-sm font-black text-[#0F2A43]">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
          <div className="overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-2xl shadow-slate-300/70">
            <img src={heroImage} alt="Espace de coworking moderne" className="h-[430px] w-full rounded-[2rem] object-cover" />
          </div>
          <div className="absolute -bottom-6 left-6 rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-300/70">
            <div className="flex items-center gap-3">
              <img src={logo} alt="CoWorki" className="h-12 w-12 rounded-2xl object-contain" />
              <div>
                <p className="font-black text-[#0F2A43]">Espace vérifié</p>
                <p className="text-sm font-bold text-slate-500">Photos, services, tarifs</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DashboardPreview({ promoStatus, setPromoStatus }) {
  const stats = [
    ["Réservations ce mois", "124", <CalendarCheck className="h-5 w-5" />],
    ["Revenus générés", "3 850 TND", <Wallet className="h-5 w-5" />],
    ["Taux d’occupation", "68 %", <TrendingUp className="h-5 w-5" />],
    ["Note moyenne", "4.8/5", <Star className="h-5 w-5" />],
    ["Demandes B2B", "9", <BriefcaseBusiness className="h-5 w-5" />],
  ];

  return (
    <section id="dashboard" className="scroll-mt-28 bg-[#0F2A43] px-6 py-20 text-white sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#9ED8E8]">Dashboard partenaire</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] md:text-5xl">
            Pilotez votre activité depuis un tableau de bord simple et intelligent
          </h2>
          <p className="mt-5 leading-8 text-slate-300">
            Suivez vos réservations, vos revenus, vos demandes B2B et les suggestions CoWorki pour remplir vos créneaux faibles.
          </p>
          <Link to="/dashboard/partner" className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-black text-[#0F2A43] transition hover:-translate-y-1">
            Voir le dashboard complet
          </Link>
        </div>

        <div className="rounded-[2.5rem] bg-white p-5 text-[#0F2A43] shadow-2xl shadow-black/20">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map(([label, value, icon]) => (
              <div key={label} className="rounded-3xl bg-[#F7FAFC] p-5">
                <span className="text-[#0F6C8D]">{icon}</span>
                <p className="mt-4 text-sm font-black text-slate-500">{label}</p>
                <p className="mt-1 text-2xl font-black">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-3xl border border-[#F8D7E1] bg-[#FBEFF3] p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 font-black text-[#7A1E3A]"><Zap className="h-5 w-5" /> Suggestion CoWorki</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Votre taux d’occupation est faible vendredi après-midi. Lancez une promotion flash de -20 %.
                </p>
                {promoStatus !== "pending" && (
                  <p className="mt-3 text-sm font-black text-[#0F6C8D]">
                    Statut : {promoStatus === "accepted" ? "promotion acceptée" : promoStatus === "edited" ? "modification demandée" : "suggestion ignorée"}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setPromoStatus("accepted")} className="rounded-full bg-[#7A1E3A] px-4 py-2 text-xs font-black text-white">Accepter</button>
                <button onClick={() => setPromoStatus("edited")} className="rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F2A43]">Modifier</button>
                <button onClick={() => setPromoStatus("ignored")} className="rounded-full bg-white px-4 py-2 text-xs font-black text-slate-500">Ignorer</button>
              </div>
            </div>
          </div>
          <div className="mt-5 overflow-hidden rounded-3xl border border-slate-100">
            {["Startup Nova - Séminaire - 900 TND", "Lina Ferchichi - Poste individuel - 30 TND", "Ahmed Ben Salem - Salle réunion - 120 TND"].map((item) => (
              <div key={item} className="flex items-center justify-between gap-4 border-b border-slate-100 p-4 last:border-b-0">
                <span className="text-sm font-bold text-slate-600">{item}</span>
                <StatusBadge tone="amber">En attente</StatusBadge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EventsForPartners() {
  return (
    <section id="events" className="scroll-mt-28 bg-white px-6 py-20 sm:py-24">
      <SectionIntro
        eyebrow="CoWorki Events"
        title="Animez votre espace avec CoWorki Events"
        text="Les événements organisés via CoWorki permettent d’attirer de nouveaux visiteurs, de renforcer la notoriété de votre espace et de créer des opportunités de revenus supplémentaires."
      />
      <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-3">
        {partnerEvents.map(([title, date, type, participants, host], index) => (
          <AnimatedCard key={title} delay={index * 0.08}>
            <StatusBadge tone={index === 1 ? "red" : "teal"}>{type}</StatusBadge>
            <h3 className="mt-5 text-2xl font-black text-[#0F2A43]">{title}</h3>
            <div className="mt-5 space-y-2 text-sm font-bold text-slate-600">
              <p>{date}</p>
              <p>{participants} estimés</p>
              <p>Espace hôte : {host}</p>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
}

function EcoBoostSection() {
  return (
    <section id="eco-boost" className="scroll-mt-28 bg-[#F7FAFC] px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#0F6C8D]">Eco-Visibility Boost</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] text-[#0F2A43] md:text-5xl">
            Valorisez vos engagements responsables
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            Les espaces qui adoptent des pratiques responsables peuvent bénéficier d’une meilleure visibilité grâce au système Eco-Visibility Boost.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-500">
            CoWorki ne certifie pas officiellement les espaces. La plateforme s’inspire de standards comme EDGE, WELL et ISO 14001 pour encourager les bonnes pratiques.
          </p>
        </div>
        <div className="rounded-[2.5rem] bg-white p-7 shadow-sm ring-1 ring-slate-100">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700">
            <Leaf className="h-8 w-8" />
          </div>
          <div className="flex flex-wrap gap-3">
            {["Gestion de l’énergie", "Réduction des déchets", "Confort et bien-être", "Accessibilité", "Environnement sain"].map((item) => (
              <span key={item} className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700">{item}</span>
            ))}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["EDGE", "WELL", "ISO 14001"].map((standard) => (
              <div key={standard} className="rounded-2xl border border-slate-100 bg-[#F7FAFC] p-4 text-center text-lg font-black text-[#0F2A43]">
                {standard}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection({ selectedPlan, setSelectedPlan }) {
  return (
    <section id="offres" className="scroll-mt-28 bg-white px-6 py-20 sm:py-24">
      <SectionIntro eyebrow="Offres partenaires" title="Choisissez le niveau de visibilité adapté à votre espace" />
      {selectedPlan && (
        <p className="mx-auto mt-6 max-w-3xl rounded-3xl bg-[#ECF8FC] px-5 py-4 text-center text-sm font-black text-[#0F6C8D]">
          Offre sélectionnée : {selectedPlan}. Cette action est simulée pour la démonstration.
        </p>
      )}
      <div className="mx-auto mt-12 grid max-w-7xl gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className={`relative rounded-[2.3rem] p-7 shadow-sm ring-1 ${plan.badge ? "bg-[#0F2A43] text-white ring-[#0F2A43]" : "bg-white text-[#0F2A43] ring-slate-100"}`}
          >
            {plan.badge && <span className="absolute right-6 top-6 rounded-full bg-[#7A1E3A] px-4 py-2 text-xs font-black text-white">{plan.badge}</span>}
            <h3 className="text-2xl font-black">{plan.name}</h3>
            <p className={`mt-4 text-5xl font-black ${plan.badge ? "text-white" : "text-[#7A1E3A]"}`}>{plan.price}</p>
            <p className={plan.badge ? "mt-1 text-sm font-bold text-slate-300" : "mt-1 text-sm font-bold text-slate-500"}>/ mois</p>
            <div className="mt-7 space-y-3">
              {plan.features.map((feature) => (
                <p key={feature} className="flex gap-3 text-sm font-bold">
                  <CheckCircle2 className={`h-5 w-5 shrink-0 ${plan.badge ? "text-[#9ED8E8]" : "text-[#0F6C8D]"}`} />
                  {feature}
                </p>
              ))}
            </div>
            <button
              onClick={() => setSelectedPlan(plan.name)}
              className={`mt-8 w-full rounded-2xl px-5 py-4 text-sm font-black transition hover:-translate-y-1 ${plan.badge ? "bg-white text-[#0F2A43]" : "bg-[#7A1E3A] text-white hover:bg-[#64172F]"}`}
            >
              Choisir cette offre
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-[#F7FAFC] px-6 py-20 sm:py-24">
      <SectionIntro eyebrow="Partenaires pilotes" title="Des espaces qui pourraient grandir avec CoWorki" />
      <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-3">
        {testimonials.map(([name, city, quote]) => (
          <div key={name} className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-slate-100">
            <div className="mb-5 flex gap-1 text-[#D9A441]">
              {[1, 2, 3, 4, 5].map((item) => <Star key={item} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="leading-8 text-slate-600">“{quote}”</p>
            <p className="mt-6 font-black text-[#0F2A43]">{name}</p>
            <p className="text-sm font-bold text-slate-500">{city}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PartnerForm({ formSent, handleSubmit }) {
  return (
    <section id="formulaire" className="scroll-mt-28 bg-white px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#7A1E3A]">Référencer mon espace</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] text-[#0F2A43] md:text-5xl">
            Présentez votre espace à l’équipe CoWorki
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            Remplissez ce formulaire. La soumission est simulée côté front-end pour présenter le parcours partenaire sans backend.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="rounded-[2.5rem] bg-[#F7FAFC] p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
          {formSent ? (
            <div className="rounded-[2rem] bg-emerald-50 p-8 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
              <h3 className="mt-4 text-2xl font-black text-[#0F2A43]">Votre demande partenaire a été envoyée avec succès.</h3>
              <p className="mt-3 text-slate-600">L’équipe CoWorki vous contactera prochainement.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                {["Nom du responsable", "Nom de l’espace", "Ville", "Adresse", "Email", "Téléphone", "Capacité"].map((label) => (
                  <label key={label} className="grid gap-2 text-sm font-black text-[#0F2A43]">
                    {label}
                    <input required={label !== "Téléphone"} type={label === "Email" ? "email" : "text"} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none transition focus:border-[#0F6C8D]" />
                  </label>
                ))}
              </div>
              <CheckboxGroup title="Types d’espaces disponibles" items={["Postes individuels", "Bureaux privés", "Salles de réunion", "Espace événementiel"]} />
              <CheckboxGroup title="Services disponibles" items={["Wi-Fi", "Café", "Imprimante", "Parking", "Climatisation", "Projecteur", "Terrasse"]} />
              <ImageUploadPanel className="bg-white" />
              <label className="mt-5 grid gap-2 text-sm font-black text-[#0F2A43]">
                Message complémentaire
                <textarea rows="4" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none transition focus:border-[#0F6C8D]" />
              </label>
              <button className="mt-6 w-full rounded-2xl bg-[#7A1E3A] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#64172F]">
                Envoyer ma demande
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function FaqSection({ openFaq, setOpenFaq }) {
  return (
    <section id="faq" className="scroll-mt-28 bg-[#F7FAFC] px-6 py-20 sm:py-24">
      <SectionIntro eyebrow="FAQ partenaires" title="Les réponses aux questions fréquentes" />
      <div className="mx-auto mt-10 max-w-4xl space-y-3">
        {faqs.map(([question, answer], index) => (
          <div key={question} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-4 text-left font-black text-[#0F2A43]">
              {question}
              <ChevronDown className={`h-5 w-5 shrink-0 transition ${openFaq === index ? "rotate-180" : ""}`} />
            </button>
            {openFaq === index && <p className="mt-4 leading-7 text-slate-600">{answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-white px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-gradient-to-br from-[#0F2A43] to-[#0F6C8D] p-8 text-center text-white shadow-2xl shadow-slate-300/70 sm:p-12">
        <h2 className="text-4xl font-black tracking-[-0.03em] md:text-5xl">Prêt à faire grandir votre espace avec CoWorki ?</h2>
        <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-200">
          Rejoignez une plateforme conçue pour moderniser le coworking en Tunisie, attirer de nouveaux utilisateurs et développer vos réservations.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/signup?type=partner" className="rounded-full bg-white px-7 py-4 text-sm font-black text-[#0F2A43] transition hover:-translate-y-1">Référencer mon espace</Link>
          <a href="#offres" className="rounded-full border border-white/30 px-7 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-white/10">Voir les offres Premium</a>
        </div>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-black uppercase tracking-[0.3em] text-[#0F6C8D]">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] text-[#0F2A43] md:text-5xl">{title}</h2>
      {text && <p className="mt-5 leading-8 text-slate-600">{text}</p>}
    </div>
  );
}

function AnimatedCard({ children, delay = 0, className = "bg-white" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      whileHover={{ y: -6 }}
      className={`rounded-[2rem] p-6 shadow-sm ring-1 ring-slate-100 transition ${className}`}
    >
      {children}
    </motion.div>
  );
}

function IconBubble({ children, tone = "teal" }) {
  const style = tone === "red" ? "bg-[#FBEFF3] text-[#7A1E3A]" : "bg-[#ECF8FC] text-[#0F6C8D]";
  return <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${style}`}>{children}</div>;
}

function CheckboxGroup({ title, items }) {
  return (
    <div className="mt-5">
      <p className="mb-3 text-sm font-black text-[#0F2A43]">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <label key={item} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 ring-1 ring-slate-100">
            <input type="checkbox" className="accent-[#0F6C8D]" />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}

export default PartnerLanding;
