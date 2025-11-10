import { useMemo, useState } from 'react';

const NOISE_SNIPPETS = [
  '01001110 01001111 01010100 01001000 01001001 01001110 01000111',
  'here lies the entropy you discarded.',
  'routing bit bucket overflow imminent... just kidding.',
  'if you are reading this, congratulations on your curiosity.'
];

export function DevNullPage() {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const snippet = useMemo(() => NOISE_SNIPPETS[Math.floor(Math.random() * NOISE_SNIPPETS.length)], []);

  function handleGenerate() {
    const value = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    setRandomNumber(value);
  }

  return (
    <section className="dev-null">
      <header className="section-header">
        <h2>/dev/null</h2>
        <p>wheeee! seriously why are you here though</p>
      </header>

      {/* <div className="dev-null__terminal" role="presentation">
        <p className="dev-null__prompt">$ echo "{snippet}" &gt; /dev/null</p>
        <p className="dev-null__output">{snippet}</p>
      </div> */}

      <div className="dev-null__entropy">
        <button type="button" className="btn tertiary" onClick={handleGenerate}>
          request entropy sample
        </button>
        {randomNumber !== null && (
          <p className="dev-null__number">{randomNumber}</p>
        )}
      </div>

      <p className="text-subtle">
        the dinosaurs shall meet their meteor
      </p>
    </section>
  );
}
