'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'

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
    <>
      <Nav />
      <main
        className="flex-1 flex flex-col items-center justify-center px-6 py-24"
        style={{ background: '#0C0C14', minHeight: 'calc(100vh - 64px)' }}
      >
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
                as le node OS is ready for early access.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                The GTM OS is{' '}
                <span style={{ color: '#0043FA' }}>still being built.</span>
              </h1>
              <p className="text-white/40 text-lg mb-10 leading-relaxed">
                le node OS automates your entire go-to-market motion. Leave your email
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
    </>
  )
}
