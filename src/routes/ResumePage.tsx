export function ResumePage() {
  return (
    <section className="resume">
      <header className="section-header">
        <h2>Resume</h2>
        <p>
          note: this pdf is a bit old, and does not cover anything done past summer 02024
        </p>
      </header>
      <div className="resume-actions">
        <a className="btn primary" href="/assets/MiloHooperResume.pdf" target="_blank" rel="noopener noreferrer">
          Download current resume
        </a>
        <a className="btn secondary" href="mailto:milo@auridium.tech">
          Start a conversation
        </a>
      </div>
    </section>
  );
}
