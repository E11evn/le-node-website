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

type GreyLine = {
  x1: number; y1: number; x2: number; y2: number;
  phase: 'draw' | 'rewind';
  key: number;
}

type ColorBeam = {
  x1: number; y1: number; x2: number; y2: number;
  color: string;
  key: number;
}

export default function HeroBackground() {
  const [activeIdx,  setActiveIdx]  = useState<number | null>(null)
  const [pulseRing,  setPulseRing]  = useState<{ idx: number; key: number } | null>(null)
  const [greyLine,   setGreyLine]   = useState<GreyLine | null>(null)
  const [colorBeam,  setColorBeam]  = useState<ColorBeam | null>(null)

  const leftCursor  = useRef(0)
  const rightCursor = useRef(0)
  const lKey        = useRef(0)
  const pKey        = useRef(0)
  const alive       = useRef(true)

  useEffect(() => {
    alive.current = true
    const w = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

    async function loop() {
      while (alive.current) {
        const li = LEFT_INDICES[leftCursor.current++ % LEFT_INDICES.length]
        const ri = RIGHT_INDICES[rightCursor.current++ % RIGHT_INDICES.length]
        const lt = TOOLS[li]
        const rt = TOOLS[ri]

        // ── Phase 1: Left tool activates ─────────────────────────────────────
        setActiveIdx(li)
        pKey.current++
        setPulseRing({ idx: li, key: pKey.current })
        await w(700); if (!alive.current) break
        setPulseRing(null)
        await w(100); if (!alive.current) break

        // ── Phase 2: Grey dots appear node → left tool (cover peels away) ───
        lKey.current++
        setGreyLine({ x1: NODE.x, y1: NODE.y, x2: lt.x, y2: lt.y, phase: 'draw', key: lKey.current })
        await w(400); if (!alive.current) break

        // ── Phase 3: Colored beam travels from left tool → nodeloader ─────────
        lKey.current++
        setColorBeam({ x1: lt.x, y1: lt.y, x2: NODE.x, y2: NODE.y, color: lt.color, key: lKey.current })
        await w(900); if (!alive.current) break
        setColorBeam(null)

        // ── Phase 4: Grey dots hide (cover grows from tool back to node) ──────
        lKey.current++
        setGreyLine({ x1: NODE.x, y1: NODE.y, x2: lt.x, y2: lt.y, phase: 'rewind', key: lKey.current })
        await w(400); if (!alive.current) break
        setGreyLine(null)
        setActiveIdx(null)

        // ── Phase 5: Grey dots appear node → right tool ───────────────────────
        lKey.current++
        setGreyLine({ x1: NODE.x, y1: NODE.y, x2: rt.x, y2: rt.y, phase: 'draw', key: lKey.current })
        await w(400); if (!alive.current) break

        // ── Phase 6: Colored beam travels from nodeloader → right tool ────────
        lKey.current++
        setColorBeam({ x1: NODE.x, y1: NODE.y, x2: rt.x, y2: rt.y, color: rt.color, key: lKey.current })
        await w(900); if (!alive.current) break
        setColorBeam(null)

        // ── Phase 7: Right tool activates ─────────────────────────────────────
        setActiveIdx(ri)
        pKey.current++
        setPulseRing({ idx: ri, key: pKey.current })
        await w(700); if (!alive.current) break
        setPulseRing(null)
        await w(100); if (!alive.current) break

        // ── Phase 8: Grey dots hide (cover grows from tool back to node) ──────
        lKey.current++
        setGreyLine({ x1: NODE.x, y1: NODE.y, x2: rt.x, y2: rt.y, phase: 'rewind', key: lKey.current })
        await w(400); if (!alive.current) break
        setGreyLine(null)
        setActiveIdx(null)

        // ── Inter-cycle pause ─────────────────────────────────────────────────
        await w(800); if (!alive.current) break
      }
    }

    // Start after initial appear animations settle
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

        /* ── Grey dotted line — cover peels away (draw) or grows (rewind) ─ */
        /*    The dotted line is static; a white cover handles direction.    */
        @keyframes hbCoverDraw {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -1; }
        }
        .hb-grey-cover-draw {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: hbCoverDraw 400ms ease-out forwards;
        }

        @keyframes hbCoverRewind {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .hb-grey-cover-rewind {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: hbCoverRewind 400ms ease-in forwards;
        }

        /* ── Colored traveling beam ─────────────────────────────────────── */
        /*    dashoffset 0.2→-0.8 sends a 20%-length beam from x1 to x2.   */
        @keyframes hbBeamTravel {
          from { stroke-dashoffset: 0.2; }
          to   { stroke-dashoffset: -0.8; }
        }
        .hb-beam-travel {
          stroke-dasharray: 0.2 0.8;
          animation: hbBeamTravel 900ms ease-in-out forwards;
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

      {/* ── SVG overlay: grey connection line + colored beam ─────────────
           viewBox 0 0 100 100 + preserveAspectRatio="none" maps percentage
           positions directly to SVG coordinates.
           vector-effect="non-scaling-stroke" keeps stroke width in CSS px. */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Grey dotted connection line + white directional cover ────────
             The dots are static (full-length, always rendered at opacity 1).
             A white cover line sits on top and is animated to peel away
             (draw phase) or grow back (rewind phase), creating a directional
             reveal/hide without touching the dot dasharray itself.          */}
        {greyLine && (
          <g key={`gl-${greyLine.key}`}>
            {/* Dots — pure round dots via dash=0 + round linecap */}
            <line
              x1={greyLine.x1} y1={greyLine.y1}
              x2={greyLine.x2} y2={greyLine.y2}
              pathLength="1"
              stroke="rgba(140,145,162,0.9)"
              strokeWidth="2"
              strokeDasharray="0 0.06"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* White cover — peels from x1 (draw) or grows from x2 (rewind) */}
            <line
              className={greyLine.phase === 'draw' ? 'hb-grey-cover-draw' : 'hb-grey-cover-rewind'}
              x1={greyLine.x1} y1={greyLine.y1}
              x2={greyLine.x2} y2={greyLine.y2}
              pathLength="1"
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeLinecap="butt"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        )}

        {/* Colored traveling beam (glow + bright core) */}
        {colorBeam && (
          <g key={`cb-${colorBeam.key}`}>
            {/* Wide glow */}
            <line
              className="hb-beam-travel"
              x1={colorBeam.x1} y1={colorBeam.y1}
              x2={colorBeam.x2} y2={colorBeam.y2}
              pathLength="1"
              stroke={colorBeam.color} strokeWidth="8" strokeLinecap="round"
              style={{ opacity: 0.25 }}
              vectorEffect="non-scaling-stroke"
            />
            {/* Bright core */}
            <line
              className="hb-beam-travel"
              x1={colorBeam.x1} y1={colorBeam.y1}
              x2={colorBeam.x2} y2={colorBeam.y2}
              pathLength="1"
              stroke={colorBeam.color} strokeWidth="2" strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        )}
      </svg>

      {/* ── Tool logos — appear then float continuously ──────────────────
           Structure (outer → inner):
           [positioning wrapper] absolute at x%,y%
             [pulse ring] sibling, centered via left/top 50%
             [opacity wrapper] CSS transition 0.6→1 on activation
               [box] CSS animation: appear (opacity+scale) + float (translate+rotate) */}
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
