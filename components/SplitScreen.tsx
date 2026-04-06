import Link from 'next/link'

export default function SplitScreen() {
  return (
    <main className="flex h-screen overflow-hidden">
      {/* Left — OS */}
      <Link
        href="/os"
        className="group relative flex flex-1 flex-col items-center justify-center bg-[#212226] border-r border-white/10 transition-colors duration-500 hover:bg-[#0005a0]"
      >
        <div className="flex flex-col items-center text-center px-8">
          <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none">
            le node <span style={{ color: '#0000FA' }}>OS</span>
          </span>
          <span className="mt-4 text-base md:text-lg text-white/50 underline underline-offset-4 decoration-white/30 tracking-wide">
            AI native GTM OS
          </span>
        </div>

        {/* Arrow hint */}
        <div className="absolute bottom-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </Link>

      {/* Right — Agence */}
      <Link
        href="/agence"
        className="group relative flex flex-1 flex-col items-center justify-center bg-[#212226] transition-colors duration-500 hover:bg-[#7a3900]"
      >
        <div className="flex flex-col items-center text-center px-8">
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
        <div className="absolute bottom-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </Link>
    </main>
  )
}
