// ─── Integration flow — floating cards in space ───────────────────────────────
// Individual floating cards → le-node hub → output channels
// Pure SVG with CSS-animated flow lines and per-card float animations.

const ACCENT = '#0043FA'

const FLOW = {
  stroke: ACCENT,
  strokeWidth: 1.2,
  fill: 'none',
  strokeDasharray: '5 9',
  animation: 'flow-anim 1.6s linear infinite',
} as const

// ── Logo icon renderer ─────────────────────────────────────────────────────────
// Renders a small branded square at (x, y) with size s
type LogoDef = { bg: string; text: string; fs?: number }
const LOGO_MAP: Record<string, LogoDef> = {
  clay:        { bg: '#F47B20', text: 'C',   fs: 10 },
  linkedin:    { bg: '#0A66C2', text: 'in',  fs: 8  },
  claude:      { bg: '#7C3AED', text: 'A',   fs: 10 },
  typeform:    { bg: '#262626', text: 'TF',  fs: 7  },
  webflow:     { bg: '#4353FF', text: 'W',   fs: 10 },
  hubspot:     { bg: '#FF7A59', text: 'HS',  fs: 7  },
  gads:        { bg: '#4285F4', text: 'G',   fs: 10 },
  liads:       { bg: '#0A66C2', text: 'in',  fs: 8  },
  fbads:       { bg: '#1877F2', text: 'f',   fs: 12 },
  webhook:     { bg: '#6B7280', text: '↗',   fs: 11 },
  n8n:         { bg: '#EA4B71', text: 'n8n', fs: 7  },
  ga4:         { bg: '#E37400', text: 'G4',  fs: 7  },
  segment:     { bg: '#52BD94', text: 'S',   fs: 10 },
  hotjar:      { bg: '#FF3C00', text: 'HJ',  fs: 7  },
  supabase:    { bg: '#3ECF8E', text: '⚡',   fs: 11 },
  bigquery:    { bg: '#4285F4', text: 'BQ',  fs: 7  },
  db:          { bg: '#64748B', text: '▦',   fs: 11 },
  apollo:      { bg: '#7C3AED', text: 'Ap',  fs: 8  },
  fullenrich:  { bg: '#F59E0B', text: 'FE',  fs: 7  },
  dropcontact: { bg: '#10B981', text: 'DC',  fs: 7  },
}

function Logo({ id, x, y, s = 22 }: { id: string; x: number; y: number; s?: number }) {
  const def = LOGO_MAP[id] ?? { bg: '#374151', text: '?', fs: 9 }
  const fs = def.fs ?? 9
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} rx={Math.round(s / 5)} fill={def.bg} />
      <text
        x={x + s / 2}
        y={y + s / 2 + fs * 0.38}
        textAnchor="middle"
        fill="white"
        fontSize={fs}
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
      >
        {def.text}
      </text>
    </g>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────
const INPUTS = [
  { label: 'Signals',   logos: ['clay', 'linkedin', 'claude']         },
  { label: 'Inbound',   logos: ['typeform', 'webflow', 'hubspot']      },
  { label: 'Ads',       logos: ['gads', 'liads', 'fbads']              },
  { label: 'Events',    logos: ['webhook', 'n8n', 'clay']              },
  { label: 'Website',   logos: ['ga4', 'segment', 'hotjar']            },
  { label: 'Database',  logos: ['supabase', 'bigquery', 'db']          },
  { label: 'Providers', logos: ['apollo', 'fullenrich', 'dropcontact'] },
]

const OUTPUTS = [
  { label: 'CRM',              color: '#FF7A59' },
  { label: 'Qualified Leads',  color: ACCENT    },
  { label: 'Sales Enablement', color: '#52BD94' },
  { label: 'Sales Ready Opp.', color: '#F59E0B' },
]

// Card geometry
const CARD_W = 162
const CARD_H = 68
const HUB_X  = 388
const HUB_W  = 184
const HUB_H  = 128
const HUB_CY = 264
const OUT_X  = 694
const OUT_W  = 184

// Scattered positions — varied x/y to give a "floating in space" feel
const CARD_POSITIONS = [
  { x: 10, y: 12  },  // Signals
  { x: 54, y: 92  },  // Inbound
  { x: 6,  y: 174 },  // Ads
  { x: 58, y: 255 },  // Events
  { x: 10, y: 338 },  // Website
  { x: 50, y: 418 },  // Database
  { x: 8,  y: 490 },  // Providers
]

// Output card vertical centres
const OUT_CYS = [HUB_CY - 105, HUB_CY - 35, HUB_CY + 35, HUB_CY + 105]

