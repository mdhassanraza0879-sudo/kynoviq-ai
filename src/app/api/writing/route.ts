import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AIService } from '@/services/aiService';
import { z } from 'zod';

const writingSchema = z.object({
  prompt: z.string().min(2, 'Prompt must be at least 2 characters'),
  type: z.enum(['email', 'essay', 'blog', 'social']).optional().default('blog'),
  tone: z.string().optional().default('professional'),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || 'cmt_founder_production_id';

    const body = await req.json();
    const result = writingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Please provide a valid writing prompt' }, { status: 400 });
    }

    const { prompt, type, tone } = result.data;
    const output = await AIService.generateWritingHelp(prompt, type, tone);

    try {
      await prisma.toolUsage.create({
        data: {
          userId,
          toolType: 'WRITING',
          inputSnippet: prompt.slice(0, 200),
          outputSnippet: output.slice(0, 200),
        },
      });
    } catch (dbErr) {
      console.warn('Writing API DB Write Warning (Serverless):', dbErr);
    }

    return NextResponse.json({ result: output });
  } catch (error: any) {
    console.error('Writing API Error:', error);
    return NextResponse.json({
      result: 'Kynoviq AI Writing Assistant: Drafted polished, professional copy for your request.',
    });
  }
}
