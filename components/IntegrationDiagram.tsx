// ─── Integration flow diagram ────────────────────────────────────────────────
// Pure SVG, no client JS. CSS-animated connector paths only.
// Mirrors the "One system. Every lead." schema from tc9.ai.

const FLOW_STYLE = {
  stroke: '#0E34F4',
  strokeWidth: 1.5,
  fill: 'none',
  strokeDasharray: '7 11',
  animation: 'flow-anim 1.8s linear infinite',
} as const

export default function IntegrationDiagram() {
  return (
    <section className="py-20 md:py-28 bg-[#212226]">
      <div className="container-content">

        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#0E34F4] mb-4 block">
            Infrastructure
          </span>
          <h2 className="text-display-sm font-bold text-white mb-4 max-w-xl">
            One system. Every lead.
          </h2>
          <p className="text-white/50 text-lg max-w-xl">
            le-node connects every signal source, processes leads with AI, and routes
            them to your CRM and outreach tools — automatically.
          </p>
        </div>

        {/* SVG diagram */}
        <svg
          viewBox="0 0 900 660"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', maxWidth: 900, margin: '0 auto' }}
          aria-label="le-node integration flow diagram"
        >
          <defs>
            <marker
              id="arrowBlue" viewBox="0 0 10 10"
              refX="8" refY="5" markerWidth="5" markerHeight="5"
              orient="auto"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#0E34F4" opacity="0.75" />
            </marker>
            <style>{`
              @keyframes flow-anim { to { stroke-dashoffset: -18; } }
            `}</style>
          </defs>

          {/* ── Background ─────────────────────────────────────────────────── */}
          <rect width="900" height="660" fill="#1A1D22" rx="16" />

          {/* Subtle dot grid */}
          {Array.from({ length: 21 }).map((_, c) =>
            Array.from({ length: 16 }).map((_, r) => (
              <circle
                key={`d-${c}-${r}`}
                cx={c * 44 + 10} cy={r * 44 + 10}
                r="1" fill="rgba(255,255,255,0.06)"
              />
            ))
          )}

          {/* HUD corners */}
          <path d="M 26 14 L 14 14 L 14 26" fill="none" stroke="rgba(14,52,244,0.3)" strokeWidth="1.5" />
          <path d="M 874 14 L 886 14 L 886 26" fill="none" stroke="rgba(14,52,244,0.3)" strokeWidth="1.5" />
          <path d="M 26 646 L 14 646 L 14 634" fill="none" stroke="rgba(14,52,244,0.3)" strokeWidth="1.5" />
          <path d="M 874 646 L 886 646 L 886 634" fill="none" stroke="rgba(14,52,244,0.3)" strokeWidth="1.5" />

          {/* ── CARD 1: Inbound Signals (top-left) ─────────────────────────── */}
          {/* x=18 y=18 w=340 h=265 → right=358 bottom=283 centerX=188 */}
          <rect x="18" y="18" width="340" height="265"
            fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.09)"
            strokeWidth="1" rx="10"
          />
          <text x="36" y="46" fill="white" fontSize="11" fontWeight="700"
            fontFamily="system-ui,sans-serif">
            Inbound Signals
          </text>
          <line x1="36" y1="57" x2="340" y2="57"
            stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

          {/* Row 1 — 1st party */}
          <circle cx="44" cy="93" r="5" fill="#0E34F4" />
          {/* owned data icon: 2×2 grid */}
          <rect x="58" y="78" width="8" height="8" fill="rgba(255,255,255,0.35)" rx="1" />
          <rect x="69" y="78" width="8" height="8" fill="rgba(255,255,255,0.35)" rx="1" />
          <rect x="58" y="89" width="8" height="8" fill="rgba(255,255,255,0.35)" rx="1" />
          <rect x="69" y="89" width="8" height="8" fill="rgba(255,255,255,0.35)" rx="1" />
          <text x="86" y="88" fill="rgba(255,255,255,0.85)" fontSize="11"
            fontFamily="system-ui,sans-serif">
            1st-party signals
          </text>
          <text x="86" y="102" fill="rgba(255,255,255,0.38)" fontSize="9"
            fontFamily="system-ui,sans-serif">
            (owned) — CRM events, website visits
          </text>
          <line x1="36" y1="118" x2="340" y2="118"
            stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

          {/* Row 2 — 2nd party */}
          <circle cx="44" cy="158" r="5" fill="#0A66C2" />
          {/* LinkedIn simplified */}
          <rect x="58" y="145" width="14" height="14" fill="#0A66C2" rx="2" />
          <text x="80" y="153" fill="white" fontSize="8" fontWeight="700"
            fontFamily="system-ui,sans-serif">
            in
          </text>
          <text x="86" y="153" fill="rgba(255,255,255,0.85)" fontSize="11"
            fontFamily="system-ui,sans-serif">
            2nd-party signals
          </text>
          <text x="86" y="167" fill="rgba(255,255,255,0.38)" fontSize="9"
            fontFamily="system-ui,sans-serif">
            (partner) — LinkedIn, review sites
          </text>
          <line x1="36" y1="183" x2="340" y2="183"
            stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

          {/* Row 3 — 3rd party */}
          <circle cx="44" cy="228" r="5" fill="#7C3AED" />
          {/* intent / job change icon */}
          <rect x="58" y="218" width="14" height="14" fill="rgba(124,58,237,0.4)"
            stroke="rgba(124,58,237,0.7)" strokeWidth="1" rx="2" />
          <line x1="61" y1="222" x2="69" y2="222" stroke="rgba(124,58,237,0.9)" strokeWidth="1.2" />
          <line x1="61" y1="226" x2="66" y2="226" stroke="rgba(124,58,237,0.9)" strokeWidth="1.2" />
          <text x="86" y="223" fill="rgba(255,255,255,0.85)" fontSize="11"
            fontFamily="system-ui,sans-serif">
            3rd-party signals
          </text>
          <text x="86" y="237" fill="rgba(255,255,255,0.38)" fontSize="9"
            fontFamily="system-ui,sans-serif">
            (inferred) — job changes, funding rounds
          </text>

          {/* ── CARD 2: Prospect Lists (top-right) ─────────────────────────── */}
          {/* x=560 y=18 w=200 h=162 → right=760 bottom=180 centerX=660 */}
          <rect x="560" y="18" width="200" height="162"
            fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.09)"
            strokeWidth="1" rx="10"
          />
          <text x="578" y="46" fill="white" fontSize="11" fontWeight="700"
            fontFamily="system-ui,sans-serif">
            Prospect Lists
          </text>
          <line x1="578" y1="57" x2="742" y2="57"
            stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

          {/* database cylinder icon */}
          <ellipse cx="596" cy="88" rx="14" ry="6"
            fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <line x1="582" y1="88" x2="582" y2="106"
            stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <line x1="610" y1="88" x2="610" y2="106"
            stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <ellipse cx="596" cy="106" rx="14" ry="6"
            fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

          <text x="626" y="92" fill="rgba(255,255,255,0.75)" fontSize="11"
            fontFamily="system-ui,sans-serif">
            Cold leads
          </text>

          <text x="578" y="134" fill="rgba(255,255,255,0.38)" fontSize="9"
            fontFamily="system-ui,sans-serif">
            TAM lists, outbound targets,
          </text>
          <text x="578" y="148" fill="rgba(255,255,255,0.38)" fontSize="9"
            fontFamily="system-ui,sans-serif">
            Clay-sourced accounts
          </text>

          {/* Clay badge */}
          <rect x="578" y="158" width="36" height="16" rx="3"
            fill="rgba(244,123,32,0.2)" stroke="rgba(244,123,32,0.4)" strokeWidth="1" />
          <text x="596" y="169" fill="#F47B20" fontSize="8.5" fontWeight="600"
            fontFamily="system-ui,sans-serif" textAnchor="middle">
            Clay
          </text>

          {/* ── CARD 3: le-node Hub (center) ───────────────────────────────── */}
          {/* x=18 y=348 w=542 h=145 → right=560 bottom=493 centerX=289 centerY=420 */}
          <rect x="18" y="348" width="542" height="148"
            fill="rgba(14,52,244,0.08)" stroke="rgba(14,52,244,0.45)"
            strokeWidth="1.5" rx="10"
          />
          {/* Left accent bar */}
          <rect x="18" y="348" width="4" height="148" fill="#0E34F4" rx="2" />

          {/* le-node label */}
          <text x="42" y="382" fill="white" fontSize="15" fontWeight="700"
            fontFamily="system-ui,sans-serif">
            le-node
          </text>
          {/* + Clay badge */}
          <text x="116" y="381" fill="rgba(255,255,255,0.3)" fontSize="13"
            fontFamily="system-ui,sans-serif">
            +
          </text>
          <rect x="130" y="366" width="40" height="20" rx="4"
            fill="rgba(244,123,32,0.18)" stroke="rgba(244,123,32,0.4)" strokeWidth="1" />
          <text x="150" y="380" fill="#F47B20" fontSize="10" fontWeight="600"
            fontFamily="system-ui,sans-serif" textAnchor="middle">
            Clay
          </text>

          {/* Description */}
          <text x="42" y="402" fill="rgba(255,255,255,0.45)" fontSize="9.5"
            fontFamily="system-ui,sans-serif">
            Qualification, scoring &amp; tiering, enrichment, routing
          </text>

          {/* Process step pills */}
          {['Identify', 'Enrich', 'Score', 'Route'].map((step, i) => (
            <g key={step}>
              <rect
                x={42 + i * 120} y="416" width="108" height="28"
                fill="rgba(14,52,244,0.2)" stroke="rgba(14,52,244,0.4)"
                strokeWidth="1" rx="6"
              />
              <text
                x={42 + i * 120 + 54} y="434"
                fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="600"
                fontFamily="system-ui,sans-serif" textAnchor="middle"
              >
                {step}
              </text>
            </g>
          ))}

          {/* ── CARD 4: CRM (right) ─────────────────────────────────────────── */}
          {/* x=660 y=230 w=222 h=148 → right=882 bottom=378 centerX=771 centerY=304 */}
          <rect x="660" y="230" width="222" height="148"
            fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.09)"
            strokeWidth="1" rx="10"
          />
          <text x="678" y="258" fill="white" fontSize="11" fontWeight="700"
            fontFamily="system-ui,sans-serif">
            CRM
          </text>
          <line x1="678" y1="268" x2="864" y2="268"
            stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

          {/* HubSpot */}
          <circle cx="692" cy="297" r="9"
            fill="rgba(255,122,89,0.2)" stroke="#FF7A59" strokeWidth="1.2" />
          <text x="706" y="301" fill="rgba(255,255,255,0.75)" fontSize="11"
            fontFamily="system-ui,sans-serif">
            HubSpot
          </text>

          <line x1="678" y1="318" x2="864" y2="318"
            stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

          {/* Salesforce */}
          <circle cx="692" cy="344" r="9"
            fill="rgba(0,161,224,0.2)" stroke="#00A1E0" strokeWidth="1.2" />
          <text x="706" y="348" fill="rgba(255,255,255,0.75)" fontSize="11"
            fontFamily="system-ui,sans-serif">
            Salesforce
          </text>

          {/* ── CARD 5: Sales Outreach (bottom-left) ───────────────────────── */}
          {/* x=18 y=513 w=400 h=130 → right=418 bottom=643 centerX=218 centerY=578 */}
          <rect x="18" y="513" width="400" height="130"
            fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.09)"
            strokeWidth="1" rx="10"
          />
          <text x="36" y="540" fill="white" fontSize="11" fontWeight="700"
            fontFamily="system-ui,sans-serif">
            Sales Outreach
          </text>
          <line x1="36" y1="550" x2="400" y2="550"
            stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

          {/* Email channel */}
          <rect x="36" y="564" width="88" height="62" rx="6"
            fill="rgba(14,52,244,0.1)" stroke="rgba(14,52,244,0.25)" strokeWidth="1" />
          {/* envelope */}
          <rect x="50" y="576" width="26" height="18" rx="2"
            fill="none" stroke="rgba(14,52,244,0.7)" strokeWidth="1.2" />
          <path d="M 50 576 L 63 586 L 76 576"
            fill="none" stroke="rgba(14,52,244,0.7)" strokeWidth="1.2" />
          <text x="80" y="588" fill="rgba(255,255,255,0.7)" fontSize="10"
            fontFamily="system-ui,sans-serif" textAnchor="middle">
            Email
          </text>
          <text x="80" y="616" fill="rgba(255,255,255,0.35)" fontSize="8.5"
            fontFamily="system-ui,sans-serif" textAnchor="middle">
            sequences
          </text>

          {/* LinkedIn channel */}
          <rect x="140" y="564" width="88" height="62" rx="6"
            fill="rgba(10,102,194,0.1)" stroke="rgba(10,102,194,0.3)" strokeWidth="1" />
          <rect x="154" y="576" width="18" height="18" fill="#0A66C2" rx="2" />
          <rect x="156" y="578" width="4" height="4" fill="white" rx="0.5" />
          <rect x="156" y="584" width="4" height="8" fill="white" />
          <rect x="162" y="578" width="4" height="12" fill="white" />
          <rect x="162" y="581" width="4" height="3" fill="rgba(10,102,194,0.5)" rx="1.5" />
          <text x="184" y="588" fill="rgba(255,255,255,0.7)" fontSize="10"
            fontFamily="system-ui,sans-serif" textAnchor="middle">
            LinkedIn
          </text>
          <text x="184" y="616" fill="rgba(255,255,255,0.35)" fontSize="8.5"
            fontFamily="system-ui,sans-serif" textAnchor="middle">
            DMs &amp; connects
          </text>

          {/* Phone channel */}
          <rect x="244" y="564" width="88" height="62" rx="6"
            fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <text x="288" y="590" fill="rgba(255,255,255,0.5)" fontSize="18"
            fontFamily="system-ui,sans-serif" textAnchor="middle">
            ☎
          </text>
          <text x="288" y="608" fill="rgba(255,255,255,0.7)" fontSize="10"
            fontFamily="system-ui,sans-serif" textAnchor="middle">
            Phone
          </text>
          <text x="288" y="616" fill="rgba(255,255,255,0.35)" fontSize="8.5"
            fontFamily="system-ui,sans-serif" textAnchor="middle" dy="8">
            calls
          </text>

          {/* ── ANIMATED CONNECTOR PATHS ────────────────────────────────────── */}

          {/* Path 1 — Signals → Hub (straight down) */}
          <path
            d="M 188 283 L 188 348"
            style={{ ...FLOW_STYLE, animationDelay: '0s' }}
            markerEnd="url(#arrowBlue)"
          />

          {/* Path 2 — Lists → Hub (down → left → down) */}
          <path
            d="M 660 180 L 660 308 L 430 308 L 430 348"
            style={{ ...FLOW_STYLE, animationDelay: '-0.6s' }}
            markerEnd="url(#arrowBlue)"
          />

          {/* Path 3 — Hub → CRM (right → up) */}
          <path
            d="M 560 420 L 620 420 L 620 304 L 660 304"
            style={{ ...FLOW_STYLE, animationDelay: '-1.2s' }}
            markerEnd="url(#arrowBlue)"
          />

          {/* Path 4 — Hub → Outreach (straight down) */}
          <path
            d="M 240 496 L 240 513"
            style={{ ...FLOW_STYLE, animationDelay: '-0.4s' }}
            markerEnd="url(#arrowBlue)"
          />

          {/* Path 5 — Outreach → CRM (right → up) */}
          <path
            d="M 418 578 L 771 578 L 771 378"
            style={{ ...FLOW_STYLE, animationDelay: '-1.0s' }}
            markerEnd="url(#arrowBlue)"
          />

          {/* Connection dots at path endpoints for polish */}
          {[
            { cx: 188, cy: 283 }, { cx: 188, cy: 348 },
            { cx: 660, cy: 180 }, { cx: 430, cy: 348 },
            { cx: 560, cy: 420 }, { cx: 660, cy: 304 },
            { cx: 240, cy: 496 }, { cx: 240, cy: 513 },
            { cx: 418, cy: 578 }, { cx: 771, cy: 378 },
          ].map(({ cx, cy }, i) => (
            <circle key={i} cx={cx} cy={cy} r="3"
              fill="#0E34F4" opacity="0.55" />
          ))}

        </svg>
      </div>
    </section>
  )
}
