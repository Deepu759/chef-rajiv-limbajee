import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
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
assert.equal(profile['@type'], 'ProfilePage');
assert.equal(profile.url, homepage);
assert.equal(profile.mainEntity?.['@type'], 'Person');
assert.equal(profile.mainEntity.name, 'Rajiv Limbajee');
assert.equal(profile.mainEntity.jobTitle, 'Head Chef');
assert.equal(profile.mainEntity.sameAs?.[0], linkedin);
assert.equal(profile.mainEntity.image, `${origin}/images/profile/rajiv-limbajee-precision-plating.webp`);
assert.match(profile.mainEntity.description, /Head Chef at Le Petit Beefbar Edinburgh/);

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

const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(sitemapUrls, [homepage], 'Sitemap must contain only the canonical homepage.');
assert.match(robots, /User-Agent: \*\r?\nAllow: \/\r?\n\r?\nSitemap: https:\/\/chef-rajiv-limbajee001\.vercel\.app\/sitemap\.xml/);

console.log('SEO verified: metadata, canonical, ProfilePage/Person JSON-LD, crawlable career facts, sitemap, and robots.txt.');
