import Link from 'next/link'

export default function CTABanner() {
  return (
    <section className="bg-accent !py-0">
      <div className="container-content py-20 md:py-24 text-center">
        <h2 className="text-display-sm font-bold text-white mb-4">
          Ready to automate your GTM?
        </h2>
        <p className="text-indigo-200 text-lg mb-10 max-w-md mx-auto">
          Tell us about your team and we&apos;ll show you exactly how le-node fits.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-8 py-4 bg-white text-accent font-semibold rounded-lg text-base hover:bg-indigo-50 transition-colors"
        >
          Get in touch →
        </Link>
      </div>
    </section>
  )
}
