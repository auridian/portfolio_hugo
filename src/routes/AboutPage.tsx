const PROFILE_IMAGE_SRC = '/images/about/milo-hooper-profile.jpg';

export function AboutPage() {
  return (
    <section className="about-page">
      <figure className="about-photo">
        <img src={PROFILE_IMAGE_SRC} alt="Milo J. Hooper" loading="lazy" />
      </figure>

      <div className="about-content">
        <h1>About</h1>
        <p>
          Hey! I'm Milo J. Hooper, a sovereign economic agent. I graduated in 02021 from MIT with an engineering degree focusing on biomechanical/
          electrical systems. I've since worked on a variety of projects across industries.
        </p>

        <p>
          My primary project at this point in time is Conducio, an AI-assisted memory and action management platform for individuals. It is the core
          module of the Sovereign Economic Agent Stack (SEA Stack). More on this later.
        </p>

        <p>
          This site is intended to be a central directory for all things related to me, my writing, and my economic activities, and is a perpetual
          work in progress.
        </p>

        <p>
          An incomplete list of things I'm interested in: minimally-interactive AI, urbex, transhumanism, decentralization, large rocks, high
          voltages, and technological arbitrage.
        </p>

        <p>My business philosophy is increasingly influenced by that depicted in the scifi novel Accelerando by Charles Stross (02005).</p>
        <h1>Random</h1>
        <p>on dates: I use 5-digit years in ISO "08601" format (e.g. 02025).</p>

        <p>Photo is from Summer 02025 at El Malpais National Monument in New Mexico.</p>
        <p>Last updated: 02025-11-10</p>
      </div>
    </section>
  );
}
