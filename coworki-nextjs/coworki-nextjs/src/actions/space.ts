"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Schéma pour les filtres de recherche
const searchFiltersSchema = z.object({
  city: z.string().optional(),
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().min(0).optional(),
  amenities: z.array(z.string()).optional(),
  date: z.string().datetime().optional(),
  capacity: z.number().min(1).optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  radiusKm: z.number().min(0).default(10),
  sortBy: z.enum(["relevance", "price", "rating", "distance", "ecoScore"]).default("relevance"),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(20)
});

/**
 * Recherche intelligente d'espaces de coworking
 * @param filters Filtres de recherche
 * @returns Liste paginée d'espaces
 */
export async function searchSpaces(filters: z.infer<typeof searchFiltersSchema>) {
  try {
    const validatedFilters = searchFiltersSchema.parse(filters);

    // Construction de la requête de base
    const where: any = {
      isVerified: true, // Uniquement les espaces vérifiés
    };

    // Filtres géographiques
    if (validatedFilters.lat && validatedFilters.lng) {
      // Recherche dans un rayon (utilise PostGIS en production)
      // Pour l'instant, approximation simple
      where.lat = {
        gte: validatedFilters.lat - (validatedFilters.radiusKm / 111), // ~1 degré = 111km
        lte: validatedFilters.lat + (validatedFilters.radiusKm / 111)
      };
      where.lng = {
        gte: validatedFilters.lng - (validatedFilters.radiusKm / 111),
        lte: validatedFilters.lng + (validatedFilters.radiusKm / 111)
      };
    }

    // Filtres par ville
    if (validatedFilters.city) {
      where.city = {
        contains: validatedFilters.city,
        mode: "insensitive"
      };
    }

    // Filtres par prix
    if (validatedFilters.priceMin !== undefined || validatedFilters.priceMax !== undefined) {
      where.pricePerHour = {};
      if (validatedFilters.priceMin !== undefined) {
        where.pricePerHour.gte = validatedFilters.priceMin;
      }
      if (validatedFilters.priceMax !== undefined) {
        where.pricePerHour.lte = validatedFilters.priceMax;
      }
    }

    // Filtres par équipements
    if (validatedFilters.amenities && validatedFilters.amenities.length > 0) {
      where.amenities = {
        hasSome: validatedFilters.amenities
      };
    }

    // Filtre par capacité
    if (validatedFilters.capacity) {
      where.capacity = {
        gte: validatedFilters.capacity
      };
    }

    // Construction du tri
    let orderBy: any = {};
    switch (validatedFilters.sortBy) {
      case "price":
        orderBy = { pricePerHour: "asc" };
        break;
      case "rating":
        orderBy = { reviews: { _count: "desc" } }; // Approximation
        break;
      case "ecoScore":
        orderBy = { ecoScore: "desc" };
        break;
      case "distance":
        // TODO: Implémenter le tri par distance avec PostGIS
        orderBy = { createdAt: "desc" };
        break;
      default:
        orderBy = { ecoScore: "desc" }; // Par défaut, éco-score
    }

    // Calcul de la pagination
    const skip = (validatedFilters.page - 1) * validatedFilters.limit;

    // Exécution de la requête
    const [spaces, totalCount] = await Promise.all([
      prisma.coworkingSpace.findMany({
        where,
        include: {
          reviews: {
            select: {
              rating: true
            }
          },
          _count: {
            select: {
              reservations: true,
              reviews: true
            }
          }
        },
        orderBy,
        skip,
        take: validatedFilters.limit
      }),
      prisma.coworkingSpace.count({ where })
    ]);

    // Calcul des moyennes et formatage des résultats
    const formattedSpaces = spaces.map((space: any) => ({
      ...space,
      averageRating: space.reviews.length > 0
        ? space.reviews.reduce((sum, review) => sum + review.rating, 0) / space.reviews.length
        : 0,
      totalReservations: space._count.reservations,
      totalReviews: space._count.reviews,
      reviews: undefined, // Suppression des reviews détaillées
      _count: undefined // Suppression du count
    }));

    return {
      success: true,
      spaces: formattedSpaces,
      pagination: {
        page: validatedFilters.page,
        limit: validatedFilters.limit,
        totalCount,
        totalPages: Math.ceil(totalCount / validatedFilters.limit),
        hasNextPage: validatedFilters.page * validatedFilters.limit < totalCount,
        hasPrevPage: validatedFilters.page > 1
      }
    };

  } catch (error) {
    console.error("Erreur recherche espaces:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Filtres de recherche invalides",
        details: error.errors
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur de recherche"
    };
  }
}

/**
 * Récupère les disponibilités d'un espace pour une journée
 * @param spaceId ID de l'espace
 * @param date Date au format ISO
 * @returns Créneaux disponibles
 */
