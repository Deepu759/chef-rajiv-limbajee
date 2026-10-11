import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://chef-rajiv-limbajee001.vercel.app';
const homepage = `${origin}/`;
const linkedin = 'https://www.linkedin.com/in/rajiv-limbajee-7b303b182';

const html = await readFile(resolve(root, '.next/server/app/index.html'), 'utf8');
const sitemap = await readFile(resolve(root, '.next/server/app/sitemap.xml.body'), 'utf8');
const robots = await readFile(resolve(root, '.next/server/app/robots.txt.body'), 'utf8');

const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((match) => match[1]);
assert.equal(canonicals.length, 1, 'Expected exactly one canonical link.');
const canonical = new URL(canonicals[0]);
assert.equal(canonical.origin, origin, 'Canonical URL must use the production origin.');
assert.equal(canonical.pathname, '/', 'Canonical URL must identify the homepage.');

assert.match(html, /<title>Rajiv Limbajee \| Head Chef at Le Petit Beefbar Edinburgh<\/title>/);
assert.match(html, /<meta name="description" content="[^"]*Rajiv Limbajee[^"]*Head Chef[^"]*Edinburgh[^"]*"\/>/);
assert.equal((html.match(/name="google-site-verification"/g) ?? []).length, 1, 'Expected one Google verification meta tag.');
assert.match(html, /<meta property="og:url" content="https:\/\/chef-rajiv-limbajee001\.vercel\.app"\/>/);
assert.doesNotMatch(html, /<meta name="robots" content="[^\"]*noindex/i, 'Homepage must not be marked noindex.');

const structuredDataBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
assert.equal(structuredDataBlocks.length, 1, 'Expected one structured data block.');
const profile = JSON.parse(structuredDataBlocks[0][1]);
assert.equal(profile['@context'], 'https://schema.org');
assert.equal(profile['@type'], 'Person');
assert.equal(profile.name, 'Rajiv Limbajee');
assert.equal(profile.jobTitle, 'Head Chef');
assert.equal(profile.url, homepage);
assert.equal(profile.mainEntityOfPage, homepage);
assert.equal(profile.sameAs?.[0], linkedin);
assert.equal(profile.image, `${origin}/images/profile/rajiv-limbajee-precision-plating.webp`);
assert.match(profile.description, /Head Chef at Le Petit Beefbar Edinburgh/);
assert.ok(html.includes(profile.description), 'Person description should match the visible biography.');
assert.doesNotMatch(JSON.stringify(profile), /ProfilePage/, 'Do not claim ProfilePage rich-result eligibility.');

for (const visibleFact of [
  'InterContinental Edinburgh The George',
  'InterContinental Mauritius Resort',
  'Jumeirah Vittaveli',
  'Shangri-La Group',
  'Chef de Partie and Junior Sous Chef',
]) {
  assert.ok(html.includes(visibleFact), `Expected crawlable page content: ${visibleFact}`);
}
assert.match(html, /alt="Chef Rajiv Limbajee plating food at a kitchen pass, wearing a chef jacket and dark apron\."/);
assert.match(html, /<h1 id="hero-title">Rajiv<br\/><em>Limbajee<\/em><\/h1>/);

const gallerySource = await readFile(resolve(root, 'src/data/gallery.ts'), 'utf8');
const galleryImages = [...gallerySource.matchAll(/\{ image: '(\/images\/[^']+)', alt: '([^']+)', category: '([^']+)', sourceFiles: \[([^\]]*)\] \}/g)];
assert.equal(galleryImages.length, 50, 'Expected 50 distinct images across selected work and supplied categories.');
const galleryPaths = galleryImages.map(([, imagePath]) => imagePath);
assert.equal(new Set(galleryPaths).size, galleryPaths.length, 'Gallery must not contain duplicate image paths.');
const categoryCounts = new Map();
const sourceFiles = [];
for (const [, imagePath, alt, category, rawSourceFiles] of galleryImages) {
  assert.ok(alt.trim().length > 0, `Missing alt text for ${imagePath}`);
  await access(resolve(root, 'public', imagePath.slice(1)));
  const sourceNames = [...rawSourceFiles.matchAll(/'([^']+)'/g)].map((match) => match[1]);
  sourceFiles.push(...sourceNames);
  if (category !== 'Selected work') {
    categoryCounts.set(category, (categoryCounts.get(category) ?? 0) + sourceNames.length);
  }
}
assert.deepEqual(
  Object.fromEntries(categoryCounts),
  {
    Beef: 7,
    Seafood: 5,
    Poultry: 11,
    Mains: 8,
    'Starters & small plates': 4,
    Desserts: 3,
    'In the kitchen': 2,
  },
  'All 40 supplied photos must be represented under their original categories.',
);
assert.equal(sourceFiles.length, 40, 'Expected all 40 categorized source photos to be referenced.');
assert.equal(new Set(sourceFiles).size, 40, 'Every supplied source filename must be represented exactly once.');
await access(resolve(root, 'public/images/profile/rajiv-limbajee-precision-plating.webp'));

const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(sitemapUrls, [homepage], 'Sitemap must contain only the canonical homepage.');
assert.match(robots, /User-Agent: \*\r?\nAllow: \/\r?\n\r?\nSitemap: https:\/\/chef-rajiv-limbajee001\.vercel\.app\/sitemap\.xml/);

console.log('SEO verified: metadata, canonical, Person JSON-LD, crawlable career facts, authentic image assets, sitemap, and robots.txt.');
