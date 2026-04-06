import Link from 'next/link'
import Image from 'next/image'

export default function SplitScreen() {
  return (
    <main className="flex h-screen overflow-hidden">

      {/* Left — OS */}
      <Link
        href="/os"
        className="group relative flex flex-1 flex-col items-center justify-center border-r border-white/10"
      >
        {/* Background image */}
        <Image
          src="/bg-os.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Permanent dark layer */}
        <div className="absolute inset-0 bg-black/65" />
        {/* Hover colour tint */}
        <div className="absolute inset-0 bg-[#0000FA]/0 group-hover:bg-[#0000FA]/30 transition-colors duration-500" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-8">
          <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none">
            le node <span style={{ color: '#0000FA' }}>OS</span>
          </span>
          <span className="mt-4 text-base md:text-lg text-white/50 underline underline-offset-4 decoration-white/30 tracking-wide">
            AI native GTM OS
          </span>
        </div>

        {/* Arrow hint */}
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
        {/* Background image */}
        <Image
          src="/bg-office.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Permanent dark layer */}
        <div className="absolute inset-0 bg-black/65" />
        {/* Hover colour tint */}
        <div className="absolute inset-0 bg-[#FA7900]/0 group-hover:bg-[#FA7900]/25 transition-colors duration-500" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-8">
          <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none">
            le node
            <br />
            <span style={{ color: '#FA7900' }}>agence</span>
          </span>
          <span className="mt-4 text-base md:text-lg text-white/50 underline underline-offset-4 decoration-white/30 tracking-wide">
            Audit, Implement, Execute. Fast.
          </span>
        </div>

        {/* Arrow hint */}
        <div className="absolute bottom-10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </Link>

    </main>
  )
}
