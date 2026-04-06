// ─── Integration flow diagram ─────────────────────────────────────────────────
// 5 input cards → le-node hub → 3 output cards
// Static cards, real PNG logos, animated dashed flow lines.

const ACCENT = '#0043FA'

// ── Layout ────────────────────────────────────────────────────────────────────
const CARD_W    = 190
const CARD_H    = 90
const INPUT_GAP = 14
const INPUT_X   = 20

const HUB_X  = 318
const HUB_W  = 240
const HUB_H  = 150
const HUB_CY = 272   // vertical centre of hub = centre of 5 input cards

const OUT_X   = 686
const OUT_W   = 190
const OUT_H   = 90
const OUT_GAP = 20

// 5 input cards, total height = 5×90 + 4×14 = 506. Top = (540−506)/2 = 17
const INPUT_TOP = 17
function inputY (i: number) { return INPUT_TOP + i * (CARD_H + INPUT_GAP) }
function inputCY(i: number) { return inputY(i) + CARD_H / 2 }
// centres: 62, 166, 270, 374, 478 → mid = (62+478)/2 = 270 ✓

// 3 output cards centred on HUB_CY. Total = 3×90 + 2×20 = 310. Start = 272−155 = 117
const OUT_TOP = HUB_CY - (3 * OUT_H + 2 * OUT_GAP) / 2
function outputY (i: number) { return OUT_TOP + i * (OUT_H + OUT_GAP) }
function outputCY(i: number) { return outputY(i) + OUT_H / 2 }

// ── Data ──────────────────────────────────────────────────────────────────────
const INPUTS = [
  { label: 'Signal',         logos: ['clay',      'claude',      'google']      },
  { label: 'Data provider',  logos: ['fullenrich', 'apollo',     'dropcontact'] },
  { label: 'Custom sources', logos: ['webhook',    'db',         'code']        },
  { label: 'Website',        logos: ['webflow',    'ga4',        'segment']     },
  { label: 'Ads',            logos: ['linkedin',   'gads',       'meta']        },
]

const OUTPUTS = [
  { label: 'CRM',        logos: ['hubspot',  'salesforce', 'pipedrive'] },
  { label: 'Sales team', logos: ['slack',    'teams',      'gmail']     },
  { label: 'Reporting',  logos: ['airtable', 'notion',     'webhook']   },
]

// ── Flow line style ───────────────────────────────────────────────────────────
const FLOW = {
  stroke: 'rgba(255,255,255,0.22)',
  strokeWidth: 1.5,
  fill: 'none',
  strokeDasharray: '6 8',
  animation: 'flow-anim 2s linear infinite',
} as const

// ── Logo helper ───────────────────────────────────────────────────────────────
function Logo({ id, x, y, s = 38 }: { id: string; x: number; y: number; s?: number }) {
  return (
    <image
      href={`/logos/${id}.png`}
      x={x} y={y}
      width={s} height={s}
    />
  )
}

// ── Logo row geometry ─────────────────────────────────────────────────────────
const LOGO_S   = 38
const LOGO_GAP = 10
const LOGO_ROW = 3 * LOGO_S + 2 * LOGO_GAP   // 134

