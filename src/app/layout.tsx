import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { ToastProvider } from '@/components/ui/Toast';
import { SupportWidget } from '@/components/layout/SupportWidget';
import { GlobalCommandBar } from '@/components/ui/GlobalCommandBar';

export const metadata: Metadata = {
  title: 'KYNOVIQ STUDIO — One Idea. Infinite Creation.',
  description:
    'All-in-one AI creative platform for creators, students, influencers, freelancers, agencies and brands. Create videos, images, scripts, voiceovers, captions, and ad campaigns seamlessly.',
  keywords: [
    'Kynoviq Studio',
    'AI Creative Platform',
    'AI Video Generator',
    'AI Video Editor',
    'AI Image Generator',
    'AI Voiceover',
    'AI Subtitles',
    'AI Dubbing',
    'AI Creative Agent',
    'AI SaaS',
    'Content Creation',
  ],
  authors: [{ name: 'Mohammad Hassan Raza', url: 'https://kynoviq.studio' }],
  openGraph: {
    title: 'KYNOVIQ STUDIO — One Idea. Infinite Creation.',
    description:
      'All-in-one AI creative workspace: scripts, 4K videos, browser timeline editing, neural voices, captions, and multilingual dubbing.',
    url: 'https://kynoviq.studio',
    siteName: 'KYNOVIQ STUDIO',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Kynoviq Studio Creative Ecosystem',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KYNOVIQ STUDIO — One Idea. Infinite Creation.',
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
