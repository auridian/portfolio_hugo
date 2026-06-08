import { Link } from 'react-router-dom';
import { getPosts } from '../lib/posts';

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

export function PostsPage() {
  const posts = getPosts();
  const hasPosts = posts.length > 0;

  return (
    <section className="posts">
      <header className="section-header">
        <h2>Writing</h2>
        <p>
          Essays, project writeups, and older site posts collected under stable <code>/blog/</code> URLs.
        </p>
      </header>
      {hasPosts ? (
        <div className="posts-grid">
          {posts.map((post) => (
            <article key={post.slug} className="post-teaser">
              <header>
                <h3>
                  <Link to={post.htmlPath}>{post.title}</Link>
                </h3>
                {post.date && <time dateTime={post.date}>{formatPostDate(post.date)}</time>}
              </header>
              <p>{post.summary}</p>
              <footer>
                <Link className="btn tertiary" to={post.htmlPath}>
                  Read post
                </Link>
                {/*post.legacyPermalink && (
                  <a className="legacy-link" href={post.legacyPermalink}>
                    Original permalink
                  </a>
                )}*/}
              </footer>
            </article>
          ))}
        </div>
      ) : (
        <div className="posts-empty">
          <p>Nothing is published here yet, but the archive migration is in progress.</p>
          <p>
            Need the old content now? Grab it from the <a href="/archive/oldsite/index.html">legacy snapshot</a>.
          </p>
        </div>
      )}
    </section>
  );
}
