import type { CSSProperties } from 'react';

type SpokeNode = {
  key: string;
  label: string;
  description: string;
  href: string;
  external?: boolean;
};

const spokeNodes: SpokeNode[] = [
  { key: 'X', label: 'X', description: 'X (Twitter)', href: 'https://twitter.com/defusionista', external: true },
  //{ key: 'fun', label: 'fun', description: 'fun and games', href: '/fun' },
  {key: 'blog', label: 'blog', description: 'old site posts', href: '/posts' },
  { key: 'substack', label: 'substack', description: 'thoughts on tech and life', href: 'https://defusion.substack.com/', external: true },
  { key: 'links', label: 'links', description: '', href: '/links' },
  { key: 'about', label: 'About', description: 'about', href: '/about' },
  { key: 'services', label: 'Services', description: 'pay me to do stuff', href: '/services' },
  { key: 'contact', label: 'Contact', description: 'say hi', href: '/contact' },
  { key: 'auridium', label: 'Auridium', description: 'my commercial entity', href: 'https://auridium.tech/', external: true },
  { key: 'resume', label: 'Resume', description: 'see resume', href: '/resume' },
  { key: 'github', label: 'GitHub', description: 'github', href: 'https://github.com/auridian', external: true }
];

export function HomePage() {
  const spokeCount = spokeNodes.length;

  return (
    <section className="home home--orb-focused">
      <div className="home-orb">
        <div className="home-orb__halo" aria-hidden />
        <div className="home-orb__core">
          <p className="home-kicker"></p>
          <h1 className="home-orb__title">Milo J. Hooper</h1>
          <p className="home-orb__intro">
            sovereign economic agent
          </p>
        </div>

        <div className="home-orb__spokes">
          {spokeNodes.map((node, index) => {
            const angle = spokeCount ? (360 / spokeCount) * index : 0;
            const inlineStyle = {
              '--orb-angle': `${angle}deg`
            } as CSSProperties;

            const linkProps = node.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : undefined;

            return (
              <a
                key={node.key}
                className="orb-spoke"
                href={node.href}
                style={inlineStyle}
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
