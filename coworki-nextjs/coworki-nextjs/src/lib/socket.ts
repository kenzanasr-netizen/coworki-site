import { Server as NetServer } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

// Types pour les événements Socket.io
export interface ServerToClientEvents {
  // Disponibilité des sièges
  "seat:updated": (data: { seatId: string; isAvailable: boolean; lockedBy?: string }) => void;

  // Offres flash
  "flash:deal": (data: { spaceId: string; spaceName: string; discount: number; expiresAt: string }) => void;

  // Smart Matching
  "match:found": (data: { matchedUser: any; chatRoomId: string; similarityScore: number }) => void;

  // Chat
  "chat:message": (data: { chatRoomId: string; message: string; user: any; timestamp: string }) => void;

  // Notifications
  "notification:new": (data: { title: string; message: string; type: string }) => void;

  // Analytics pour gérants
  "occupancy:alert": (data: { spaceId: string; occupancyRate: number }) => void;
  "reservation:confirmed": (data: { reservationId: string }) => void;
}

export interface ClientToServerEvents {
  // Gestion des sièges
  "seat:lock": (data: { seatId: string; userId: string; duration: string }) => void;
  "seat:unlock": (data: { seatId: string }) => void;

  // Utilisateur dans un espace
  "user:checkin": (data: { spaceId: string; userId: string; interests: string[] }) => void;

  // Abonnement aux rooms
  "space:subscribe": (spaceId: string) => void;
  "city:subscribe": (city: string) => void;

  // Chat
  "chat:message": (data: { chatRoomId: string; message: string; userId: string }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  userId?: string;
  role?: string;
}

// Configuration du serveur Socket.io
let io: ServerIO<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData> | undefined;

export const initSocketServer = (httpServer: NetServer) => {
  if (io) return io;

  io = new ServerIO<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer, {
    path: "/api/socket",
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    },
    // Rate limiting
    connectTimeout: 5000,
    pingTimeout: 60000,
    pingInterval: 25000
  });

  // Middleware d'authentification
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return next(new Error("Authentification requise"));
      }

      // Vérification du JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

      // Récupération des infos utilisateur
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, role: true, name: true }
      });

      if (!user) {
        return next(new Error("Utilisateur non trouvé"));
      }

      // Stockage des données utilisateur dans le socket
      socket.data.userId = user.id;
      socket.data.role = user.role;

      next();
    } catch (error) {
      console.error("Erreur authentification socket:", error);
      next(new Error("Token invalide"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`Utilisateur connecté: ${socket.data.userId}`);

    // Gestion des sièges
    socket.on("seat:lock", async (data) => {
      try {
        await handleSeatLock(socket, data);
      } catch (error) {
        socket.emit("notification:new", {
          title: "Erreur",
          message: "Impossible de verrouiller le siège",
          type: "error"
        });
      }
    });

    socket.on("seat:unlock", async (data) => {
      try {
        await handleSeatUnlock(socket, data);
      } catch (error) {
        console.error("Erreur déverrouillage siège:", error);
      }
    });

    // Check-in utilisateur
    socket.on("user:checkin", async (data) => {
      try {
        await handleUserCheckin(socket, data);
      } catch (error) {
        console.error("Erreur check-in utilisateur:", error);
      }
    });

    // Abonnement aux rooms
    socket.on("space:subscribe", (spaceId) => {
      socket.join(`space:${spaceId}`);
      console.log(`Utilisateur ${socket.data.userId} abonné à l'espace ${spaceId}`);
    });

    socket.on("city:subscribe", (city) => {
      socket.join(`city:${city}`);
      console.log(`Utilisateur ${socket.data.userId} abonné à la ville ${city}`);
    });

    // Chat
    socket.on("chat:message", async (data) => {
      try {
        await handleChatMessage(socket, data);
      } catch (error) {
        socket.emit("notification:new", {
          title: "Erreur",
          message: "Message non envoyé",
          type: "error"
        });
      }
    });

    // Déconnexion
    socket.on("disconnect", () => {
      console.log(`Utilisateur déconnecté: ${socket.data.userId}`);
      // Nettoyage des verrouillages temporaires
      cleanupUserLocks(socket.data.userId!);
    });
  });

  return io;
};

// Gestion du verrouillage des sièges
async function handleSeatLock(
  socket: any,
  data: { seatId: string; userId: string; duration: string }
) {
  const { seatId, userId, duration } = data;

  // Vérification des permissions
  if (socket.data.userId !== userId) {
    throw new Error("Permission refusée");
  }

  // Vérification du siège
  const seat = await prisma.seat.findUnique({
    where: { id: seatId },
    include: { space: true }
  });

  if (!seat || !seat.isAvailable) {
    throw new Error("Siège non disponible");
  }

  // Verrouillage temporaire (5 minutes pour finaliser le paiement)
  await prisma.seat.update({
    where: { id: seatId },
    data: { isAvailable: false }
  });

  // Diffusion de la mise à jour
  io!.to(`space:${seat.spaceId}`).emit("seat:updated", {
    seatId,
    isAvailable: false,
    lockedBy: userId
  });

  // Auto-déverrouillage après 5 minutes
  setTimeout(async () => {
    try {
      const reservation = await prisma.reservation.findFirst({
        where: {
          seatId,
          userId,
          status: "PENDING",
          createdAt: { gte: new Date(Date.now() - 5 * 60 * 1000) }
        }
      });

      if (!reservation) {
        // Aucun paiement en cours, déverrouillage
        await prisma.seat.update({
          where: { id: seatId },
          data: { isAvailable: true }
        });

        io!.to(`space:${seat.spaceId}`).emit("seat:updated", {
          seatId,
          isAvailable: true
        });
      }
    } catch (error) {
      console.error("Erreur auto-déverrouillage:", error);
    }
  }, 5 * 60 * 1000);
}