export default function IntegrationDiagram() {
  const inputRight = INPUT_X + CARD_W   // 210
  const hubLeft    = HUB_X              // 318
  const hubRight   = HUB_X + HUB_W     // 558
  const hubTop     = HUB_CY - HUB_H / 2
  const outLeft    = OUT_X              // 686

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
          viewBox="0 0 900 540"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', maxWidth: 900, margin: '0 auto' }}
          aria-label="le-node integration flow diagram"
        >
          <defs>
            <style>{`
              @keyframes flow-anim { to { stroke-dashoffset: -14; } }
            `}</style>
          </defs>

          {/* Subtle dot grid */}
          {Array.from({ length: 22 }).map((_, c) =>
            Array.from({ length: 14 }).map((_, r) => (
              <circle
                key={`d-${c}-${r}`}
                cx={c * 42 + 8} cy={r * 40 + 8}
                r="1" fill="rgba(255,255,255,0.035)"
              />
            ))
          )}

          {/* ── Flow lines (drawn behind cards) ────────────────────────── */}

          {/* Input → hub */}
          {INPUTS.map((_, i) => {
            const cy    = inputCY(i)
            const delay = `${-(i * 0.25).toFixed(2)}s`
            const mx    = (inputRight + hubLeft) / 2
            return (
              <path
                key={`in-${i}`}
                d={`M ${inputRight} ${cy} C ${mx} ${cy} ${mx} ${HUB_CY} ${hubLeft} ${HUB_CY}`}
                style={{ ...FLOW, animationDelay: delay }}
              />
            )
          })}

          {/* Hub → output */}
          {OUTPUTS.map((_, i) => {
            const cy    = outputCY(i)
            const delay = `${-(i * 0.35).toFixed(2)}s`
            const mx    = (hubRight + outLeft) / 2
            return (
              <path
                key={`out-${i}`}
                d={`M ${hubRight} ${HUB_CY} C ${mx} ${HUB_CY} ${mx} ${cy} ${outLeft} ${cy}`}
                style={{ ...FLOW, animationDelay: delay }}
              />
            )
          })}

          {/* ── Input cards ────────────────────────────────────────────── */}
          {INPUTS.map(({ label, logos }, i) => {
            const cardY  = inputY(i)
            const cardCX = INPUT_X + CARD_W / 2
            const logoX0 = INPUT_X + (CARD_W - LOGO_ROW) / 2

            return (
              <g key={label}>
                {/* Card background */}
                <rect
                  x={INPUT_X} y={cardY}
                  width={CARD_W} height={CARD_H}
                  rx="12"
                  fill="rgba(255,255,255,0.06)"
                  stroke="rgba(255,255,255,0.09)"
                  strokeWidth="1"
                />

                {/* Label */}
                <text
                  x={cardCX} y={cardY + 21}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.90)"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="system-ui,sans-serif"
                >
                  {label}
                </text>

                {/* Logos */}
                {logos.map((id, li) => (
                  <Logo
                    key={id + li}
                    id={id}
                    x={logoX0 + li * (LOGO_S + LOGO_GAP)}
                    y={cardY + 34}
                    s={LOGO_S}
                  />
                ))}

                {/* Connection dot */}
                <circle
                  cx={inputRight} cy={cardY + CARD_H / 2}
                  r="3" fill="rgba(255,255,255,0.25)"
                />
              </g>
            )
          })}

          {/* ── le-node hub ────────────────────────────────────────────── */}
          <g>
            {/* Outer glow ring */}
            <rect
              x={HUB_X - 8} y={hubTop - 8}
              width={HUB_W + 16} height={HUB_H + 16}
              rx="20"
              fill="none"
              stroke={`${ACCENT}40`}
              strokeWidth="1.5"
            />

            {/* Solid blue card */}
            <rect
              x={HUB_X} y={hubTop}
              width={HUB_W} height={HUB_H}
              rx="14"
              fill={ACCENT}
            />

            {/* le-node logo (white version on blue bg) */}
            <image
              href="/logos/le-node-alt.png"
              x={HUB_X + (HUB_W - 160) / 2}
              y={hubTop + (HUB_H - 50) / 2}
              width="160"
              height="50"
              preserveAspectRatio="xMidYMid meet"
            />

            {/* Entry / exit dots */}
            <circle cx={hubLeft}  cy={HUB_CY} r="4" fill="rgba(255,255,255,0.5)" />
            <circle cx={hubRight} cy={HUB_CY} r="4" fill="rgba(255,255,255,0.5)" />
          </g>

          {/* ── Output cards ───────────────────────────────────────────── */}
          {OUTPUTS.map(({ label, logos }, i) => {
            const cardY  = outputY(i)
            const cardCX = OUT_X + OUT_W / 2
            const logoX0 = OUT_X + (OUT_W - LOGO_ROW) / 2

            return (
              <g key={label}>
                {/* Card background */}
                <rect
                  x={OUT_X} y={cardY}
                  width={OUT_W} height={OUT_H}
                  rx="12"
                  fill="rgba(255,255,255,0.06)"
                  stroke="rgba(255,255,255,0.09)"
                  strokeWidth="1"
                />

                {/* Label */}
                <text
                  x={cardCX} y={cardY + 21}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.90)"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="system-ui,sans-serif"
                >
                  {label}
                </text>

                {/* Logos */}
                {logos.map((id, li) => (
                  <Logo
                    key={id + li}
                    id={id}
                    x={logoX0 + li * (LOGO_S + LOGO_GAP)}
                    y={cardY + 34}
                    s={LOGO_S}
                  />
                ))}

                {/* Connection dot */}
                <circle
                  cx={OUT_X} cy={cardY + OUT_H / 2}
                  r="3" fill="rgba(255,255,255,0.25)"
                />
              </g>
            )
          })}

        </svg>
      </div>
    </section>
  )
}
