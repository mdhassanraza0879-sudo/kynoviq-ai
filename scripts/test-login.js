const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function testLogin(email, password) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
  });
  if (!user) {
    console.log(`User ${email} NOT FOUND`);
    return;
  }
  const match = await bcrypt.compare(password, user.password);
  console.log(`Email: ${email} | Password Match (${password}): ${match}`);
}

async function main() {
  await testLogin('mdhassanraza0879@gmail.com', 'Kynoviq2026!');
  await testLogin('mdhassan0879@gmail.com', 'Kynoviq2026!');
}

main().finally(() => prisma.$disconnect());
