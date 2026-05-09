import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Buffer } from "node:buffer";
import { prisma } from "./prisma.js";

/* global process */

const app = express();
const PORT = process.env.PORT || 4000;
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN || "http://localhost:3000",
  "http://127.0.0.1:3000",
];

const roleMap = {
  user: "USER",
  partner: "PARTNER",
  business: "COMPANY",
  company: "COMPANY",
  admin: "ADMIN",
};

const tunisianPhoneRegex = /^\+216\d{8}$/;
const verificationTtlMinutes = 10;
const sessionTtlSeconds = 60 * 60 * 24 * 7;
const sessionSecret = process.env.NEXTAUTH_SECRET || "coworki-dev-secret-change-me";

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_request, response) => {
  response.json({ ok: true, service: "coworki-api" });
});

app.post("/api/auth/register", async (request, response) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      role = "user",
      interests = [],
      city,
      occupation,
      companyName,
      spaceName,
      taxNumber,
      billingAddress,
    } = request.body || {};

    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedRole = roleMap[String(role).toLowerCase()] || "USER";
    const normalizedPhone = normalizeTunisianPhone(phone);

    if (!fullName || !normalizedEmail || !password) {
      return response.status(400).json({
        message: "Le nom complet, l’email et le mot de passe sont obligatoires.",
      });
    }

    if (!normalizedPhone) {
      return response.status(400).json({
        message: "Le numéro doit contenir exactement 8 chiffres tunisiens après +216.",
      });
    }

    if (password.length < 8) {
      return response.status(400).json({
        message: "Le mot de passe doit contenir au moins 8 caractères.",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true },
    });

    if (existingUser) {
      return response.status(409).json({
        message: "Un compte existe déjà avec cette adresse email.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const safeInterests = Array.isArray(interests) ? interests.filter(Boolean) : [];
    const emailCode = generateCode();
    const phoneCode = generateCode();

    const user = await prisma.user.create({
      data: {
        fullName,
        email: normalizedEmail,
        passwordHash,
        phone: normalizedPhone,
        role: normalizedRole,
        interests: safeInterests,
        emailVerified: false,
        phoneVerified: false,
        isActive: false,
        profile: {
          create: {
            city: city || null,
            occupation: occupation || null,
            interests: safeInterests,
          },
        },
        ...(normalizedRole === "PARTNER"
          ? {
              partner: {
                create: {
                  companyName: spaceName || companyName || fullName,
                  status: "PENDING",
                },
              },
            }
          : {}),
        ...(normalizedRole === "COMPANY"
          ? {
              company: {
                create: {
                  companyName: companyName || fullName,
                  taxNumber: taxNumber || null,
                  billingAddress: billingAddress || null,
                },
              },
            }
          : {}),
        verificationCodes: {
          create: [
            await buildVerificationCode({
              email: normalizedEmail,
              channel: "EMAIL",
              code: emailCode,
            }),
            await buildVerificationCode({
              phone: normalizedPhone,
              channel: "PHONE",
              code: phoneCode,
            }),
          ],
        },
        notifications: {
          create: {
            title: "Compte créé",
            message: "Votre compte CoWorki est créé. Vérifiez votre email et votre téléphone pour l’activer.",
            type: "ACCOUNT_CREATED",
          },
        },
      },
      select: publicUserSelect(),
    });

    if (normalizedRole === "PARTNER") {
      await notifyAdmins({
        title: "Nouveau partenaire en attente",
        message: `${fullName} a inscrit ${spaceName || companyName || "un espace partenaire"}.`,
        type: "PARTNER_PENDING",
      });
    }

    if (normalizedRole === "COMPANY") {
      await notifyAdmins({
        title: "Nouvelle entreprise inscrite",
        message: `${companyName || fullName} vient de créer un compte entreprise.`,
        type: "COMPANY_CREATED",
      });
    }

    await sendEmailCode(normalizedEmail, emailCode);
    await sendSmsCode(normalizedPhone, phoneCode);

    return response.status(201).json({
      message: "Compte créé. Vérifiez votre email et votre téléphone pour l’activer.",
      requiresVerification: true,
      devVerification: isProduction()
        ? undefined
        : {
            emailCode,
            phoneCode,
            expiresInMinutes: verificationTtlMinutes,
          },
      user,
    });
  } catch (error) {
    console.error("REGISTER_ERROR", error);
    if (error?.code === "P2002") {
      return response.status(409).json({
        message: "Un compte existe déjà avec cette adresse email.",
      });
    }
    return response.status(500).json({
      message: "Impossible de créer le compte pour le moment. Vérifiez la connexion à la base de données.",
    });
  }
});

