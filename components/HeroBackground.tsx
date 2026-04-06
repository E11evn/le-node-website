'use client'

import { useEffect, useRef } from 'react'

// Tool positions as % of container — matched from reference images
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

const HUB   = { x: 52, y: 52 }
const HUB_W = 168
const HUB_H = 108
const ICON_S = 38   // logo image size inside the bg square
const BOX_S  = 56   // #303030 rounded square outer size

// Quadratic bezier from tool → hub, with a gentle curve
function beamPath(tx: number, ty: number): string {
  const cx = (tx + HUB.x) / 2 + (ty - HUB.y) * 0.12
  const cy = (ty + HUB.y) / 2 - (tx - HUB.x) * 0.08
  return `M ${tx} ${ty} Q ${cx} ${cy} ${HUB.x} ${HUB.y}`
}

export default function HeroBackground() {
  const activeRef   = useRef<Set<number>>(new Set())
  const hubCountRef = useRef(0)
  const timers      = useRef<ReturnType<typeof setTimeout>[]>([])
  const rafs        = useRef<number[]>([])
  const runningRef  = useRef(true)

  function t(fn: () => void, ms: number) {
    const id = setTimeout(() => { if (runningRef.current) fn() }, ms)
    timers.current.push(id)
  }

  useEffect(() => {
    runningRef.current = true

    function activate(i: number) {
      if (activeRef.current.has(i)) return
      activeRef.current.add(i)

      const toolEl = document.getElementById(`hb-tool-${i}`)
      const beamEl = document.getElementById(`hb-beam-${i}`) as SVGPathElement | null
      const hubEl  = document.getElementById('hb-hub')

      // Step 1: light up the tool icon
      if (toolEl) toolEl.style.opacity = '1'

      // Step 2: arm the beam, then travel using rAF double-pump for reliable transition
      t(() => {
        if (!beamEl) return
        // Disable transition, reset to start position
        beamEl.style.setProperty('transition', 'none')
        beamEl.style.setProperty('stroke-dashoffset', '1.2')
        beamEl.style.setProperty('opacity', '1')

        // Double-rAF ensures the browser paints the reset state before starting transition
        const raf1 = requestAnimationFrame(() => {
          const raf2 = requestAnimationFrame(() => {
            if (!runningRef.current) return
            beamEl.style.setProperty('transition', 'stroke-dashoffset 0.85s linear')
            beamEl.style.setProperty('stroke-dashoffset', '-0.2')
          })
          rafs.current.push(raf2)
        })
        rafs.current.push(raf1)
      }, 150)

      // Step 3: hub lights up when beam arrives (~150 + 850 = 1000ms)
      t(() => {
        hubCountRef.current++
        if (hubEl) hubEl.style.opacity = '1'
      }, 1050)

      // Step 4: fade everything back after a hold
      t(() => {
        if (toolEl) toolEl.style.opacity = '0.1'
        if (beamEl) {
          beamEl.style.setProperty('transition', 'opacity 0.5s ease')
          beamEl.style.setProperty('opacity', '0')
        }
        hubCountRef.current = Math.max(0, hubCountRef.current - 1)
        t(() => {
          if (hubCountRef.current === 0 && hubEl) hubEl.style.opacity = '0.1'
          activeRef.current.delete(i)
        }, 500)
      }, 2800)
    }

    function scheduleNext() {
      const delay = 700 + Math.random() * 1300
      t(() => {
        const available = TOOLS.map((_, idx) => idx).filter(idx => !activeRef.current.has(idx))
        if (available.length > 0) {
          activate(available[Math.floor(Math.random() * available.length)])
        }
        scheduleNext()
      }, delay)
    }

    // Two chains offset by 1.5s for natural-feeling concurrent activations
    scheduleNext()
    t(scheduleNext, 1500)

    return () => {
      runningRef.current = false
      timers.current.forEach(clearTimeout)
      rafs.current.forEach(cancelAnimationFrame)
      timers.current = []
      rafs.current   = []
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="absolute inset-0 overflow-hidden select-none" style={{ background: '#1D1D22' }}>

      {/* ── Tool logos — each wrapped in a #303030 rounded square ──── */}
      {TOOLS.map((tool, i) => (
        <div
          key={tool.id}
          id={`hb-tool-${i}`}
          style={{
            position: 'absolute',
            left: `${tool.x}%`,
            top:  `${tool.y}%`,
            transform: 'translate(-50%, -50%)',
            width:  BOX_S,
            height: BOX_S,
            background: '#303030',
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.1,
            transition: 'opacity 0.35s ease',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/logos/${tool.id}.png`}
            alt=""
            width={ICON_S}
            height={ICON_S}
            draggable={false}
            style={{ display: 'block', borderRadius: 6 }}
          />
        </div>
      ))}

      {/* ── le-node hub card ─────────────────────────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        id="hb-hub"
        src="/logos/le-node-notext.png"
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
          borderRadius: 14,
        }}
      />

      {/* ── SVG: grid lines + animated beams ─────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glow filter for beams */}
          <filter id="beamGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background grid — faint, matching reference */}
        {[1,2,3,4,5,6,7,8].map(i => (
          <line key={`vg-${i}`}
            x1={i * (100/9)} y1="0" x2={i * (100/9)} y2="100"
            stroke="white" strokeOpacity="0.05" strokeWidth="0.12"
          />
        ))}
        {[1,2,3,4,5].map(i => (
          <line key={`hg-${i}`}
            x1="0" y1={i * (100/6)} x2="100" y2={i * (100/6)}
            stroke="white" strokeOpacity="0.05" strokeWidth="0.12"
          />
        ))}

        {/* Beam paths — one per tool */}
        {TOOLS.map((tool, i) => (
          <path
            key={tool.id}
            id={`hb-beam-${i}`}
            d={beamPath(tool.x, tool.y)}
            fill="none"
            stroke="#0043FA"
            strokeWidth="0.4"
            pathLength="1"
            strokeDasharray="0.18 1"
            strokeDashoffset="1.2"
            opacity="0"
            filter="url(#beamGlow)"
          />
        ))}
      </svg>
    </div>
  )
}
