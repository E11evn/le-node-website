'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()
  const isAgency = pathname.startsWith('/agency')

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
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              !isAgency
                ? 'bg-[#0000FA] text-white'
                : 'text-white/50 hover:text-white'
            }`}
          >
            le node
          </Link>
          <Link
            href="/agency"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              isAgency
                ? 'bg-[#FA7900] text-white'
                : 'text-white/50 hover:text-white'
            }`}
          >
            agency
          </Link>
        </div>

        {/* Right: Context-aware CTA */}
        {isAgency ? (
          <Link href="/contact" className="btn-agency">
            Book a call
          </Link>
        ) : (
          <Link href="/contact" className="btn-primary">
            Get started
          </Link>
        )}
      </nav>
    </header>
  )
}
