import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AIService } from '@/services/aiService';
import { z } from 'zod';

const studySchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters long'),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
    }

    const body = await req.json();
    const result = studySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input', details: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const { topic } = result.data;
    const userId = session.user.id;

    const studyGuide = await AIService.generateStudyGuide(topic);

    await prisma.toolUsage.create({
      data: {
        userId,
        toolType: 'STUDY',
        inputSnippet: topic,
        outputSnippet: studyGuide.explanation.slice(0, 200),
      },
    });

    return NextResponse.json({ studyGuide });
  } catch (error: any) {
    console.error('Study API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate study guide' }, { status: 500 });
  }
}
