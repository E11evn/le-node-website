import Link from 'next/link'

export default function AgencyHero() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-20">
      <div className="container-content text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#FA7900] bg-[#FFF1E0] mb-6">
          <span
            className="animate-dot-glow"
            style={{ width: 10, height: 10, borderRadius: '50%', background: '#FA7900', display: 'inline-block', flexShrink: 0, ['--glow-color' as string]: 'rgba(250, 121, 0, 0.6)' }}
          />
          <span style={{ color: '#FA7900', fontSize: '1rem', fontWeight: 500 }}>le-node as an agency</span>
        </div>

        <h1 className="text-display font-bold text-foreground mb-6">
          A pipeline that depends on luck
          <br />
          <span style={{ color: '#FA7900' }}>isn&apos;t a strategy.</span>
        </h1>

        <p className="text-xl text-muted mb-10 leading-relaxed">
          Your product works. Your market exists. But growth stays unpredictable.
          We audit your GTM, build the system, and execute alongside your team — fast.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/book" className="btn-agency text-base px-6 py-3">
            Book a call
          </Link>
          <a href="#approach" className="btn-secondary text-base px-6 py-3">
            See our approach
          </a>
        </div>

        {/* Social proof strip */}
        <div className="mt-16 pt-10 border-t border-border">
          <p className="text-sm text-muted uppercase tracking-widest font-medium mb-8">
            Trusted by B2B teams
          </p>
          <div className="flex items-center justify-center gap-10 flex-wrap">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-6 w-24 bg-gray-100 rounded" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
