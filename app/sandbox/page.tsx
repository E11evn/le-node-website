/**
 * /sandbox — isolated staging page.
 *
 * Not linked from the main navigation and excluded from search results.
 */

import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import SandboxHero from '@/components/SandboxHero'

export const metadata: Metadata = {
  title: 'Sandbox — le-node',
  robots: { index: false, follow: false },
}

export default function SandboxPage() {
  return (
    <>
      <Nav />
      <SandboxHero />

      {/* ── Placeholder content section ────────────────────────────────── */}
      <div style={{ background: '#0F0F11', padding: '7rem 1.5rem' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-open-sans, sans-serif)',
            fontSize: '0.75rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'rgba(240,242,255,0.30)',
            marginBottom: '1.25rem',
          }}>
            How it works
          </p>
          <h2 style={{
            fontFamily: 'var(--font-nanum, serif)',
            fontWeight: 800, fontSize: '2.5rem',
            color: '#F0F2FF', lineHeight: 1.15,
            marginBottom: '1.5rem',
          }}>
            Five steps to your first deal
          </h2>
          <p style={{
            fontFamily: 'var(--font-open-sans, sans-serif)',
            fontSize: '0.9375rem', lineHeight: 1.75,
            color: 'rgba(240,242,255,0.45)',
          }}>
            Placeholder — the real section will live here.
          </p>
        </div>

        {/* placeholder step cards */}
        <div style={{
          maxWidth: '48rem', margin: '4rem auto 0',
          display: 'flex', flexDirection: 'column', gap: '1.5rem',
        }}>
          {['Connect your tools', 'Map your market', 'Build sequences', 'Automate outreach', 'Close on autopilot'].map((label, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '1.25rem',
              padding: '1.25rem 1.5rem',
              background: 'rgba(240,242,255,0.03)',
              border: '1px solid rgba(240,242,255,0.07)',
              borderRadius: 12,
            }}>
              <span style={{
                fontFamily: 'var(--font-nanum, serif)',
                fontSize: '0.75rem', fontWeight: 700,
                color: 'rgba(0,67,250,0.7)', letterSpacing: '0.06em',
                flexShrink: 0, width: 24,
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{
                fontFamily: 'var(--font-open-sans, sans-serif)',
                fontSize: '0.9375rem', color: 'rgba(240,242,255,0.55)',
              }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
