import Link from 'next/link'
import HeroAnimation from '@/components/HeroAnimation'

export default function Hero() {
  return (
    <section className="pt-24 pb-0 md:pt-32">
      <div className="container-content">

        {/* ── Centered copy ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-light text-accent text-xs font-semibold tracking-wide mb-8">
            AI-native GTM automation
          </div>

          <h1 className="text-display font-bold text-foreground mb-6">
            Your entire GTM motion.
            <br />
            <span className="text-accent">On autopilot.</span>
          </h1>

          <p className="text-xl text-muted mb-10 leading-relaxed">
            le-node handles the research, outreach, and enrichment — so your team
            focuses on closing. No code. No complexity. Just pipeline.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary text-base px-6 py-3">
              Get started
            </Link>
            <a href="#how-it-works" className="btn-secondary text-base px-6 py-3">
              See how it works
            </a>
          </div>
        </div>

        {/* ── Animation block ────────────────────────────────────────────────────
             To remove: delete the <HeroAnimation /> line below and its import.
             The hero text above is completely independent.
        ─────────────────────────────────────────────────────────────────────── */}
        <HeroAnimation />
        {/* ── End animation block ── */}

      </div>
    </section>
  )
}
