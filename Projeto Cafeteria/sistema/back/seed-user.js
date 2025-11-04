// Seed script that writes directly to the database using Prisma (no HTTP server required)
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function run() {
  try {
    // Users
    console.log('Seeding users...');
    const users = [
      { email: 'admin', password: 'admin', name: 'Administrador' },
      { email: 'barista', password: '123456', name: 'Barista' },
      { email: 'caixa', password: '123456', name: 'Caixa' },
    ];

    for (const u of users) {
      const foundUser = await prisma.user.findUnique({ where: { email: u.email } });
      if (foundUser) {
        console.log('User already exists:', { id: foundUser.id, email: foundUser.email });
      } else {
        const createdUser = await prisma.user.create({ data: u });
        console.log('User created:', { id: createdUser.id, email: createdUser.email });
      }
    }

    // Products
    console.log('Seeding products...');
    const products = [
      { name: 'Café Expresso', description: 'Dose 30ml', price: 8.5, quantity: 50 },
      { name: 'Cappuccino', description: '200ml', price: 12.0, quantity: 30 },
      { name: 'Pão de Queijo', description: 'Unidade', price: 5.0, quantity: 100 },
    ];

    for (const p of products) {
      // Since Product.name isn't unique in the schema, check existence by name and description combo
      const foundProd = await prisma.product.findFirst({ where: { name: p.name, description: p.description } });
      if (foundProd) {
        console.log('Product already exists:', { id: foundProd.id, name: foundProd.name });
      } else {
        const createdProd = await prisma.product.create({ data: p });
        console.log('Product created:', { id: createdProd.id, name: createdProd.name });
      }
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