app.post("/api/auth/verify-registration", async (request, response) => {
  try {
    const { email, emailCode, phoneCode } = request.body || {};
    const normalizedEmail = String(email || "").trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: { profile: true, partner: true, company: true },
    });

    if (!user) {
      return response.status(404).json({ message: "Compte introuvable." });
    }

    await verifyCode({
      userId: user.id,
      email: normalizedEmail,
      channel: "EMAIL",
      code: emailCode,
    });

    await verifyCode({
      userId: user.id,
      phone: user.phone,
      channel: "PHONE",
      code: phoneCode,
    });

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        phoneVerified: true,
        isActive: true,
        notifications: {
          create: [
            {
              title: "Email vérifié",
              message: "Votre adresse email a été vérifiée avec succès.",
              type: "EMAIL_VERIFIED",
            },
            {
              title: "Téléphone vérifié",
              message: "Votre numéro de téléphone a été vérifié avec succès.",
              type: "PHONE_VERIFIED",
            },
          ],
        },
      },
      include: { profile: true, partner: true, company: true },
    });

    const safeUser = sanitizeUser(updatedUser);
    return response.json({ message: "Compte activé avec succès.", user: safeUser, token: createSessionToken(updatedUser) });
  } catch (error) {
    console.error("VERIFY_REGISTER_ERROR", error);
    return response.status(400).json({
      message: error.message || "Code de vérification invalide ou expiré.",
    });
  }
});

app.post("/api/auth/resend-verification", async (request, response) => {
  try {
    const { email } = request.body || {};
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) return response.status(404).json({ message: "Compte introuvable." });

    const emailCode = generateCode();
    const phoneCode = generateCode();
    await prisma.verificationCode.updateMany({
      where: { userId: user.id, purpose: "REGISTER", used: false },
      data: { used: true },
    });
    await prisma.verificationCode.createMany({
      data: [
        await buildVerificationCode({ userId: user.id, email: user.email, channel: "EMAIL", code: emailCode }),
        await buildVerificationCode({ userId: user.id, phone: user.phone, channel: "PHONE", code: phoneCode }),
      ],
    });
    await sendEmailCode(user.email, emailCode);
    await sendSmsCode(user.phone, phoneCode);

    return response.json({
      message: "Nouveaux codes envoyés.",
      devVerification: isProduction() ? undefined : { emailCode, phoneCode, expiresInMinutes: verificationTtlMinutes },
    });
  } catch (error) {
    console.error("RESEND_VERIFICATION_ERROR", error);
    return response.status(500).json({ message: "Impossible de renvoyer les codes." });
  }
});

