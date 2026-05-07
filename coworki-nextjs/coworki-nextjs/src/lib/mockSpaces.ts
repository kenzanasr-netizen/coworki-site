import type { CoworkingSpace } from "@/types"

export const mockSpaces: Array<CoworkingSpace & {
  averageRating: number
  totalReviews: number
  flashDeal?: { discountPercent: number; endAt: string }
  occupancyRate?: number
}> = [
  {
    id: "workzone-sousse",
    name: "WorkZone Sousse",
    description:
      "Un coworking lumineux avec salons privés, espaces collaboratifs et café de spécialité.",
    address: "Avenue Habib Bourguiba 120",
    city: "Sousse",
    lat: 35.8256,
    lng: 10.6369,
    pricePerHour: 28,
    capacity: 18,
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["wifi", "coffee", "parking", "power"],
    ecoScore: 92,
    isVerified: true,
    partnerId: "partner-1",
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 4.8,
    totalReviews: 92,
    flashDeal: {
      discountPercent: 20,
      endAt: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString()
    },
    occupancyRate: 0.72
  },
  {
    id: "creative-hub-tunis",
    name: "Creative Hub Tunis",
    description:
      "Espace flexible pour freelances, startups et équipes, avec studio de réunion et zone détente.",
    address: "Rue du Lac Biwa 6",
    city: "Tunis",
    lat: 36.8075,
    lng: 10.1825,
    pricePerHour: 35,
    capacity: 24,
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["wifi", "coffee", "parking", "power"],
    ecoScore: 86,
    isVerified: true,
    partnerId: "partner-2",
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 4.6,
    totalReviews: 74,
    occupancyRate: 0.55
  },
  {
    id: "nomad-space-hammamet",
    name: "Nomad Space Hammamet",
    description:
      "Un coworking premium avec vue mer, bureaux privés et écosystème bien-être.",
    address: "Corniche El Fateh 23",
    city: "Hammamet",
    lat: 36.3972,
    lng: 10.6200,
    pricePerHour: 42,
    capacity: 30,
    images: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["wifi", "coffee", "parking", "power"],
    ecoScore: 95,
    isVerified: true,
    partnerId: "partner-3",
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 4.9,
    totalReviews: 113,
    flashDeal: {
      discountPercent: 15,
      endAt: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
    },
    occupancyRate: 0.85
  }
]
