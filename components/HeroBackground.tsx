'use client'

import { useEffect, useRef } from 'react'

const TOOLS = [
  { id: 'clay',        x: 19, y: 21 },
  { id: 'dropcontact', x: 34, y: 23 },
  { id: 'salesforce',  x: 72, y: 27 },
  { id: 'hubspot',     x: 86, y: 18 },
  { id: 'google',      x: 13, y: 39 },
  { id: 'slack',       x: 80, y: 45 },
  { id: 'linkedin',    x: 26, y: 54 },
  { id: 'webhook',     x: 86, y: 58 },
  { id: 'notion',      x: 72, y: 66 },
  { id: 'claude',      x: 18, y: 73 },
  { id: 'apollo',      x: 34, y: 86 },
  { id: 'pipedrive',   x: 79, y: 86 },
]

const HUB   = { x: 52, y: 52 }
const HUB_W = 168
const HUB_H = 108
const ICON_S = 38
const BOX_S  = 52

// Grid line positions from reference grid.svg
const H_LINES = [16.67, 33.33, 50.00, 66.67, 83.33]
const V_LINES = [11.11, 22.22, 33.33, 44.44, 55.56, 66.67, 77.78, 88.89]

// Float animation durations per variant (5 variants, assigned round-robin)
const FLOAT_DURATIONS = [7, 8.5, 6.5, 9, 7.5]

