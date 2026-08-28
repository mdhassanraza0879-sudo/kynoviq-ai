import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const usages = await prisma.toolUsage.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({ history: usages });
  } catch (error: any) {
    console.error('Fetch History Error:', error);
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.toolUsage.deleteMany({
      where: { userId: session.user.id },
    });

    return NextResponse.json({ message: 'History cleared' });
  } catch (error: any) {
    console.error('Clear History Error:', error);
    return NextResponse.json({ error: 'Failed to clear history' }, { status: 500 });
  }
}
