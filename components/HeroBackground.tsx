'use client'

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

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden select-none" style={{ background: '#FFFFFF' }}>
      <style>{`
        /* ── Grid line appear (from hero-minimalism animation) ── */
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

        /* ── Icon appear + float (CSS individual transform properties) ─
           scale controls appear, translate+rotate control float —
           they compose independently so no animation conflict.          */
        @keyframes hbIconAppear {
          from { opacity: 0; scale: 0.6; }
          to   { opacity: 0.6; scale: 1; }
        }
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
      `}</style>

      {/* ── Grid lines ─────────────────────────────────────────── */}
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

      {/* ── Tool logos — appear then float continuously ─────────── */}
      {TOOLS.map((tool, i) => {
        const variant     = i % FLOAT_DURATIONS.length
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
                width:          BOX_S,
                height:         BOX_S,
                background:     '#F0F0F2',
                borderRadius:   14,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                boxShadow:      '0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
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
    </div>
  )
}
