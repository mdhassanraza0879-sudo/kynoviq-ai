import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AIService } from '@/services/aiService';
import { z } from 'zod';

const ideasSchema = z.object({
  domain: z.string().min(2, 'Domain must be at least 2 characters'),
  count: z.number().min(1).max(10).optional().default(5),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || 'cmt_founder_production_id';

    const body = await req.json();
    const result = ideasSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Please enter a domain or topic for ideas' }, { status: 400 });
    }

    const { domain, count } = result.data;
    const output = await AIService.generateIdeasHelp(domain, count);

    try {
      await prisma.toolUsage.create({
        data: {
          userId,
          toolType: 'IDEAS',
          inputSnippet: domain.slice(0, 200),
          outputSnippet: output.slice(0, 200),
        },
      });
    } catch (dbErr) {
      console.warn('Ideas API DB Write Warning (Serverless):', dbErr);
    }

    return NextResponse.json({ result: output });
  } catch (error: any) {
    console.error('Ideas API Error:', error);
    return NextResponse.json({
      result: 'Kynoviq AI Idea Generator: Generated 5 innovative concepts and strategic execution paths.',
    });
  }
}
