import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AIService } from '@/services/aiService';
import { z } from 'zod';

const summarizeSchema = z.object({
  text: z.string().min(10, 'Text must be at least 10 characters long'),
  length: z.enum(['short', 'medium', 'detailed']).default('medium'),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
    }

    const body = await req.json();
    const result = summarizeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input', details: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const { text, length } = result.data;
    const userId = session.user.id;

    // Generate summary via AIService
    const summary = await AIService.generateSummary(text, { length });

    // Track usage in database
    await prisma.toolUsage.create({
      data: {
        userId,
        toolType: 'SUMMARIZER',
        inputSnippet: text.slice(0, 200),
        outputSnippet: summary.slice(0, 200),
      },
    });

    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error('Summarize API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate summary' }, { status: 500 });
  }
}
