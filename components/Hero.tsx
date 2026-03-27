import Link from 'next/link'
import HeroAnimation from '@/components/HeroAnimation'

export default function Hero() {
  return (
    <section className="pt-24 pb-20 md:pt-32 md:pb-28">
      <div className="container-content">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">

          {/* ── Left: copy (unchanged) ── */}
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-light text-accent text-xs font-semibold tracking-wide mb-8">
              AI-native GTM automation
            </div>

            <h1 className="text-display font-bold text-foreground max-w-3xl mb-6">
              Your entire GTM motion.
              <br />
              <span className="text-accent">On autopilot.</span>
            </h1>

            <p className="text-xl text-muted max-w-xl mb-10 leading-relaxed">
              le-node handles the research, outreach, and enrichment — so your team
              focuses on closing. No code. No complexity. Just pipeline.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link href="/contact" className="btn-primary text-base px-6 py-3">
                Get started
              </Link>
              <a href="#how-it-works" className="btn-secondary text-base px-6 py-3">
                See how it works
              </a>
            </div>
          </div>

          {/* ── Right: animation block ──────────────────────────────────────────
               To remove: delete the block below (from this comment to its
               closing </div>) and remove the HeroAnimation import above.
               The left column will then stretch full-width automatically.
          ─────────────────────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 mt-14 lg:mt-0">
            <HeroAnimation />
          </div>
          {/* ── End animation block ── */}

        </div>
      </div>
    </section>
  )
}
