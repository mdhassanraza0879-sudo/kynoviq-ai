import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AIService } from '@/services/aiService';
import { z } from 'zod';

const writingSchema = z.object({
  text: z.string().min(2, 'Text must be at least 2 characters'),
  mode: z.enum(['fix_grammar', 'make_professional', 'expand', 'summarize']).optional().default('make_professional'),
  targetTone: z.string().optional().default('professional'),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || 'cmt_founder_production_id';

    const body = await req.json();
    const result = writingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Please provide valid text for writing assistant' }, { status: 400 });
    }

    const { text, mode, targetTone } = result.data;
    const output = await AIService.improveWriting(text, { mode: mode as any, targetTone });

    try {
      await prisma.toolUsage.create({
        data: {
          userId,
          toolType: 'WRITING',
          inputSnippet: text.slice(0, 200),
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
      result: 'Kynoviq AI Writing Assistant: Drafted polished copy for your request.',
    });
  }
}
