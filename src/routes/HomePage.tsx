type SpokeNode = {
  key: string;
  label: string;
  description: string;
  href: string;
  external?: boolean;
};

const spokeNodes: SpokeNode[] = [
  { key: 'log', label: 'Log', description: 'old posts', href: '/posts' },
  { key: 'now', label: 'Now', description: 'active threads', href: '/now' },
  { key: 'projects', label: 'Projects', description: 'hardware + software', href: '/projects' },
  { key: 'stats', label: 'Stats', description: 'quantifications', href: '/stats' },
  { key: 'about', label: 'About', description: 'about me', href: '/about' },
  { key: 'contact', label: 'Contact', description: 'hit me up', href: '/contact' },
  { key: 'meta', label: 'Meta', description: 'site stuff', href: '/meta' },
  { key: 'resume', label: 'Resume', description: 'see resume', href: '/assets/MiloHooperResume.pdf' },
  { key: 'github', label: 'GitHub', description: 'github', href: 'https://github.com/auridian', external: true }
];

export function HomePage() {
  return (
    <section className="home home--orb-focused">
      <div className="home-orb">
        <div className="home-orb__halo" aria-hidden />
        <div className="home-orb__core">
          <p className="home-kicker">home</p>
          <h1 className="home-orb__title">Milo J. Hooper</h1>
          <p className="home-orb__intro">
            sovereign economic agent
          </p>
          <div className="home-orb__cta">
            <a className="btn primary" href="/posts">
              &gt;goto blog
            </a>
            <a className="btn secondary" href="/assets/MiloHooperResume.pdf" target="_blank" rel="noopener noreferrer">
              &gt;resume pdf (old)
            </a>
          </div>
        </div>

        <div className="home-orb__spokes">
          {spokeNodes.map((node) => {
            const linkProps = node.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : undefined;

            return (
              <a
                key={node.key}
                className={`orb-spoke orb-spoke--${node.key}`}
                href={node.href}
                {...linkProps}
              >
                <span className="orb-spoke__label">{node.label}</span>
                <span className="orb-spoke__meta">{node.description}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
