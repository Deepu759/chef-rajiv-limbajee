import type { MetadataRoute } from 'next';
import { chef, productionSiteUrl } from '@/data/chef';

export default function sitemap(): MetadataRoute.Sitemap {
  const homepageUrl = new URL('/', chef.siteUrl).toString();
  const expectedUrl = `${productionSiteUrl}/`;

  if (homepageUrl !== expectedUrl) {
    throw new Error(`Sitemap homepage must use the canonical production URL: ${expectedUrl}`);
  }

  const entries: MetadataRoute.Sitemap = [
    { url: homepageUrl, changeFrequency: 'monthly', priority: 1 },
  ];

  if (entries.length === 0 || entries.some(({ url }) => url !== expectedUrl)) {
    throw new Error('Sitemap must contain the canonical production homepage and no other URLs.');
  }

  return entries;
}
