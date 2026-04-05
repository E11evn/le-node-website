import Link from 'next/link'

export default function AgencyCTA() {
  return (
    <section className="!py-0" style={{ background: 'linear-gradient(to right, #FA7900, #FA9E00)' }}>
      <div className="container-content py-20 md:py-24 text-center">
        <h2 className="text-display-sm font-bold text-white mb-4">
          Ready to make your pipeline predictable?
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-md mx-auto">
          Book a 30-minute strategy call. We'll show you exactly where your GTM is leaking — and what to do about it.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-8 py-4 bg-white font-semibold rounded-lg text-base hover:bg-orange-50 transition-colors"
          style={{ color: '#FA7900' }}
        >
          Book your strategy call →
        </Link>
      </div>
    </section>
  )
}
