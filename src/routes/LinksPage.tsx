export function LinksPage() {
  return (
    <section className="links">
      <header className="section-header">
        <h2>Links</h2>
        <p>links to either my things, referral links to stuff I use, or other neat destinations on the web</p>
      </header>
      <h3>my stuff</h3>
      <ul className="links-list">
        <li>
          <a href="https://auridium.tech" target="_blank" rel="noopener noreferrer">
            Auridium Technologies
          </a>
        </li>
        <li>
          <a href="https://defusion.substack.com" target="_blank" rel="noopener noreferrer">
            Defusion blog
          </a>
        </li>
        <li>
          <a href="https://linkedin.com/in/defusion" target="_blank" rel="noopener noreferrer">
            Linkedin (still not sure why people use this)
          </a>
        </li>

      </ul>
      <h3>referral links</h3>
      <ul className="links-list">
        <li>
          <a href="https://www.joincrowdhealth.com/?referral_code=MILO" target="_blank" rel="noopener noreferrer">
            Crowd Health - crowdsharing insurance alternative for those who are annoyed with insurance (aka everyone)
          </a>
        </li>
        <li>
          <a href="https://windsurf.com/refer?referral_code=hzdy0gmsugne2jp8" target="_blank" rel="noopener noreferrer">
            windsurf ide
          </a>
        </li>
      </ul>
      <h3>other</h3>
      <ul className="links-list">
        <li>
          <a href="">placeholder</a>
        </li>
      </ul>
    </section>
  );
}
