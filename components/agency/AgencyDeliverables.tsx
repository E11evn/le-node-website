const deliverables = [
  {
    number: '1',
    title: 'Complete GTM Roadmap',
    description: 'A prioritized, 90-day action plan for your entire go-to-market motion.',
  },
  {
    number: '2',
    title: 'ICP & Decision-Maker Personas',
    description: 'Precise targeting profiles built from data, not assumptions.',
  },
  {
    number: '3',
    title: 'Messaging & Value Proposition',
    description: 'Copy that converts, tailored to each buyer persona and channel.',
  },
  {
    number: '4',
    title: 'Outbound Stack & Sequences',
    description: 'Full channel setup with email, LinkedIn, and phone sequences ready to launch.',
  },
  {
    number: '5',
    title: 'Repeatable Sales Process',
    description: 'A documented, stageable pipeline process your whole team follows.',
  },
  {
    number: '6',
    title: 'Sales Assets (ready to use)',
    description: 'Decks, one-pagers, objection handling guides, and email templates.',
  },
  {
    number: '7',
    title: 'Operational GTM Playbook',
    description: 'Your ICP, sequences, process, and stack — all in one master document.',
  },
  {
    number: '8',
    title: 'Scaling Roadmap',
    description: 'Hiring plan, channel expansion, and growth levers for when the engine is running.',
  },
]

const fitGood = [
  'Word-of-mouth is no longer enough to hit your targets',
  'You have a team but no repeatable system',
  "You're expert at your product, not at sales",
  'You want a system that runs without you',
]

const fitBad = [
  'You want to outsource sales completely and stay hands-off',
  'You expect results without changing your process',
  "Product-market fit isn't proven yet",
]

export default function AgencyDeliverables() {
  return (
    <>
      {/* Deliverables */}
      <section className="bg-gray-50">
        <div className="container-content">
          <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: '#FA7900' }}>
            What You Get
          </span>
          <h2 className="text-display-sm font-bold text-foreground mb-4 max-w-2xl">
            Eight concrete outputs.{' '}
            <span className="text-muted font-normal">Zero vague consulting.</span>
          </h2>
          <p className="text-muted text-lg mb-12 max-w-xl">
            Every engagement ends with assets your team can run independently — no dependency on us.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {deliverables.map(({ number, title, description }) => (
              <div key={number} className="card">
                <span className="text-2xl font-bold mb-4 block" style={{ color: '#FA7900' }}>
                  {number.padStart(2, '0')}
                </span>
                <h3 className="font-semibold text-foreground mb-2 leading-snug">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section>
        <div className="container-content">
          <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: '#FA7900' }}>
            How We Work Together
          </span>
          <h2 className="text-display-sm font-bold text-foreground mb-16 max-w-lg">
            Two stages. One system.
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Stage 1 */}
            <div className="rounded-card border border-border p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-xs font-semibold tracking-wide mb-6" style={{ color: '#FA7900' }}>
                Stage 1
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">GTM Audit</h3>
              <p className="text-muted text-sm mb-6">~10 days · Fixed fee</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Full diagnostic of your GTM motion',
                  'ICP, messaging, and channel gap analysis',
                  'CRM health check',
                  'Actionable GTM roadmap',
                  '90-minute debrief walkthrough',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ color: '#FA7900' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="/contact" className="btn-agency w-full justify-center">
                Start with an audit
              </a>
            </div>

            {/* Stage 2 */}
            <div className="rounded-card p-8 text-white" style={{ background: 'linear-gradient(135deg, #FA7900, #FA9E00)' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold tracking-wide mb-6 text-white">
                Stage 2
              </div>
              <h3 className="text-xl font-bold mb-2">GTM Partner</h3>
              <p className="text-white/70 text-sm mb-6">6-month engagement · Monthly retainer</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Bi-weekly 90-minute strategy sessions',
                  'Weekly check-ins & 2-week sprint cycles',
                  'All templates, frameworks, and playbooks',
                  'Real-time feedback & async support',
                  'Final GTM playbook delivery',
                  'Cancel after month 1 if it\'s not working',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                className="inline-flex items-center justify-center w-full px-5 py-2.5 bg-white font-semibold rounded-lg text-sm hover:bg-orange-50 transition-colors"
                style={{ color: '#FA7900' }}
              >
                Book a strategy call
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Fit assessment */}
      <section className="bg-gray-50">
        <div className="container-content">
          <h2 className="text-display-sm font-bold text-foreground mb-12 max-w-lg">
            Is this a good fit?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#FA7900' }}>
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="font-bold text-foreground">Good fit</h3>
              </div>
              <ul className="space-y-3">
                {fitGood.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#FA7900' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="font-bold text-foreground">Not a fit</h3>
              </div>
              <ul className="space-y-3">
                {fitBad.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 bg-gray-300 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
