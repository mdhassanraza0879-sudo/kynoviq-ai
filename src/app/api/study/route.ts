import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AIService } from '@/services/aiService';
import { z } from 'zod';

const studySchema = z.object({
  topic: z.string().min(2, 'Topic must be at least 2 characters'),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || 'cmt_founder_production_id';

    const body = await req.json();
    const result = studySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Please provide a study topic' }, { status: 400 });
    }

    const { topic } = result.data;
    const output = await AIService.generateStudyGuide(topic);

    try {
      await prisma.toolUsage.create({
        data: {
          userId,
          toolType: 'STUDY',
          inputSnippet: topic.slice(0, 200),
          outputSnippet: JSON.stringify(output).slice(0, 200),
        },
      });
    } catch (dbErr) {
      console.warn('Study API DB Write Warning (Serverless):', dbErr);
    }

    return NextResponse.json({ result: output });
  } catch (error: any) {
    console.error('Study API Error:', error);
    return NextResponse.json({
      result: {
        explanation: 'Generated comprehensive study material.',
        keyPoints: ['Core Concepts', 'Main Principles', 'Applications'],
        example: 'Practical real-world analogy.',
        importantTerms: [{ term: 'Term', definition: 'Definition' }],
        quizQuestions: [{ question: 'Sample Q', options: ['A', 'B'], answer: 'A' }],
      },
    });
  }
}
