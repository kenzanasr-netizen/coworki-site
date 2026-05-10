import {
  BarChart3,
  CalendarDays,
  CircleHelp,
  ClipboardCheck,
  Gauge,
  Handshake,
  Leaf,
  ListChecks,
  Sparkles,
} from "lucide-react";

export const partnerMenuLinks = [
  {
    label: "Devenir partenaire",
    path: "/partenaires",
    description: "Présentation générale du programme partenaire.",
    Icon: Handshake,
  },
  {
    label: "Avantages partenaires",
    path: "/partenaires#avantages",
    description: "Visibilité, réservations, B2B et optimisation.",
    Icon: Sparkles,
  },
  {
    label: "Comment ça marche ?",
    path: "/partenaires#fonctionnement",
    description: "Inscription, ajout de l’espace, validation et suivi.",
    Icon: ListChecks,
  },
  {
    label: "Aperçu du tableau de bord",
    path: "/partenaires#dashboard",
    description: "Réservations, revenus, taux d’occupation et avis.",
    Icon: Gauge,
  },
  {
    label: "Événements CoWorki",
    path: "/partenaires#events",
    description: "Animez votre espace avec des événements professionnels.",
    Icon: CalendarDays,
  },
  {
    label: "Eco-Visibility Boost",
    path: "/partenaires#eco-boost",
    description: "Valorisez vos engagements responsables.",
    Icon: Leaf,
  },
  {
    label: "Offres Premium",
    path: "/partenaires#offres",
    description: "Gratuit, Premium et Premium+.",
    Icon: BarChart3,
  },
  {
    label: "Référencer mon espace",
    path: "/partenaires#formulaire",
    description: "Envoyer une demande pour rejoindre CoWorki.",
    Icon: ClipboardCheck,
  },
  {
    label: "FAQ partenaires",
    path: "/partenaires#faq",
    description: "Réponses aux questions fréquentes.",
    Icon: CircleHelp,
  },
];
