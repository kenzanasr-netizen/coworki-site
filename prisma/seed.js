import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/* global process */

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const passwordHash = await bcrypt.hash("Admin123456!", 12);

const admin = await prisma.user.upsert({
  where: { email: "admin@coworki.tn" },
  update: { role: "ADMIN", isActive: true, emailVerified: true },
  create: {
    fullName: "Admin CoWorki",
    email: "admin@coworki.tn",
    passwordHash,
    role: "ADMIN",
    interests: [],
    emailVerified: true,
    phoneVerified: true,
    isActive: true,
    profile: { create: { city: "Tunis", occupation: "Administrateur", interests: [] } },
  },
});

const user = await prisma.user.upsert({
  where: { email: "lina@coworki.tn" },
  update: { isActive: true, emailVerified: true },
  create: {
    fullName: "Lina Ferchichi",
    email: "lina@coworki.tn",
    passwordHash: await bcrypt.hash("User123456!", 12),
    phone: "+21622123456",
    role: "USER",
    interests: ["Design", "IA", "Marketing digital"],
    emailVerified: true,
    phoneVerified: true,
    isActive: true,
    profile: { create: { city: "Tunis", occupation: "Étudiante / freelance", interests: ["Design", "IA", "Marketing digital"] } },
  },
});

const partnerUser = await prisma.user.upsert({
  where: { email: "partner@coworki.tn" },
  update: { isActive: true, emailVerified: true },
  create: {
    fullName: "Friends Lab Coworking Space",
    email: "partner@coworki.tn",
    passwordHash: await bcrypt.hash("Partner123456!", 12),
    phone: "+21625111222",
    role: "PARTNER",
    interests: [],
    emailVerified: true,
    phoneVerified: true,
    isActive: true,
    profile: { create: { city: "Tunis", occupation: "Partenaire", interests: [] } },
  },
});

const partner = await prisma.partner.upsert({
  where: { userId: partnerUser.id },
  update: { status: "APPROVED" },
  create: { userId: partnerUser.id, companyName: "Friends Lab Coworking Space", status: "APPROVED" },
});

const spaces = [
  {
    id: "friends-lab",
    name: "FRIENDS LAB COWORKING SPACE",
    city: "Tunis",
    address: "1 Rue de Monastir, Tunis",
    description: "Espace convivial et moderne adapté aux étudiants, freelances et jeunes entrepreneurs.",
    services: ["Wi-Fi", "Café", "Salle réunion", "Espace calme", "Imprimante"],
    images: ["/spaces/friends-lab-1.png", "/spaces/friends-lab-2.png", "/spaces/friends-lab-3.png"],
    price2h: 15,
    price4h: 20,
    priceDay: 30,
    capacity: 20,
  },
  {
    id: "pixel-coworking",
    name: "Pixel Coworking Tunis",
    city: "Tunis",
    address: "Montplaisir, Tunis",
    description: "Espace professionnel propre, moderne et pratique pour les petites équipes.",
    services: ["Wi-Fi", "Salle réunion", "Climatisation", "Projecteur"],
    images: ["/spaces/pixel-1.png", "/spaces/pixel-2.png", "/spaces/pixel-3.png"],
    price2h: 20,
    price4h: 35,
    priceDay: 50,
    capacity: 12,
  },
];

for (const space of spaces) {
  await prisma.space.upsert({
    where: { id: space.id },
    update: { ...space, partnerId: partner.id, isPublished: true },
    create: { ...space, partnerId: partner.id, isPublished: true },
  });
}

await prisma.notification.createMany({
  data: [
    { userId: admin.id, title: "Seed CoWorki", message: "Données de démonstration prêtes pour le jury.", type: "SEED" },
    { userId: user.id, title: "Bienvenue Lina", message: "Votre espace utilisateur CoWorki est prêt.", type: "WELCOME" },
    { userId: partnerUser.id, title: "Compte partenaire approuvé", message: "Votre espace partenaire est prêt pour les réservations.", type: "PARTNER_APPROVED" },
  ],
  skipDuplicates: true,
});

await prisma.$disconnect();
console.log("Seed CoWorki terminé.");
