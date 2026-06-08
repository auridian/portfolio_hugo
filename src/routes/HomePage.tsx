type HomeLink = {
  key: string;
  label: string;
  description: string;
  href: string;
  external?: boolean;
};

const primaryLinks: HomeLink[] = [
  { key: 'about', label: 'About', description: '', href: '/about' },
  { key: 'services', label: 'Services', description: 'stuff you can pay me to do (non-exhaustive)', href: '/services' },
  { key: 'contact', label: 'Contact', description: '', href: '/contact' },
  { key: 'resume', label: 'Resume', description: 'pdf (last updated 02024)', href: '/resume' }
];

const secondaryLinks: HomeLink[] = [
  { key: 'writing', label: 'Writing', description: 'essays, old site posts, and project notes', href: '/posts' },
  { key: 'links', label: 'Links', description: 'fun things and referrals', href: '/links' },
  { key: 'substack', label: 'Substack', description: 'nag me to write more please', href: 'https://defusion.substack.com/', external: true },
  { key: 'x', label: 'X', description: 'formerly known as Twitter', href: 'https://twitter.com/defusionista', external: true },
  { key: 'github', label: 'GitHub', description: 'mostly older public stuff', href: 'https://github.com/auridian', external: true },
  { key: 'auridium', label: 'Auridium', description: 'my corporate entity', href: 'https://auridium.tech/', external: true }
];

function linkProps(link: HomeLink) {
  return link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}

export function HomePage() {
  return (
    <section className="home home--signal">
      <div className="home-stage">
        <div className="home-identity" aria-label="Milo J. Hooper">
          <p className="home-kicker">automating myself and lifemaxxing</p>
          <h1>Milo J. Hooper</h1>
          <p className="home-deck">
            let's do something cool
          </p>
        </div>

        <nav className="home-actions" aria-label="Primary">
          {primaryLinks.map((link) => (
            <a key={link.key} className="home-action" href={link.href} {...linkProps(link)}>
              <span>{link.label}</span>
              <small>{link.description}</small>
            </a>
          ))}
        </nav>

        <nav className="home-link-grid" aria-label="Secondary">
          {secondaryLinks.map((link) => (
            <a key={link.key} className="home-link-card" href={link.href} {...linkProps(link)}>
              <span className="home-link-card__label">{link.label}</span>
              <span className="home-link-card__description">{link.description}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