app.post("/api/auth/login", async (request, response) => {
  try {
    const { email, password } = request.body || {};
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return response.status(400).json({
        message: "Email et mot de passe sont obligatoires.",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: { profile: true, partner: true, company: true },
    });

    if (!user) {
      return response.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    const passwordIsValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordIsValid) {
      return response.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    if (!user.isActive || !user.emailVerified || !user.phoneVerified) {
      return response.status(403).json({
        message: "Veuillez vérifier votre email et votre téléphone avant de vous connecter.",
        requiresVerification: true,
      });
    }

    return response.json({ message: "Connexion réussie.", user: sanitizeUser(user), token: createSessionToken(user) });
  } catch (error) {
    console.error("LOGIN_ERROR", error);
    return response.status(500).json({ message: "Impossible de se connecter pour le moment." });
  }
});

app.get("/api/auth/me", requireAuth(), async (request, response) => {
  const user = await prisma.user.findUnique({
    where: { id: request.auth.sub },
    include: { profile: true, partner: true, company: true },
  });

  if (!user) return response.status(404).json({ message: "Utilisateur introuvable." });
  return response.json({ user: sanitizeUser(user) });
});

app.post("/api/auth/oauth-sync", async (request, response) => {
  try {
    const { email, fullName, avatar, accessToken } = request.body || {};
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return response.status(400).json({ message: "Email Google invalide." });
    }

    const verifiedSupabaseUser = await verifySupabaseAccessToken(accessToken);
    if (verifiedSupabaseUser) {
      const supabaseEmail = String(verifiedSupabaseUser.email || "").trim().toLowerCase();
      if (supabaseEmail !== normalizedEmail) {
        return response.status(403).json({ message: "La session Google ne correspond pas à cet email." });
      }
    }

    const displayName =
      fullName ||
      verifiedSupabaseUser?.user_metadata?.full_name ||
      verifiedSupabaseUser?.user_metadata?.name ||
      normalizedEmail.split("@")[0];
    const avatarUrl = avatar || verifiedSupabaseUser?.user_metadata?.avatar_url || null;

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: { profile: true, partner: true, company: true },
    });

    if (existingUser) {
      const updatedUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          emailVerified: true,
          isActive: true,
          profile: {
            upsert: {
              create: { avatar: avatarUrl, interests: existingUser.interests || [] },
              update: { avatar: existingUser.profile?.avatar || avatarUrl },
            },
          },
        },
        include: { profile: true, partner: true, company: true },
      });

      return response.json({
        message: "Connexion Google réussie.",
        user: sanitizeUser(updatedUser),
        token: createSessionToken(updatedUser),
      });
    }

    const passwordHash = await bcrypt.hash(`OAUTH_GOOGLE_ACCOUNT:${normalizedEmail}:${Date.now()}`, 12);
    const newUser = await prisma.user.create({
      data: {
        fullName: displayName,
        email: normalizedEmail,
        passwordHash,
        role: "USER",
        interests: [],
        emailVerified: true,
        phoneVerified: false,
        isActive: true,
        profile: {
          create: {
            avatar: avatarUrl,
            interests: [],
          },
        },
        notifications: {
          create: {
            title: "Connexion Google activée",
            message: "Votre compte CoWorki est maintenant lié à Google.",
            type: "GOOGLE_OAUTH_LINKED",
          },
        },
      },
      include: { profile: true, partner: true, company: true },
    });

    return response.status(201).json({
      message: "Compte Google synchronisé avec CoWorki.",
      user: sanitizeUser(newUser),
      token: createSessionToken(newUser),
    });
  } catch (error) {
    console.error("OAUTH_SYNC_ERROR", error);
    return response.status(500).json({ message: "Impossible de synchroniser le compte Google." });
  }
});

app.get("/api/spaces", async (_request, response) => {
  const spaces = await prisma.space.findMany({
    where: { isPublished: true },
    include: { reviews: true },
    orderBy: { createdAt: "desc" },
  });
  response.json({ spaces });
});

app.get("/api/spaces/:id", async (request, response) => {
  const space = await prisma.space.findUnique({
    where: { id: request.params.id },
    include: { reviews: { include: { user: { select: { fullName: true, avatar: true } } }, partner: true } },
  });

  if (!space) return response.status(404).json({ message: "Espace introuvable." });
  response.json({ space });
});

app.get("/api/spaces/:id/reviews", async (request, response) => {
  const reviews = await prisma.review.findMany({
    where: { spaceId: request.params.id },
    include: { user: { select: { fullName: true, avatar: true } } },
    orderBy: { createdAt: "desc" },
  });
  response.json({ reviews });
});

