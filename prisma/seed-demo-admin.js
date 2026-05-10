import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/* global process */

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash("admincoworki2026", 12);

  await prisma.user.upsert({
    where: { email: "admin@coworki.com" },
    update: {
      fullName: "Administrateur CoWorki",
      passwordHash,
      role: "ADMIN",
      emailVerified: true,
      phoneVerified: true,
      isActive: true,
      profileCompleted: true,
      profile: {
        upsert: {
          create: { city: "Tunis", occupation: "Administrateur", interests: [] },
          update: { city: "Tunis", occupation: "Administrateur", interests: [] },
        },
      },
    },
    create: {
      fullName: "Administrateur CoWorki",
      email: "admin@coworki.com",
      passwordHash,
      role: "ADMIN",
      interests: [],
      emailVerified: true,
      phoneVerified: true,
      isActive: true,
      profileCompleted: true,
      profile: {
        create: { city: "Tunis", occupation: "Administrateur", interests: [] },
      },
    },
  });

  console.log("Compte admin démo prêt.");
  console.log("Connexion admin: admin@coworki.com / admincoworki2026");
}

main()
  .catch((error) => {
    console.error("Erreur seed admin démo:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
