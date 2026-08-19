#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { JSDOM } from 'jsdom';

const ROOT = process.cwd();
const SITE_URL = (process.env.SITE_URL ?? 'https://milohooper.com').replace(/\/$/, '');
const SOURCE_DIR = path.resolve(ROOT, 'posts');
const OUTPUT_HTML_DIR = path.resolve(ROOT, 'public', 'blog');
const POST_STYLES_SOURCE = path.resolve(ROOT, 'scripts', 'post.css');
const POST_STYLES_OUTPUT = path.resolve(OUTPUT_HTML_DIR, 'post.css');
const DATA_DIR = path.resolve(ROOT, 'src', 'data');
const DATA_FILE = path.resolve(DATA_DIR, 'posts.json');

const SUPPORTED_EXTENSIONS = new Set(['.md']);

const dom = new JSDOM('');
const document = dom.window.document;

async function ensureDirectory(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

function baseNameWithoutExt(filename) {
  return filename.replace(/\.md$/i, '');
}

function stripDatePrefix(value) {
  const match = value.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
  return match ? match[2] : value;
}

function slugFromFilename(filename) {
  const base = baseNameWithoutExt(filename);
  return stripDatePrefix(base.toLowerCase());
}

function normalizeCategories(input) {
  if (!input) return [];
  if (Array.isArray(input)) return input.map((item) => String(item));
  return [String(input)];
}

function decodeHtmlEntities(str) {
  if (!str) return '';
  const textarea = document.createElement('textarea');
  textarea.innerHTML = str;
  return textarea.value;
}

function markdownToPlainText(markdown) {
  if (!markdown) return '';
  const html = marked.parse(markdown);
  const container = document.createElement('div');
  container.innerHTML = html;
  return container.textContent?.replace(/\s+/g, ' ').trim() ?? '';
}

function extractSummary(markdown) {
  const blocks = markdown.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
  if (blocks.length === 0) return '';
  const firstBlockText = markdownToPlainText(blocks[0]);
  return firstBlockText.length > 260 ? `${firstBlockText.slice(0, 257)}…` : firstBlockText;
}

function buildHtmlDocument({ title, description, body, legacyPermalink, canonicalPath, pdfUrl }) {
  const metaDescription = description || 'Post by Milo J. Hooper';
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const legacyNotice = legacyPermalink
    ? `<aside class="legacy-banner">Originally published at <a href="${legacyPermalink}">${legacyPermalink}</a></aside>`
    : '';
  const legacyNoticeLine = legacyNotice ? `      ${legacyNotice}\n` : '';
  const pdfViewer = pdfUrl
    ? `<div class="post-pdf-actions">
        <a href="${pdfUrl}" target="_blank" rel="noopener noreferrer">Open PDF</a>
        <a href="${pdfUrl}" download rel="noopener noreferrer">Download PDF</a>
      </div>
      <div class="post-pdf-viewer">
        <iframe src="${pdfUrl}#view=FitH" title="${title} PDF preview" loading="lazy"></iframe>
      </div>
      <p class="post-pdf-fallback">Embedded preview not displaying? <a href="${pdfUrl}">Open the PDF directly</a>.</p>`
    : '';
  const pdfViewerLine = pdfViewer ? `      ${pdfViewer}\n` : '';

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${decodeHtmlEntities(metaDescription).replace(/"/g, '&quot;')}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${decodeHtmlEntities(metaDescription).replace(/"/g, '&quot;')}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta name="twitter:card" content="summary" />
    <link rel="stylesheet" href="/blog/post.css" />
  </head>
  <body>
    <main class="post-wrapper">
${legacyNoticeLine}      <article class="post">${body}</article>
${pdfViewerLine}    </main>
  </body>
</html>`;
}

async function collectSourceFiles() {
  const entries = await fs.readdir(SOURCE_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .filter((entry) => {
      const lower = entry.name.toLowerCase();
      return Array.from(SUPPORTED_EXTENSIONS).some((ext) => lower.endsWith(ext));
    })
    .map((entry) => entry.name);
}

async function readMarkdown(filePath) {
  const raw = await fs.readFile(filePath, 'utf-8');
  return matter(raw);
}

async function writePostHtml(slug, htmlDocument) {
  const dir = path.resolve(OUTPUT_HTML_DIR, slug);
  await ensureDirectory(dir);
  const target = path.resolve(dir, 'index.html');
  await fs.writeFile(target, htmlDocument, 'utf-8');
}

async function writeMetadata(posts) {
  await ensureDirectory(DATA_DIR);
  await fs.writeFile(DATA_FILE, `${JSON.stringify(posts, null, 2)}\n`, 'utf-8');
}

async function main() {
  await fs.rm(OUTPUT_HTML_DIR, { recursive: true, force: true });
  await ensureDirectory(OUTPUT_HTML_DIR);
  await fs.copyFile(POST_STYLES_SOURCE, POST_STYLES_OUTPUT);

  const files = await collectSourceFiles();
  if (files.length === 0) {
    console.warn('No markdown posts found in posts/.');
    await writeMetadata([]);
    return;
  }

  const posts = [];

  for (const filename of files) {
    const filePath = path.resolve(SOURCE_DIR, filename);
    const { data, content } = await readMarkdown(filePath);
    const normalizedMarkdown = content;

    const rawSlug = data.slug ? String(data.slug) : baseNameWithoutExt(filename);
    const canonicalSlug = stripDatePrefix(rawSlug.toLowerCase());
    const slug = canonicalSlug;
    const title = data.title ? String(data.title) : slug;
    const htmlBody = marked.parse(normalizedMarkdown);
    const summarySource = data.summary || data.description || extractSummary(normalizedMarkdown);
    const summary = decodeHtmlEntities(summarySource);
    const dateISO = data.date ? new Date(data.date).toISOString() : null;
    const categories = normalizeCategories(data.categories);
    const legacyPermalink = data.permalink ? String(data.permalink) : null;
    const pdfUrl = data.pdfUrl ? String(data.pdfUrl) : null;
    const canonicalPath = `/blog/${slug}/`;
    const legacyNoticeHtml = legacyPermalink
      ? `Originally published at <a href="${legacyPermalink}">${legacyPermalink}</a>`
      : null;

    const htmlDocument = buildHtmlDocument({
      title,
      description: summary,
      body: htmlBody,
      legacyPermalink,
      canonicalPath,
      pdfUrl
    });

    await writePostHtml(slug, htmlDocument);

    posts.push({
      slug,
      title,
      date: dateISO,
      summary,
      categories,
      legacyPermalink,
      pdfUrl,
      htmlPath: canonicalPath,
      bodyHtml: htmlBody,
      legacyNoticeHtml
    });
  }

  posts.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date) - new Date(a.date);
  });

  await writeMetadata(posts);
  console.log(`Imported ${posts.length} posts into public/blog and src/data/posts.json`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
