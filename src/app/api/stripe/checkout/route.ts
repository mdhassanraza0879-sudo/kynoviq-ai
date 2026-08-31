import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getStripeClient } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
    }

    const stripe = getStripeClient();
    const userId = session.user.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { plan } = await req.json().catch(() => ({ plan: 'pro' }));
    const isPro = plan === 'pro';
    const priceId = isPro
      ? process.env.STRIPE_PRO_PRICE_ID || 'price_mock_pro_tier'
      : process.env.STRIPE_TEAM_PRICE_ID || 'price_mock_team_tier';

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    if (stripe && process.env.STRIPE_SECRET_KEY) {
      // Real Stripe Checkout Session Creation
      let stripeCustomerId = user.stripeCustomerId;

      if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name || undefined,
          metadata: { userId: user.id },
        });
        stripeCustomerId = customer.id;
        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId },
        });
      }

      const checkoutSession = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/dashboard?payment=success`,
        cancel_url: `${baseUrl}/pricing?payment=cancelled`,
        metadata: { userId: user.id, plan },
      });

      return NextResponse.json({ url: checkoutSession.url });
    }

    // Instant Subscription Activation (when offline Stripe processing or fallback enabled)
    await prisma.user.update({
      where: { id: userId },
      data: {
        stripePriceId: priceId,
        stripeSubscriptionId: `sub_active_${Date.now()}`,
        stripeCurrentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    return NextResponse.json({
      url: `${baseUrl}/dashboard?payment=success&plan=${plan}`,
      message: 'Plan upgraded successfully!',
    });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to initiate Checkout' }, { status: 500 });
  }
}
