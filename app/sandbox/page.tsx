/**
 * /sandbox — isolated staging page.
 *
 * Not linked from the main navigation and excluded from search results.
 */

import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import SandboxHero from '@/components/SandboxHero'
import CircularWheelStepper from '@/components/CircularWheelStepper'

export const metadata: Metadata = {
  title: 'Sandbox — le-node',
  robots: { index: false, follow: false },
}

export default function SandboxPage() {
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
            Methodology
          </p>
          <h2 style={{
            fontFamily: 'var(--font-nanum, serif)',
            fontWeight: 800, fontSize: '2.25rem', lineHeight: 1.2,
            color: '#F0F2FF', marginBottom: '3.5rem',
          }}>
            Battle tested methodology
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
    </>
  )
}
