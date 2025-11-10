#!/usr/bin/env node
import { promises as fs } from 'fs';
import https from 'https';
import path from 'path';

const ROOT = process.cwd();
const SITE_URL = (process.env.SITE_URL ?? 'https://milohooper.com').replace(/\/$/, '');
const PING_SITEMAP = process.env.PING_SITEMAP === 'true';
const PUBLIC_DIR = path.resolve(ROOT, 'public');
const OUTPUT_PATH = path.resolve(PUBLIC_DIR, 'sitemap.xml');
const POSTS_DATA_PATH = path.resolve(ROOT, 'src', 'data', 'posts.json');

const staticRoutes = [
  '/',
  '/posts/',
  '/now/',
  '/projects/',
  '/fun/',
  '/stats/',
  '/services/',
  '/about/',
  '/contact/',
  '/meta/',
  '/resume/',
  '/links/'
];

function normalisePath(pathname) {
  if (!pathname.startsWith('/')) {
    return `/${pathname}`;
  }
  return pathname;
}

function createUrlEntry({ loc, lastmod, changefreq }) {
  const segments = [
    '  <url>',
    `    <loc>${loc}</loc>`
  ];

  if (lastmod) {
    segments.push(`    <lastmod>${lastmod}</lastmod>`);
  }

  if (changefreq) {
    segments.push(`    <changefreq>${changefreq}</changefreq>`);
  }

  segments.push('  </url>');
  return segments.join('\n');
}

async function readPostRoutes() {
  try {
    const raw = await fs.readFile(POSTS_DATA_PATH, 'utf-8');
    const posts = JSON.parse(raw);
    return posts
      .filter((post) => post?.slug)
      .map((post) => ({
        path: normalisePath(`blog/${post.slug}/`),
        lastmod: post?.date ? new Date(post.date).toISOString() : undefined
      }));
  } catch (error) {
    if (error?.code === 'ENOENT') {
      console.warn('No posts metadata found at src/data/posts.json; skipping blog entries.');
      return [];
    }

    console.warn('Unable to read posts metadata, skipping blog entries.', error);
    return [];
  }
}

async function ensureDirectory(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function buildSitemap() {
  const urls = new Map();

  for (const route of staticRoutes) {
    const path = normalisePath(route);
    urls.set(path, {
      loc: `${SITE_URL}${path}`,
      changefreq: 'weekly'
    });
  }

  const postRoutes = await readPostRoutes();
  for (const post of postRoutes) {
    const path = normalisePath(post.path);
    urls.set(path, {
      loc: `${SITE_URL}${path}`,
      lastmod: post.lastmod,
      changefreq: 'monthly'
    });
  }

  const urlset = Array.from(urls.values())
    .sort((a, b) => a.loc.localeCompare(b.loc))
    .map(createUrlEntry)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    `${urlset}\n` +
    '</urlset>\n';
}

async function pingSearchEngines(sitemapUrl) {
  const services = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
  ];

  await Promise.allSettled(
    services.map(
      (serviceUrl) =>
        new Promise((resolve) => {
          https
            .get(serviceUrl, (response) => {
              response.resume();
              response.on('end', resolve);
            })
            .on('error', resolve);
        })
    )
  );
}

async function main() {
  await ensureDirectory(PUBLIC_DIR);
  const xml = await buildSitemap();
  await fs.writeFile(OUTPUT_PATH, xml, 'utf-8');
  console.log(`Sitemap written to ${OUTPUT_PATH}`);

  if (PING_SITEMAP) {
    const sitemapUrl = `${SITE_URL}/sitemap.xml`;
    await pingSearchEngines(sitemapUrl);
    console.log('Sitemap pinged to Google and Bing.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
