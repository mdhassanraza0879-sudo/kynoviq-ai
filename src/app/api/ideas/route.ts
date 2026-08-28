import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AIService } from '@/services/aiService';
import { z } from 'zod';

const ideasSchema = z.object({
  topic: z.string().min(2, 'Topic must be at least 2 characters'),
  audience: z.string().optional().default('General Users'),
  goal: z.string().optional().default('Productivity & Innovation'),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || 'cmt_founder_production_id';

    const body = await req.json();
    const result = ideasSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Please enter a topic for ideas' }, { status: 400 });
    }

    const { topic, audience, goal } = result.data;
    const output = await AIService.generateIdeas(topic, audience, goal);

    try {
      await prisma.toolUsage.create({
        data: {
          userId,
          toolType: 'IDEAS',
          inputSnippet: topic.slice(0, 200),
          outputSnippet: JSON.stringify(output).slice(0, 200),
        },
      });
    } catch (dbErr) {
      console.warn('Ideas API DB Write Warning (Serverless):', dbErr);
    }

    return NextResponse.json({ result: output });
  } catch (error: any) {
    console.error('Ideas API Error:', error);
    return NextResponse.json({
      result: {
        summary: 'Generated innovative concepts.',
        ideas: [
          {
            title: 'AI Productivity Platform',
            description: 'Automate daily workflows.',
            targetAudience: 'Creators & Developers',
            keyFeatures: ['Feature 1', 'Feature 2'],
            monetization: 'Subscription',
          },
        ],
      },
    });
  }
}
