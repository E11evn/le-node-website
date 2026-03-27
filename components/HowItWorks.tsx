const steps = [
  {
    number: '01',
    title: 'Connect',
    description:
      'Link your CRM, Clay account, and outreach tools. Takes 5 minutes. No engineering required.',
  },
  {
    number: '02',
    title: 'Define',
    description:
      "Tell le-node your ICP, your sequences, your enrichment rules. Plain language, not code.",
  },
  {
    number: '03',
    title: 'Run',
    description:
      'Activate your workflows. le-node sources, enriches, and reaches out — continuously, automatically.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works">
      <div className="container-content">
        <span className="section-eyebrow">How it works</span>
        <h2 className="text-display-sm font-bold text-foreground mb-16 max-w-lg">
          From zero to running in three steps.
        </h2>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-border" />

          {steps.map(({ number, title, description }) => (
            <div key={number} className="relative">
              <div className="w-16 h-16 rounded-2xl bg-white border border-border flex items-center justify-center font-bold text-lg text-accent mb-6 relative z-10">
                {number}
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
