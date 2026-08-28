import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AIService } from '@/services/aiService';
import { z } from 'zod';

const writingSchema = z.object({
  text: z.string().min(5, 'Text must be at least 5 characters long'),
  mode: z.enum(['improve_grammar', 'rewrite', 'make_professional', 'make_simpler', 'change_tone']),
  targetTone: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
    }

    const body = await req.json();
    const result = writingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input', details: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const { text, mode, targetTone } = result.data;
    const userId = session.user.id;

    const improvedText = await AIService.improveWriting(text, { mode, targetTone });

    await prisma.toolUsage.create({
      data: {
        userId,
        toolType: 'WRITING',
        inputSnippet: text.slice(0, 200),
        outputSnippet: improvedText.slice(0, 200),
      },
    });

    return NextResponse.json({ improvedText });
  } catch (error: any) {
    console.error('Writing API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to process text' }, { status: 500 });
  }
}
