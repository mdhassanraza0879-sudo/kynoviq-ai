import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai/factory';
import { deductUserCredits } from '@/lib/services/credit-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, brandContext, userId = 'default_user' } = body;

    if (!prompt) return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });

    const creditResult = await deductUserCredits(userId, 1, 'SCRIPT_GENERATION', `Generated script for: ${prompt.slice(0, 30)}`);
    if (!creditResult.success) return NextResponse.json({ error: creditResult.error }, { status: 402 });

    const provider = getAIProvider();
    const script = await provider.generateScript(prompt, brandContext);

    return NextResponse.json({ success: true, script, remainingCredits: creditResult.newAvailable });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Script generation failed' }, { status: 500 });
  }
}
