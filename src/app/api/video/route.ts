import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai/factory';
import { deductUserCredits } from '@/lib/services/credit-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, durationSeconds = 15, aspectRatio = '9:16', style = 'Cinematic Realism', cameraMovement = 'Slow Push-in Dolly', quality = 'Standard 1080p', userId = 'default_user' } = body;

    if (!prompt) return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });

    const creditResult = await deductUserCredits(userId, 15, 'VIDEO_GENERATION', `Generated video scene: ${prompt.slice(0, 30)}`);
    if (!creditResult.success) return NextResponse.json({ error: creditResult.error }, { status: 402 });

    const provider = getAIProvider();
    const video = await provider.generateVideo({ prompt, durationSeconds, aspectRatio, style, cameraMovement, quality });

    return NextResponse.json({ success: true, video, remainingCredits: creditResult.newAvailable });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Video generation failed' }, { status: 500 });
  }
}