// Float animation params per card (logos only)
const FLOATS = [
  { dy: '0,0; 0,-7; 0,0',       dur: '4.6s', begin: '0s'    },
  { dy: '0,-3; 0,5; 0,-3',      dur: '5.2s', begin: '-1.1s' },
  { dy: '0,0; 0,-8; 0,4; 0,0',  dur: '4.9s', begin: '-2.4s' },
  { dy: '0,2; 0,-6; 0,2',       dur: '5.5s', begin: '-0.7s' },
  { dy: '0,-2; 0,7; 0,-2',      dur: '4.3s', begin: '-3.2s' },
  { dy: '0,0; 0,-5; 0,3; 0,0',  dur: '5.7s', begin: '-1.8s' },
  { dy: '0,3; 0,-7; 0,3',       dur: '4.8s', begin: '-0.4s' },
]
const OUT_FLOATS = [
  { dy: '0,-2; 0,6; 0,-2', dur: '5.1s', begin: '-0.9s' },
  { dy: '0,0; 0,-7; 0,0',  dur: '4.7s', begin: '-2.6s' },
  { dy: '0,4; 0,-4; 0,4',  dur: '5.3s', begin: '-1.4s' },
  { dy: '0,-3; 0,5; 0,-3', dur: '4.5s', begin: '-3.8s' },
]

