import friendsLab1 from "../assets/spaces/friends-lab-1.png";
import friendsLab2 from "../assets/spaces/friends-lab-2.png";
import friendsLab3 from "../assets/spaces/friends-lab-3.png";
import pixel1 from "../assets/spaces/pixel-1.png";
import pixel2 from "../assets/spaces/pixel-2.png";
import pixel3 from "../assets/spaces/pixel-3.png";
import cogite1 from "../assets/spaces/cogite-1.png";
import cogite2 from "../assets/spaces/cogite-2.png";
import cogite3 from "../assets/spaces/cogite-3.png";
import hive121 from "../assets/spaces/hive12-1.png";
import hive122 from "../assets/spaces/hive12-2.png";
import hive123 from "../assets/spaces/hive12-3.png";
import thedot1 from "../assets/spaces/the-dot-1.png";
import thedot2 from "../assets/spaces/the-dot-2.png";
import thedot3 from "../assets/spaces/the-dot-3.png";
import spacestunis1 from "../assets/spaces/spaces-tunis-1.png";
import spacestunis2 from "../assets/spaces/spaces-tunis-2.png";
import spacestunis3 from "../assets/spaces/spaces-tunis-3.png";

export const spacesData = [
  {
    id: "friends-lab",
    name: "FRIENDS LAB COWORKING SPACE",
    city: "Tunis",
    address: "1 Rue de Monastir, Tunis",
    type: "Espace de coworking",
    price: "15 TND",
    rating: "4.9",
    reviews: "144 avis",
    capacity: "1-20 personnes",
    phone: "22 262 045",
    opening: "Fermé · Ouvre à 08:00",
    quote: "Un coworking space très cozy.",
    tags: ["Wi-Fi", "Café", "Calme"],
    services: ["Wi-Fi", "Café", "Open space", "Salle réunion", "Climatisation", "Espace détente"],
    images: [
      friendsLab1,
      friendsLab2,
      friendsLab3,
    ],
    description:
      "FRIENDS LAB COWORKING SPACE est un espace de coworking chaleureux, cozy et professionnel, pensé pour les étudiants, freelances, télétravailleurs et petites équipes qui recherchent un cadre calme, motivant et convivial.",
  },
  {
    id: "pixel-coworking",
    name: "Pixel Coworking Tunis",
    city: "Tunis",
    address: "3ème étage, ELIAS TOWER, 28 Av. Kheireddine Pacha, Montplaisir, Tunis",
    type: "Espace de coworking",
    price: "20 TND",
    rating: "5.0",
    reviews: "62 avis",
    capacity: "1-12 personnes",
    phone: "25 444 025",
    opening: "Fermé · Ouvre à 08:00",
    quote: "Un espace de coworking propre, bien entretenu et très agréable.",
    tags: ["Wi-Fi", "Moderne", "Meeting"],
    services: ["Wi-Fi", "Bureau privé", "Salle réunion", "Climatisation", "Open space", "Projecteur"],
    images: [
      pixel1,
      pixel2,
      pixel3,
    ],
    description:
      "Pixel Coworking Tunis est un espace moderne, propre et bien entretenu situé à Montplaisir. Il propose un environnement professionnel adapté aux freelances, étudiants, startups et entreprises souhaitant travailler ou organiser des réunions dans un cadre confortable.",
  },
  {
    id: "cogite",
    name: "Cogite Coworking Space",
    city: "Tunis",
    address: "1 Place Tahar Haddad, Les Berges du Lac, Tunis",
    type: "Hub entrepreneurial",
    price: "25 TND",
    rating: "4.8",
    reviews: "Communauté active",
    capacity: "1-30 personnes",
    phone: "36 401 401",
    opening: "Lundi - Vendredi, 08:30 - 18:30",
    quote: "Un espace reconnu pour sa communauté entrepreneuriale.",
    tags: ["Startups", "Événements", "Networking"],
    services: ["Wi-Fi", "Open space", "Salle réunion", "Networking", "Événements", "Café"],
    images: [
      cogite1,
      cogite2,
      cogite3,
    ],
    description:
      "Cogite Coworking Space est un hub entrepreneurial connu à Tunis, orienté vers l’innovation, les startups, les rencontres professionnelles et les événements communautaires. Il convient particulièrement aux entrepreneurs, porteurs de projets et équipes en développement.",
  },
  {
    id: "hive12",
    name: "Hive12 Coworking Space",
    city: "Sousse",
    address: "Sousse, Tunisie",
    type: "Espace de coworking",
    price: "18 TND",
    rating: "4.9",
    reviews: "61 avis",
    capacity: "1-15 personnes",
    phone: "Non renseigné",
    opening: "Lundi - Samedi, 08:00 - 20:00",
    quote: "Un espace apprécié pour son ambiance productive.",
    tags: ["Étudiant", "Calme", "Productif"],
    services: ["Wi-Fi", "Open space", "Café", "Salle réunion", "Networking"],
    images: [
      hive121,
      hive122,
      hive123,
    ],
    description:
      "Hive12 est un espace de coworking à Sousse adapté aux étudiants, freelances et jeunes professionnels. Il met l’accent sur la productivité, le calme et l’ambiance communautaire.",
  },
  {
    id: "the-dot",
    name: "The Dot",
    city: "Tunis",
    address: "Tunis, Tunisie",
    type: "Hub innovation",
    price: "30 TND",
    rating: "4.7",
    reviews: "Hub entrepreneurial",
    capacity: "1-50 personnes",
    phone: "Non renseigné",
    opening: "Lundi - Vendredi, 09:00 - 18:00",
    quote: "Un hub dédié à l’innovation digitale et aux entrepreneurs.",
    tags: ["Innovation", "Digital", "Entrepreneurs"],
    services: ["Wi-Fi", "Événements", "Networking", "Salle réunion", "Formation"],
    images: [
      thedot1,
      thedot2,
      thedot3,
    ],
    description:
      "The Dot est un hub tunisien dédié à l’innovation digitale, aux entrepreneurs et aux startups. Il s’intègre parfaitement dans CoWorki pour les profils orientés innovation, formation, networking et événements professionnels.",
  },
  {
    id: "spaces-tunis",
    name: "Spaces Tunis",
    city: "Tunis",
    address: "Tunis, Tunisie",
    type: "Bureau flexible",
    price: "35 TND",
    rating: "4.6",
    reviews: "Espace professionnel",
    capacity: "1-25 personnes",
    phone: "Non renseigné",
    opening: "Lundi - Vendredi, 08:30 - 18:30",
    quote: "Un environnement professionnel flexible pour équipes et entreprises.",
    tags: ["B2B", "Bureau privé", "Meeting"],
    services: ["Wi-Fi", "Bureau privé", "Salle réunion", "Climatisation", "Projecteur", "Parking"],
    images: [
      spacestunis1,
      spacestunis2,
      spacestunis3,
    ],
    description:
      "Spaces Tunis représente une offre professionnelle orientée bureaux flexibles, réunions et besoins B2B. L’espace convient aux entreprises cherchant un cadre structuré, moderne et facilement mobilisable.",
  },
];
