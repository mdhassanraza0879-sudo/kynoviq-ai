import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kynoviq.studio';
  const routes = [
    '',
    '/tools',
    '/pricing',
    '/templates',
    '/about',
    '/founder',
    '/contact',
    '/privacy',
    '/terms',
    '/refund',
    '/ai-policy',
    '/cookie-policy',
    '/agent',
    '/studio/video',
    '/studio/editor',
    '/studio/image',
    '/studio/voiceover',
    '/studio/captions',
    '/studio/dubbing',
    '/studio/script',
    '/studio/music',
    '/studio/reels',
    '/studio/ad-creative',
    '/studio/social',
    '/brand-kit',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/studio') || route === '/agent' ? 0.9 : 0.7,
  }));
}
