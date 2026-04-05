'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()
  const isAgency = pathname.startsWith('/agency') || pathname === '/book'

  return (
    <header className="sticky top-0 z-50 bg-[#212226] border-b border-white/10">
      <nav className="container-content flex items-center justify-between h-16">

        {/* Left: Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="le-node"
            width={120}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </Link>

        {/* Center: Mode toggle */}
        <div className="flex items-center gap-1 rounded-full bg-white/5 p-1">
          <Link
            href="/product"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
              !isAgency
                ? 'text-white shadow-sm'
                : 'text-white/40 hover:text-white/70'
            }`}
            style={!isAgency ? { background: '#0000FA' } : {}}
          >
            le node
          </Link>
          <Link
            href="/agency"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
              isAgency
                ? 'text-white shadow-sm'
                : 'text-white/40 hover:text-white/70'
            }`}
            style={isAgency ? { background: '#FA7900' } : {}}
          >
            agency
          </Link>
        </div>

        {/* Right: Context-aware CTA */}
        {isAgency ? (
          <Link href="/book" className="btn-agency">
            Book a call
          </Link>
        ) : (
          <Link href="/waitlist" className="btn-primary">
            Join waitlist
          </Link>
        )}
      </nav>
    </header>
  )
}
