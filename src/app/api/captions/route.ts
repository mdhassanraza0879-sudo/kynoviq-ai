import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai/factory';
import { deductUserCredits } from '@/lib/services/credit-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, style = 'social', mediaUrl, userId = 'default_user' } = body;

    const creditResult = await deductUserCredits(userId, 2, 'AUTO_CAPTIONS', `Generated automated captions`);
    if (!creditResult.success) return NextResponse.json({ error: creditResult.error }, { status: 402 });

    const provider = getAIProvider();
    const captions = text
      ? await provider.generateCaptions({ text, style })
      : await provider.transcribe(mediaUrl || 'sample.mp4');

    return NextResponse.json({ success: true, captions, remainingCredits: creditResult.newAvailable });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Captions generation failed' }, { status: 500 });
  }
}
