import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai/factory';
import { deductUserCredits } from '@/lib/services/credit-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product, targetAudience = 'Creators and Startups', platform = 'Meta Ads', goal = 'Conversions', userId = 'default_user' } = body;

    if (!product) return NextResponse.json({ error: 'Product/Service details required' }, { status: 400 });

    const creditResult = await deductUserCredits(userId, 4, 'AD_CREATIVE_GENERATION', `Generated ad creatives for: ${product.slice(0, 30)}`);
    if (!creditResult.success) return NextResponse.json({ error: creditResult.error }, { status: 402 });

    const provider = getAIProvider();
    const ads = await provider.generateAdCreative({ product, targetAudience, platform, goal });

    return NextResponse.json({ success: true, ads, remainingCredits: creditResult.newAvailable });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Ad generation failed' }, { status: 500 });
  }
}
