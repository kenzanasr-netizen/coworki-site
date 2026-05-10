import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/* global process */

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const partnerEmail = "exempleespace@coworki.com";
const clientEmail = "clientdemo@coworki.com";
const spaceId = "exemple-espace";
const today = new Date();
today.setHours(10, 0, 0, 0);
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

async function main() {
  const partnerPasswordHash = await bcrypt.hash("exempleespace2026", 12);
  const clientPasswordHash = await bcrypt.hash("clientdemo2026", 12);

  const partnerUser = await prisma.user.upsert({
    where: { email: partnerEmail },
    update: {
      fullName: "Exemple Espace",
      passwordHash: partnerPasswordHash,
      phone: "+21622111111",
      role: "PARTNER",
      emailVerified: true,
      phoneVerified: true,
      isActive: true,
      profileCompleted: true,
      profile: {
        upsert: {
          create: { city: "Sousse", occupation: "Partenaire coworking", interests: [] },
          update: { city: "Sousse", occupation: "Partenaire coworking", interests: [] },
        },
      },
    },
    create: {
      fullName: "Exemple Espace",
      email: partnerEmail,
      passwordHash: partnerPasswordHash,
      phone: "+21622111111",
      role: "PARTNER",
      interests: [],
      emailVerified: true,
      phoneVerified: true,
      isActive: true,
      profileCompleted: true,
      profile: {
        create: { city: "Sousse", occupation: "Partenaire coworking", interests: [] },
      },
    },
  });

  const clientUser = await prisma.user.upsert({
    where: { email: clientEmail },
    update: {
      fullName: "Client Demo",
      passwordHash: clientPasswordHash,
      phone: "+21622999999",
      role: "USER",
      interests: ["Travail calme", "Networking"],
      emailVerified: true,
      phoneVerified: true,
      isActive: true,
      profileCompleted: true,
      profile: {
        upsert: {
          create: { city: "Sousse", occupation: "Utilisateur démo", interests: ["Travail calme", "Networking"] },
          update: { city: "Sousse", occupation: "Utilisateur démo", interests: ["Travail calme", "Networking"] },
        },
      },
    },
    create: {
      fullName: "Client Demo",
      email: clientEmail,
      passwordHash: clientPasswordHash,
      phone: "+21622999999",
      role: "USER",
      interests: ["Travail calme", "Networking"],
      emailVerified: true,
      phoneVerified: true,
      isActive: true,
      profileCompleted: true,
      profile: {
        create: { city: "Sousse", occupation: "Utilisateur démo", interests: ["Travail calme", "Networking"] },
      },
    },
  });

  const partner = await prisma.partner.upsert({
    where: { userId: partnerUser.id },
    update: {
      companyName: "Exemple Espace Coworking",
      status: "APPROVED",
    },
    create: {
      userId: partnerUser.id,
      companyName: "Exemple Espace Coworking",
      status: "APPROVED",
    },
  });

  const space = await prisma.space.upsert({
    where: { id: spaceId },
    update: {
      partnerId: partner.id,
      name: "Exemple Espace",
      city: "Sousse",
      address: "Avenue Yasser Arafat, Sahloul, Sousse, Tunisie",
      description:
        "Exemple Espace est un espace de coworking moderne conçu pour les étudiants, freelances, entrepreneurs et petites équipes. Il propose un environnement calme, flexible et professionnel pour travailler, organiser des réunions et développer ses projets.",
      services: ["Wi-Fi haut débit", "Salle de réunion", "Café", "Imprimante", "Climatisation", "Open space", "Bureau privé", "Parking"],
      images: ["/spaces/spaces-tunis-1.png", "/spaces/spaces-tunis-2.png", "/spaces/spaces-tunis-3.png"],
      price2h: 15,
      price4h: 25,
      priceDay: 40,
      capacity: 30,
      isPublished: true,
    },
    create: {
      id: spaceId,
      partnerId: partner.id,
      name: "Exemple Espace",
      city: "Sousse",
      address: "Avenue Yasser Arafat, Sahloul, Sousse, Tunisie",
      description:
        "Exemple Espace est un espace de coworking moderne conçu pour les étudiants, freelances, entrepreneurs et petites équipes. Il propose un environnement calme, flexible et professionnel pour travailler, organiser des réunions et développer ses projets.",
      services: ["Wi-Fi haut débit", "Salle de réunion", "Café", "Imprimante", "Climatisation", "Open space", "Bureau privé", "Parking"],
      images: ["/spaces/spaces-tunis-1.png", "/spaces/spaces-tunis-2.png", "/spaces/spaces-tunis-3.png"],
      price2h: 15,
      price4h: 25,
      priceDay: 40,
      capacity: 30,
      isPublished: true,
    },
  });

  await prisma.dailyCapacity.upsert({
    where: { spaceId_date: { spaceId: space.id, date: startOfDay(today) } },
    update: { capacity: 30, remainingCapacity: 22 },
    create: { spaceId: space.id, date: startOfDay(today), capacity: 30, remainingCapacity: 22 },
  });

  await upsertReservation({
    id: "demo-reservation-pending",
    userId: clientUser.id,
    spaceId: space.id,
    date: today,
    duration: "2h",
    total: 15,
    status: "PENDING",
  });

  await upsertReservation({
    id: "demo-reservation-confirmed",
    userId: clientUser.id,
    spaceId: space.id,
    date: tomorrow,
    duration: "journée",
    total: 40,
    status: "CONFIRMED",
  });

  await upsertReview({
    id: "demo-review-5",
    userId: clientUser.id,
    spaceId: space.id,
    rating: 5,
    comment: "Très bon espace, calme et bien équipé.",
  });

  await upsertReview({
    id: "demo-review-4",
    userId: clientUser.id,
    spaceId: space.id,
    rating: 4,
    comment: "Bonne expérience, idéal pour travailler en groupe.",
  });

  await createNotificationIfMissing({
    userId: partnerUser.id,
    title: "Nouvelle réservation reçue",
    message: "Client Demo a demandé une réservation de 2h pour aujourd’hui.",
    type: "DEMO_BOOKING",
  });

  await createNotificationIfMissing({
    userId: partnerUser.id,
    title: "Votre espace est publié",
    message: "Exemple Espace est maintenant visible dans la liste des espaces CoWorki.",
    type: "DEMO_SPACE_PUBLISHED",
  });

  await createNotificationIfMissing({
    userId: partnerUser.id,
    title: "Pensez à mettre à jour votre capacité disponible",
    message: "Votre capacité du jour est définie à 30 places, avec 22 places restantes.",
    type: "DEMO_CAPACITY_REMINDER",
  });

  console.log("Compte partenaire démo prêt.");
  console.log(`Connexion partenaire: ${partnerEmail} / exempleespace2026`);
  console.log(`Connexion client: ${clientEmail} / clientdemo2026`);
}

async function upsertReservation(data) {
  await prisma.reservation.upsert({
    where: { id: data.id },
    update: data,
    create: data,
  });
}

async function upsertReview(data) {
  await prisma.review.upsert({
    where: { id: data.id },
    update: data,
    create: data,
  });
}

async function createNotificationIfMissing(data) {
  const exists = await prisma.notification.findFirst({
    where: {
      userId: data.userId,
      title: data.title,
      type: data.type,
    },
    select: { id: true },
  });

  if (!exists) {
    await prisma.notification.create({ data });
  }
}

function startOfDay(date) {
  const nextDate = new Date(date);
  nextDate.setHours(0, 0, 0, 0);
  return nextDate;
}

main()
  .catch((error) => {
    console.error("Erreur seed partenaire démo:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
