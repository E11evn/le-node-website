import Link from 'next/link'
import Image from 'next/image'

export default function SplitScreen() {
  return (
    <main className="flex h-screen overflow-hidden">

      {/* Left — OS */}
      <Link
        href="/os"
        className="group relative flex flex-1 flex-col items-center justify-center"
      >
        <Image src="/bgos.jpg" alt="" fill className="object-cover" priority />
        {/* Dark overlay — 85% so image is very subtle */}
        <div className="absolute inset-0 bg-black/[0.85]" />
        {/* Faint blue tint on hover */}
        <div className="absolute inset-0 bg-[#0000FA]/0 group-hover:bg-[#0000FA]/[0.08] transition-colors duration-500" />

        <div className="relative z-10 flex flex-col items-center text-center px-8 transition-transform duration-500 ease-in-out group-hover:scale-[1.30]">
          <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none">
            le node
          </span>
          <span className="mt-4 text-base md:text-lg text-white/50 tracking-wide">
            AI native GTM OS
          </span>
        </div>

        <div className="absolute bottom-10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </Link>

      {/* Right — Agence */}
      <Link
        href="/agence"
        className="group relative flex flex-1 flex-col items-center justify-center"
      >
        <Image src="/bg-office.png" alt="" fill className="object-cover" priority />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/[0.85]" />
        {/* Faint orange tint on hover */}
        <div className="absolute inset-0 bg-[#FA7900]/0 group-hover:bg-[#FA7900]/[0.08] transition-colors duration-500" />

        <div className="relative z-10 flex flex-col items-center text-center px-8 transition-transform duration-500 ease-in-out group-hover:scale-[1.30]">
          <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none">
            le node
            <br />
            <span style={{ color: '#FA7900' }}>agence</span>
          </span>
          <span className="mt-4 text-base md:text-lg text-white/50 tracking-wide">
            Audit, Implement, Execute. Fast.
          </span>
        </div>

        <div className="absolute bottom-10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </Link>

    </main>
  )
}
