import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai/factory';
import { deductUserCredits } from '@/lib/services/credit-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, voiceId = 'voice_hindi_deep', languageCode = 'hi-IN', speed = 1.0, pitch = 1.0, userId = 'default_user' } = body;

    if (!text) return NextResponse.json({ error: 'Text content is required' }, { status: 400 });

    const creditResult = await deductUserCredits(userId, 3, 'VOICEOVER_GENERATION', `Generated voiceover: ${text.slice(0, 30)}`);
    if (!creditResult.success) return NextResponse.json({ error: creditResult.error }, { status: 402 });

    const provider = getAIProvider();
    const voiceover = await provider.generateVoiceover({ text, voiceId, languageCode, speed, pitch });

    return NextResponse.json({ success: true, voiceover, remainingCredits: creditResult.newAvailable });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Voiceover generation failed' }, { status: 500 });
  }
}
