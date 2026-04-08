'use client'
import { useEffect, useRef, useState } from 'react'

// Tool positions matched from reference 100% opacity.png
const TOOLS = [
  { id: 'clay',        x: 19, y: 21, logoSize: 28, color: '#D4A84B' },
  { id: 'dropcontact', x: 34, y: 23, logoSize: 38, color: '#3B5BDB' },
  { id: 'salesforce',  x: 72, y: 27, logoSize: 38, color: '#00A1E0' },
  { id: 'hubspot',     x: 86, y: 18, logoSize: 38, color: '#FF7A59' },
  { id: 'google',      x: 13, y: 39, logoSize: 38, color: '#4285F4' },
  { id: 'slack',       x: 80, y: 45, logoSize: 38, color: '#4A154B' },
  { id: 'linkedin',    x: 26, y: 54, logoSize: 38, color: '#0A66C2' },
  { id: 'webhook',     x: 86, y: 58, logoSize: 38, color: '#8B5CF6' },
  { id: 'notion',      x: 72, y: 66, logoSize: 38, color: '#2F2F2F' },
  { id: 'claude',      x: 18, y: 73, logoSize: 38, color: '#CC785C' },
  { id: 'apollo',      x: 34, y: 86, logoSize: 38, color: '#7C3AED' },
  { id: 'pipedrive',   x: 79, y: 86, logoSize: 38, color: '#27AE60' },
]

const BOX_S = 52

// Grid positions from reference grid.svg
const H_LINES = [16.67, 33.33, 50.00, 66.67, 83.33]
const V_LINES = [11.11, 22.22, 33.33, 44.44, 55.56, 66.67, 77.78, 88.89]

// Float durations — 5 variants, assigned round-robin
const FLOAT_DURATIONS = [7, 8.5, 6.5, 9, 7.5]

// Left tools (x < 50): clay, dropcontact, google, linkedin, claude, apollo
const LEFT_INDICES  = TOOLS.map((_, i) => i).filter(i => TOOLS[i].x < 50)
// Right tools (x >= 50): salesforce, hubspot, slack, webhook, notion, pipedrive
const RIGHT_INDICES = TOOLS.map((_, i) => i).filter(i => TOOLS[i].x >= 50)

// NodeLoader center position
const NODE = { x: 50, y: 50 }

