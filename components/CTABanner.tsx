import Link from 'next/link'

export default function CTABanner() {
  return (
    <section className="!py-0" style={{ background: 'linear-gradient(to right, #0000FA, #0043FA)' }}>
      <div className="container-content py-20 md:py-24 text-center">
        <h2 className="text-display-sm font-bold text-white mb-4">
          Ready to automate your GTM?
        </h2>
        <p className="text-blue-200 text-lg mb-10 max-w-md mx-auto">
          Tell us about your team and we&apos;ll show you exactly how le-node fits.
        </p>
        <Link
          href="/waitlist"
          className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#0000FA] font-semibold rounded-lg text-base hover:bg-blue-50 transition-colors"
        >
          Join waitlist →
        </Link>
      </div>
    </section>
  )
}
