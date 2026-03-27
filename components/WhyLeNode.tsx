const differentiators = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Dead simple setup',
    description:
      'No Zapier chains. No API tokens. No developers. If your team can use email, they can use le-node.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Fast time to value',
    description:
      'Most teams are running their first automated workflow the same day. Not weeks, not sprints.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'No technical lift',
    description:
      'Your RevOps or sales manager owns it. Engineering is never in the loop unless you want them to be.',
  },
]

export default function WhyLeNode() {
  return (
    <section>
      <div className="container-content">
        <span className="section-eyebrow">Why le-node</span>
        <h2 className="text-display-sm font-bold text-foreground mb-12 max-w-lg">
          Built for revenue teams, not engineers.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {differentiators.map(({ icon, title, description }) => (
            <div
              key={title}
              className="bg-white border border-border rounded-card p-8 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center text-accent mb-5">
                {icon}
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-3">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
