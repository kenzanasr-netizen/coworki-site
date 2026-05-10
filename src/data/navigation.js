export const publicNavLinks = [
  { label: "Accueil", path: "/" },
  {
    label: "Espaces",
    path: "/spaces",
    items: [
      { label: "Explorer les espaces", path: "/spaces", description: "Rechercher, filtrer et comparer les espaces." },
      { label: "Postes individuels", path: "/spaces?type=poste", description: "Trouver un poste flexible pour travailler." },
      { label: "Salles de réunion", path: "/spaces?type=salle", description: "Réserver une salle équipée." },
    ],
  },
  {
    label: "Événements",
    path: "/events",
    items: [
      { label: "Tous les événements", path: "/events", description: "Networking, ateliers et formations." },
      { label: "Networking", path: "/events?category=Networking", description: "Rencontrer les bons profils." },
      { label: "Organiser un événement", path: "/events#organiser", description: "Dynamiser un espace partenaire." },
    ],
  },
  { label: "Partenaires", path: "/partenaires", partnerMenu: true },
  {
    label: "Entreprises",
    path: "/business",
    items: [
      { label: "Solutions B2B", path: "/business", description: "Réunions, formations et événements." },
      { label: "Créer un compte entreprise", path: "/signup?type=business", description: "Accéder au parcours B2B." },
      { label: "Demander une offre", path: "/business/request", description: "Envoyer une demande personnalisée." },
    ],
  },
  { label: "À propos", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const userNavLinks = [
  { label: "Accueil", path: "/" },
  { label: "Espaces", path: "/spaces" },
  { label: "Mes réservations", path: "/dashboard#reservations" },
  { label: "Mes favoris", path: "/dashboard#favoris" },
  { label: "Notifications", path: "/dashboard#notifications" },
  { label: "Mon profil", path: "/dashboard" },
];

export const partnerNavLinks = [
  { label: "Tableau de bord partenaire", path: "/partner/dashboard" },
  { label: "Mes espaces", path: "/dashboard/partner/spaces" },
  { label: "Ajouter un espace", path: "/dashboard/partner/spaces/new" },
  { label: "Réservations reçues", path: "/dashboard/partner/bookings" },
  { label: "Capacité", path: "/dashboard/partner/capacity" },
  { label: "Avis clients", path: "/dashboard/partner/reviews" },
  { label: "Notifications", path: "/dashboard/partner/notifications" },
  { label: "Profil partenaire", path: "/dashboard/partner/profile" },
];

export const companyNavLinks = [
  { label: "Tableau de bord entreprise", path: "/company/dashboard" },
  { label: "Réservations entreprise", path: "/company/dashboard#bookings" },
  { label: "Événements", path: "/events" },
  { label: "Besoins d’équipe", path: "/business/request" },
  { label: "Facturation", path: "/company/dashboard#billing" },
  { label: "Notifications", path: "/company/dashboard#notifications" },
  { label: "Profil entreprise", path: "/company/dashboard#profile" },
];

export const adminNavLinks = [
  { label: "Tableau de bord admin", path: "/admin/dashboard" },
  { label: "Utilisateurs", path: "/admin/users" },
  { label: "Partenaires", path: "/admin/partners" },
  { label: "Partenaires en attente", path: "/admin/pending-partners" },
  { label: "Entreprises", path: "/admin/companies" },
  { label: "Réservations", path: "/admin/bookings" },
  { label: "Espaces", path: "/admin/spaces" },
  { label: "Notifications", path: "/admin/notifications" },
  { label: "Statistiques", path: "/admin/stats" },
];

export function getNavLinksForRole(role) {
  if (role === "admin") return adminNavLinks;
  if (role === "partner") return partnerNavLinks;
  if (role === "business") return companyNavLinks;
  if (role === "user") return userNavLinks;
  return publicNavLinks;
}
