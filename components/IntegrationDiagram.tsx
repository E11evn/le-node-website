// ─── Integration flow diagram — horizontal layout ─────────────────────────────
// Left: 7 source categories with tool badges
// Center: le-node hub
// Right: 4 output channels
// Pure SVG, CSS-animated connector paths only.

const FLOW = {
  stroke: '#0000FA',
  strokeWidth: 1.2,
  fill: 'none',
  strokeDasharray: '5 9',
  animation: 'flow-anim 1.8s linear infinite',
} as const

const inputs = [
  {
    label: 'Signals',
    tools: [
      { name: 'Clay',     bg: '#F47B20' },
      { name: 'LinkedIn', bg: '#0A66C2' },
      { name: 'Claude',   bg: '#7C3AED' },
    ],
  },
  {
    label: 'Inbound',
    tools: [
      { name: 'Typeform', bg: '#E24329' },
      { name: 'Webflow',  bg: '#4353FF' },
      { name: 'HubSpot',  bg: '#FF7A59' },
    ],
  },
  {
    label: 'Ads',
    tools: [
      { name: 'G Ads',  bg: '#4285F4' },
      { name: 'LI Ads', bg: '#0A66C2' },
      { name: 'FB Ads', bg: '#1877F2' },
    ],
  },
  {
    label: 'Events',
    tools: [
      { name: 'Webhook', bg: '#6B7280' },
      { name: 'n8n',     bg: '#EA4B71' },
      { name: 'Clay',    bg: '#F47B20' },
    ],
  },
  {
    label: 'Website',
    tools: [
      { name: 'GA4',     bg: '#E37400' },
      { name: 'Segment', bg: '#52BD94' },
      { name: 'Hotjar',  bg: '#FF3C00' },
    ],
  },
  {
    label: 'Database',
    tools: [
      { name: 'Supabase', bg: '#3ECF8E' },
      { name: 'BigQuery', bg: '#4285F4' },
      { name: 'DB',       bg: '#64748B' },
    ],
  },
  {
    label: 'Providers',
    tools: [
      { name: 'Apollo',    bg: '#7C3AED' },
      { name: 'Fullenrc.', bg: '#F59E0B' },
      { name: 'Dropc.',    bg: '#10B981' },
    ],
  },
]

// Row vertical centres (7 rows, 56px apart, starting at y=54)
const ROW_YS = [54, 110, 166, 222, 278, 334, 390]
const HUB_Y  = 222   // vertical centre of le-node card

const outputs = [
  { label: 'CRM',                  dot: '#FF7A59', y: 120 },
  { label: 'Qualified Leads',      dot: '#0000FA', y: 196 },
  { label: 'Sales Enablement',     dot: '#52BD94', y: 272 },
  { label: 'Sales Ready Opp.',     dot: '#F59E0B', y: 348 },
]