export default function HeroBackground() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [pulseRing, setPulseRing] = useState<{ idx: number; key: number } | null>(null)

  // Refs for imperative SVG animation — no SMIL, no React key remounting
  const greyMaskRef = useRef<SVGLineElement>(null)
  const greyVisRef  = useRef<SVGLineElement>(null)
  const beamMaskRef = useRef<SVGLineElement>(null)
  const beamVisRef  = useRef<SVGLineElement>(null)

  const leftCursor  = useRef(0)
  const rightCursor = useRef(0)
  const pKey        = useRef(0)
  const alive       = useRef(true)

  useEffect(() => {
    alive.current = true
    const w = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

    // Animate stroke-dashoffset from `from` to `to` over `dur` ms (ease-out cubic)
    function animateDash(el: SVGLineElement, from: number, to: number, dur: number): Promise<void> {
      return new Promise(resolve => {
        const start = performance.now()
        function tick(now: number) {
          if (!alive.current) { resolve(); return }
          const t = Math.min((now - start) / dur, 1)
          const ease = 1 - Math.pow(1 - t, 3) // ease-out cubic
          el.setAttribute('stroke-dashoffset', String(from + (to - from) * ease))
          if (t < 1) requestAnimationFrame(tick)
          else resolve()
        }
        requestAnimationFrame(tick)
      })
    }

    function setCoords(el: SVGLineElement, x1: number, y1: number, x2: number, y2: number) {
      el.setAttribute('x1', String(x1))
      el.setAttribute('y1', String(y1))
      el.setAttribute('x2', String(x2))
      el.setAttribute('y2', String(y2))
    }

    async function loop() {
      const gm = greyMaskRef.current!
      const gv = greyVisRef.current!
      const bm = beamMaskRef.current!
      const bv = beamVisRef.current!

      // Hide both visual lines initially
      gv.style.display = 'none'
      bv.style.display = 'none'

      while (alive.current) {
        const li = LEFT_INDICES[leftCursor.current++ % LEFT_INDICES.length]
        const ri = RIGHT_INDICES[rightCursor.current++ % RIGHT_INDICES.length]
        const lt = TOOLS[li]
        const rt = TOOLS[ri]

        // ── Step 1: Left tool activates ──────────────────────────────────
        setActiveIdx(li)
        pKey.current++
        setPulseRing({ idx: li, key: pKey.current })
        await w(700); if (!alive.current) break
        setPulseRing(null)
        await w(100); if (!alive.current) break

        // ── Step 2: Grey path builds nodeloader → left tool ──────────────
        setCoords(gm, NODE.x, NODE.y, lt.x, lt.y)
        setCoords(gv, NODE.x, NODE.y, lt.x, lt.y)
        gm.setAttribute('stroke-dashoffset', '1')
        gv.style.display = ''
        await animateDash(gm, 1, 0, 1200)
        if (!alive.current) break

        // ── Step 3: Grey path stays visible ──────────────────────────────
        // (no action — mask offset is 0, fully revealed)

        // ── Step 4: Beam travels left tool → nodeloader ──────────────────
        setCoords(bm, lt.x, lt.y, NODE.x, NODE.y)
        setCoords(bv, lt.x, lt.y, NODE.x, NODE.y)
        bv.setAttribute('stroke', lt.color)
        bm.setAttribute('stroke-dashoffset', '0.18')
        bv.style.display = ''
        await animateDash(bm, 0.18, -1, 1400)
        if (!alive.current) break
        bv.style.display = 'none'

        // ── Step 5: Grey path deconstructs tool → nodeloader ─────────────
        await animateDash(gm, 0, -1, 800)
        if (!alive.current) break
        gv.style.display = 'none'
        setActiveIdx(null)

        // ── Step 6: Grey path builds nodeloader → right tool ─────────────
        setCoords(gm, NODE.x, NODE.y, rt.x, rt.y)
        setCoords(gv, NODE.x, NODE.y, rt.x, rt.y)
        gm.setAttribute('stroke-dashoffset', '1')
        gv.style.display = ''
        await animateDash(gm, 1, 0, 1200)
        if (!alive.current) break

        // ── Step 7: Grey path stays visible ──────────────────────────────

        // ── Step 8: Beam travels nodeloader → right tool ─────────────────
        setCoords(bm, NODE.x, NODE.y, rt.x, rt.y)
        setCoords(bv, NODE.x, NODE.y, rt.x, rt.y)
        bv.setAttribute('stroke', rt.color)
        bm.setAttribute('stroke-dashoffset', '0.18')
        bv.style.display = ''
        await animateDash(bm, 0.18, -1, 1400)
        if (!alive.current) break
        bv.style.display = 'none'

        // ── Step 9: Right tool activates ─────────────────────────────────
        setActiveIdx(ri)
        pKey.current++
        setPulseRing({ idx: ri, key: pKey.current })
        await w(700); if (!alive.current) break
        setPulseRing(null)
        await w(100); if (!alive.current) break

        // ── Step 10: Grey path deconstructs tool → nodeloader ────────────
        await animateDash(gm, 0, -1, 800)
        if (!alive.current) break
        gv.style.display = 'none'
        setActiveIdx(null)

        // ── Inter-cycle pause ────────────────────────────────────────────
        await w(800); if (!alive.current) break
      }
    }

    const t = setTimeout(() => { if (alive.current) loop() }, 2000)
    return () => { alive.current = false; clearTimeout(t) }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden select-none" style={{ background: '#FFFFFF' }}>
      <style>{`
        /* ── Grid lines ─────────────────────────────────────────────────── */
        .hb-hline {
          position: absolute; left: 0; right: 0; height: 1px;
          background: #E3E3EA;
          transform: scaleX(0); transform-origin: 50% 50%;
          animation: hbDrawX 800ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .hb-vline {
          position: absolute; top: 0; bottom: 0; width: 1px;
          background: #E3E3EA;
          transform: scaleY(0); transform-origin: 50% 0%;
          animation: hbDrawY 900ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .hb-hline::after, .hb-vline::after {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(227,227,234,0.5), transparent);
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

        /* ── Icon appear + float ──────────────────────────────────────────── */
        @keyframes hbIconAppear {
          from { opacity: 0; scale: 0.6; }
          to   { opacity: 1; scale: 1;   }
        }
        @keyframes hbFloat0 {
          0%, 100% { translate: 0px 0px;    rotate: 0deg;    }
          25%      { translate: 3px -6px;   rotate: 2deg;    }
          75%      { translate: -3px 5px;   rotate: -1.5deg; }
        }
        @keyframes hbFloat1 {
          0%, 100% { translate: 0px 0px;    rotate: 0deg;    }
          25%      { translate: -4px -8px;  rotate: -3deg;   }
          75%      { translate: 4px 4px;    rotate: 2deg;    }
        }
        @keyframes hbFloat2 {
          0%, 100% { translate: 0px 0px;    rotate: 0deg;    }
          25%      { translate: 4px 5px;    rotate: 2deg;    }
          75%      { translate: -4px -5px;  rotate: -2deg;   }
        }
        @keyframes hbFloat3 {
          0%, 100% { translate: 0px 0px;    rotate: 0deg;    }
          25%      { translate: -3px -7px;  rotate: -2deg;   }
          75%      { translate: 3px 6px;    rotate: 2deg;    }
        }
        @keyframes hbFloat4 {
          0%, 100% { translate: 0px 0px;    rotate: 0deg;    }
          25%      { translate: 3px 6px;    rotate: 3deg;    }
          75%      { translate: -3px -7px;  rotate: -2deg;   }
        }

        /* ── Pulse ring ─────────────────────────────────────────────────── */
        @keyframes hbPulseRing {
          from { transform: translate(-50%, -50%) scale(1);   opacity: 0.65; }
          to   { transform: translate(-50%, -50%) scale(2.4); opacity: 0;    }
        }
        .hb-pulse-ring {
          position: absolute; left: 50%; top: 50%;
          width: ${BOX_S + 8}px; height: ${BOX_S + 8}px;
          border: 1.5px solid rgba(0, 0, 250, 0.45);
          border-radius: 18px;
          pointer-events: none;
          animation: hbPulseRing 700ms ease-out forwards;
        }
      `}</style>

      {/* ── Grid lines ─────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
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

      {/* ── SVG overlay: grey dotted path + colored beam ─────────────────
           Two persistent line pairs (mask + visual), animated imperatively
           via requestAnimationFrame. No SMIL, no React key remounting.

           Mask lines use pathLength="1" for normalized dash math.
           Visual lines use vectorEffect="non-scaling-stroke" for px dots.
           These are on separate elements to avoid the conflict under
           preserveAspectRatio="none". */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <mask id="grey-mask">
            <line
              ref={greyMaskRef}
              x1="50" y1="50" x2="50" y2="50"
              pathLength={1}
              stroke="white"
              strokeWidth="200"
              strokeDasharray="1"
              strokeDashoffset="1"
            />
          </mask>
          <mask id="beam-mask">
            <line
              ref={beamMaskRef}
              x1="50" y1="50" x2="50" y2="50"
              pathLength={1}
              stroke="white"
              strokeWidth="200"
              strokeDasharray="0.18 2"
              strokeDashoffset="0.18"
            />
          </mask>
        </defs>

        {/* Grey dotted path */}
        <line
          ref={greyVisRef}
          mask="url(#grey-mask)"
          x1="50" y1="50" x2="50" y2="50"
          stroke="rgba(160,163,178,0.85)"
          strokeWidth="2.5"
          strokeDasharray="0 9"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ display: 'none' }}
        />

        {/* Colored beam */}
        <line
          ref={beamVisRef}
          mask="url(#beam-mask)"
          x1="50" y1="50" x2="50" y2="50"
          stroke="transparent"
          strokeWidth="3"
          strokeDasharray="0 9"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ display: 'none' }}
        />
      </svg>

      {/* ── Tool logos — appear then float continuously ────────────────── */}
      {TOOLS.map((tool, i) => {
        const variant     = i % FLOAT_DURATIONS.length
        const appearDelay = i * 80
        const floatDelay  = appearDelay + 700
        const floatDur    = FLOAT_DURATIONS[variant]
        const isActive    = activeIdx === i
        const showPulse   = pulseRing?.idx === i

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
            {/* Pulse ring — re-mounts each activation via key */}
            {showPulse && <div key={pulseRing!.key} className="hb-pulse-ring" />}

            {/* Outer opacity wrapper — controls resting (0.6) vs active (1.0) */}
            <div style={{ opacity: isActive ? 1 : 0.6, transition: 'opacity 300ms ease' }}>
              {/* Inner wrapper — CSS appear + float animations */}
              <div
                style={{
                  animation: `hbIconAppear 0.6s cubic-bezier(0.22,1,0.36,1) ${appearDelay}ms both, hbFloat${variant} ${floatDur}s ease-in-out ${floatDelay}ms infinite both`,
                  width:          BOX_S,
                  height:         BOX_S,
                  background:     '#F0F0F2',
                  borderRadius:   14,
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  boxShadow: isActive
                    ? '0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04), 0 0 0 2px rgba(0,0,250,0.25), 0 0 14px rgba(0,0,250,0.10)'
                    : '0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 300ms ease',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/logos/${tool.id}.png`}
                  alt=""
                  width={tool.logoSize}
                  height={tool.logoSize}
                  draggable={false}
                  style={{ display: 'block', borderRadius: 6 }}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
