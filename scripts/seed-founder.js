const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'mdhassanraza0879@gmail.com';
  const name = 'Mohammad Hassan Raza (Founder)';
  const rawPassword = 'Kynoviq2026!'; // Default founder password

  const hashedPassword = await bcrypt.hash(rawPassword, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      name,
      password: hashedPassword,
    },
    create: {
      name,
      email,
      password: hashedPassword,
    },
  });

  console.log('Founder Account Seeded Successfully:');
  console.log('ID:', user.id);
  console.log('Name:', user.name);
  console.log('Email:', user.email);
}

main()
  .catch((e) => {
    console.error('Error seeding founder:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
