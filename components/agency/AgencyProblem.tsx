const painPoints = [
  {
    title: 'Your pipeline depends on relationships, not process',
    description:
      "When the key person leaves, the pipeline dries up. That's not a system — that's fragile.",
  },
  {
    title: 'Marketing creates activity. Not revenue.',
    description:
      "Campaigns launch. MQLs come in. But the pipeline doesn't move. Something is broken upstream.",
  },
  {
    title: "Your team is busy. Your deals aren't moving.",
    description:
      "Everyone's in meetings, everyone's in Slack. But quota? Another month short.",
  },
  {
    title: "You have tools. You don't have a system.",
    description:
      "HubSpot, Outreach, Clay, Apollo — the stack is there. The playbook isn't.",
  },
  {
    title: 'Every quarter feels like starting over.',
    description:
      'No repeatable motion. No institutional memory. Sales is improvised every 90 days.',
  },
  {
    title: "Outbound doesn't scale without a repeatable engine.",
    description:
      "You can't hire your way to pipeline. You need a process that scales.",
  },
]

export default function AgencyProblem() {
  return (
    <section className="bg-[#212226]">
      <div className="container-content">
        <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: '#FA7900' }}>
          The Diagnosis
        </span>
        <h2 className="text-display-sm font-bold text-white mb-4 max-w-lg">
          Sound familiar?
        </h2>
        <p className="text-white/50 text-lg mb-12 max-w-xl">
          If any of these hit close to home, you&apos;re not broken — you&apos;re just missing the system.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {painPoints.map(({ title, description }) => (
            <div
              key={title}
              className="rounded-card p-6 border border-white/10 bg-white/5 hover:border-white/20 transition-colors duration-150"
            >
              <div className="w-2 h-2 rounded-full mb-4" style={{ background: '#FA7900' }} />
              <h3 className="font-semibold text-white mb-2 leading-snug">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