export default function IntegrationDiagram() {
  return (
    <section className="py-20 md:py-28 bg-[#212226]">
      <div className="container-content">

        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#0000FA] mb-4 block">
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

        {/* SVG diagram */}
        <svg
          viewBox="0 0 900 468"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', maxWidth: 900, margin: '0 auto' }}
          aria-label="le-node integration flow diagram"
        >
          <defs>
            <marker id="arrowBlue" viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="5" markerHeight="5" orient="auto">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#0000FA" opacity="0.7" />
            </marker>
            <style>{`@keyframes flow-anim { to { stroke-dashoffset: -14; } }`}</style>
          </defs>

          {/* ── Background ──────────────────────────────────────────────────── */}
          <rect width="900" height="468" fill="#1A1D22" rx="16" />

          {/* Dot grid */}
          {Array.from({ length: 21 }).map((_, c) =>
            Array.from({ length: 11 }).map((_, r) => (
              <circle key={`d-${c}-${r}`}
                cx={c * 44 + 10} cy={r * 44 + 10}
                r="1" fill="rgba(255,255,255,0.05)"
              />
            ))
          )}

          {/* HUD corners */}
          <path d="M 26 14 L 14 14 L 14 26" fill="none" stroke="rgba(0,0,250,0.25)" strokeWidth="1.5" />
          <path d="M 874 14 L 886 14 L 886 26" fill="none" stroke="rgba(0,0,250,0.25)" strokeWidth="1.5" />
          <path d="M 26 454 L 14 454 L 14 442" fill="none" stroke="rgba(0,0,250,0.25)" strokeWidth="1.5" />
          <path d="M 874 454 L 886 454 L 886 442" fill="none" stroke="rgba(0,0,250,0.25)" strokeWidth="1.5" />

          {/* ── Left panel — data sources ────────────────────────────────── */}
          <rect x="10" y="10" width="258" height="448" fill="rgba(255,255,255,0.015)" rx="8" />

          <text x="14" y="28" fill="rgba(255,255,255,0.22)" fontSize="7.5"
            fontFamily="system-ui,sans-serif" fontWeight="700" letterSpacing="1.8">
            DATA SOURCES
          </text>

          {inputs.map(({ label, tools }, idx) => {
            const y = ROW_YS[idx]
            return (
              <g key={label}>
                {/* Row separator */}
                {idx > 0 && (
                  <line x1="14" y1={y - 28} x2="258" y2={y - 28}
                    stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                )}

                {/* Category label */}
                <text x="16" y={y + 4} fill="rgba(255,255,255,0.35)"
                  fontSize="8.5" fontFamily="system-ui,sans-serif" fontWeight="500">
                  {label}
                </text>

                {/* 3 tool badges */}
                {tools.map((tool, ti) => {
                  const bx = 74 + ti * 58
                  return (
                    <g key={`${label}-${tool.name}`}>
                      <rect x={bx} y={y - 9} width="54" height="18" rx="3"
                        fill={tool.bg} opacity="0.85" />
                      <text x={bx + 27} y={y + 4} textAnchor="middle"
                        fill="white" fontSize="7.5" fontWeight="600"
                        fontFamily="system-ui,sans-serif">
                        {tool.name}
                      </text>
                    </g>
                  )
                })}

                {/* End dot before connector */}
                <circle cx="252" cy={y} r="2.5" fill="#0000FA" opacity="0.45" />

                {/* Animated convergence path to hub */}
                <path
                  d={`M 252 ${y} C 280 ${y} 280 ${HUB_Y} 312 ${HUB_Y}`}
                  style={{ ...FLOW, animationDelay: `${-idx * 0.22}s` }}
                />
              </g>
            )
          })}

          {/* ── le-node hub card ────────────────────────────────────────────── */}
          <rect x="315" y="142" width="272" height="160"
            fill="rgba(0,0,250,0.08)" stroke="rgba(0,0,250,0.45)"
            strokeWidth="1.5" rx="10" />
          {/* Left accent bar */}
          <rect x="315" y="142" width="4" height="160" fill="#0000FA" rx="2" />

          {/* Hub label */}
          <text x="336" y="172" fill="white" fontSize="15" fontWeight="700"
            fontFamily="system-ui,sans-serif">
            le-node
          </text>

          {/* Subtitle */}
          <text x="336" y="190" fill="rgba(255,255,255,0.38)" fontSize="9"
            fontFamily="system-ui,sans-serif">
            AI-native qualification engine
          </text>

          {/* Process pills — Identify Enrich Score Route */}
          {['Identify', 'Enrich', 'Score', 'Route'].map((step, i) => (
            <g key={step}>
              <rect x={334 + i * 62} y="204" width="58" height="26"
                fill="rgba(0,0,250,0.2)" stroke="rgba(0,0,250,0.4)"
                strokeWidth="1" rx="5" />
              <text
                x={334 + i * 62 + 29} y="221"
                textAnchor="middle" fill="rgba(255,255,255,0.85)"
                fontSize="9" fontWeight="600"
                fontFamily="system-ui,sans-serif">
                {step}
              </text>
            </g>
          ))}

          {/* Hub entry / exit dots */}
          <circle cx="313" cy={HUB_Y} r="3.5" fill="#0000FA" opacity="0.55" />
          <circle cx="587" cy={HUB_Y} r="3.5" fill="#0000FA" opacity="0.55" />

          {/* ── Right panel — outputs ────────────────────────────────────── */}
          <rect x="636" y="88" width="252" height="292"
            fill="rgba(255,255,255,0.015)" rx="8" />

          <text x="640" y="78" fill="rgba(255,255,255,0.22)" fontSize="7.5"
            fontFamily="system-ui,sans-serif" fontWeight="700" letterSpacing="1.8">
            OUTPUT
          </text>

          {outputs.map(({ label, dot, y }, idx) => (
            <g key={label}>
              {/* Animated divergence path from hub */}
              <path
                d={`M 587 ${HUB_Y} C 614 ${HUB_Y} 614 ${y} 638 ${y}`}
                style={{ ...FLOW, animationDelay: `${-idx * 0.3}s` }}
                markerEnd="url(#arrowBlue)"
              />

              {/* Row separator */}
              {idx > 0 && (
                <line x1="640" y1={y - 38} x2="880" y2={y - 38}
                  stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              )}

              {/* Output card */}
              <rect x="640" y={y - 20} width="246" height="40"
                fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"
                strokeWidth="1" rx="7" />

              {/* Color dot indicator */}
              <circle cx="659" cy={y} r="6" fill={dot} opacity="0.85" />

              {/* Label */}
              <text x="674" y={y + 4} fill="rgba(255,255,255,0.82)"
                fontSize="11.5" fontFamily="system-ui,sans-serif">
                {label}
              </text>
            </g>
          ))}

        </svg>
      </div>
    </section>
  )
}
