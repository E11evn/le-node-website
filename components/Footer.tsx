import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-content flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="font-semibold text-foreground tracking-tight hover:opacity-70 transition-opacity">
          le-node
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/product"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Product
          </Link>
          <Link
            href="/agency"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Agency
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
