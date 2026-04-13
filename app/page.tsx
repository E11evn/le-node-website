import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import IntegrationDiagram from '@/components/IntegrationDiagram'
import UseCases from '@/components/UseCases'
import HowItWorks from '@/components/HowItWorks'
import WhyLeNode from '@/components/WhyLeNode'
import CTABanner from '@/components/CTABanner'
import Footer from '@/components/Footer'

const benefits = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    title: "Plug in, don't code",
    description: 'Connect your CRM, Clay, and outreach tools in minutes. No engineers needed.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: 'Runs while you sleep',
    description: 'Workflows execute autonomously. Wake up to enriched leads and sent sequences.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: 'Built for revenue teams',
    description: 'Designed for AEs, SDRs, and RevOps. Not data engineers.',
  },
]

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <IntegrationDiagram />

        {/* Social proof strip */}
        <div className="border-y border-border py-10">
          <div className="container-content">
            <p className="text-sm text-muted text-center mb-8 uppercase tracking-widest font-medium">
              Trusted by revenue teams
            </p>
            <div className="flex items-center justify-center gap-10 flex-wrap">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-6 w-24 bg-gray-100 rounded" />
              ))}
            </div>
          </div>
        </div>

        {/* What is le-node */}
        <section>
          <div className="container-content grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-eyebrow">What is le-node</span>
              <h2 className="text-display-sm font-bold text-foreground mb-6">
                The AI layer your GTM team actually needs.
              </h2>
              <p className="text-muted text-lg leading-relaxed">
                le-node connects to your existing tools and automates the manual,
                repetitive work that kills sales momentum — from sourcing accounts
                to enriching leads to running multi-touch outreach. All configured
                by your team, not your engineering team.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {benefits.map(({ icon, title, description }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center text-accent">
                    {icon}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">{title}</p>
                    <p className="text-muted text-sm">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <UseCases />
        <HowItWorks />
        <WhyLeNode />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
