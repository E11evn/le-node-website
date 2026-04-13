import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-content flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="font-semibold text-foreground tracking-tight hover:opacity-70 transition-opacity">
          le-node
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
            le node OS
          </Link>
          <Link href="/agence" className="text-sm text-muted hover:text-foreground transition-colors">
            Agence
          </Link>
          <Link href="/about" className="text-sm text-muted hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/legal" className="text-sm text-muted hover:text-foreground transition-colors">
            Legal notice
          </Link>
          <Link href="/privacy" className="text-sm text-muted hover:text-foreground transition-colors">
            Privacy
          </Link>
        </div>

        <p className="text-xs text-muted">
          © {new Date().getFullYear()} le-node. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
