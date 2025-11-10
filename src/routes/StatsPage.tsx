import { useStatsSnapshot } from '../hooks/useStatsSnapshot';

export function StatsPage() {
  const { data, loading, error } = useStatsSnapshot();

  return (
    <section className="stats-page">
      <header className="section-header">
        <h1>Stats</h1>
        <p>Real-time telemetry and counts surfaced from Milo's instruments.</p>
      </header>

      {loading && (
        <div className="stats-grid stats-grid--loading">
          <p>Collecting metrics…</p>
        </div>
      )}

      {Boolean(error) && !loading && (
        <div className="stats-grid stats-grid--error">
          <p>Telemetry link is down. Showing cached snapshot instead.</p>
        </div>
      )}

      {data && (
        <div className="stats-grid">
          {data.metrics.map((metric) => (
            <article key={metric.id} className="stats-card">
              <header>
                <h2>{metric.label}</h2>
                {metric.trend && <span className={`trend trend--${metric.trend}`}>{metric.trend}</span>}
              </header>
              <p className="stats-card__value">
                {metric.value}
                {metric.unit ? <span className="stats-card__unit">{metric.unit}</span> : null}
              </p>
              {metric.change && <p className="stats-card__change">{metric.change}</p>}
            </article>
          ))}
        </div>
      )}

      {data?.notes && <p className="stats-notes">{data.notes}</p>}
    </section>
  );
}
