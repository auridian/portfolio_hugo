type BorrowedIdea = {
  place: string;
  ideas: string[];
};

type BillConcept = {
  title: string;
  topic: string;
  stage: 'concept' | 'research needed';
  summary: string;
  details: string[];
};

const borrowedIdeas: BorrowedIdea[] = [
  {
    place: 'Idaho',
    ideas: [
      'Adopt an “Idaho stop” rule: people on bicycles may treat stop signs as yield signs and red lights as stop signs.'
    ]
  },
  {
    place: 'California',
    ideas: [
      'Permit motorcycle lane splitting.',
      'Explore one-way tolling at suitable crossings, with the round-trip toll collected in one direction to reduce equipment and maintenance overhead.'
    ]
  },
  {
    place: 'Wyoming',
    ideas: [
      'Eliminate the corporate income tax.',
      'Study business-privacy protections that could make New Hampshire a more attractive place to organize a company.'
    ]
  },
  {
    place: 'Delaware',
    ideas: [
      'Create a specialized business court modeled on the Court of Chancery to attract in-state incorporation and generate revenue.'
    ]
  },
  {
    place: 'Massachusetts',
    ideas: [
      'Allow 35% visible light transmission on front-side vehicle windows instead of New Hampshire’s current 70% threshold.'
    ]
  }
];

const interstateIdeas = [
  'Pursue broader electronic-toll interoperability, including compatibility with systems such as FasTrak, SunPass, and Texas toll networks.',
  'Expand voluntary concealed-carry permit reciprocity, prioritizing agreements with neighboring states where possible.'
];

const billConcepts: BillConcept[] = [
  {
    title: 'Advanced Air Mobility Readiness Act',
    topic: 'transportation',
    stage: 'research needed',
    summary: 'Make New Hampshire an unusually easy place to test, own, and operate eVTOL aircraft and roadable aircraft.',
    details: [
      'Review state aviation, vehicle, zoning, and infrastructure rules for avoidable barriers.',
      'Create a welcoming path for manufacturers and operators, including companies developing aircraft-car combinations.'
    ]
  },
  {
    title: 'Private Airport Screening Expansion',
    topic: 'aviation',
    stage: 'research needed',
    summary: 'Ask eligible New Hampshire airports to evaluate private passenger screening under the applicable federal program.',
    details: [
      'Use Portsmouth International Airport at Pease as an in-state reference point.',
      'Explore applications or feasibility work for Manchester-Boston Regional Airport and Lebanon Municipal Airport.'
    ]
  },
  {
    title: 'Front-Side Window Tint Alignment',
    topic: 'transportation',
    stage: 'concept',
    summary: 'Bring New Hampshire’s front-side window tint limit into alignment with Massachusetts at 35% visible light transmission.',
    details: [
      'Compare the safety experience of neighboring states with less restrictive limits.',
      'Use Maine and Massachusetts as regional counterpoints during committee review.'
    ]
  },
  {
    title: 'A Public-Benefit Registry for .nh',
    topic: 'digital infrastructure',
    stage: 'research needed',
    summary: 'Explore a state-chartered but independently governed organization to apply for and administer a future .nh top-level domain.',
    details: [
      'Evaluate a public benefit corporation or nonprofit structure separate from state government.',
      'Consider civic domains such as manchester.nh if a future application round makes the idea viable.'
    ]
  },
  {
    title: 'Targeted Highway Speed Limit Updates',
    topic: 'transportation',
    stage: 'concept',
    summary: 'Raise selected 55 mph highway segments to 65 mph where road geometry and traffic conditions support it.',
    details: [
      'Everett Turnpike: approximately mile 0 at the Massachusetts border to mile 1.5, and mile 7 north to the existing 65 mph segment.',
      'I-93: approximately miles 18–19, approaching the turn and I-293 merge near Exit 6 northbound.'
    ]
  },
  {
    title: 'Smart Signal Standard',
    topic: 'infrastructure',
    stage: 'concept',
    summary: 'Require newly installed traffic signals in New Hampshire to use presence sensing and responsive signal timing.',
    details: [
      'Set a performance requirement for detecting waiting road users.',
      'Allow context-appropriate sensing technology rather than prescribing one vendor or device.'
    ]
  }
];

export function PolicyProposalsPage() {
  return (
    <section className="policy-page">
      <header className="policy-hero">
        <div className="policy-hero__eyebrow">
          <span aria-hidden="true">NH</span>
          <span>New Hampshire</span>
        </div>
        <h1>Policy proposals</h1>
        <p>
          A working notebook of policies New Hampshire could borrow, bills worth
          developing, and past efforts worth another attempt.
        </p>
        <nav className="policy-jump-links" aria-label="Policy proposal sections">
          <a href="#borrow">Borrowed ideas</a>
          <a href="#bills">Bill concepts</a>
          <a href="#retry">Retry queue</a>
        </nav>
      </header>

      <section className="policy-lane" id="borrow">
        <header className="policy-lane__header">
          <span>01 / comparative policy</span>
          <h2>Where other states do it better</h2>
          <p>
            Cherry-picked laws and practices worth considering on their own
            merits—not endorsements of another state’s entire policy model.
          </p>
        </header>

        <div className="borrow-grid">
          {borrowedIdeas.map((entry) => (
            <article className="borrow-card" key={entry.place}>
              <h3>{entry.place}</h3>
              <ul>
                {entry.ideas.map((idea) => <li key={idea}>{idea}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <aside className="interstate-card">
          <p className="policy-card__kicker">Interstate gaps</p>
          <h3>Make state lines less annoying</h3>
          <ul>
            {interstateIdeas.map((idea) => <li key={idea}>{idea}</li>)}
          </ul>
        </aside>
      </section>

      <section className="policy-lane" id="bills">
        <header className="policy-lane__header">
          <span>02 / drafting desk</span>
          <h2>Proposed bills</h2>
          <p>
            More developed concepts that could become bill text after legal,
            fiscal, and operational research.
          </p>
        </header>

        <div className="bill-grid">
          {billConcepts.map((bill) => (
            <article className="bill-card" key={bill.title}>
              <div className="bill-card__meta">
                <span>{bill.topic}</span>
                <span>{bill.stage}</span>
              </div>
              <h3>{bill.title}</h3>
              <p>{bill.summary}</p>
              <ul>
                {bill.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="policy-lane" id="retry">
        <header className="policy-lane__header">
          <span>03 / previous attempts</span>
          <h2>Retry queue</h2>
          <p>Ideas with legislative history that may deserve a revised approach.</p>
        </header>

        <article className="retry-card">
          <div>
            <p className="policy-card__kicker">Take two</p>
            <h3>Right to Try, Part II</h3>
          </div>
          <p>
            Revisit an expanded right-to-try proposal, including the earlier
            embryo-related provisions, after reviewing the prior bill language,
            objections, and disposition.
          </p>
        </article>
      </section>

      <footer className="policy-note">
        <span aria-hidden="true">//</span>
        <p>
          Independent working proposals—not official legislation, legal advice,
          or verified bill text. Factual and legal details require review before drafting.
        </p>
      </footer>
    </section>
  );
}
