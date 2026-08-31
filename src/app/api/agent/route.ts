import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai/factory';
import { deductUserCredits } from '@/lib/services/credit-service';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, brandContext, userId = 'default_user' } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Goal prompt is required' }, { status: 400 });
    }

    // Deduct 25 credits for full DAG orchestration
    const creditResult = await deductUserCredits(
      userId,
      25,
      'CREATIVE_AGENT_DAG',
      `Executed autonomous campaign workflow for: ${prompt.slice(0, 40)}`
    );

    if (!creditResult.success) {
      return NextResponse.json({ error: creditResult.error }, { status: 402 });
    }

    const provider = getAIProvider();
    const workflowPlan = await provider.planCreativeWorkflow(prompt, brandContext);

    return NextResponse.json({
      success: true,
      workflow: workflowPlan,
      creditsDeducted: 25,
      remainingCredits: creditResult.newAvailable,
    });
  } catch (error: any) {
    console.error('Agent DAG Execution Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to execute creative agent workflow' }, { status: 500 });
  }
}
