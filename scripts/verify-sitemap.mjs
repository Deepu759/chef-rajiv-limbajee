import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sitemapPath = resolve(projectRoot, '.next/server/app/sitemap.xml.body');
const expectedUrl = 'https://chef-rajiv-limbajee001.vercel.app/';

let sitemap;
try {
  sitemap = await readFile(sitemapPath, 'utf8');
} catch {
  console.error('Built sitemap not found. Run `pnpm build` before `pnpm verify:sitemap`.');
  process.exit(1);
}

const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
if (urls.length === 0) {
  console.error('Sitemap contains zero URL entries.');
  process.exit(1);
}

if (urls.length !== 1 || urls[0] !== expectedUrl) {
  console.error(`Sitemap must contain only ${expectedUrl}; found: ${urls.join(', ') || '(none)'}`);
  process.exit(1);
}

for (const value of urls) {
  const url = new URL(value);
  if (url.origin !== 'https://chef-rajiv-limbajee001.vercel.app' || url.hostname === 'localhost' || /vercel\.app$/.test(url.hostname) && url.hostname !== 'chef-rajiv-limbajee001.vercel.app') {
    console.error(`Sitemap contains a non-canonical, local, or preview URL: ${value}`);
    process.exit(1);
  }
}

console.log(`Sitemap verified: ${urls.length} canonical URL (${expectedUrl})`);
