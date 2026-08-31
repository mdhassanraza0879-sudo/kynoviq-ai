import { NextRequest, NextResponse } from 'next/server';
import { getSystemConfig, updateSystemConfig } from '@/lib/services/config-service';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const config = await getSystemConfig();
    return NextResponse.json({ success: true, config });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await updateSystemConfig(body);
    return NextResponse.json({ success: true, config: updated });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
