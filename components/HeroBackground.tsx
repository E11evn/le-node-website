'use client'
import { useEffect, useRef, useState } from 'react'

// Tool positions matched from reference 100% opacity.png
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

const ICON_S = 38
const BOX_S  = 52

// Grid positions from reference grid.svg
const H_LINES = [16.67, 33.33, 50.00, 66.67, 83.33]
const V_LINES = [11.11, 22.22, 33.33, 44.44, 55.56, 66.67, 77.78, 88.89]

// Float durations — 5 variants, assigned round-robin
const FLOAT_DURATIONS = [7, 8.5, 6.5, 9, 7.5]

// Left tools (x < 50): clay, dropcontact, google, linkedin, claude, apollo
const LEFT_INDICES  = TOOLS.map((_, i) => i).filter(i => TOOLS[i].x < 50)
// Right tools (x >= 50): salesforce, hubspot, slack, webhook, notion, pipedrive
const RIGHT_INDICES = TOOLS.map((_, i) => i).filter(i => TOOLS[i].x >= 50)

// Approximate CTA ("Join waitlist") position within the hero background
// Hero is flex-centered; h1 (2 lines) + 40px gap puts the CTA button at ~52% down
const CTA = { x: 50, y: 52 }

type Beam = { x1: number; y1: number; x2: number; y2: number; key: number }

export default function HeroBackground() {
  const [activeIdx,  setActiveIdx]  = useState<number | null>(null)
  const [pulseRing,  setPulseRing]  = useState<{ idx: number; key: number } | null>(null)
  const [beamOut,    setBeamOut]    = useState<Beam | null>(null)
  const [beamIn,     setBeamIn]     = useState<Beam | null>(null)
  // Non-zero = active; value used as React key so each trigger re-mounts the glow element
  const [ctaGlowKey, setCtaGlowKey] = useState(0)

  const leftCursor  = useRef(0)
  const rightCursor = useRef(0)
  const bKey        = useRef(0)
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

        // ── Phase 1: Left tool activates (pulse + opacity → 1) ────────────
        setActiveIdx(li)
        pKey.current++
        setPulseRing({ idx: li, key: pKey.current })
        await w(700);  if (!alive.current) break   // pulse ring duration
        setPulseRing(null)
        await w(200);  if (!alive.current) break   // brief hold at full opacity

        // ── Phase 2: Beam travels from left tool → CTA ────────────────────
        bKey.current++
        setBeamOut({ x1: lt.x, y1: lt.y, x2: CTA.x, y2: CTA.y, key: bKey.current })
        await w(550);  if (!alive.current) break   // beam travel time

        // ── Phase 3: Beam reaches CTA — left fades, CTA glows ─────────────
        setBeamOut(null)
        setActiveIdx(null)
        setCtaGlowKey(k => k + 1)
        await w(200);  if (!alive.current) break   // brief pause before emitting

        // ── Phase 4: CTA emits beam → right tool ──────────────────────────
        bKey.current++
        setBeamIn({ x1: CTA.x, y1: CTA.y, x2: rt.x, y2: rt.y, key: bKey.current })
        await w(550);  if (!alive.current) break   // beam travel time

        // ── Phase 5: Right tool activates ─────────────────────────────────
        setBeamIn(null)
        setActiveIdx(ri)
        pKey.current++
        setPulseRing({ idx: ri, key: pKey.current })
        await w(700);  if (!alive.current) break   // pulse ring duration
        setPulseRing(null)
        await w(200);  if (!alive.current) break   // brief hold at full opacity

        // ── Phase 6: Right tool fades + inter-cycle pause ─────────────────
        setActiveIdx(null)
        await w(1300); if (!alive.current) break
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

        /* ── Icon appear + float ────────────────────────────────────────────
           hbIconAppear ends at opacity:1 so the outer opacity wrapper
           (set to 0.6 at rest, 1.0 when active) controls visible brightness.  */
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

        /* ── CTA glow (appears when a beam arrives / departs) ───────────── */
        @keyframes hbCtaGlow {
          0%   { opacity: 0; transform: translate(-50%, -50%) scaleX(0.5); }
          35%  { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%, -50%) scaleX(1.3); }
        }
        .hb-cta-glow {
          position: absolute;
          width: 260px; height: 60px; border-radius: 30px;
          background: radial-gradient(ellipse at center, rgba(0, 0, 250, 0.18) 0%, transparent 70%);
          pointer-events: none;
          animation: hbCtaGlow 700ms ease-out forwards;
        }

        /* ── SVG beam (two-layer: glow + core) ──────────────────────────── */
        @keyframes hbBeamDraw {
          from { stroke-dashoffset: 200; opacity: 0; }
          10%  { opacity: 1; }
          100% { stroke-dashoffset: 0;   opacity: 1; }
        }
        .hb-beam-glow {
          stroke-dasharray: 200; stroke-dashoffset: 200;
          animation: hbBeamDraw 550ms ease-out forwards;
        }
        .hb-beam-core {
          stroke-dasharray: 200; stroke-dashoffset: 200;
          animation: hbBeamDraw 550ms ease-out forwards;
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

      {/* ── CTA glow — re-mounts on each trigger via key ────────────────── */}
      {ctaGlowKey > 0 && (
        <div
          key={ctaGlowKey}
          className="hb-cta-glow"
          style={{ left: `${CTA.x}%`, top: `${CTA.y}%` }}
        />
      )}

      {/* ── SVG beam overlay ─────────────────────────────────────────────
           viewBox 0 0 100 100 + preserveAspectRatio="none" maps tool/CTA
           percentage positions directly to SVG coordinates.
           vector-effect="non-scaling-stroke" keeps stroke width in CSS px. */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {beamOut && (
          <g key={`bo-${beamOut.key}`}>
            {/* soft glow layer */}
            <line
              className="hb-beam-glow"
              x1={beamOut.x1} y1={beamOut.y1} x2={beamOut.x2} y2={beamOut.y2}
              stroke="rgba(0,0,250,0.18)" strokeWidth="5" strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* bright core */}
            <line
              className="hb-beam-core"
              x1={beamOut.x1} y1={beamOut.y1} x2={beamOut.x2} y2={beamOut.y2}
              stroke="rgba(0,0,250,0.65)" strokeWidth="1" strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        )}
        {beamIn && (
          <g key={`bi-${beamIn.key}`}>
            <line
              className="hb-beam-glow"
              x1={beamIn.x1} y1={beamIn.y1} x2={beamIn.x2} y2={beamIn.y2}
              stroke="rgba(0,0,250,0.18)" strokeWidth="5" strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <line
              className="hb-beam-core"
              x1={beamIn.x1} y1={beamIn.y1} x2={beamIn.x2} y2={beamIn.y2}
              stroke="rgba(0,0,250,0.65)" strokeWidth="1" strokeLinecap="round"
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
                  width={ICON_S}
                  height={ICON_S}
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
