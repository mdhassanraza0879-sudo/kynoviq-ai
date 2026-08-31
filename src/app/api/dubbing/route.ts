import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai/factory';
import { deductUserCredits } from '@/lib/services/credit-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { videoUrl, sourceLanguage = 'English', targetLanguage = 'Hindi', userId = 'default_user' } = body;

    const creditResult = await deductUserCredits(userId, 10, 'VIDEO_DUBBING', `Dubbed video into ${targetLanguage}`);
    if (!creditResult.success) return NextResponse.json({ error: creditResult.error }, { status: 402 });

    const provider = getAIProvider();
    const task = await provider.startDubbing({ videoUrl: videoUrl || 'sample.mp4', sourceLanguage, targetLanguage });

    return NextResponse.json({ success: true, task, remainingCredits: creditResult.newAvailable });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Dubbing failed' }, { status: 500 });
  }
}
