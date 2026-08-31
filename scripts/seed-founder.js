const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Kynoviq Studio Ecosystem...');

  const email = 'mdhassanraza0879@gmail.com';
  const name = 'Mohammad Hassan Raza';
  const rawPassword = 'Kynoviq2026!';
  const hashedPassword = await bcrypt.hash(rawPassword, 12);

  // 1. Super Admin Founder Account
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      name,
      role: 'SUPER_ADMIN',
      password: hashedPassword,
    },
    create: {
      name,
      email,
      role: 'SUPER_ADMIN',
      password: hashedPassword,
    },
  });

  // Credit Balance for Founder
  await prisma.creditBalance.upsert({
    where: { userId: user.id },
    update: {
      totalCredits: 99999,
      bonusCredits: 50000,
      planTier: 'BUSINESS',
    },
    create: {
      userId: user.id,
      totalCredits: 99999,
      bonusCredits: 50000,
      planTier: 'BUSINESS',
    },
  });

  // 2. Seed System Config
  await prisma.systemConfig.upsert({
    where: { id: 'SYSTEM_DEFAULT' },
    update: {
      siteName: 'KYNOVIQ STUDIO',
      tagline: 'One Idea. Infinite Creation.',
      founderName: 'Mohammad Hassan Raza',
      founderRole: 'Founder & Creator of Kynoviq Studio',
      founderEmail: 'mdhassanraza0879@gmail.com',
      founderPhone: '7307670879',
      showFounderPublicContact: true,
      defaultFreeCredits: 100,
      creditRateVideo: 15,
      creditRateImage: 2,
      creditRateVoice: 3,
      creditRateScript: 1,
      creditRateDubbing: 10,
      creditRateCaptions: 2,
      creditRateAgent: 25,
    },
    create: {
      id: 'SYSTEM_DEFAULT',
      siteName: 'KYNOVIQ STUDIO',
      tagline: 'One Idea. Infinite Creation.',
      founderName: 'Mohammad Hassan Raza',
      founderRole: 'Founder & Creator of Kynoviq Studio',
      founderEmail: 'mdhassanraza0879@gmail.com',
      founderPhone: '7307670879',
      showFounderPublicContact: true,
      defaultFreeCredits: 100,
      creditRateVideo: 15,
      creditRateImage: 2,
      creditRateVoice: 3,
      creditRateScript: 1,
      creditRateDubbing: 10,
      creditRateCaptions: 2,
      creditRateAgent: 25,
    },
  });

  // 3. Seed Default Plans
  const plans = [
    {
      tier: 'FREE',
      name: 'Starter Creator',
      description: 'Explore the AI creative ecosystem and experiment with initial projects.',
      monthlyPrice: 0,
      yearlyPrice: 0,
      creditsPerMonth: 100,
      maxProjects: 5,
      maxStorageMb: 1000,
      features: JSON.stringify(['100 Free Credits/mo', 'All 14 Studios', '1080p Export', 'Hindi & English VO']),
      isPopular: false,
    },
    {
      tier: 'PRO',
      name: 'Pro Creator',
      description: 'Engineered for influencers, freelance editors, and high-frequency content creators.',
      monthlyPrice: 29,
      yearlyPrice: 290,
      creditsPerMonth: 1000,
      maxProjects: 50,
      maxStorageMb: 25000,
      features: JSON.stringify(['1,000 Credits/mo', 'AI Creative Agent DAG', '4K 60fps Video', 'Multilingual Dubbing', 'Commercial License']),
      isPopular: true,
    },
    {
      tier: 'BUSINESS',
      name: 'Agency & Team',
      description: 'For growing creative teams, production studios, and enterprise marketing divisions.',
      monthlyPrice: 79,
      yearlyPrice: 790,
      creditsPerMonth: 4000,
      maxProjects: 999,
      maxStorageMb: 100000,
      features: JSON.stringify(['4,000 Credits/mo', '5 Team Seats', 'Unlimited Brand Kits', 'Shared Workspaces', 'Custom API Access']),
      isPopular: false,
    },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { tier: plan.tier },
      update: plan,
      create: plan,
    });
  }

  // 4. Seed High-Converting Templates
  const templates = [
    {
      title: 'Viral Hook Explainer (Alex Hormozi Style)',
      description: 'High-contrast bold animated captions, dynamic camera zoom-ins, fast sound FX, and punchy 3-beat rhythm.',
      category: 'REELS',
      previewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      aspectRatio: '9:16',
      tags: JSON.stringify(['Viral', 'Hormozi', 'Captions', 'Educational']),
      schemaData: JSON.stringify({ duration: 25, tracks: 4 }),
      isFeatured: true,
      remixCount: 1420,
    },
    {
      title: 'SaaS Product Launch Commercial',
      description: 'Sleek UI zoom animations, futuristic glass cards, dynamic metric counters, and corporate synth background.',
      category: 'ADS',
      previewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
      aspectRatio: '16:9',
      tags: JSON.stringify(['SaaS', 'Commercial', 'Tech', 'Launch']),
      schemaData: JSON.stringify({ duration: 30, tracks: 5 }),
      isFeatured: true,
      remixCount: 890,
    },
    {
      title: 'AI Tutorial Step-by-Step Short',
      description: 'Clean split screen with terminal code highlight, automated subtitle overlays, and direct arrow annotations.',
      category: 'SHORTS',
      previewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80',
      aspectRatio: '9:16',
      tags: JSON.stringify(['Tutorial', 'Coding', 'AI', 'Shorts']),
      schemaData: JSON.stringify({ duration: 40, tracks: 4 }),
      isFeatured: true,
      remixCount: 610,
    },
    {
      title: 'E-Commerce Direct Response Story Ad',
      description: 'Problem-Agitation-Solution format optimized for Meta & TikTok performance ads with swipe-up hook.',
      category: 'ECOMMERCE',
      previewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
      aspectRatio: '9:16',
      tags: JSON.stringify(['Ecom', 'Ad', 'Meta', 'Conversion']),
      schemaData: JSON.stringify({ duration: 20, tracks: 3 }),
      isFeatured: true,
      remixCount: 1150,
    },
  ];

  for (const t of templates) {
    const existing = await prisma.template.findFirst({ where: { title: t.title } });
    if (!existing) {
      await prisma.template.create({ data: t });
    }
  }

  // 5. Seed Default Brand Kit for Founder
  const existingKit = await prisma.brandKit.findFirst({ where: { userId: user.id } });
  if (!existingKit) {
    await prisma.brandKit.create({
      data: {
        userId: user.id,
        brandName: 'Kynoviq Studio',
        tagline: 'One Idea. Infinite Creation.',
        logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
        primaryColor: '#6366f1',
        secondaryColor: '#38bdf8',
        accentColor: '#10b981',
        backgroundColor: '#07090e',
        textColor: '#f8fafc',
        fontHeading: 'Inter',
        fontBody: 'Inter',
        toneOfVoice: 'Futuristic, authoritative, creative and high-converting',
        targetAudience: 'Creators, agencies, startups, founders, students and influencers',
        visualStyle: 'Cyberpunk glassmorphism with neon accents and high contrast depth',
        autoInject: true,
      },
    });
  }

  console.log('Kynoviq Studio Seeding Complete!');
  console.log(`Super Admin: ${email}`);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
