"use server";

import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { konnect } from "@/lib/konnect";
import { prisma } from "@/lib/prisma";

// Schéma pour paiement escrow
const escrowPaymentSchema = z.object({
  amount: z.number().positive(),
  currency: z.literal("TND").default("TND"),
  reservationId: z.string().cuid(),
});

/**
 * Crée un paiement séquestré avec Stripe
 * @param data Données du paiement
 * @returns clientSecret pour le frontend
 */
export async function createEscrowPayment(data: z.infer<typeof escrowPaymentSchema>) {
  try {
    const validatedData = escrowPaymentSchema.parse(data);

    // Vérification que la réservation existe
    const reservation = await prisma.reservation.findUnique({
      where: { id: validatedData.reservationId }
    });

    if (!reservation) {
      throw new Error("Réservation non trouvée");
    }

    // Création du PaymentIntent avec séquestre
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(validatedData.amount * 100), // Conversion en centimes
      currency: validatedData.currency.toLowerCase(),
      capture_method: "manual", // Séquestre automatique
      metadata: {
        reservationId: validatedData.reservationId,
        type: "escrow"
      }
    });

    // Mise à jour de la réservation avec la référence de paiement
    await prisma.reservation.update({
      where: { id: validatedData.reservationId },
      data: {
        paymentIntentId: paymentIntent.id,
        paymentStatus: "PENDING"
      }
    });

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    };

  } catch (error) {
    console.error("Erreur création paiement escrow:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Données de paiement invalides",
        details: error.errors
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur de paiement"
    };
  }
}

/**
 * Libère les fonds séquestrés après confirmation du service
 * @param reservationId ID de la réservation
 * @returns Statut de libération des fonds
 */
export async function releaseEscrowPayment(reservationId: string) {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: { space: true }
    });

    if (!reservation) {
      throw new Error("Réservation non trouvée");
    }

    if (!reservation.paymentIntentId) {
      throw new Error("Référence de paiement manquante");
    }

    // Capture du paiement (libération des fonds)
    const paymentIntent = await stripe.paymentIntents.capture(reservation.paymentIntentId, {
      amount_to_capture: Math.round((reservation.totalAmount - reservation.commission) * 100)
    });

    // Mise à jour du statut de paiement
    await prisma.reservation.update({
      where: { id: reservationId },
      data: {
        paymentStatus: "RELEASED"
      }
    });

    // Transfert à l'espace partenaire (sera géré par Stripe Connect)
    // TODO: Implémenter le transfert automatique au partenaire

    return {
      success: true,
      message: "Paiement libéré avec succès",
      capturedAmount: paymentIntent.amount_captured / 100
    };

  } catch (error) {
    console.error("Erreur libération paiement:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur de libération des fonds"
    };
  }
}

/**
 * Crée un paiement avec Konnect (paiement local tunisien)
 * @param amount Montant en TND
 * @returns URL de paiement Konnect
 */
export async function createKonnectPayment(amount: number) {
  try {
    if (amount <= 0) {
      throw new Error("Montant invalide");
    }

    // Simulation de l'appel à l'API Konnect
    // En production, remplacer par l'appel réel à l'API Konnect
    const konnectResponse = await konnect.createPayment({
      amount: Math.round(amount * 1000), // Konnect utilise les millimes
      currency: "TND",
      description: "Réservation CoWorki",
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
      webhookUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/konnect`
    });

    return {
      success: true,
      paymentUrl: konnectResponse.paymentUrl,
      paymentId: konnectResponse.paymentId
    };

  } catch (error) {
    console.error("Erreur paiement Konnect:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur de paiement Konnect"
    };
  }
}

/**
 * Traite le webhook Stripe pour les confirmations de paiement
 * @param event Événement Stripe
 */
export async function handleStripeWebhook(event: any) {
  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;

        // Mise à jour du statut de paiement
        await prisma.reservation.updateMany({
          where: { paymentIntentId: paymentIntent.id },
          data: { paymentStatus: "HELD" }
        });

        // Confirmation automatique de la réservation
        const reservation = await prisma.reservation.findFirst({
          where: { paymentIntentId: paymentIntent.id }
        });

        if (reservation) {
          await prisma.reservation.update({
            where: { id: reservation.id },
            data: { status: "CONFIRMED" }
          });
        }
        break;

      case "payment_intent.payment_failed":
        // Gestion des échecs de paiement
        const failedPaymentIntent = event.data.object;
        await prisma.reservation.updateMany({
          where: { paymentIntentId: failedPaymentIntent.id },
          data: {
            status: "CANCELLED",
            paymentStatus: "PENDING"
          }
        });
        break;

      default:
        console.log(`Événement Stripe non géré: ${event.type}`);
    }

    return { success: true };

  } catch (error) {
    console.error("Erreur traitement webhook Stripe:", error);
    return {
      success: false,
      error: "Erreur de traitement du webhook"
    };
  }
}

/**
 * Traite le webhook Konnect pour les paiements locaux
 * @param event Événement Konnect
 */
export async function handleKonnectWebhook(event: any) {
  try {
    // Logique similaire à Stripe mais adaptée à Konnect
    // TODO: Implémenter selon la documentation Konnect

    return { success: true };

  } catch (error) {
    console.error("Erreur traitement webhook Konnect:", error);
    return {
      success: false,
      error: "Erreur de traitement du webhook Konnect"
    };
  }
}