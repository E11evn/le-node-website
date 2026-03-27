const useCases = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
    ),
    title: 'Outbound at scale',
    description:
      'Build targeted prospect lists and launch personalized sequences automatically — hundreds of touches, zero manual effort.',
    span: 'md:col-span-2',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: 'TAM sourcing',
    description:
      'Map your entire addressable market from firmographic and intent data. Always know who to go after next.',
    span: '',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: 'Lead enrichment & research',
    description:
      'Automatically append company data, contact info, and buying signals to every lead in your CRM.',
    span: '',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 6c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    title: 'CRM automation',
    description:
      'Keep your CRM clean and current. Auto-update records, assign ownership, and trigger follow-up tasks.',
    span: '',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    title: 'ABM campaigns',
    description:
      'Run account-based plays with surgical precision — personalized messaging at account and contact level.',
    span: '',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Signal-based selling',
    description:
      'Act on buying intent the moment it happens. Trigger outreach when prospects show high-value signals.',
    span: 'md:col-span-2',
  },
]

export default function UseCases() {
  return (
    <section id="use-cases">
      <div className="container-content">
        <span className="section-eyebrow">Use cases</span>
        <h2 className="text-display-sm font-bold text-foreground mb-4 max-w-2xl">
          Every GTM motion. One platform.
        </h2>
        <p className="text-muted text-lg mb-12 max-w-xl">
          le-node automates the workflows your team runs manually today — faster,
          smarter, and without engineering support.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {useCases.map(({ icon, title, description, span }) => (
            <div key={title} className={`card ${span}`}>
              <div className="w-9 h-9 rounded-lg bg-accent-light flex items-center justify-center text-accent mb-4">
                {icon}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