export async function getSpaceAvailability(spaceId: string, date: string) {
  try {
    // Validation de la date
    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      throw new Error("Date invalide");
    }

    // Récupération des sièges de l'espace
    const seats = await prisma.seat.findMany({
      where: { spaceId },
      include: {
        reservations: {
          where: {
            startDate: {
              gte: new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()),
              lt: new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate() + 1)
            },
            status: {
              in: ["PENDING", "CONFIRMED"]
            }
          },
          select: {
            startDate: true,
            endDate: true,
            duration: true
          }
        }
      }
    });

    // Génération des créneaux horaires (9h-18h)
    const timeSlots = [];
    for (let hour = 9; hour < 18; hour++) {
      for (let minute of [0, 30]) {
        const slotStart = new Date(targetDate);
        slotStart.setHours(hour, minute, 0, 0);

        const slotEnd = new Date(slotStart);
        slotEnd.setHours(hour + (minute === 0 ? 0 : 0.5), minute === 0 ? 30 : 0, 0, 0);

        // Vérification de disponibilité pour chaque siège
        const availableSeats = seats.filter(seat => {
          return !seat.reservations.some(reservation => {
            return (
              (reservation.startDate <= slotStart && reservation.endDate > slotStart) ||
              (reservation.startDate < slotEnd && reservation.endDate >= slotEnd) ||
              (reservation.startDate >= slotStart && reservation.endDate <= slotEnd)
            );
          });
        });

        timeSlots.push({
          startTime: slotStart.toISOString(),
          endTime: slotEnd.toISOString(),
          availableSeats: availableSeats.length,
          totalSeats: seats.length,
          isAvailable: availableSeats.length > 0
        });
      }
    }

    return {
      success: true,
      spaceId,
      date: targetDate.toISOString(),
      timeSlots
    };

  } catch (error) {
    console.error("Erreur récupération disponibilités:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur de récupération des disponibilités"
    };
  }
}

/**
 * Déclenche une offre flash pour un espace
 * @param spaceId ID de l'espace
 * @param discountPercent Pourcentage de réduction
 * @returns Statut de création de l'offre flash
 */
export async function triggerFlashDeal(spaceId: string, discountPercent: number) {
  try {
    if (discountPercent < 5 || discountPercent > 50) {
      throw new Error("Pourcentage de réduction invalide (5-50%)");
    }

    // Vérification que l'espace existe et appartient à un partenaire premium
    const space = await prisma.coworkingSpace.findUnique({
      where: { id: spaceId },
      include: { subscriptions: true }
    });

    if (!space) {
      throw new Error("Espace non trouvé");
    }

    const activeSubscription = space.subscriptions.find(sub => sub.isActive);
    if (!activeSubscription || activeSubscription.tier === "FREE") {
      throw new Error("Abonnement Premium requis pour les offres flash");
    }

    // Création de l'offre flash (valide 1 heure)
    const flashDeal = await prisma.flashDeal.create({
      data: {
        spaceId,
        discountPercent,
        startAt: new Date(),
        endAt: new Date(Date.now() + 60 * 60 * 1000), // 1 heure
        triggeredBy: "MANUAL"
      }
    });

    // Émission Socket.io pour notifier les utilisateurs
    // await emitFlashDeal(spaceId, space.name, discountPercent, flashDeal.endAt);

    revalidatePath(`/spaces/${spaceId}`);
    revalidatePath("/search");

    return {
      success: true,
      flashDealId: flashDeal.id,
      message: `Offre flash de ${discountPercent}% créée pour ${space.name}`
    };

  } catch (error) {
    console.error("Erreur création offre flash:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur de création de l'offre flash"
    };
  }
}

/**
 * Récupère les détails complets d'un espace
 * @param spaceId ID de l'espace
 * @returns Détails complets de l'espace
 */
export async function getSpaceDetails(spaceId: string) {
  try {
    const space = await prisma.coworkingSpace.findUnique({
      where: { id: spaceId },
      include: {
        seats: true,
        reviews: {
          include: {
            user: {
              select: { name: true }
            }
          },
          orderBy: { createdAt: "desc" },
          take: 10
        },
        events: {
          where: {
            date: { gte: new Date() }
          },
          orderBy: { date: "asc" },
          take: 5
        },
        flashDeals: {
          where: {
            status: "ACTIVE",
            endAt: { gt: new Date() }
          }
        },
        _count: {
          select: {
            reservations: true,
            reviews: true
          }
        }
      }
    });

    if (!space) {
      throw new Error("Espace non trouvé");
    }

    // Calcul de la note moyenne
    const averageRating = space.reviews.length > 0
      ? space.reviews.reduce((sum, review) => sum + review.rating, 0) / space.reviews.length
      : 0;

    return {
      success: true,
      space: {
        ...space,
        averageRating,
        totalReservations: space._count.reservations,
        totalReviews: space._count.reviews,
        _count: undefined
      }
    };

  } catch (error) {
    console.error("Erreur récupération détails espace:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur de récupération des détails"
    };
  }
}