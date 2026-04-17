/**
 * / — main homepage (promoted from /sandbox)
 */

import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import SandboxHero from '@/components/SandboxHero'
import CircularWheelStepper from '@/components/CircularWheelStepper'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'le-node — GTM on autopilot',
}

export default function HomePage() {
  return (
    <>
      <Nav />
      <SandboxHero />

      {/* ── Battle tested methodology ──────────────────────────────────── */}
      <div style={{
        background: '#0F0F11',
        borderTop: '1px solid rgba(240,242,255,0.07)',
        padding: '7rem 1.5rem',
      }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-open-sans, sans-serif)',
            fontSize: '0.6875rem', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'rgba(0,67,250,0.7)',
            marginBottom: '1.25rem',
          }}>
            How it works
          </p>
          <h2 style={{
            fontFamily: 'var(--font-nanum, serif)',
            fontWeight: 800, fontSize: '2.25rem', lineHeight: 1.2,
            color: '#F0F2FF', marginBottom: '3.5rem',
          }}>
            Radical data-driven approach
          </h2>
          <CircularWheelStepper />
        </div>
      </div>

      {/* ── Social proof strip ─────────────────────────────────────────── */}
      <div style={{
        background: '#0F0F11',
        borderTop: '1px solid rgba(240,242,255,0.07)',
        borderBottom: '1px solid rgba(240,242,255,0.07)',
        padding: '3.5rem 1.5rem',
      }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-open-sans, sans-serif)',
            fontSize: '0.6875rem', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'rgba(240,242,255,0.28)',
            marginBottom: '2rem',
          }}>
            Trusted by revenue teams
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '2.5rem', flexWrap: 'wrap',
          }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{
                width: 88, height: 20,
                background: 'rgba(240,242,255,0.07)',
                borderRadius: 4,
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <div style={{
        background: '#0F0F11',
        borderTop: '1px solid rgba(240,242,255,0.07)',
        padding: '7rem 1.5rem',
      }}>
        <div style={{ maxWidth: '44rem', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-open-sans, sans-serif)',
            fontSize: '0.6875rem', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'rgba(0,67,250,0.7)',
            marginBottom: '1.25rem', textAlign: 'center',
          }}>
            FAQ
          </p>
          <h2 style={{
            fontFamily: 'var(--font-nanum, serif)',
            fontWeight: 800, fontSize: '2.25rem', lineHeight: 1.2,
            color: '#F0F2FF', marginBottom: '3rem', textAlign: 'center',
          }}>
            Frequently asked questions
          </h2>
          <style>{`
            .faq-item { border-top: 1px solid rgba(240,242,255,0.08); }
            .faq-item:last-child { border-bottom: 1px solid rgba(240,242,255,0.08); }
            .faq-item summary {
              list-style: none; cursor: pointer;
              padding: 1.25rem 0;
              display: flex; align-items: center; justify-content: space-between;
              gap: 1rem;
              font-family: var(--font-nanum, serif);
              font-size: 1.0625rem; font-weight: 700;
              color: #F0F2FF;
              user-select: none;
            }
            .faq-item summary::-webkit-details-marker { display: none; }
            .faq-item summary::after {
              content: '+';
              font-size: 1.25rem; font-weight: 300;
              color: rgba(240,242,255,0.35);
              flex-shrink: 0; transition: transform 0.2s ease;
            }
            .faq-item[open] summary::after { content: '−'; }
            .faq-item p {
              font-family: var(--font-open-sans, sans-serif);
              font-size: 0.9375rem; line-height: 1.7;
              color: rgba(240,242,255,0.52);
              padding-bottom: 1.25rem; margin: 0;
            }
          `}</style>
          {[
            {
              q: "What is le node?",
              a: "le node is an AI-native GTM OS that orchestrates your best-in-class go-to-market tools to connect your team with your market — from intent signal detection all the way to opportunity closing, automatically.",
            },
            {
              q: "How does le node connect to my existing tools?",
              a: "In minutes, no code required. le node integrates natively with your CRM (HubSpot, Salesforce, Pipedrive), your sequencers, your enrichment tools, and your data sources. No technical setup needed.",
            },
            {
              q: "Is it suited to the size of my team?",
              a: "le node is built for revenue teams in hypergrowth, from 2 to 200 people. Whether you're a solo AE or RevOps at a scale-up, le node adapts to your stage and your stack.",
            },
            {
              q: "When can I get access?",
              a: "le node is in early access. Join the waitlist to be among the first to try the platform and get personalized onboarding.",
            },
            {
              q: "How does pricing work?",
              a: "Pricing will be based on usage and the volume of contacts processed. Early-access users get preferential terms. Details will be shared during onboarding.",
            },
            {
              q: "Is my data secure?",
              a: "Yes. le node is GDPR-compliant. Your data is never resold or used to train third-party models. Access is controlled and end-to-end encrypted.",
            },
          ].map(({ q, a }) => (
            <details key={q} className="faq-item">
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* ── Join waitlist CTA ──────────────────────────────────────────── */}
      <div style={{ background: '#0F0F11', padding: '7rem 1.5rem' }}>
        <div style={{ maxWidth: '36rem', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-open-sans, sans-serif)',
            fontSize: '0.6875rem', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'rgba(0,67,250,0.7)',
            marginBottom: '1.25rem',
          }}>
            Early access
          </p>
          <h2 style={{
            fontFamily: 'var(--font-nanum, serif)',
            fontWeight: 800, fontSize: '2.25rem', lineHeight: 1.2,
            color: '#F0F2FF', marginBottom: '1rem',
          }}>
            Put your GTM motion<br />
            <span style={{ color: '#0043FA' }}>on autopilot</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-open-sans, sans-serif)',
            fontSize: '0.9375rem', lineHeight: 1.7,
            color: 'rgba(240,242,255,0.45)',
            marginBottom: '2.5rem',
          }}>
            Join the waitlist and be the first to connect your stack,<br />
            map your market, and close on autopilot.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                height: 48, padding: '0 1rem', borderRadius: 9,
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.10)',
                color: '#222222', fontSize: '0.875rem',
                fontFamily: 'var(--font-open-sans, sans-serif)',
                width: 248,
              }}
            />
            <button style={{
              height: 48, padding: '0 1.4rem', borderRadius: 9,
              background: '#0043FA', border: 'none',
              color: '#F0F2FF', fontSize: '0.875rem',
              fontFamily: 'var(--font-open-sans, sans-serif)', fontWeight: 600,
              cursor: 'pointer', letterSpacing: '0.01em',
              whiteSpace: 'nowrap',
            }}>
              Join waitlist
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
