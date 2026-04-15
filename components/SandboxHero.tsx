'use client'

// ─── Tool rings — 3 orbits, 4 icons each ─────────────────────────────────
const INNER_RING = [
  { id: 'google',      logoSize: 30 },
  { id: 'notion',      logoSize: 30 },
  { id: 'claude',      logoSize: 30 },
  { id: 'webhook',     logoSize: 30 },
]
const MIDDLE_RING = [
  { id: 'linkedin',    logoSize: 30 },
  { id: 'slack',       logoSize: 30 },
  { id: 'apollo',      logoSize: 30 },
  { id: 'dropcontact', logoSize: 30 },
]
const OUTER_RING = [
  { id: 'clay',        logoSize: 24 },
  { id: 'salesforce',  logoSize: 30 },
  { id: 'hubspot',     logoSize: 30 },
  { id: 'pipedrive',   logoSize: 30 },
]

// Animation center — left: 50%, top: 55%
const ANIM_CENTER_TOP = '55%'

// ─── Ripple component ─────────────────────────────────────────────────────
// Circles are direct children of a 0×0 container centered on the animation
// center. The keyframe starts with translate(-50%,-50%) so each circle is
// centered on that origin point. No inset:0 wrapper (would clip in 0×0 ctx).
function Ripple() {
  const NUM   = 7
  const START = 110
  const STEP  = 58

  return (
    <>
      {Array.from({ length: NUM }, (_, i) => {
        const size    = START + i * STEP
        const opacity = Math.max(0.26 - i * 0.030, 0.03)
        return (
          <div
            key={i}
            style={{
              position:    'absolute',
              width:        size,
              height:       size,
              top:          0,
              left:         0,
              borderRadius: '50%',
              border: `1px solid rgba(180, 205, 255, ${opacity})`,
              boxShadow: i <= 1 ? '0 0 20px rgba(0, 67, 250, 0.14)' : 'none',
              pointerEvents: 'none',
              animation:      'ripple-pulse 2.5s ease-in-out infinite',
              animationDelay: `${i * 0.09}s`,
            }}
          />
        )
      })}
    </>
  )
}

