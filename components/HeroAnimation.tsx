'use client'

// ─────────────────────────────────────────────────────────────────────────────
// HERO ANIMATION BLOCK
// Self-contained. To remove: delete this file and remove <HeroAnimation /> from Hero.tsx.
// Nothing outside this file depends on it.
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroAnimation() {
  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center rounded-2xl bg-[#212226] border border-white/10 overflow-hidden">
      {/* Animation will be built here */}
      <p className="text-white/20 text-sm font-mono">animation placeholder</p>
    </div>
  )
}
