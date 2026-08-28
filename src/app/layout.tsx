import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { ToastProvider } from '@/components/ui/Toast';
import { SupportWidget } from '@/components/layout/SupportWidget';

export const metadata: Metadata = {
  title: 'Kynoviq AI — Think Smarter. Create Faster.',
  description: 'An intelligent AI workspace bringing multiple AI-powered productivity, learning, writing, and coding tools into one clean platform. Founded by Mohammad Hassan Raza.',
  keywords: ['AI SaaS', 'Kynoviq AI', 'AI Chat', 'Code Assistant', 'Study Assistant', 'Text Summarizer', 'Writing Assistant', 'Idea Generator'],
  authors: [{ name: 'Mohammad Hassan Raza', url: 'https://kynoviq.ai' }],
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: 'Kynoviq AI — Think Smarter. Create Faster.',
    description: 'Next-generation AI workspace uniting AI Chat, Study Assistant, Code Assistant, Smart Summarizer, Writing Assistant, and Idea Generator.',
    url: 'https://kynoviq.ai',
    siteName: 'Kynoviq AI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kynoviq AI — Think Smarter. Create Faster.',
    description: 'Next-generation AI workspace uniting AI Chat, Study Assistant, Code Assistant, Smart Summarizer, Writing Assistant, and Idea Generator.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0b0f19] text-slate-100 antialiased min-h-screen">
        <AuthProvider>
          <ToastProvider>
            {children}
            <SupportWidget />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
