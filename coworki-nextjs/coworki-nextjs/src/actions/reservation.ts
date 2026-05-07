"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";

// Schéma de validation pour la création de réservation
const createReservationSchema = z.object({
  userId: z.string().cuid(),
  spaceId: z.string().cuid(),
  seatId: z.string().cuid().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  duration: z.enum(["TWO_HOURS", "FOUR_HOURS", "FULL_DAY"]),
  isB2B: z.boolean().default(false),
});

/**
 * Crée une nouvelle réservation avec paiement séquestré
 * @param data Données de la réservation
 * @returns { reservationId, clientSecret } ou erreur
 */
export async function createReservation(data: z.infer<typeof createReservationSchema>) {
  try {
    // Validation des données d'entrée
    const validatedData = createReservationSchema.parse(data);

    // Vérification de la disponibilité du siège
    const seat = await prisma.seat.findUnique({
      where: { id: validatedData.seatId },
      include: { space: true }
    });

    if (!seat) {
      throw new Error("Siège non trouvé");
    }

    if (!seat.isAvailable) {
      throw new Error("Siège non disponible");
    }

    // Vérification des conflits de réservation
    const conflictingReservation = await prisma.reservation.findFirst({
      where: {
        seatId: validatedData.seatId,
        OR: [
          {
            AND: [
              { startDate: { lte: new Date(validatedData.startDate) } },
              { endDate: { gt: new Date(validatedData.startDate) } }
            ]
          },
          {
            AND: [
              { startDate: { lt: new Date(validatedData.endDate) } },
              { endDate: { gte: new Date(validatedData.endDate) } }
            ]
          }
        ],
        status: { in: ["PENDING", "CONFIRMED"] }
      }
    });

    if (conflictingReservation) {
      throw new Error("Créneau déjà réservé");
    }

    // Calcul du montant total
    const space = seat.space;
    let amount = 0;

    switch (validatedData.duration) {
      case "TWO_HOURS":
        amount = space.pricePerHour * 2;
        break;
      case "FOUR_HOURS":
        amount = space.pricePerHour * 4;
        break;
      case "FULL_DAY":
        amount = space.pricePerDay;
        break;
    }

    const commission = amount * 0.15; // 15% commission CoWorki
    const totalAmount = amount + commission;

    // Création du PaymentIntent Stripe avec séquestre
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Conversion en centimes
      currency: "tnd",
      capture_method: "manual", // Séquestre automatique
      metadata: {
        spaceId: space.id,
        seatId: seat.id,
        duration: validatedData.duration,
        isB2B: validatedData.isB2B.toString()
      }
    });

    // Création de la réservation en base
    const reservation = await prisma.reservation.create({
      data: {
        userId: validatedData.userId,
        spaceId: space.id,
        seatId: validatedData.seatId,
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
        duration: validatedData.duration as any,
        totalAmount,
        commission,
        paymentIntentId: paymentIntent.id,
        isB2B: validatedData.isB2B,
        status: "PENDING"
      }
    });

    // Verrouillage du siège via Socket.io (sera implémenté)
    // await emitSeatLock(seat.id, validatedData.userId, validatedData.duration);

    // Déclenchement du Smart Matching si applicable
    // await triggerSmartMatching(space.id, validatedData.userId);

    revalidatePath("/reservations");

    return {
      success: true,
      reservationId: reservation.id,
      clientSecret: paymentIntent.client_secret
    };

  } catch (error) {
    console.error("Erreur création réservation:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Données invalides",
        details: error.errors
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur interne"
    };
  }
}

/**
 * Confirme une réservation après paiement réussi
 * @param reservationId ID de la réservation
 * @returns Statut de confirmation
 */
export async function confirmReservation(reservationId: string) {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: { user: true, space: true }
    });

    if (!reservation) {
      throw new Error("Réservation non trouvée");
    }

    if (reservation.status !== "PENDING") {
      throw new Error("Réservation déjà traitée");
    }

    // Vérification du paiement Stripe
    if (!reservation.paymentIntentId) {
      throw new Error("Référence de paiement manquante");
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(reservation.paymentIntentId);

    if (paymentIntent.status !== "requires_capture") {
      throw new Error("Paiement non confirmé");
    }

    // Mise à jour de la réservation
    await prisma.reservation.update({
      where: { id: reservationId },
      data: {
        status: "CONFIRMED",
        paymentStatus: "HELD"
      }
    });

    // Attribution des points de fidélité
    await prisma.user.update({
      where: { id: reservation.userId },
      data: {
        loyaltyPoints: {
          increment: Math.floor(reservation.totalAmount / 10) // 1 point par 10 TND
        }
      }
    });

    // Notification push (sera implémenté avec FCM)
    // await sendPushNotification(reservation.userId, "Réservation confirmée", ...);

    revalidatePath("/reservations");
    revalidatePath(`/reservations/${reservationId}`);

    return {
      success: true,
      message: "Réservation confirmée avec succès"
    };

  } catch (error) {
    console.error("Erreur confirmation réservation:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur interne"
    };
  }
}

/**
 * Annule une réservation
 * @param reservationId ID de la réservation
 * @returns Statut d'annulation
 */
export async function cancelReservation(reservationId: string) {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: { user: true }
    });

    if (!reservation) {
      throw new Error("Réservation non trouvée");
    }

    // Vérification des conditions d'annulation (24h avant)
    const now = new Date();
    const hoursBefore = (reservation.startDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursBefore < 24 && reservation.status === "CONFIRMED") {
      throw new Error("Annulation impossible moins de 24h avant");
    }

    // Annulation de la réservation
    await prisma.reservation.update({
      where: { id: reservationId },
      data: {
        status: "CANCELLED"
      }
    });

    // Remboursement si paiement effectué
    if (reservation.paymentIntentId && reservation.paymentStatus === "HELD") {
      await stripe.paymentIntents.cancel(reservation.paymentIntentId);

      await prisma.reservation.update({
        where: { id: reservationId },
        data: {
          paymentStatus: "REFUNDED"
        }
      });
    }

    revalidatePath("/reservations");
    revalidatePath(`/reservations/${reservationId}`);

    return {
      success: true,
      message: "Réservation annulée avec succès"
    };

  } catch (error) {
    console.error("Erreur annulation réservation:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur interne"
    };
  }
}