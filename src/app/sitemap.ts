import type { MetadataRoute } from 'next';
import { chef } from '@/data/chef';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!chef.siteUrl) return [];
  return [{ url: chef.siteUrl, changeFrequency: 'monthly', priority: 1 }];
}
