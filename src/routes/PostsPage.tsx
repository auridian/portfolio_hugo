import { getPosts } from '../lib/posts';

export function PostsPage() {
  const posts = getPosts();
  const hasPosts = posts.length > 0;

  return (
    <section className="posts">
      <header className="section-header">
        <h2>Posts</h2>
        <p>
          Legacy articles are being remixed into new canonical URLs under <code>/blog/</code>. Expect project breakdowns,
          build logs, and occasional philosophical detours.
          
        </p>
      </header>
      {hasPosts ? (
        <div className="posts-grid">
          {posts.map((post) => (
            <article key={post.slug} className="post-teaser">
              <header>
                <h3>
                  <a href={post.htmlPath}>{post.title}</a>
                </h3>
                {post.date && <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>}
              </header>
              <p>{post.summary}</p>
              <footer>
                <a className="btn tertiary" href={post.htmlPath}>
                  Read post
                </a>
                {post.legacyPermalink && (
                  <a className="legacy-link" href={post.legacyPermalink}>
                    Original permalink
                  </a>
                )}
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
