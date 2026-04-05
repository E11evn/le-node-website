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
    <section id="approach" className="!py-0">

      {/* ── Schedule header strip ─────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(to right, #FA7900, #FA9E00)' }}>
        <div className="container-content">
          <div className="hidden md:grid grid-cols-3">
            {phases.map((phase, i) => (
              <div
                key={phase.number}
                className={`py-5 flex flex-col items-start ${
                  i < phases.length - 1 ? 'border-r border-white/20' : ''
                }`}
                style={{ paddingLeft: i === 0 ? 0 : '2rem', paddingRight: i === phases.length - 1 ? 0 : '2rem' }}
              >
                <span className="text-white/60 text-xs font-mono font-semibold uppercase tracking-widest mb-0.5">
                  {phase.label}
                </span>
                <span className="text-white font-bold text-lg">{phase.title}</span>
              </div>
            ))}
          </div>

          {/* Mobile: single label */}
          <div className="md:hidden py-4">
            <span className="text-white/70 text-xs font-mono font-semibold uppercase tracking-widest">
              Program schedule
            </span>
          </div>
        </div>
      </div>

      {/* ── Phase content ─────────────────────────────────────────────── */}
      <div className="border-b border-border">
        <div className="container-content">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {phases.map((phase, i) => (
              <div
                key={phase.number}
                className="py-10 md:py-12"
                style={{ paddingLeft: i === 0 ? 0 : '2rem', paddingRight: i === phases.length - 1 ? 0 : '2rem' }}
              >
                {/* Phase number badge */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-base mb-5"
                  style={{ background: 'linear-gradient(135deg, #FA7900, #FA9E00)' }}
                >
                  {phase.number}
                </div>

                {/* Mobile label */}
                <p className="md:hidden text-xs font-mono font-semibold uppercase tracking-widest mb-2"
                  style={{ color: '#FA7900' }}>
                  {phase.label}
                </p>

                <h3 className="font-bold text-foreground text-xl mb-3">{phase.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-6">{phase.description}</p>

                <ul className="space-y-2">
                  {phase.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted">
                      <span className="mt-0.5 flex-shrink-0" style={{ color: '#FA7900' }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
