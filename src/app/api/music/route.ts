import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai/factory';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mood = 'Cinematic', videoType, durationSec } = body;

    const provider = getAIProvider();
    const suggestions = await provider.suggestMusic({ mood, videoType, durationSec });

    return NextResponse.json({ success: true, suggestions });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Music suggestion failed' }, { status: 500 });
  }
}
