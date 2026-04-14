const steps = [
  {
    number: '01',
    title: 'Learn your ICP',
    description:
      'le-node connects to your existing business data to learn who your ideal customer is.',
  },
  {
    number: '02',
    title: 'Detect & qualify',
    description:
      'le-node detects intent signals, qualifies and scores prospects based on your ideal customer profile.',
  },
  {
    number: '03',
    title: 'Engage on autopilot',
    description:
      'le-node finds your leads' contact info to engage them in relevant conversations and generate opportunities, on autopilot.',
  },
  {
    number: '04',
    title: 'Sync your stack',
    description:
      'Then syncs back to your stack to maintain your CRM up to date, and hands over opportunities where your team already works.',
  },
  {
    number: '05',
    title: 'Optimize continuously',
    description:
      'Track performance — le-node continuously learns from results to enhance your outbound approach.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works">
      <div className="container-content">
        <span className="section-eyebrow">How does it work</span>
        <h2 className="text-display-sm font-bold text-foreground mb-16 max-w-lg">
          Plug and play. 24/7. Dead easy.
        </h2>

        {/* Vertical timeline */}
        <div className="relative max-w-2xl">
          {/* Vertical spine */}
          <div className="absolute left-[27px] top-0 bottom-0 w-px bg-border" />

          <div className="flex flex-col gap-10">
            {steps.map(({ number, title, description }) => (
              <div key={number} className="flex gap-8 items-start relative">
                {/* Number badge */}
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white border border-border flex items-center justify-center font-bold text-sm text-accent relative z-10"
                  style={{ background: 'white' }}
                >
                  {number}
                </div>

                {/* Content */}
                <div className="pt-3">
                  <h3 className="font-semibold text-foreground text-lg mb-1">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
