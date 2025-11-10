import { useEffect, useState } from 'react';
import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router-dom';
import { getPostBySlug, type PostMeta } from '../lib/posts';

function formatPostDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  const year = String(date.getUTCFullYear()).padStart(5, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export async function blogPostLoader({ params }: LoaderFunctionArgs): Promise<PostMeta> {
  const slug = params.slug ?? '';
  const entry = getPostBySlug(slug);

  if (!entry) {
    throw new Response('Not Found', { status: 404, statusText: 'Post not found' });
  }

  return entry;
}

export function BlogPostPage() {
  const entry = useLoaderData() as PostMeta;
  const [bodyHtml, setBodyHtml] = useState(entry.bodyHtml ?? '');
  const [legacyNotice, setLegacyNotice] = useState(entry.legacyNoticeHtml ?? null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = `${entry.title} · Milo J. Hooper`;
  }, [entry.title]);

  useEffect(() => {
    if (entry.bodyHtml) {
      return;
    }

    let cancelled = false;

    async function fetchHtml() {
      try {
        const response = await fetch(entry.htmlPath);
        if (!response.ok) {
          throw new Error(`Failed to load post HTML (${response.status})`);
        }
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const article = doc.querySelector('article.post');
        //const legacy = doc.querySelector('.legacy-banner');
        if (!cancelled) {
          setBodyHtml(article ? article.innerHTML : text);
          //setLegacyNotice(legacy ? legacy.innerHTML : null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load post content.');
        }
      }
    }

    fetchHtml();

    return () => {
      cancelled = true;
    };
  }, [entry]);

  return (
    <article className="blog-post">
      <header className="blog-post-header">
        <div>
          <h2>{entry.title}</h2>
          {entry.date && <time dateTime={entry.date}>{formatPostDate(entry.date)}</time>}
        </div>
        {entry.categories.length > 0 && (
          <ul className="blog-post-tags">
            {entry.categories.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        )}
      </header>

      <nav className="blog-post-nav">
        <Link className="btn tertiary" to="/posts">
          ← Back to posts
        </Link>
      </nav>

      {/*{legacyNotice && (
        <aside className="blog-post-legacy" dangerouslySetInnerHTML={{ __html: legacyNotice }} />
      )}*/}

      {error ? (
        <p className="blog-post-error">{error}</p>
      ) : (
        <section className="blog-post-body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      )}
    </article>
  );
}