// ─── Single orbit ring ────────────────────────────────────────────────────
function OrbitRing({
  tools,
  radius,
  duration,
  reverse,
}: {
  tools: { id: string; logoSize: number }[]
  radius: number
  duration: number
  reverse: boolean
}) {
  const total      = tools.length
  const orbitAnim  = reverse ? 'orbit-ccw' : 'orbit-cw'
  const counterAnim = reverse ? 'counter-ccw' : 'counter-cw'

  return (
    <>
      {tools.map((tool, i) => {
        const delay = -((i / total) * duration)
        return (
          <div
            key={tool.id}
            style={{
              position:       'absolute',
              left:           '50%',
              top:            '50%',
              width:          0,
              height:         0,
              animation:      `${orbitAnim} ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          >
            <div
              style={{
                position:         'absolute',
                left:              radius,
                top:               0,
                transform:        'translate(-50%, -50%)',
                animation:        `${counterAnim} ${duration}s linear infinite`,
                animationDelay:   `${delay}s`,
                width:             42,
                height:            42,
                background:       'rgba(240, 242, 255, 0.06)',
                border:           '1px solid rgba(240, 242, 255, 0.12)',
                borderRadius:      10,
                backdropFilter:   'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                display:          'flex',
                alignItems:       'center',
                justifyContent:   'center',
                boxShadow:        '0 2px 10px rgba(0,0,0,0.4)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/logos/${tool.id}.png`}
                alt=""
                width={tool.logoSize}
                height={tool.logoSize}
                draggable={false}
                style={{ display: 'block', borderRadius: 3 }}
              />
            </div>
          </div>
        )
      })}
    </>
  )
}

// ─── Main component ───────────────────────────────────────────────────────
export default function SandboxHero() {
  return (
    <section
      className="no-top-line"
      style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#0F0F11', padding: 0 }}
    >
      <style>{`
        /* Orbit keyframes */
        @keyframes orbit-cw   { to { transform: rotate(360deg);   } }
        @keyframes orbit-ccw  { to { transform: rotate(-360deg);  } }
        @keyframes counter-cw  { to { transform: translate(-50%,-50%) rotate(-360deg); } }
        @keyframes counter-ccw { to { transform: translate(-50%,-50%) rotate(360deg);  } }

        /* Ripple keyframe */
        @keyframes ripple-pulse {
          0%, 100% { transform: translate(-50%,-50%) scale(1);    }
          50%       { transform: translate(-50%,-50%) scale(0.94); }
        }

        /* Input placeholder */
        .sb-email::placeholder { color: #9C9C9C; }
        .sb-email:focus { outline: none; border-color: rgba(0,67,250,0.5); }
      `}</style>

      {/* ── L0: Black hole video ──────────────────────────────────────── */}
      <video
        autoPlay muted loop playsInline
        src="/nodesingularity.webm"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0,
        }}
      />

      {/* ── L1: Layer dark — darkens the whole scene ──────────────────── */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'rgba(15,15,17,0.60)',
          pointerEvents: 'none',
        }}
      />

      {/* ── L2: Orbiting tool icons — three rings ─────────────────────── */}
      <div
        style={{
          position: 'absolute', left: '50%', top: ANIM_CENTER_TOP,
          width: 0, height: 0, zIndex: 2,
        }}
      >
        <OrbitRing tools={INNER_RING}  radius={92}  duration={54}  reverse={false} />
        <OrbitRing tools={MIDDLE_RING} radius={168} duration={75}  reverse={true}  />
        <OrbitRing tools={OUTER_RING}  radius={248} duration={102} reverse={false} />
      </div>

      {/* ── L3: Dark gradient tools — vignette over orbital area ─────── */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 3,
          background: `radial-gradient(ellipse 60% 52% at 50% ${ANIM_CENTER_TOP}, transparent 0%, rgba(15,15,17,0.18) 42%, rgba(15,15,17,0.72) 66%, #0F0F11 88%)`,
          pointerEvents: 'none',
        }}
      />

      {/* ── L4: Ripple animation — centered on animation center ────────── */}
      <div
        style={{
          position: 'absolute', left: '50%', top: ANIM_CENTER_TOP,
          width: 0, height: 0, zIndex: 4,
        }}
      >
        <Ripple />
      </div>

      {/* ── L5: Section blur — dark panel from event horizon downward ─── */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0,
          top: '50%', bottom: 0, zIndex: 5,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(15,15,17,0.55) 18%, rgba(15,15,17,0.90) 42%, #0F0F11 68%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          pointerEvents: 'none',
        }}
      />

      {/* ── L6: le-node logo — above section blur ─────────────────────── */}
      <div
        style={{
          position: 'absolute', left: '50%', top: '65%',
          transform: 'translate(-50%, -50%)', zIndex: 6,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="le node"
          width={120}
          height={74}
          draggable={false}
          style={{
            display: 'block', borderRadius: 16,
            boxShadow: '0 0 36px rgba(0,67,250,0.40), 0 0 80px rgba(0,67,250,0.18)',
          }}
        />
      </div>

      {/* ── L50: Content — tag → H1 → tagline → CTAs ─────────────────── */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 50,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center', paddingTop: '4.5rem',
          paddingLeft: '1.5rem', paddingRight: '1.5rem',
          pointerEvents: 'none',
        }}
      >
        {/* Tag pill */}
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.35rem 1rem', borderRadius: 999,
            background: 'rgba(34,34,34,0.88)',
            border: '1px solid rgba(255,255,255,0.10)',
            marginBottom: '1.25rem', pointerEvents: 'auto',
          }}
        >
          <span
            className="animate-dot-glow"
            style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#0043FA', display: 'inline-block', flexShrink: 0,
              ['--glow-color' as string]: 'rgba(0, 67, 250, 0.65)',
            }}
          />
          <span
            style={{
              color: '#F0F2FF', fontSize: '0.8125rem',
              fontFamily: 'var(--font-open-sans)', letterSpacing: '0.01em',
            }}
          >
            AI-native operating system
          </span>
        </div>

        {/* H1 */}
        <h1
          style={{
            fontFamily: 'var(--font-nanum)', fontWeight: 800,
            fontSize: '30px', lineHeight: 1.2,
            color: '#F0F2FF', margin: 0, marginBottom: '0.4rem',
          }}
        >
          Your entire GTM Motion
          <br />
          <span style={{ color: '#0043FA' }}>On autopilot</span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'var(--font-open-sans)', fontSize: '0.875rem',
            lineHeight: 1.7, color: 'rgba(240,242,255,0.52)',
            maxWidth: '32rem', margin: '1rem 0 0',
          }}
        >
          le node orchestrates the{' '}
          <strong style={{ color: 'rgba(240,242,255,0.88)', fontWeight: 600 }}>
            best-in-class GTM tools
          </strong>
          <br />
          to connects{' '}
          <strong style={{ color: 'rgba(240,242,255,0.88)', fontWeight: 600 }}>you</strong>{' '}
          with{' '}
          <strong style={{ color: 'rgba(240,242,255,0.88)', fontWeight: 600 }}>
            your market
          </strong>.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            marginTop: '1.75rem', pointerEvents: 'auto',
          }}
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="sb-email"
            style={{
              height: 42, padding: '0 1rem', borderRadius: 9,
              background: '#FFFFFF',
              border: '1px solid rgba(0,0,0,0.10)',
              color: '#222222', fontSize: '0.875rem',
              fontFamily: 'var(--font-open-sans)',
              width: 210,
            }}
          />
          <button
            style={{
              height: 42, padding: '0 1.4rem', borderRadius: 9,
              background: '#0043FA', border: 'none',
              color: '#F0F2FF', fontSize: '0.875rem',
              fontFamily: 'var(--font-open-sans)', fontWeight: 600,
              cursor: 'pointer', letterSpacing: '0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            Join waitlist
          </button>
        </div>
      </div>

      {/* ── L60: Next section title ───────────────────────────────────── */}
      <div
        style={{
          position: 'absolute', bottom: '1.5rem', left: 0, right: 0,
          textAlign: 'center', zIndex: 60, pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-nanum)', fontSize: '1rem',
            color: 'rgba(240,242,255,0.20)', letterSpacing: '0.06em',
          }}
        >
          Connect &nbsp;&nbsp; your market &nbsp;&nbsp; your company
        </span>
      </div>
    </section>
  )
}
