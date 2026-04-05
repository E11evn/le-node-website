'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, _subject: 'New le-node waitlist signup' }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: '#0C0C14' }}
    >
      {/* Back link */}
      <Link
        href="/product"
        className="absolute top-8 left-8 text-white/30 hover:text-white/60 text-sm transition-colors flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        le node AI
      </Link>

      <div className="w-full max-w-md text-center">

        {/* Status badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-10"
          style={{ background: 'rgba(0,67,250,0.15)', color: '#0043FA', border: '1px solid rgba(0,67,250,0.3)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0043FA] animate-pulse" />
          In development
        </div>

        {status === 'success' ? (
          <>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              You&apos;re on the list.
            </h1>
            <p className="text-white/40 text-lg leading-relaxed">
              We&apos;ll reach out to <span className="text-white/70">{email}</span> as soon
              as le node AI is ready for early access.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
              The GTM OS is{' '}
              <span style={{ color: '#0043FA' }}>still being built.</span>
            </h1>
            <p className="text-white/40 text-lg mb-10 leading-relaxed">
              le node AI automates your entire go-to-market motion. Leave your email
              and we&apos;ll reach out when it&apos;s ready for early access.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg text-sm text-white placeholder:text-white/25 focus:outline-none"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 rounded-lg text-sm font-semibold text-white flex-shrink-0 disabled:opacity-60 transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(to right, #0000FA, #0043FA)' }}
              >
                {status === 'loading' ? 'Joining…' : 'Join waitlist'}
              </button>
            </form>

            {status === 'error' && (
              <p className="mt-4 text-sm text-red-400">
                Something went wrong. Try again or email us directly.
              </p>
            )}

            <p className="mt-6 text-xs text-white/20">
              No spam. Just one email when we launch.
            </p>
          </>
        )}
      </div>
    </main>
  )
}
