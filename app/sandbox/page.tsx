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
      {/* Empty section — allows scrolling down from the hero */}
      <div style={{ height: '100vh', background: '#0F0F11' }} />
    </>
  )
}
