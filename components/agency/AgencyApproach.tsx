const phases = [
  {
    number: '01',
    label: 'Week 1\u20132',
    title: 'Audit',
    description:
      "We diagnose before we prescribe. Deep-dive into your ICP, messaging, channels, CRM health, and team dynamics. You get a clear picture of what's broken and what to do next.",
    deliverables: [
      'ICP clarity report',
      'Messaging gap analysis',
      'Channel audit',
      'CRM health check',
      'GTM roadmap',
    ],
  },
  {
    number: '02',
    label: 'Week 3\u20138',
    title: 'Implement',
    description:
      'We build the engine with you \u2014 not for you. Outbound sequences, CRM workflows, lead scoring, sales playbooks. Everything documented and owned by your team.',
    deliverables: [
      'Outbound sequences',
      'CRM automation',
      'Lead scoring model',
      'Sales playbook',
      'Tech stack configuration',
    ],
  },
  {
    number: '03',
    label: 'Month 3+',
    title: 'Execute',
    description:
      "We run campaigns alongside your team, iterate weekly on what's working, and own pipeline development until the motion is proven and self-sustaining.",
    deliverables: [
      'Weekly campaign management',
      'Performance reporting',
      'Iteration cycles',
      'Team coaching',
    ],
  },
]

export default function AgencyApproach() {
  return (
    <section id="approach">
      <div className="container-content">
        <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: '#FA7900' }}>
          Our Method
        </span>
        <h2 className="text-display-sm font-bold text-foreground mb-4 max-w-2xl">
          Audit. Implement. Execute. Fast.
        </h2>
        <p className="text-muted text-lg mb-16 max-w-xl">
          We don&apos;t hand you a deck and disappear. We build the system and run it
          alongside your team until it works.
        </p>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-border" />

          {phases.map(({ number, label, title, description, deliverables }) => (
            <div key={number} className="relative">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-lg text-white mb-6 relative z-10"
                style={{ background: 'linear-gradient(to bottom right, #FA7900, #FA9E00)' }}
              >
                {number}
              </div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted mb-1">{label}</p>
              <h3 className="font-bold text-foreground text-xl mb-3">{title}</h3>
              <p className="text-muted text-sm leading-relaxed mb-5">{description}</p>
              <ul className="space-y-1.5">
                {deliverables.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#FA7900' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