const RESTING_ICON_OPACITY = 0.6
const RESTING_HUB_OPACITY  = 0.4

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
      const orbEl  = document.getElementById(`hb-orb-${i}`) as SVGCircleElement | null
      const hubEl  = document.getElementById('hb-hub')

      // Step 1: light up the tool icon
      if (toolEl) toolEl.style.opacity = '1'

      // Step 2: animate beam trail + traveling orb
      t(() => {
        if (!beamEl) return

        // Disable transition, reset trail to start
        beamEl.style.setProperty('transition', 'none')
        beamEl.style.setProperty('stroke-dashoffset', '1.2')
        beamEl.style.setProperty('opacity', '0.7')

        const totalLength = beamEl.getTotalLength()
        const startTime   = performance.now()
        const orbDuration = 850

        // Double-rAF ensures browser paints the reset before starting transition
        const raf1 = requestAnimationFrame(() => {
          const raf2 = requestAnimationFrame(() => {
            if (!runningRef.current) return

            // Start trail animation
            beamEl.style.setProperty('transition', 'stroke-dashoffset 0.85s linear')
            beamEl.style.setProperty('stroke-dashoffset', '-0.2')

            // Orb animation: travel from tool to hub using getPointAtLength
            function animateOrb(now: number) {
              const progress = Math.min((now - startTime) / orbDuration, 1)
              const pt = (beamEl as SVGPathElement).getPointAtLength(progress * totalLength)
              if (orbEl) {
                orbEl.setAttribute('cx', String(pt.x))
                orbEl.setAttribute('cy', String(pt.y))
                // Envelope: fade in over first 15%, hold, fade out over last 20%
                const alpha = progress < 0.15 ? progress / 0.15
                            : progress > 0.80 ? (1 - progress) / 0.20
                            : 1
                orbEl.setAttribute('opacity', String(alpha * 0.95))
              }
              if (progress < 1 && runningRef.current) {
                rafs.current.push(requestAnimationFrame(animateOrb))
              } else if (orbEl) {
                orbEl.setAttribute('opacity', '0')
              }
            }
            rafs.current.push(requestAnimationFrame(animateOrb))
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
        if (toolEl) toolEl.style.opacity = String(RESTING_ICON_OPACITY)
        if (beamEl) {
          beamEl.style.setProperty('transition', 'opacity 0.5s ease')
          beamEl.style.setProperty('opacity', '0')
        }
        hubCountRef.current = Math.max(0, hubCountRef.current - 1)
        t(() => {
          if (hubCountRef.current === 0 && hubEl) hubEl.style.opacity = String(RESTING_HUB_OPACITY)
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
    <div className="absolute inset-0 overflow-hidden select-none" style={{ background: '#FFFFFF' }}>
      <style>{`
        /* ── Grid line appear animations (from hero-minimalism prompt) ─ */
        .hb-hline {
          position: absolute; left: 0; right: 0; height: 1px;
          background: #9E9EB8;
          transform: scaleX(0); transform-origin: 50% 50%;
          animation: hbDrawX 800ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .hb-vline {
          position: absolute; top: 0; bottom: 0; width: 1px;
          background: #9E9EB8;
          transform: scaleY(0); transform-origin: 50% 0%;
          animation: hbDrawY 900ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .hb-hline::after, .hb-vline::after {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(158,158,184,0.5), transparent);
          opacity: 0;
          animation: hbShimmer 900ms ease-out forwards;
        }
        @keyframes hbDrawX {
          0%   { transform: scaleX(0); opacity: 0; }
          60%  { opacity: 0.7; }
          100% { transform: scaleX(1); opacity: 0.45; }
        }
        @keyframes hbDrawY {
          0%   { transform: scaleY(0); opacity: 0; }
          60%  { opacity: 0.7; }
          100% { transform: scaleY(1); opacity: 0.45; }
        }
        @keyframes hbShimmer {
          0%   { opacity: 0; }
          30%  { opacity: 0.45; }
          100% { opacity: 0; }
        }

        /* ── Icon appear animation (from floating-icons-hero prompt) ── */
        /* Uses CSS individual transform properties (scale, translate, rotate)
           so appear-scale and float-translate/rotate don't conflict         */
        @keyframes hbIconAppear {
          from { opacity: 0; scale: 0.6; }
          to   { opacity: ${RESTING_ICON_OPACITY}; scale: 1; }
        }

        /* ── Continuous float variants — 5 unique loops ─────────────── */
        @keyframes hbFloat0 {
          0%, 100% { translate: 0px 0px; rotate: 0deg; }
          25%      { translate: 3px -6px; rotate: 2deg; }
          75%      { translate: -3px 5px; rotate: -1.5deg; }
        }
        @keyframes hbFloat1 {
          0%, 100% { translate: 0px 0px; rotate: 0deg; }
          25%      { translate: -4px -8px; rotate: -3deg; }
          75%      { translate: 4px 4px; rotate: 2deg; }
        }
        @keyframes hbFloat2 {
          0%, 100% { translate: 0px 0px; rotate: 0deg; }
          25%      { translate: 4px 5px; rotate: 2deg; }
          75%      { translate: -4px -5px; rotate: -2deg; }
        }
        @keyframes hbFloat3 {
          0%, 100% { translate: 0px 0px; rotate: 0deg; }
          25%      { translate: -3px -7px; rotate: -2deg; }
          75%      { translate: 3px 6px; rotate: 2deg; }
        }
        @keyframes hbFloat4 {
          0%, 100% { translate: 0px 0px; rotate: 0deg; }
          25%      { translate: 3px 6px; rotate: 3deg; }
          75%      { translate: -3px -7px; rotate: -2deg; }
        }

        /* ── Hub card appear ────────────────────────────────────────── */
        @keyframes hbHubAppear {
          from { opacity: 0; scale: 0.85; }
          to   { opacity: ${RESTING_HUB_OPACITY}; scale: 1; }
        }
        #hb-hub {
          animation: hbHubAppear 0.8s cubic-bezier(0.22,1,0.36,1) 1200ms both;
          transition: opacity 0.3s ease;
        }
      `}</style>

      {/* ── Grid lines ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {H_LINES.map((pct, i) => (
          <div
            key={`hg-${i}`}
            className="hb-hline"
            style={{ top: `${pct}%`, animationDelay: `${150 + i * 110}ms` }}
          />
        ))}
        {V_LINES.map((pct, i) => (
          <div
            key={`vg-${i}`}
            className="hb-vline"
            style={{ left: `${pct}%`, animationDelay: `${500 + i * 80}ms` }}
          />
        ))}
      </div>

      {/* ── Tool logos ──────────────────────────────────────────────── */}
      {TOOLS.map((tool, i) => {
        const variant    = i % FLOAT_DURATIONS.length
        const appearDelay = i * 80
        const floatDelay  = appearDelay + 700
        const floatDur    = FLOAT_DURATIONS[variant]
        return (
          <div
            key={tool.id}
            style={{
              position: 'absolute',
              left: `${tool.x}%`,
              top:  `${tool.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              id={`hb-tool-${i}`}
              style={{
                animation: `hbIconAppear 0.6s cubic-bezier(0.22,1,0.36,1) ${appearDelay}ms both, hbFloat${variant} ${floatDur}s ease-in-out ${floatDelay}ms infinite both`,
                width:        BOX_S,
                height:       BOX_S,
                background:   '#F0F0F2',
                borderRadius: 14,
                display:      'flex',
                alignItems:   'center',
                justifyContent: 'center',
                boxShadow:    '0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
                transition:   'opacity 0.35s ease',
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
          </div>
        )
      })}

      {/* ── Hub card ────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left:  `${HUB.x}%`,
          top:   `${HUB.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          id="hb-hub"
          style={{
            width:        HUB_W,
            height:       HUB_H,
            background:   '#F0F0F2',
            borderRadius: 16,
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            boxShadow:    '0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/le-node-notext.png"
            alt="le-node"
            width={HUB_W - 32}
            height={HUB_H - 24}
            draggable={false}
            style={{ display: 'block' }}
          />
        </div>
      </div>

      {/* ── SVG: animated beams + orbs (CPU-animation approach) ──────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glow for the trail line */}
          <filter id="hbBeamGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Stronger glow for the traveling orb */}
          <filter id="hbOrbGlow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.0" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Beam trail paths — JS drives stroke-dashoffset */}
        {TOOLS.map((tool, i) => (
          <path
            key={tool.id}
            id={`hb-beam-${i}`}
            d={beamPath(tool.x, tool.y)}
            fill="none"
            stroke="#0043FA"
            strokeWidth="0.3"
            pathLength="1"
            strokeDasharray="0.14 1"
            strokeDashoffset="1.2"
            opacity="0"
            filter="url(#hbBeamGlow)"
          />
        ))}

        {/* Traveling orb dots — JS drives cx/cy via getPointAtLength */}
        {TOOLS.map((_, i) => (
          <circle
            key={`orb-${i}`}
            id={`hb-orb-${i}`}
            r="0.7"
            fill="#0043FA"
            opacity="0"
            filter="url(#hbOrbGlow)"
          />
        ))}
      </svg>
    </div>
  )
}
