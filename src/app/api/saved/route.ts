import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createSavedSchema = z.object({
  title: z.string().min(1, 'Title required'),
  toolType: z.string().default('CHAT'),
  content: z.string().min(1, 'Content required'),
  metadata: z.string().optional(),
});

// GET: Fetch user saved items
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const savedItems = await prisma.savedItem.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ savedItems });
  } catch (error: any) {
    console.error('Fetch Saved Items Error:', error);
    return NextResponse.json({ error: 'Failed to fetch saved items' }, { status: 500 });
  }
}

// POST: Create saved item
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const result = createSavedSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid payload', details: result.error.format() }, { status: 400 });
    }

    const { title, toolType, content, metadata } = result.data;

    const savedItem = await prisma.savedItem.create({
      data: {
        userId: session.user.id,
        title,
        toolType,
        content,
        metadata: metadata || null,
      },
    });

    return NextResponse.json({ savedItem }, { status: 201 });
  } catch (error: any) {
    console.error('Save Item Error:', error);
    return NextResponse.json({ error: 'Failed to save item' }, { status: 500 });
  }
}
