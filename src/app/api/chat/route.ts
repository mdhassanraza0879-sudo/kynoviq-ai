import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AIService } from '@/services/aiService';
import { z } from 'zod';

const chatRequestSchema = z.object({
  conversationId: z.string().optional(),
  message: z.string().min(1, 'Message cannot be empty'),
});

// GET: Fetch user conversations list
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const conversations = await prisma.conversation.findMany({
      where: { userId: session.user.id, toolType: 'CHAT' },
      orderBy: { updatedAt: 'desc' },
      include: {
        _count: { select: { messages: true } },
      },
    });

    return NextResponse.json({ conversations });
  } catch (error: any) {
    console.error('Fetch Conversations Error:', error);
    return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 });
  }
}

// POST: Send message and generate AI response
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const result = chatRequestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input', details: result.error.format() }, { status: 400 });
    }

    const { conversationId, message } = result.data;
    const userId = session.user.id;

    let activeConversationId = conversationId;

    // Create new conversation if not passed
    if (!activeConversationId) {
      const newConv = await prisma.conversation.create({
        data: {
          userId,
          title: message.slice(0, 40) + (message.length > 40 ? '...' : ''),
          toolType: 'CHAT',
        },
      });
      activeConversationId = newConv.id;
    }

    // Save user message to database
    await prisma.message.create({
      data: {
        conversationId: activeConversationId,
        role: 'user',
        content: message,
      },
    });

    // Fetch conversation message history for context
    const previousMessages = await prisma.message.findMany({
      where: { conversationId: activeConversationId },
      orderBy: { createdAt: 'asc' },
      take: 20,
    });

    // Generate AI Response via AIService wrapper
    const aiResponseText = await AIService.generateChatResponse(
      previousMessages.map((m) => ({ role: m.role as any, content: m.content }))
    );

    // Save assistant message to database
    const assistantMessage = await prisma.message.create({
      data: {
        conversationId: activeConversationId,
        role: 'assistant',
        content: aiResponseText,
      },
    });

    // Update conversation updatedAt timestamp
    await prisma.conversation.update({
      where: { id: activeConversationId },
      data: { updatedAt: new Date() },
    });

    // Track ToolUsage
    await prisma.toolUsage.create({
      data: {
        userId,
        toolType: 'CHAT',
        inputSnippet: message.slice(0, 200),
        outputSnippet: aiResponseText.slice(0, 200),
      },
    });

    return NextResponse.json({
      conversationId: activeConversationId,
      message: assistantMessage,
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to process chat message' }, { status: 500 });
  }
}
