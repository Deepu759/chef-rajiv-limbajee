import type { Metadata } from 'next';
import './globals.css';
import { chef } from '@/data/chef';

const title = 'Chef Rajiv Limbajee | Head Chef in Edinburgh';
const description = 'The professional profile of Rajiv Limbajee, Head Chef at Le Petit Beefbar Edinburgh, at InterContinental Edinburgh The George.';

export const metadata: Metadata = {
  ...(chef.siteUrl ? { metadataBase: new URL(chef.siteUrl), alternates: { canonical: '/' } } : {}),
  title,
  description,
  openGraph: {
    title,
    description,
    ...(chef.siteUrl ? { url: chef.siteUrl } : {}),
    siteName: 'Rajiv Limbajee',
    type: 'profile',
    locale: 'en_GB',
    ...(chef.siteUrl ? { images: [{ url: '/images/profile/rajiv-limbajee-precision-plating.webp', width: 1536, height: 1024, alt: 'Chef Rajiv Limbajee plating food at a kitchen pass.' }] } : {}),
  },
  twitter: { card: chef.siteUrl ? 'summary_large_image' : 'summary', title, description, ...(chef.siteUrl ? { images: ['/images/profile/rajiv-limbajee-precision-plating.webp'] } : {}) },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: chef.name,
    jobTitle: chef.role,
    description,
    sameAs: [chef.linkedin],
    worksFor: { '@type': 'Organization', name: chef.venue },
    workLocation: { '@type': 'Place', name: chef.location },
    ...(chef.siteUrl ? { image: `${chef.siteUrl}/images/profile/rajiv-limbajee-precision-plating.webp` } : {}),
    ...(chef.siteUrl ? { url: chef.siteUrl } : {}),
  };

  return <html lang="en-GB"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }} />{children}</body></html>;
}
