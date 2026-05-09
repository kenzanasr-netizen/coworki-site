import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
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
    } = request.body || {};

    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedRole = roleMap[String(role).toLowerCase()] || "USER";

    if (!fullName || !normalizedEmail || !password) {
      return response.status(400).json({
        message: "Le nom complet, l’email et le mot de passe sont obligatoires.",
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

    const user = await prisma.user.create({
      data: {
        fullName,
        email: normalizedEmail,
        passwordHash,
        phone: phone || null,
        role: normalizedRole,
        interests: safeInterests,
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
                },
              },
            }
          : {}),
      },
      select: publicUserSelect(),
    });

    return response.status(201).json({
      message: "Compte créé avec succès.",
      user,
    });
  } catch (error) {
    console.error("REGISTER_ERROR", error);
    return response.status(500).json({
      message: "Impossible de créer le compte pour le moment.",
    });
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

    const safeUser = { ...user };
    delete safeUser.passwordHash;
    return response.json({ message: "Connexion réussie.", user: safeUser });
  } catch (error) {
    console.error("LOGIN_ERROR", error);
    return response.status(500).json({ message: "Impossible de se connecter pour le moment." });
  }
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
    createdAt: true,
    updatedAt: true,
    profile: true,
    partner: true,
    company: true,
  };
}
