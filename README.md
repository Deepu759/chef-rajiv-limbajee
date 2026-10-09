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

- The hero uses the supplied black-and-white action portrait. The earlier authentic portrait remains in `public/images/profile/` as an alternate. The curated gallery contains 14 food images and two kitchen photographs.
- Optimized WebP copies are stored in `public/images/profile/`, `public/images/food/` and `public/images/kitchen/`; supplied originals remain unchanged in their source locations.
- Gallery image paths, neutral captions, categories and alt text are maintained in `src/data/gallery.ts`. The lightbox supports keyboard dismissal and reduced-motion preferences.
- Keep original files and do not use stock or generated images to represent Rajiv or his work. When replacing images, use appropriately sized WebP files and update their descriptive alt text.

## Visual system

The design uses warm ivory, charcoal, warm stone and muted champagne/brass accents, with editorial serif headlines and readable sans-serif body text. The black-and-white hero portrait preserves its supplied tonal treatment.

## Configure canonical metadata and indexing

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` for local production-metadata checks and in Vercel's Production environment variables to the verified production origin (for example, `https://your-domain.example`), with no trailing slash. `.env.example` documents the variable without supplying a guessed domain. Until configured, canonical and Person schema `url` fields are omitted and the sitemap has no entries; this avoids publishing localhost or an invented domain. The site still serves `/robots.txt` and `/sitemap.xml`.

After deployment:

1. Open `https://<your-domain>/sitemap.xml` and confirm it lists the production homepage.
2. Open `https://<your-domain>/robots.txt` and confirm it allows crawling and points to that sitemap.
3. Verify the domain in Google Search Console, then submit `sitemap.xml` under **Sitemaps**.
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

The existing Vercel project's Git settings must connect to this repository, use `main` as its Production Branch, and create a Production deployment for pushes to `main`. Confirm those settings before relying on automatic production deployments. Preserve the existing production domain and ensure the Production deployment is publicly accessible; keep Preview deployment protection as configured for the team.

After each push, check the existing Vercel project's deployment list. Confirm the new commit has a **Ready** Production deployment, then visit the assigned production domain and verify the changed page and assets. Do not treat a Preview deployment or an unverified generated URL as the production site.

Set `NEXT_PUBLIC_SITE_URL` in Vercel's Production environment variables to the exact HTTPS production origin, with no trailing slash. Redeploy after changing it, then verify the canonical URL, Person structured data, `/robots.txt` and `/sitemap.xml` on the production domain. The current production domain and GitHub-to-Vercel settings still need to be confirmed in the existing Vercel account before automatic deployment can be considered verified.

There are no additional application routes beyond the homepage; Next.js supplies the not-found route. The sitemap and robots files are generated from `src/app/sitemap.ts` and `src/app/robots.ts`.