// Gestion du déverrouillage des sièges
async function handleSeatUnlock(socket: any, data: { seatId: string }) {
  const { seatId } = data;

  const seat = await prisma.seat.findUnique({
    where: { id: seatId },
    include: { space: true }
  });

  if (!seat) return;

  await prisma.seat.update({
    where: { id: seatId },
    data: { isAvailable: true }
  });

  io!.to(`space:${seat.spaceId}`).emit("seat:updated", {
    seatId,
    isAvailable: true
  });
}

// Gestion du check-in utilisateur et Smart Matching
async function handleUserCheckin(
  socket: any,
  data: { spaceId: string; userId: string; interests: string[] }
) {
  const { spaceId, userId, interests } = data;

  // Récupération des autres utilisateurs dans l'espace
  const otherUsers = await prisma.user.findMany({
    where: {
      reservations: {
        some: {
          spaceId,
          status: "CONFIRMED",
          startDate: { lte: new Date() },
          endDate: { gte: new Date() }
        }
      },
      id: { not: userId }
    },
    select: {
      id: true,
      name: true,
      interests: true
    }
  });

  // Calcul des similarités (implémentation basique)
  const matches = otherUsers
    .map(user => {
      const commonInterests = user.interests.filter(interest =>
        interests.includes(interest)
      );
      const similarityScore = commonInterests.length / Math.max(interests.length, user.interests.length);

      return {
        user,
        similarityScore,
        commonInterests
      };
    })
    .filter(match => match.similarityScore >= 0.3) // Seuil minimum
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, 3); // Top 3 matches

  // Création des rooms de chat pour les matches
  for (const match of matches) {
    const chatRoomId = `chat_${userId}_${match.user.id}_${Date.now()}`;

    // Création du match en BDD
    await prisma.smartMatch.create({
      data: {
        userId,
        matchedUserId: match.user.id,
        spaceId,
        similarityScore: match.similarityScore,
        chatRoomId
      }
    });

    // Notification des deux utilisateurs
    io!.to(`user:${userId}`).emit("match:found", {
      matchedUser: match.user,
      chatRoomId,
      similarityScore: match.similarityScore
    });

    io!.to(`user:${match.user.id}`).emit("match:found", {
      matchedUser: { id: userId, name: "Utilisateur anonyme" }, // Pour la confidentialité
      chatRoomId,
      similarityScore: match.similarityScore
    });
  }
}

// Gestion des messages de chat
async function handleChatMessage(
  socket: any,
  data: { chatRoomId: string; message: string; userId: string }
) {
  const { chatRoomId, message, userId } = data;

  // Vérification que l'utilisateur fait partie du chat
  const match = await prisma.smartMatch.findFirst({
    where: {
      chatRoomId,
      OR: [
        { userId },
        { matchedUserId: userId }
      ]
    },
    include: {
      user: { select: { id: true, name: true } },
      matchedUser: { select: { id: true, name: true } }
    }
  });

  if (!match) {
    throw new Error("Accès au chat refusé");
  }

  // Diffusion du message
  const sender = match.user.id === userId ? match.user : match.matchedUser;

  io!.to(`chat:${chatRoomId}`).emit("chat:message", {
    chatRoomId,
    message,
    user: sender,
    timestamp: new Date().toISOString()
  });
}

// Nettoyage des verrouillages utilisateur
async function cleanupUserLocks(userId: string) {
  // Recherche des sièges verrouillés temporairement par l'utilisateur
  const lockedSeats = await prisma.seat.findMany({
    where: {
      isAvailable: false,
      reservations: {
        some: {
          userId,
          status: "PENDING",
          createdAt: { lt: new Date(Date.now() - 5 * 60 * 1000) }
        }
      }
    }
  });

  // Déverrouillage
  for (const seat of lockedSeats) {
    await prisma.seat.update({
      where: { id: seat.id },
      data: { isAvailable: true }
    });

    io!.to(`space:${seat.spaceId}`).emit("seat:updated", {
      seatId: seat.id,
      isAvailable: true
    });
  }
}

// Fonctions utilitaires pour émettre des événements depuis les actions
export const emitSeatUpdate = (spaceId: string, seatId: string, isAvailable: boolean, lockedBy?: string) => {
  if (io) {
    io.to(`space:${spaceId}`).emit("seat:updated", { seatId, isAvailable, lockedBy });
  }
};

export const emitFlashDeal = (spaceId: string, spaceName: string, discount: number, expiresAt: Date) => {
  if (io) {
    io.to(`city:${spaceName}`).emit("flash:deal", {
      spaceId,
      spaceName,
      discount,
      expiresAt: expiresAt.toISOString()
    });
  }
};

export const emitOccupancyAlert = (spaceId: string, occupancyRate: number) => {
  if (io) {
    io.to(`space:${spaceId}`).emit("occupancy:alert", { spaceId, occupancyRate });
  }
};

export const emitReservationConfirmed = (reservationId: string, spaceId: string) => {
  if (io) {
    io.to(`space:${spaceId}`).emit("reservation:confirmed", { reservationId });
  }
};

// Export du serveur pour utilisation dans les API routes
export { io };
export type { ServerIO };