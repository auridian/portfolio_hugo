import rawPosts from '../data/posts.json';

export type PostMeta = {
  slug: string;
  title: string;
  date: string | null;
  summary: string;
  categories: string[];
  legacyPermalink: string | null;
  htmlPath: string;
  bodyHtml?: string;
  legacyNoticeHtml?: string | null;
};

function coercePost(post: PostMeta): PostMeta {
  return {
    ...post,
    slug: post.slug,
    title: post.title,
    date: post.date ?? null,
    summary: post.summary ?? '',
    categories: Array.isArray(post.categories) ? post.categories : [],
    legacyPermalink: post.legacyPermalink ?? null,
    htmlPath: post.htmlPath,
    bodyHtml: post.bodyHtml ?? undefined,
    legacyNoticeHtml: post.legacyNoticeHtml ?? (post.legacyPermalink ? `Originally published at ${post.legacyPermalink}` : null)
  };
}

const parsed = (rawPosts as PostMeta[]).map(coercePost);

export function getPosts(): PostMeta[] {
  return parsed;
}

export function getLatestPosts(limit = 3): PostMeta[] {
  return parsed.slice(0, limit);
}

export function getPostBySlug(slug: string): PostMeta | undefined {
  return parsed.find((post) => post.slug === slug);
}
