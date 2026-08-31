import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const brandKit = await prisma.brandKit.findFirst();
    return NextResponse.json({ success: true, brandKit });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { brandName, tagline, logoUrl, primaryColor, secondaryColor, accentColor, fontHeading, toneOfVoice, targetAudience, visualStyle, autoInject } = body;

    const founder = await prisma.user.findFirst();
    const userId = founder?.id || 'default_user';

    const existing = await prisma.brandKit.findFirst({ where: { userId } });

    let brandKit;
    if (existing) {
      brandKit = await prisma.brandKit.update({
        where: { id: existing.id },
        data: { brandName, tagline, logoUrl, primaryColor, secondaryColor, accentColor, fontHeading, toneOfVoice, targetAudience, visualStyle, autoInject },
      });
    } else {
      brandKit = await prisma.brandKit.create({
        data: { userId, brandName: brandName || 'My Brand', tagline, logoUrl, primaryColor, secondaryColor, accentColor, fontHeading, toneOfVoice, targetAudience, visualStyle, autoInject },
      });
    }

    return NextResponse.json({ success: true, brandKit });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
