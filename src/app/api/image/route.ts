import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai/factory';
import { deductUserCredits } from '@/lib/services/credit-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, style = 'Cinematic Realism', aspectRatio = '1:1', negativePrompt, userId = 'default_user' } = body;

    if (!prompt) return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });

    const creditResult = await deductUserCredits(userId, 2, 'IMAGE_GENERATION', `Generated image: ${prompt.slice(0, 30)}`);
    if (!creditResult.success) return NextResponse.json({ error: creditResult.error }, { status: 402 });

    const provider = getAIProvider();
    const image = await provider.generateImage({ prompt, style, aspectRatio, negativePrompt });

    return NextResponse.json({ success: true, image, remainingCredits: creditResult.newAvailable });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Image generation failed' }, { status: 500 });
  }
}
