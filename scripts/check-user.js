const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log('--- ALL USERS IN DB ---');
  console.dir(users, { depth: null });
}

main().finally(() => prisma.$disconnect());
