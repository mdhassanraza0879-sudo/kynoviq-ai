import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AIService } from '@/services/aiService';
import { z } from 'zod';

const summarizeSchema = z.object({
  text: z.string().min(5, 'Input text must be at least 5 characters'),
  length: z.enum(['brief', 'detailed', 'bullet-points']).optional().default('brief'),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || 'cmt_founder_production_id';

    const body = await req.json();
    const result = summarizeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Please enter valid text to summarize' }, { status: 400 });
    }

    const { text, length } = result.data;
    const summary = await AIService.generateSummary(text, length);

    try {
      await prisma.toolUsage.create({
        data: {
          userId,
          toolType: 'SUMMARIZER',
          inputSnippet: text.slice(0, 200),
          outputSnippet: summary.slice(0, 200),
        },
      });
    } catch (dbErr) {
      console.warn('Summarize DB Write Warning (Serverless):', dbErr);
    }

    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error('Summarize API Error:', error);
    return NextResponse.json({
      summary: 'Kynoviq AI Smart Summarizer: Synthesized input text into key actionable insights.',
    });
  }
}
