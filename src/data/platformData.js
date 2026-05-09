import { spacesData } from "./spacesData";

export const bookingPlans = {
  "2h": { label: "2 heures", multiplier: 1 },
  "4h": { label: "4 heures", multiplier: 1.7 },
  day: { label: "Journée complète", multiplier: 2.5 },
};

export const profileUser = {
  name: "Lina Ferchichi",
  role: "Étudiante / freelance",
  interests: ["Entrepreneuriat", "Design", "Marketing digital", "Intelligence artificielle"],
  points: 320,
};

export const userReservations = [
  { space: "Friends Lab Coworking Space", date: "12 juin 2026", type: "Poste individuel", status: "Confirmée", price: "30 TND" },
  { space: "The Dot", date: "18 juin 2026", type: "Workshop", status: "En attente", price: "50 TND" },
  { space: "Cogite Coworking Space", date: "28 mai 2026", type: "Salle réunion", status: "Terminée", price: "90 TND" },
];

export const favoriteSpaces = spacesData.slice(0, 3);

export const partnerReservations = [
  { name: "Lina Ferchichi", type: "Poste individuel", date: "12 juin 2026", status: "Confirmée", amount: "30 TND" },
  { name: "Ahmed Ben Salem", type: "Salle réunion", date: "14 juin 2026", status: "En attente", amount: "120 TND" },
  { name: "Startup Nova", type: "Événement B2B", date: "20 juin 2026", status: "En attente", amount: "900 TND" },
];

export const b2bRequests = [
  { company: "Startup Nova", event: "Formation équipe", city: "Tunis", people: 35, budget: "900 TND", status: "En attente" },
  { company: "EduLab", event: "Workshop IA", city: "Sousse", people: 22, budget: "550 TND", status: "Confirmée" },
];

export const adminSpaces = [
  { name: "WorkZone Coworking", city: "Tunis", owner: "M. Trabelsi", status: "En attente" },
  { name: "El Space", city: "Ariana", owner: "S. Gharbi", status: "En attente" },
  { name: "Flat6Labs Tunis", city: "Tunis", owner: "Flat6Labs", status: "Validé" },
];

export const matchingProfiles = [
  { name: "Mariem", field: "UX/UI Designer", interests: ["Design", "Branding", "IA"], score: 87 },
  { name: "Yassine", field: "Développeur Web", interests: ["React", "Startup", "IA"], score: 82 },
  { name: "Nour", field: "Entrepreneure", interests: ["Marketing", "Business", "Innovation"], score: 78 },
];

export const ecoSpaces = [
  { name: "The Dot", city: "Tunis", badge: "Eco Boost", score: "92%" },
  { name: "Cogite Coworking Space", city: "Tunis", badge: "Eco Boost", score: "88%" },
  { name: "Coworky Sousse", city: "Sousse", badge: "Eco Boost", score: "81%" },
];

export const recommendedRooms = [
  { name: "Salle Agora", space: "The Dot", city: "Tunis", capacity: "40 personnes", price: "350 TND / jour" },
  { name: "Meeting Lab", space: "Cogite", city: "Tunis", capacity: "20 personnes", price: "220 TND / jour" },
  { name: "Event Studio", space: "Friends Lab", city: "Sousse", capacity: "35 personnes", price: "300 TND / jour" },
];
