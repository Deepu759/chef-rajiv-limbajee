import type { MetadataRoute } from 'next';
import { chef } from '@/data/chef';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    ...(chef.siteUrl ? { sitemap: `${chef.siteUrl}/sitemap.xml` } : {}),
  };
}
