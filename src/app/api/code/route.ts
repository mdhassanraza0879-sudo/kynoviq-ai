import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AIService } from '@/services/aiService';
import { z } from 'zod';

const codeSchema = z.object({
  code: z.string().min(5, 'Code snippet must be at least 5 characters long'),
  language: z.string().default('typescript'),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
    }

    const body = await req.json();
    const result = codeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input', details: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const { code, language } = result.data;
    const userId = session.user.id;

    const codeAnalysis = await AIService.analyzeCode(code, language);

    await prisma.toolUsage.create({
      data: {
        userId,
        toolType: 'CODE',
        inputSnippet: code.slice(0, 200),
        outputSnippet: codeAnalysis.explanation.slice(0, 200),
      },
    });

    return NextResponse.json({ codeAnalysis });
  } catch (error: any) {
    console.error('Code API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to analyze code' }, { status: 500 });
  }
}
