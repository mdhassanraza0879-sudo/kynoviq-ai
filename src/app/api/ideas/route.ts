import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AIService } from '@/services/aiService';
import { z } from 'zod';

const ideasSchema = z.object({
  topic: z.string().min(2, 'Topic must be specified'),
  targetAudience: z.string().default('General Users'),
  goal: z.string().default('Innovation'),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
    }

    const body = await req.json();
    const result = ideasSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input', details: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const { topic, targetAudience, goal } = result.data;
    const userId = session.user.id;

    const ideaResult = await AIService.generateIdeas(topic, targetAudience, goal);

    await prisma.toolUsage.create({
      data: {
        userId,
        toolType: 'IDEAS',
        inputSnippet: `${topic} | ${targetAudience} | ${goal}`,
        outputSnippet: ideaResult.summary.slice(0, 200),
      },
    });

    return NextResponse.json({ ideaResult });
  } catch (error: any) {
    console.error('Ideas API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate ideas' }, { status: 500 });
  }
}