app.post("/api/reservations", requireAuth(["USER", "ADMIN"]), async (request, response) => {
  try {
    const { spaceId, space, date, duration, total, people = 1 } = request.body || {};
    const safeSpace = await findOrCreateSpace(spaceId, space);
    if (!safeSpace) return response.status(404).json({ message: "Espace introuvable." });

    const reservationDate = date ? new Date(date) : null;
    if (!reservationDate || Number.isNaN(reservationDate.getTime())) {
      return response.status(400).json({ message: "Date de réservation invalide." });
    }

    const reservation = await prisma.reservation.create({
      data: {
        userId: request.auth.sub,
        spaceId: safeSpace.id,
        date: reservationDate,
        duration: duration || "2h",
        total: Math.max(0, Number(total) || 0),
        status: "PENDING",
      },
      include: { space: true, user: { select: { fullName: true, email: true } } },
    });

    await prisma.notification.create({
      data: {
        userId: request.auth.sub,
        title: "Réservation envoyée",
        message: `Votre réservation chez ${safeSpace.name} est en attente de confirmation.`,
        type: "RESERVATION_CREATED",
      },
    });

    await notifyPartnerForSpace(safeSpace, {
      title: "Nouvelle réservation reçue",
      message: `${reservation.user.fullName} a demandé une réservation pour ${people} personne(s).`,
      type: "PARTNER_NEW_RESERVATION",
    });

    await notifyAdmins({
      title: "Nouvelle réservation",
      message: `${reservation.user.fullName} a réservé ${safeSpace.name}.`,
      type: "ADMIN_NEW_RESERVATION",
    });

    response.status(201).json({ message: "Réservation enregistrée avec succès.", reservation });
  } catch (error) {
    console.error("CREATE_RESERVATION_ERROR", error);
    response.status(500).json({ message: "Impossible d’enregistrer la réservation." });
  }
});

app.get("/api/reservations/my", requireAuth(["USER", "ADMIN"]), async (request, response) => {
  const reservations = await prisma.reservation.findMany({
    where: { userId: request.auth.sub },
    include: { space: true },
    orderBy: { createdAt: "desc" },
  });
  response.json({ reservations });
});

app.post("/api/reservations/:id/cancel", requireAuth(["USER", "ADMIN"]), async (request, response) => {
  const reservation = await prisma.reservation.findFirst({
    where: { id: request.params.id, ...(request.auth.role === "ADMIN" ? {} : { userId: request.auth.sub }) },
    include: { space: true },
  });
  if (!reservation) return response.status(404).json({ message: "Réservation introuvable." });

  const updated = await prisma.reservation.update({
    where: { id: reservation.id },
    data: {
      status: "CANCELLED",
      user: {
        update: {
          notifications: {
            create: {
              title: "Réservation annulée",
              message: `Votre réservation chez ${reservation.space.name} a été annulée.`,
              type: "RESERVATION_CANCELLED",
            },
          },
        },
      },
    },
    include: { space: true },
  });
  response.json({ message: "Réservation annulée.", reservation: updated });
});

app.post("/api/favorites", requireAuth(["USER", "ADMIN"]), async (request, response) => {
  const { spaceId, space } = request.body || {};
  const safeSpace = await findOrCreateSpace(spaceId, space);
  if (!safeSpace) return response.status(404).json({ message: "Espace introuvable." });

  const favorite = await prisma.favorite.upsert({
    where: { userId_spaceId: { userId: request.auth.sub, spaceId: safeSpace.id } },
    update: {},
    create: { userId: request.auth.sub, spaceId: safeSpace.id },
    include: { space: true },
  });
  response.status(201).json({ message: "Espace ajouté aux favoris.", favorite });
});

app.delete("/api/favorites/:spaceId", requireAuth(["USER", "ADMIN"]), async (request, response) => {
  await prisma.favorite.deleteMany({
    where: { userId: request.auth.sub, spaceId: request.params.spaceId },
  });
  response.json({ message: "Espace retiré des favoris." });
});

app.get("/api/favorites/my", requireAuth(["USER", "ADMIN"]), async (request, response) => {
  const favorites = await prisma.favorite.findMany({
    where: { userId: request.auth.sub },
    include: { space: true },
    orderBy: { createdAt: "desc" },
  });
  response.json({ favorites });
});