export default function IntegrationDiagram() {
  const hubLeft  = HUB_X
  const hubRight = HUB_X + HUB_W
  const hubTop   = HUB_CY - HUB_H / 2
  const outLeft  = OUT_X

  const logoSize  = 22
  const logoGap   = 8
  const logoTotal = 3 * logoSize + 2 * logoGap

  return (
    <section className="py-20 md:py-28 bg-[#212226]">
      <div className="container-content">

        {/* Header */}
        <div className="mb-12">
          <span
            className="text-xs font-semibold tracking-widest uppercase mb-4 block"
            style={{ color: ACCENT }}
          >
            Infrastructure
          </span>
          <h2 className="text-display-sm font-bold text-white mb-4 max-w-xl">
            One system. Every lead.
          </h2>
          <p className="text-white/50 text-lg max-w-xl">
            le-node ingests every signal source, qualifies leads with AI, and routes
            them to your CRM and outreach tools — automatically.
          </p>
        </div>

        {/* Diagram */}
        <svg
          viewBox="0 0 900 560"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', maxWidth: 900, margin: '0 auto' }}
          aria-label="le-node integration flow diagram"
        >
          <defs>
            <marker
              id="arrowBlue" viewBox="0 0 10 10"
              refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill={ACCENT} opacity="0.75" />
            </marker>

            {/* Glow filter for le-node card */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <style>{`
              @keyframes flow-anim { to { stroke-dashoffset: -14; } }
            `}</style>
          </defs>

          {/* Dot-grid background */}
          {Array.from({ length: 22 }).map((_, c) =>
            Array.from({ length: 14 }).map((_, r) => (
              <circle
                key={`d-${c}-${r}`}
                cx={c * 42 + 8} cy={r * 40 + 8}
                r="1" fill="rgba(255,255,255,0.04)"
              />
            ))
          )}

          {/* ── Animated connection paths (behind cards) ───────────────── */}

          {/* Input → le-node paths (convergence) */}
          {INPUTS.map((_, i) => {
            const { x: cardX, y: cardY } = CARD_POSITIONS[i]
            const cardRight = cardX + CARD_W
            const cy = cardY + CARD_H / 2
            const delay = `${-(i * 0.2).toFixed(1)}s`
            return (
              <path
                key={`in-path-${i}`}
                d={`M ${cardRight} ${cy} C ${(cardRight + hubLeft) / 2} ${cy} ${(cardRight + hubLeft) / 2} ${HUB_CY} ${hubLeft} ${HUB_CY}`}
                style={{ ...FLOW, animationDelay: delay }}
              />
            )
          })}

          {/* le-node → output paths (divergence) */}
          {OUT_CYS.map((oCy, i) => {
            const delay = `${-(i * 0.3).toFixed(1)}s`
            return (
              <path
                key={`out-path-${i}`}
                d={`M ${hubRight} ${HUB_CY} C ${(hubRight + outLeft) / 2} ${HUB_CY} ${(hubRight + outLeft) / 2} ${oCy} ${outLeft} ${oCy}`}
                style={{ ...FLOW, animationDelay: delay }}
                markerEnd="url(#arrowBlue)"
              />
            )
          })}

          {/* ── Input floating cards ────────────────────────────────────── */}
          {INPUTS.map(({ label, logos }, i) => {
            const { x: cardX, y: cardY } = CARD_POSITIONS[i]
            const cardRight = cardX + CARD_W
            const cardCX = cardX + CARD_W / 2
            const f = FLOATS[i]
            const logoStartX = cardX + (CARD_W - logoTotal) / 2

            return (
              <g key={label}>
                {/* Static: card background, label, separator, connection dot */}
                <rect
                  x={cardX} y={cardY}
                  width={CARD_W} height={CARD_H}
                  rx="10"
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(255,255,255,0.10)"
                  strokeWidth="1"
                />
                <text
                  x={cardCX} y={cardY + 20}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.90)"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="system-ui,sans-serif"
                >
                  {label}
                </text>
                <line
                  x1={cardX + 10} y1={cardY + 29}
                  x2={cardX + CARD_W - 10} y2={cardY + 29}
                  stroke="rgba(255,255,255,0.07)" strokeWidth="1"
                />
                <circle
                  cx={cardRight} cy={cardY + CARD_H / 2}
                  r="3" fill={ACCENT} opacity="0.4"
                />

                {/* Logos only — these float */}
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values={f.dy}
                    dur={f.dur}
                    begin={f.begin}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keyTimes={f.dy.split(';').map((_, j, a) => (j / (a.length - 1)).toFixed(2)).join(';')}
                    keySplines={Array(f.dy.split(';').length - 1).fill('0.45 0 0.55 1').join(';')}
                  />
                  {logos.map((id, li) => (
                    <Logo
                      key={id + li}
                      id={id}
                      x={logoStartX + li * (logoSize + logoGap)}
                      y={cardY + 36}
                      s={logoSize}
                    />
                  ))}
                </g>
              </g>
            )
          })}

          {/* ── le-node hub card ───────────────────────────────────────── */}
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,-3; 0,3; 0,0"
              dur="6s"
              begin="-2s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.33;0.66;1"
              keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
            />

            {/* Outer glow ring */}
            <rect
              x={HUB_X - 6} y={hubTop - 6}
              width={HUB_W + 12} height={HUB_H + 12}
              rx="18"
              fill="none"
              stroke={`${ACCENT}30`}
              strokeWidth="1"
            />

            {/* Card */}
            <rect
              x={HUB_X} y={hubTop}
              width={HUB_W} height={HUB_H}
              rx="12"
              fill="rgba(0,67,250,0.12)"
              stroke="rgba(0,67,250,0.55)"
              strokeWidth="1.5"
              filter="url(#glow)"
            />

            {/* Left accent bar */}
            <rect
              x={HUB_X} y={hubTop}
              width="4" height={HUB_H}
              rx="2" fill={ACCENT}
            />

            {/* le-node logo (PNG, white on transparent) */}
            <image
              href="/logo.png"
              x={HUB_X + (HUB_W - 120) / 2}
              y={hubTop + 30}
              width="120"
              height="38"
              preserveAspectRatio="xMidYMid meet"
            />

            {/* Tagline */}
            <text
              x={HUB_X + HUB_W / 2}
              y={hubTop + 86}
              textAnchor="middle"
              fill="rgba(255,255,255,0.40)"
              fontSize="9.5"
              fontFamily="system-ui,sans-serif"
              letterSpacing="0.5"
            >
              AI native GTM Engine
            </text>

            {/* Entry / exit dots */}
            <circle cx={hubLeft}  cy={HUB_CY} r="4" fill={ACCENT} opacity="0.55" />
            <circle cx={hubRight} cy={HUB_CY} r="4" fill={ACCENT} opacity="0.55" />
          </g>

          {/* ── Output floating cards ───────────────────────────────────── */}
          {OUTPUTS.map(({ label, color }, i) => {
            const oCy = OUT_CYS[i]
            const f   = OUT_FLOATS[i]
            const cardY = oCy - 30

            return (
              <g key={label}>
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values={f.dy}
                  dur={f.dur}
                  begin={f.begin}
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.5;1"
                  keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
                />

                {/* Card */}
                <rect
                  x={OUT_X} y={cardY}
                  width={OUT_W} height="60"
                  rx="10"
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(255,255,255,0.10)"
                  strokeWidth="1"
                />

                {/* Color dot */}
                <circle cx={OUT_X + 20} cy={oCy} r="6" fill={color} opacity="0.9" />

                {/* Label */}
                <text
                  x={OUT_X + 34} y={oCy + 4}
                  fill="rgba(255,255,255,0.85)"
                  fontSize="11.5"
                  fontFamily="system-ui,sans-serif"
                >
                  {label}
                </text>

                {/* Entry dot */}
                <circle cx={OUT_X} cy={oCy} r="3" fill={color} opacity="0.4" />
              </g>
            )
          })}

        </svg>
      </div>
    </section>
  )
}
