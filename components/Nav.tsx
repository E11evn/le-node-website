'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-[#212226] border-b border-white/10">
      <nav className="container-content flex items-center justify-between h-16">
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

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#how-it-works"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            How it works
          </Link>
          <Link
            href="#use-cases"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Use cases
          </Link>
          <Link
            href="/contact"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Contact
          </Link>
        </div>

        <Link href="/contact" className="btn-primary">
          Get started
        </Link>
      </nav>
    </header>
  )
}
