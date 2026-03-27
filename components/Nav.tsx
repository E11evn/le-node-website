'use client'
import Link from 'next/link'

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-border">
      <nav className="container-content flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-semibold text-lg tracking-tight text-foreground"
        >
          le-node
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#how-it-works"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            How it works
          </Link>
          <Link
            href="#use-cases"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Use cases
          </Link>
          <Link
            href="/contact"
            className="text-sm text-muted hover:text-foreground transition-colors"
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
