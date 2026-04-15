/**
 * /sandbox — isolated test page for the BlackHole component.
 *
 * Intentionally has no Nav / Footer so the effect can be evaluated full-screen.
 * Not linked from the main navigation.
 */

import type { Metadata } from 'next'
import BlackHole from '@/components/BlackHole'

export const metadata: Metadata = {
  title: 'Sandbox — le-node',
  robots: { index: false, follow: false }, // keep out of search results
}

export default function SandboxPage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      <BlackHole className="absolute inset-0" />

      {/* Label — remove once satisfied */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-white/30 pointer-events-none select-none font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" />
        sandbox / blackhole
      </div>
    </main>
  )
}