app.post("/api/reviews", requireAuth(["USER", "ADMIN"]), async (request, response) => {
  const { spaceId, rating, comment } = request.body || {};
  const reservation = await prisma.reservation.findFirst({
    where: { userId: request.auth.sub, spaceId, status: "COMPLETED" },
  });

  if (!reservation && request.auth.role !== "ADMIN") {
    return response.status(403).json({ message: "Vous pouvez laisser un avis après une réservation terminée." });
  }

  const review = await prisma.review.create({
    data: {
      userId: request.auth.sub,
      spaceId,
      rating: Math.min(5, Math.max(1, Number(rating) || 5)),
      comment: comment || null,
    },
    include: { user: { select: { fullName: true, avatar: true } } },
  });
  response.status(201).json({ message: "Avis publié.", review });
});

app.get("/api/notifications/:userId", requireAuth(), async (request, response) => {
  if (request.auth.role !== "ADMIN" && request.auth.sub !== request.params.userId) {
    return response.status(403).json({ message: "Accès non autorisé." });
  }

  const notifications = await prisma.notification.findMany({
    where: { userId: request.params.userId },
    orderBy: { createdAt: "desc" },
    take: 30,
  });
  response.json({ notifications, unreadCount: notifications.filter((item) => !item.read).length });
});

app.patch("/api/notifications/:id/read", requireAuth(), async (request, response) => {
  const notification = await prisma.notification.update({
    where: { id: request.params.id },
    data: { read: true },
  });
  response.json({ notification });
});

app.get("/api/notifications", requireAuth(), async (request, response) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: request.auth.sub },
    orderBy: { createdAt: "desc" },
    take: 40,
  });
  response.json({ notifications, unreadCount: notifications.filter((item) => !item.read).length });
});

app.post("/api/notifications/:id/read", requireAuth(), async (request, response) => {
  const notification = await prisma.notification.update({
    where: { id: request.params.id },
    data: { read: true },
  });
  response.json({ notification });
});

app.post("/api/notifications/read-all", requireAuth(), async (request, response) => {
  await prisma.notification.updateMany({
    where: { userId: request.auth.sub, read: false },
    data: { read: true },
  });
  response.json({ message: "Notifications marquées comme lues." });
});

app.get("/api/admin/overview", requireAuth(["ADMIN"]), async (_request, response) => {
  const [users, partners, pendingPartners, companies, reservations] = await Promise.all([
    prisma.user.count(),
    prisma.partner.count(),
    prisma.partner.count({ where: { status: "PENDING" } }),
    prisma.company.count(),
    prisma.reservation.count(),
  ]);
  response.json({
    stats: {
      users,
      partners,
      pendingPartners,
      companies,
      reservations,
    },
  });
});

app.get("/api/admin/partners", requireAuth(["ADMIN"]), async (request, response) => {
  const status = request.query.status;
  const partners = await prisma.partner.findMany({
    where: status ? { status } : undefined,
    include: { user: { select: publicUserSelect() } },
    orderBy: { createdAt: "desc" },
  });
  response.json({ partners });
});

app.patch("/api/admin/partners/:partnerId/status", requireAuth(["ADMIN"]), async (request, response) => {
  const { status } = request.body || {};
  if (!["APPROVED", "REJECTED", "PENDING"].includes(status)) {
    return response.status(400).json({ message: "Statut partenaire invalide." });
  }

  const partner = await prisma.partner.update({
    where: { id: request.params.partnerId },
    data: { status },
    include: { user: true },
  });

  await prisma.notification.create({
    data: {
      userId: partner.userId,
      title: status === "APPROVED" ? "Compte partenaire approuvé" : status === "REJECTED" ? "Compte partenaire refusé" : "Compte partenaire en attente",
      message: status === "APPROVED" ? "Votre espace partenaire est maintenant validé par CoWorki." : status === "REJECTED" ? "Votre demande partenaire a été refusée par l’administration." : "Votre demande partenaire est en attente de validation.",
      type: `PARTNER_${status}`,
    },
  });

  response.json({ partner });
});

app.post("/api/admin/partners/:partnerId/approve", requireAuth(["ADMIN"]), async (request, response) => {
  request.body = { status: "APPROVED" };
  return updatePartnerStatus(request, response);
});

app.post("/api/admin/partners/:partnerId/reject", requireAuth(["ADMIN"]), async (request, response) => {
  request.body = { status: "REJECTED" };
  return updatePartnerStatus(request, response);
});

