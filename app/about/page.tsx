import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'À propos — le-node',
  description: 'le-node est un OS GTM propulsé par l\'IA et une agence de conseil en go-to-market.',
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="py-20 md:py-28">
          <div className="container-content max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: '#0043FA' }}>
              À propos
            </span>
            <h1 className="text-display-sm font-bold text-foreground mb-8">
              We build GTM infrastructure for modern revenue teams.
            </h1>

            <div className="prose prose-gray max-w-none space-y-6 text-muted text-lg leading-relaxed">
              <p>
                le-node was founded on a simple observation: GTM teams spend most of their time
                on manual, repetitive work — researching accounts, enriching leads, chasing signals —
                instead of selling.
              </p>
              <p>
                We built two things to fix that. <strong className="text-foreground">le node OS</strong> is
                an AI-native GTM operating system that automates the full motion: from signal to outreach,
                without engineering effort. <strong className="text-foreground">le node agence</strong> is
                our consulting arm — we audit your GTM, implement a repeatable system, and execute
                alongside your team until the pipeline is predictable.
              </p>
              <p>
                We&apos;re a small, opinionated team. We believe GTM should be a system, not a hustle.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
