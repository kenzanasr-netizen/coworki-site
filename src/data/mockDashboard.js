export const adminStats = [
  ["Utilisateurs inscrits", "1 240"],
  ["Espaces partenaires", "38"],
  ["Réservations", "2 860"],
  ["Chiffre d’affaires", "71 640 TND"],
];

export const adminSections = {
  users: {
    title: "Utilisateurs",
    eyebrow: "Back-office admin",
    rows: [
      ["Lina Ferchichi", "lina@coworki.tn", "Utilisateur", "Actif"],
      ["Yassine Amri", "yassine@coworki.tn", "Freelance", "Actif"],
      ["Nour Haddad", "nour@coworki.tn", "Entrepreneure", "En attente"],
    ],
    actions: ["Suspendre", "Voir détail"],
  },
  spaces: {
    title: "Espaces à valider",
    eyebrow: "Validation espaces",
    rows: [
      ["WorkZone Coworking", "Tunis", "M. Trabelsi", "En attente"],
      ["El Space", "Ariana", "S. Gharbi", "En attente"],
      ["Flat6Labs Tunis", "Tunis", "Flat6Labs", "Validé"],
    ],
    actions: ["Valider", "Refuser"],
  },
  partners: {
    title: "Partenaires",
    eyebrow: "Espaces partenaires",
    rows: [
      ["Friends Lab", "Sousse", "Premium", "Actif"],
      ["Cogite", "Tunis", "Premium+", "Actif"],
      ["Coworky Sousse", "Sousse", "Gratuit", "Actif"],
    ],
    actions: ["Voir détail", "Suspendre"],
  },
  "pending-partners": {
    title: "Partenaires en attente",
    eyebrow: "Validation partenaires",
    rows: [
      ["WorkZone Coworking", "Tunis", "Inscrit via Google", "En attente"],
      ["El Space", "Ariana", "Formulaire complet", "En attente"],
      ["Hub Digital Sfax", "Sfax", "Photos à vérifier", "À vérifier"],
    ],
    actions: ["Valider", "Refuser"],
  },
  companies: {
    title: "Entreprises",
    eyebrow: "Comptes B2B",
    rows: [
      ["Startup Nova", "Tech", "12 réservations", "Actif"],
      ["EduLab", "Formation", "3 demandes B2B", "Actif"],
      ["MedTech TN", "Santé", "1 séminaire", "En attente"],
    ],
    actions: ["Voir détail", "Suspendre"],
  },
  bookings: {
    title: "Réservations",
    eyebrow: "Suivi plateforme",
    rows: [
      ["Lina Ferchichi", "Friends Lab", "12 juin 2026", "Confirmée"],
      ["Startup Nova", "The Dot", "20 juin 2026", "En attente"],
      ["Ahmed Ben Salem", "Cogite", "14 juin 2026", "Confirmée"],
    ],
    actions: ["Voir détail"],
  },
  transactions: {
    title: "Transactions",
    eyebrow: "Paiements simulés",
    rows: [
      ["TX-2048", "Lina Ferchichi", "32 TND", "Payée"],
      ["TX-2049", "Startup Nova", "900 TND", "En attente"],
      ["TX-2050", "Cogite Premium", "49 TND", "Payée"],
    ],
    actions: ["Voir détail"],
  },
  reviews: {
    title: "Avis / signalements",
    eyebrow: "Modération",
    rows: [
      ["Cogite", "Avis signalé", "Priorité moyenne", "À vérifier"],
      ["Friends Lab", "Avis positif", "4.9/5", "Publié"],
      ["The Dot", "Signalement photo", "Priorité faible", "À vérifier"],
    ],
    actions: ["Valider", "Refuser"],
  },
  events: {
    title: "Événements",
    eyebrow: "Événements CoWorki",
    rows: [
      ["Freelance Meetup Tunis", "15 juin 2026", "The Dot", "Publié"],
      ["Workshop IA", "22 juin 2026", "Cogite", "En préparation"],
      ["Startup Pitch Night", "29 juin 2026", "Startup Haus", "Publié"],
    ],
    actions: ["Voir détail", "Suspendre"],
  },
  stats: {
    title: "Statistiques",
    eyebrow: "Vue globale",
    rows: [
      ["Taux conversion", "8.4 %", "Ce mois", "+1.2 %"],
      ["Occupation moyenne", "68 %", "Espaces actifs", "+6 %"],
      ["Demandes B2B", "42", "Trimestre", "+18 %"],
    ],
    actions: ["Voir détail"],
  },
  notifications: {
    title: "Notifications",
    eyebrow: "Alertes administrateur",
    rows: [
      ["Nouveau partenaire", "WorkZone Coworking", "Validation requise", "En attente"],
      ["Nouvelle réservation", "Friends Lab", "30 TND", "Confirmée"],
      ["Entreprise inscrite", "Startup Nova", "Compte B2B", "Actif"],
    ],
    actions: ["Marquer comme lu", "Voir détail"],
  },
};