app.get("/api/admin/users", requireAuth(["ADMIN"]), async (_request, response) => {
  const users = await prisma.user.findMany({
    select: publicUserSelect(),
    orderBy: { createdAt: "desc" },
  });
  response.json({ users });
});

app.get("/api/admin/reservations", requireAuth(["ADMIN"]), async (_request, response) => {
  const reservations = await prisma.reservation.findMany({
    include: {
      user: { select: { fullName: true, email: true } },
      space: { include: { partner: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  response.json({ reservations });
});

app.get("/api/partner/:userId/dashboard", requireAuth(["PARTNER", "ADMIN"]), async (request, response) => {
  if (request.auth.role !== "ADMIN" && request.auth.sub !== request.params.userId) {
    return response.status(403).json({ message: "Accès non autorisé." });
  }

  const partner = await prisma.partner.findUnique({
    where: { userId: request.params.userId },
    include: {
      spaces: {
        include: {
          reservations: true,
          reviews: true,
          dailyCapacities: true,
        },
      },
    },
  });

  if (!partner) return response.status(404).json({ message: "Partenaire introuvable." });

  const today = startOfDay(new Date());
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const reservations = partner.spaces.flatMap((space) => space.reservations);
  const todayReservations = reservations.filter((reservation) => startOfDay(reservation.date).getTime() === today.getTime());
  const monthReservations = reservations.filter((reservation) => reservation.date >= monthStart);
  const reviews = partner.spaces.flatMap((space) => space.reviews);

  response.json({
    partner,
    stats: {
      todayReservations: todayReservations.length,
      monthReservations: monthReservations.length,
      monthRevenue: monthReservations.reduce((sum, reservation) => sum + reservation.total, 0),
      occupancyRate: 0,
      status: partner.status,
    },
    todayReservations,
    monthReservations,
    reviews,
    recommendations: [
      "Ajoutez votre premier espace pour commencer à recevoir des réservations.",
      "Améliorez les photos de l’espace pour augmenter le taux de conversion.",
      "Mettez à jour la capacité journalière pour éviter les créneaux indisponibles.",
    ],
  });
});

app.get("/api/partner/reservations", requireAuth(["PARTNER", "ADMIN"]), async (request, response) => {
  const partner = await prisma.partner.findUnique({
    where: { userId: request.auth.sub },
    include: { spaces: { select: { id: true } } },
  });
  if (!partner && request.auth.role !== "ADMIN") return response.status(404).json({ message: "Partenaire introuvable." });

  const reservations = await prisma.reservation.findMany({
    where: request.auth.role === "ADMIN" ? {} : { spaceId: { in: partner.spaces.map((space) => space.id) } },
    include: { user: { select: { fullName: true, email: true } }, space: true },
    orderBy: { date: "desc" },
  });
  response.json({ reservations });
});

app.post("/api/partner/reservations/:id/confirm", requireAuth(["PARTNER", "ADMIN"]), async (request, response) => {
  return updateReservationByPartner(request, response, "CONFIRMED");
});

app.post("/api/partner/reservations/:id/cancel", requireAuth(["PARTNER", "ADMIN"]), async (request, response) => {
  return updateReservationByPartner(request, response, "CANCELLED");
});

app.post("/api/partner/reservations/:id/complete", requireAuth(["PARTNER", "ADMIN"]), async (request, response) => {
  return updateReservationByPartner(request, response, "COMPLETED");
});

app.patch("/api/partner/capacity/:spaceId", requireAuth(["PARTNER", "ADMIN"]), async (request, response) => {
  const { capacity } = request.body || {};
  const safeCapacity = Math.max(0, Number(capacity) || 0);
  const today = startOfDay(new Date());
  const dailyCapacity = await prisma.dailyCapacity.upsert({
    where: { spaceId_date: { spaceId: request.params.spaceId, date: today } },
    update: { capacity: safeCapacity, remainingCapacity: safeCapacity },
    create: { spaceId: request.params.spaceId, date: today, capacity: safeCapacity, remainingCapacity: safeCapacity },
  });
  response.json({ dailyCapacity });
});

app.use((_request, response) => {
  response.status(404).json({ message: "Route API introuvable." });
});

app.listen(PORT, () => {
  console.log(`CoWorki API running on http://localhost:${PORT}`);
});

function publicUserSelect() {
  return {
    id: true,
    fullName: true,
    email: true,
    phone: true,
    role: true,
    interests: true,
    emailVerified: true,
    phoneVerified: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
    profile: true,
    partner: true,
    company: true,
  };
}

function normalizeTunisianPhone(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  const localDigits = digits.startsWith("216") ? digits.slice(3) : digits;
  if (!/^\d{8}$/.test(localDigits)) return null;
  const normalized = `+216${localDigits}`;
  return tunisianPhoneRegex.test(normalized) ? normalized : null;
}

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function buildVerificationCode({ userId, email, phone, channel, code }) {
  return {
    userId,
    email: email || null,
    phone: phone || null,
    channel,
    purpose: "REGISTER",
    codeHash: await bcrypt.hash(code, 10),
    expiresAt: new Date(Date.now() + verificationTtlMinutes * 60 * 1000),
  };
}

async function verifyCode({ userId, email, phone, channel, code }) {
  const verificationCode = await prisma.verificationCode.findFirst({
    where: {
      userId,
      email: email || undefined,
      phone: phone || undefined,
      channel,
      purpose: "REGISTER",
      used: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!verificationCode) {
    throw new Error("Code expiré ou introuvable.");
  }

  const codeIsValid = await bcrypt.compare(String(code || ""), verificationCode.codeHash);
  if (!codeIsValid) {
    throw new Error("Code de vérification incorrect.");
  }

  await prisma.verificationCode.update({
    where: { id: verificationCode.id },
    data: { used: true },
  });
}

async function notifyAdmins({ title, message, type }) {
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
    select: { id: true },
  });

  if (!admins.length) return;

  await prisma.notification.createMany({
    data: admins.map((admin) => ({
      userId: admin.id,
      title,
      message,
      type,
    })),
  });
}

async function notifyPartnerForSpace(space, notification) {
  if (!space.partnerId) return;
  const partner = await prisma.partner.findUnique({
    where: { id: space.partnerId },
    select: { userId: true },
  });
  if (!partner?.userId) return;

  await prisma.notification.create({
    data: {
      userId: partner.userId,
      title: notification.title,
      message: notification.message,
      type: notification.type,
    },
  });
}

async function findOrCreateSpace(spaceId, spacePayload = {}) {
  if (!spaceId) return null;

  const existingSpace = await prisma.space.findUnique({ where: { id: spaceId } });
  if (existingSpace) return existingSpace;

  if (!spacePayload?.name) return null;

  return prisma.space.create({
    data: {
      id: spaceId,
      name: spacePayload.name,
      city: spacePayload.city || "Tunis",
      address: spacePayload.address || "Tunisie",
      description: spacePayload.description || null,
      services: Array.isArray(spacePayload.services) ? spacePayload.services : [],
      images: Array.isArray(spacePayload.images) ? spacePayload.images.slice(0, 6) : [],
      price2h: Number.parseInt(spacePayload.price, 10) || 15,
      price4h: Math.round((Number.parseInt(spacePayload.price, 10) || 15) * 1.7),
      priceDay: Math.round((Number.parseInt(spacePayload.price, 10) || 15) * 2.5),
      capacity: Number.parseInt(spacePayload.capacity, 10) || null,
      isPublished: true,
    },
  });
}

async function updatePartnerStatus(request, response) {
  const { status } = request.body || {};
  if (!["APPROVED", "REJECTED", "PENDING"].includes(status)) {
    return response.status(400).json({ message: "Statut partenaire invalide." });
  }

  const partner = await prisma.partner.update({
    where: { id: request.params.partnerId },
    data: { status },
    include: { user: true },
  });

  await prisma.notification.create({
    data: {
      userId: partner.userId,
      title: status === "APPROVED" ? "Compte partenaire approuvé" : status === "REJECTED" ? "Compte partenaire refusé" : "Compte partenaire en attente",
      message: status === "APPROVED" ? "Votre espace partenaire est maintenant validé par CoWorki." : status === "REJECTED" ? "Votre demande partenaire a été refusée par l’administration." : "Votre demande partenaire est en attente de validation.",
      type: `PARTNER_${status}`,
    },
  });

  await prisma.adminActionLog.create({
    data: {
      adminId: request.auth.sub,
      action: `PARTNER_${status}`,
      targetId: partner.id,
      targetType: "Partner",
    },
  });

  return response.json({ partner });
}

async function updateReservationByPartner(request, response, status) {
  const reservation = await prisma.reservation.findUnique({
    where: { id: request.params.id },
    include: { user: true, space: { include: { partner: true } } },
  });

  if (!reservation) return response.status(404).json({ message: "Réservation introuvable." });
  if (request.auth.role !== "ADMIN" && reservation.space.partner?.userId !== request.auth.sub) {
    return response.status(403).json({ message: "Vous n’avez pas accès à cette réservation." });
  }

  const updated = await prisma.reservation.update({
    where: { id: reservation.id },
    data: { status },
    include: { user: true, space: true },
  });

  const readableStatus = status === "CONFIRMED" ? "confirmée" : status === "CANCELLED" ? "annulée" : "terminée";
  await prisma.notification.create({
    data: {
      userId: reservation.userId,
      title: `Réservation ${readableStatus}`,
      message: `Votre réservation chez ${reservation.space.name} est ${readableStatus}.`,
      type: `RESERVATION_${status}`,
    },
  });

  await notifyAdmins({
    title: `Réservation ${readableStatus}`,
    message: `${reservation.space.name} a marqué une réservation comme ${readableStatus}.`,
    type: `ADMIN_RESERVATION_${status}`,
  });

  return response.json({ message: `Réservation ${readableStatus}.`, reservation: updated });
}

async function sendEmailCode(email, code) {
  if (isProduction()) {
    console.log(`EMAIL_VERIFICATION_PENDING_PROVIDER ${email}`);
    return;
  }
  console.log(`DEV_EMAIL_CODE ${email}: ${code}`);
}

async function sendSmsCode(phone, code) {
  if (isProduction()) {
    console.log(`SMS_VERIFICATION_PENDING_PROVIDER ${phone}`);
    return;
  }
  console.log(`DEV_SMS_CODE ${phone}: ${code}`);
}

async function verifySupabaseAccessToken(accessToken) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!accessToken || !supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/auth/v1/user`, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Session Google Supabase invalide.");
  }

  return response.json();
}

function sanitizeUser(user) {
  const safeUser = { ...user };
  delete safeUser.passwordHash;
  return safeUser;
}

function createSessionToken(user) {
  const payload = {
    sub: user.id,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + sessionTtlSeconds,
  };
  return signToken(payload);
}

function requireAuth(roles = []) {
  return (request, response, next) => {
    const header = request.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    const payload = verifyToken(token);

    if (!payload) {
      return response.status(401).json({ message: "Connexion requise." });
    }

    if (roles.length && !roles.includes(payload.role)) {
      return response.status(403).json({ message: "Vous n’avez pas les droits nécessaires." });
    }

    request.auth = payload;
    return next();
  };
}

function signToken(payload) {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = toBase64Url(JSON.stringify(header));
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = crypto
    .createHmac("sha256", sessionSecret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

function verifyToken(token) {
  const parts = String(token || "").split(".");
  if (parts.length !== 3) return null;
  const [header, payload, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", sessionSecret)
    .update(`${header}.${payload}`)
    .digest("base64url");

  const signatureBuffer = Buffer.from(signature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);
  if (
    signatureBuffer.length !== expectedSignatureBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedSignatureBuffer)
  ) {
    return null;
  }

  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!decoded.exp || decoded.exp < Math.floor(Date.now() / 1000)) return null;
    return decoded;
  } catch {
    return null;
  }
}

function toBase64Url(value) {
  return Buffer.from(value).toString("base64url");
}

function startOfDay(date) {
  const nextDate = new Date(date);
  nextDate.setHours(0, 0, 0, 0);
  return nextDate;
}

function isProduction() {
  return process.env.NODE_ENV === "production";
}
