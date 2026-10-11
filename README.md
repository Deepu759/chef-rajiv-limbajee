# Chef Rajiv Limbajee — Personal Portfolio

An editorial personal profile for Rajiv Limbajee, Head Chef at Le Petit Beefbar Edinburgh, within InterContinental Edinburgh The George. Built with Next.js App Router and TypeScript; content is maintained in local data files.

## Run locally

Requirements: Node.js 20.9 or newer and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Run `pnpm lint` for ESLint and `pnpm build` for a production build.

## Update verified content

- Edit the identity, career chronology, philosophy, skills, awards and professional-reference content in `src/data/chef.ts`.
- Keep role titles and dates aligned with Rajiv's verified history.
- Empty awards, skills, philosophy and reference wording are hidden from the public page. Their sections appear when verified content is added. A reference quotation must be approved before it is published.

## Photography

- The hero uses the supplied black-and-white action portrait. The earlier authentic portrait remains in `public/images/profile/` as an alternate. The gallery presents 14 authentic food photographs; two additional kitchen photographs are kept in `public/images/kitchen/`.
- Optimized WebP copies are stored in `public/images/profile/`, `public/images/food/` and `public/images/kitchen/`; supplied originals remain unchanged in their source locations.
- Gallery image paths and neutral, descriptive alt text are maintained in `src/data/gallery.ts`. The carousel supports touch, mouse drag, arrow keys and manual controls, and pauses autoplay for reduced-motion preferences.
- Keep original files and do not use stock or generated images to represent Rajiv or his work. When replacing images, use appropriately sized WebP files and update their descriptive alt text.

## Visual system

The design uses warm ivory, charcoal, warm stone and muted champagne/brass accents, with editorial serif headlines and readable sans-serif body text. The black-and-white hero portrait preserves its supplied tonal treatment.

## Configure canonical metadata and indexing

The canonical production origin is `https://chef-rajiv-limbajee001.vercel.app`. Metadata, Person structured data, `robots.txt` and `sitemap.xml` use this origin as a safe fallback, including in local builds. `NEXT_PUBLIC_SITE_URL` is optional; the current project accepts only this known production origin after trimming trailing slashes, so preview and localhost URLs are never added to canonical metadata or the sitemap.

Run `pnpm build`, then `pnpm verify:seo` and `pnpm verify:sitemap` to check generated metadata, canonical URL, Person JSON-LD, visible career facts, image assets, robots.txt and sitemap contents. Google Search Console verification is configured in the root metadata.

After deployment:

1. Open `https://chef-rajiv-limbajee001.vercel.app/sitemap.xml` and confirm it lists the production homepage.
2. Open `https://chef-rajiv-limbajee001.vercel.app/robots.txt` and confirm it allows crawling and points to that sitemap.
3. Complete Google Search Console ownership verification if it is still pending, then submit `sitemap.xml` under **Sitemaps**.
4. Request indexing of the homepage if desired. Google controls indexing and search appearance; structured data does not guarantee a ranking or Knowledge Panel.

## Deploy to Vercel

Use the existing GitHub repository [`Deepu759/chef-rajiv-limbajee`](https://github.com/Deepu759/chef-rajiv-limbajee) and its existing Vercel project. Do not create a second repository or Vercel project.

```bash
pnpm lint
pnpm build

git status
git add -A
git commit -m "Describe the change"
git push origin main
```

The existing Vercel project's Git settings must connect to this repository, use `main` as its Production Branch, and create a Production deployment for pushes to `main`. Preserve the existing production domain and ensure the Production deployment is publicly accessible; keep Preview deployment protection as configured for the team.

After each push, check the existing Vercel project's deployment list. Confirm the new commit has a **Ready** Production deployment, then visit the assigned production domain and verify the changed page and assets. Do not treat a Preview deployment or an unverified generated URL as the production site.

`NEXT_PUBLIC_SITE_URL` can be set in Vercel's Production environment to `https://chef-rajiv-limbajee001.vercel.app`; it is optional because the code has this production fallback. After a production deployment, verify the canonical URL, Person structured data, `/robots.txt` and `/sitemap.xml` on the production domain. A successful local build does not confirm deployment or indexing.

There are no additional application routes beyond the homepage; Next.js supplies the not-found route. The sitemap and robots files are generated from `src/app/sitemap.ts` and `src/app/robots.ts`.
