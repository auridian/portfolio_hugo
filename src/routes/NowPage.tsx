import { useNowFeed } from '../hooks/useNowFeed';

export function NowPage() {
  const { data, loading, error } = useNowFeed();

  return (
    <section className="now-page">
      <header className="section-header">
        <h1>Now</h1>
        <p>
          Live threads from Milo's operational orbit. Updated{' '}
          {data?.updatedAt ? new Date(data.updatedAt).toLocaleString() : 'periodically'}.
        </p>
      </header>

      {loading && (
        <div className="now-feed now-feed--loading">
          <p>Loading current threads…</p>
        </div>
      )}

      {Boolean(error) && !loading && (
        <div className="now-feed now-feed--error">
          <p>Unable to load the latest threads. Serving cached mock data.</p>
        </div>
      )}

      {data && (
        <div className="now-feed">
          {data.entries.map((entry) => (
            <article key={entry.id} className={`now-entry now-entry--${entry.status}`}>
              <header>
                <h2>{entry.title}</h2>
                {entry.startedAt && (
                  <time dateTime={entry.startedAt}>
                    Started {new Date(entry.startedAt).toLocaleDateString()}
                  </time>
                )}
              </header>
              <p>{entry.summary}</p>
              <footer>
                <span className="now-entry__status">Status: {entry.status}</span>
              </footer>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
