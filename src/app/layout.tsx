import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { ToastProvider } from '@/components/ui/Toast';
import { SupportWidget } from '@/components/layout/SupportWidget';
import { GlobalCommandBar } from '@/components/ui/GlobalCommandBar';

export const metadata: Metadata = {
  title: 'KYNOVIQ AI — Think Smarter. Create Faster.',
  description:
    'All-in-one AI platform for creators, students, developers, freelancers, startups and brands. Generate scripts, 4K videos, AI images, voiceovers, code, captions, and intelligent campaigns seamlessly.',
  keywords: [
    'Kynoviq AI',
    'AI Workspace',
    'AI Video Generator',
    'AI Video Editor',
    'AI Image Generator',
    'AI Voiceover',
    'AI Code Assistant',
    'AI Subtitles',
    'AI Dubbing',
    'AI Creative Agent',
    'AI SaaS',
    'Content Creation',
  ],
  authors: [{ name: 'Mohammad Hassan Raza', url: 'https://kynoviq-ai.vercel.app' }],
  openGraph: {
    title: 'KYNOVIQ AI — Think Smarter. Create Faster.',
    description:
      'All-in-one AI workspace: scripts, 4K videos, AI image generation, neural voices, captions, and multilingual dubbing.',
    url: 'https://kynoviq-ai.vercel.app',
    siteName: 'KYNOVIQ AI',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Kynoviq AI Intelligent Ecosystem',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KYNOVIQ AI — Think Smarter. Create Faster.',
    description:
      'All-in-one AI creative workspace: scripts, 4K videos, browser timeline editing, neural voices, captions, and multilingual dubbing.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#07090e] text-slate-100 antialiased min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200">
        <AuthProvider>
          <ToastProvider>
            {children}
            <GlobalCommandBar />
            <SupportWidget />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
