// Seed script that writes directly to the database using Prisma (no HTTP server required)
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function run() {
  try {
    const email = 'admin';
    const password = 'admin'; // plaintext for local dev only
    const name = 'administrador';

    console.log('Seeding user to database via Prisma...');

    // Idempotent create-or-return existing behavior
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      console.log('User already exists:', { id: existing.id, email: existing.email });
    } else {
      const user = await prisma.user.create({ data: { email, password, name } });
      console.log('User created:', { id: user.id, email: user.email });
    }

    console.log('Seed completed successfully.');
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

run();
