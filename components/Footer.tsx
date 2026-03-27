import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-content flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-semibold text-foreground tracking-tight">le-node</span>

        <div className="flex items-center gap-8">
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

        <p className="text-xs text-muted">
          © {new Date().getFullYear()} le-node. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
