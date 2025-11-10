const RESUME_URL = '/assets/MiloHooperResume.pdf';
const RESUME_SIZE = '≈230 KB PDF';

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
        <a className="btn primary" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
          Open resume ({RESUME_SIZE})
        </a>
        <a className="btn secondary" href={RESUME_URL} download rel="noopener noreferrer">
          Download PDF
        </a>
      </div>
      <div className="resume-viewer">
        <iframe src={`${RESUME_URL}#view=FitH`} title="Resume PDF preview" loading="lazy" />
      </div>
      <p className="text-subtle">
        Embedded preview not displaying? <a href={RESUME_URL}>Open the PDF directly</a> or use the download option above.
      </p>
    </section>
  );
}