export const partnerSections = {
  spaces: {
    title: "Mes espaces",
    eyebrow: "Gestion partenaire",
    rows: [
      ["Friends Lab Coworking Space", "Sousse", "Publié", "4.9/5"],
      ["Salle Meeting Lab", "Sousse", "Publié", "12 places"],
      ["Event Corner", "Sousse", "Brouillon", "40 places"],
    ],
    actions: ["Modifier", "Voir détail"],
  },
  bookings: {
    title: "Réservations",
    eyebrow: "Planning partenaire",
    rows: [
      ["Lina Ferchichi", "Poste individuel", "12 juin 2026", "Confirmée"],
      ["Ahmed Ben Salem", "Salle réunion", "14 juin 2026", "En attente"],
      ["Startup Nova", "Événement B2B", "20 juin 2026", "En attente"],
    ],
    actions: ["Valider", "Refuser"],
  },
  capacity: {
    title: "Capacité",
    eyebrow: "Disponibilités partenaire",
    rows: [
      ["Aujourd’hui", "18 places restantes", "Capacité 25", "Active"],
      ["Demain", "22 places restantes", "Capacité 25", "Active"],
      ["Vendredi", "Faible occupation prévue", "Promotion suggérée", "Suggérée"],
    ],
    actions: ["Modifier", "Créer promotion"],
  },
  "b2b-requests": {
    title: "Demandes B2B",
    eyebrow: "Opportunités entreprises",
    rows: [
      ["Startup Nova", "Formation équipe", "35 participants", "900 TND"],
      ["EduLab", "Workshop IA", "22 participants", "550 TND"],
      ["MedTech TN", "Séminaire", "45 participants", "1 200 TND"],
    ],
    actions: ["Valider", "Refuser"],
  },
  revenue: {
    title: "Revenus",
    eyebrow: "Suivi financier",
    rows: [
      ["Réservations individuelles", "1 240 TND", "Ce mois", "+12 %"],
      ["Salles réunion", "1 710 TND", "Ce mois", "+8 %"],
      ["Événements B2B", "900 TND", "Ce mois", "Nouveau"],
    ],
    actions: ["Voir détail"],
  },
  promotions: {
    title: "Promotions flash",
    eyebrow: "Optimisation occupation",
    rows: [
      ["Vendredi après-midi", "-20 %", "Suggérée", "Occupation faible"],
      ["Pack étudiant", "-15 %", "Active", "Juin 2026"],
      ["Salle réunion matin", "-10 %", "Terminée", "Mai 2026"],
    ],
    actions: ["Accepter", "Modifier"],
  },
  reviews: {
    title: "Avis clients",
    eyebrow: "Réputation partenaire",
    rows: [
      ["Lina Ferchichi", "5/5", "Très calme et pratique", "Publié"],
      ["Ahmed Ben Salem", "4/5", "Salle réunion bien équipée", "Publié"],
      ["Nour Haddad", "Avis en attente", "À modérer", "À vérifier"],
    ],
    actions: ["Répondre", "Voir détail"],
  },
  notifications: {
    title: "Notifications",
    eyebrow: "Alertes partenaire",
    rows: [
      ["Nouvelle réservation", "Lina Ferchichi", "Poste individuel", "En attente"],
      ["Compte partenaire", "Validation admin", "Votre compte est en attente", "En attente"],
      ["Promotion flash", "Vendredi après-midi", "-20 % recommandé", "Suggérée"],
    ],
    actions: ["Marquer comme lu", "Voir détail"],
  },
  profile: {
    title: "Profil partenaire",
    eyebrow: "Informations partenaire",
    rows: [
      ["Nom espace", "Friends Lab", "Sousse", "Actif"],
      ["Contact", "partner@coworki.tn", "+216", "À compléter"],
      ["Statut", "Validation admin", "Compte partenaire", "En attente"],
    ],
    actions: ["Modifier", "Voir détail"],
  },
  premium: {
    title: "Offres Premium",
    eyebrow: "Visibilité partenaire",
    rows: [
      ["Gratuit", "0 TND/mois", "Référencement de base", "Actif"],
      ["Premium", "49 TND/mois", "Visibilité renforcée", "Recommandé"],
      ["Premium+", "99 TND/mois", "B2B + dashboard avancé", "Prioritaire"],
    ],
    actions: ["Choisir", "Comparer"],
  },
};
