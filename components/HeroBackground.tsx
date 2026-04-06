'use client'

import { useEffect, useRef } from 'react'

// ── Tool positions (% of container, derived from reference layout) ─────────────
const TOOLS = [
  { id: 'google',      x: 44, y: 10 },
  { id: 'pipedrive',   x: 68, y: 11 },
  { id: 'apollo',      x: 60, y:  5 },
  { id: 'clay',        x: 29, y: 22 },
  { id: 'dropcontact', x: 56, y: 21 },
  { id: 'teams',       x: 40, y: 29 },
  { id: 'meta',        x: 70, y: 29 },
  { id: 'fullenrich',  x: 22, y: 36 },
  { id: 'salesforce',  x: 84, y: 35 },
  { id: 'db',          x: 88, y: 48 },
  { id: 'slack',       x: 24, y: 54 },
  { id: 'webflow',     x: 15, y: 54 },
  { id: 'notion',      x: 77, y: 51 },
  { id: 'airtable',    x: 91, y: 60 },
  { id: 'gads',        x: 19, y: 71 },
  { id: 'ga4',         x: 75, y: 70 },
  { id: 'linkedin',    x: 32, y: 75 },
  { id: 'hubspot',     x: 82, y: 76 },
  { id: 'claude',      x: 45, y: 81 },
  { id: 'segment',     x: 67, y: 86 },
  { id: 'gmail',       x: 26, y: 93 },
  { id: 'webhook',     x: 55, y: 93 },
]

// Hub (le-node card) center as %
const HUB = { x: 52, y: 52 }
// Hub display size in px
const HUB_W = 168
const HUB_H = 108
// Tool icon size in px
const ICON_S = 40

// Quadratic bezier control point — adds a gentle curve to each beam
function beamPath(tx: number, ty: number): string {
  const cx = (tx + HUB.x) / 2 + (ty - HUB.y) * 0.15
  const cy = (ty + HUB.y) / 2 - (tx - HUB.x) * 0.10
  return `M ${tx} ${ty} Q ${cx} ${cy} ${HUB.x} ${HUB.y}`
}

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const activeRef    = useRef<Set<number>>(new Set())
  const hubCountRef  = useRef(0)
  const timers       = useRef<ReturnType<typeof setTimeout>[]>([])
  const runningRef   = useRef(true)

  function t(fn: () => void, ms: number) {
    const id = setTimeout(fn, ms)
    timers.current.push(id)
    return id
  }

  useEffect(() => {
    runningRef.current = true

    function activate(i: number) {
      if (!runningRef.current) return
      if (activeRef.current.has(i)) return

      activeRef.current.add(i)

      const toolEl = document.getElementById(`hb-tool-${i}`)
      const beamEl = document.getElementById(`hb-beam-${i}`) as SVGPathElement | null
      const hubEl  = document.getElementById('hb-hub')

      // 1 — light up the tool
      if (toolEl) toolEl.style.opacity = '1'

      // 2 — reset beam (no transition), then animate
      t(() => {
        if (!beamEl) return
        beamEl.style.transition = 'none'
        beamEl.style.strokeDashoffset = '1.2'
        beamEl.style.opacity = '1'

        t(() => {
          beamEl.style.transition = 'stroke-dashoffset 0.9s linear'
          beamEl.style.strokeDashoffset = '-0.2'
        }, 50)
      }, 200)

      // 3 — activate hub when beam arrives
      t(() => {
        hubCountRef.current++
        if (hubEl) hubEl.style.opacity = '1'
      }, 1200)

      // 4 — deactivate after hold
      t(() => {
        if (!runningRef.current) return
        if (toolEl) toolEl.style.opacity = '0.1'
        if (beamEl) {
          beamEl.style.transition = 'opacity 0.4s ease'
          beamEl.style.opacity = '0'
        }
        hubCountRef.current = Math.max(0, hubCountRef.current - 1)
        t(() => {
          if (hubCountRef.current === 0 && hubEl) hubEl.style.opacity = '0.1'
          activeRef.current.delete(i)
        }, 400)
      }, 2800)
    }

    function scheduleNext() {
      if (!runningRef.current) return
      const delay = 600 + Math.random() * 1400
      t(() => {
        // pick a random tool that isn't currently active
        const available = TOOLS.map((_, i) => i).filter(i => !activeRef.current.has(i))
        if (available.length > 0) {
          const pick = available[Math.floor(Math.random() * available.length)]
          activate(pick)
        }
        scheduleNext()
      }, delay)
    }

    // Start two parallel chains offset by 1.2s
    scheduleNext()
    t(scheduleNext, 1200)

    return () => {
      runningRef.current = false
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden select-none">

      {/* ── Tool logos ──────────────────────────────────────────────── */}
      {TOOLS.map((tool, i) => (
        <img
          key={tool.id}
          id={`hb-tool-${i}`}
          src={`/logos/${tool.id}.png`}
          alt=""
          width={ICON_S}
          height={ICON_S}
          draggable={false}
          style={{
            position: 'absolute',
            left: `${tool.x}%`,
            top:  `${tool.y}%`,
            transform: 'translate(-50%, -50%)',
            opacity: 0.1,
            transition: 'opacity 0.35s ease',
            borderRadius: 8,
          }}
        />
      ))}

      {/* ── le-node hub card ────────────────────────────────────────── */}
      <img
        id="hb-hub"
        src="/reference for js animation/logolenodenotext.png"
        alt=""
        width={HUB_W}
        height={HUB_H}
        draggable={false}
        style={{
          position: 'absolute',
          left: `${HUB.x}%`,
          top:  `${HUB.y}%`,
          transform: 'translate(-50%, -50%)',
          opacity: 0.1,
          transition: 'opacity 0.3s ease',
          borderRadius: 12,
        }}
      />

      {/* ── SVG overlay: grid + beams ───────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Beam gradient: transparent → blue → white glow at tip */}
          <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%"
            gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#0043FA" stopOpacity="0" />
            <stop offset="70%"  stopColor="#0043FA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="beamGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background grid — 9 columns, 6 rows, matching reference */}
        {[1,2,3,4,5,6,7,8].map(i => (
          <line
            key={`vg-${i}`}
            x1={i * (100/9)} y1="0"
            x2={i * (100/9)} y2="100"
            stroke="white" strokeOpacity="0.06" strokeWidth="0.15"
          />
        ))}
        {[1,2,3,4,5].map(i => (
          <line
            key={`hg-${i}`}
            x1="0" y1={i * (100/6)}
            x2="100" y2={i * (100/6)}
            stroke="white" strokeOpacity="0.06" strokeWidth="0.15"
          />
        ))}

        {/* Beam paths — one per tool, animated via stroke-dashoffset */}
        {TOOLS.map((tool, i) => (
          <path
            key={`hb-beam-${i}`}
            id={`hb-beam-${i}`}
            d={beamPath(tool.x, tool.y)}
            fill="none"
            stroke="url(#beamGrad)"
            strokeWidth="0.35"
            pathLength="1"
            strokeDasharray="0.18 1"
            strokeDashoffset="1.2"
            opacity="0"
            filter="url(#beamGlow)"
            style={{ transition: 'none' }}
          />
        ))}
      </svg>
    </div>
  )
}
