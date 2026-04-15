'use client'

// ─── Tool rings ────────────────────────────────────────────────────────────
const OUTER_RING = [
  { id: 'clay',      logoSize: 28 },
  { id: 'salesforce',logoSize: 38 },
  { id: 'hubspot',   logoSize: 38 },
  { id: 'slack',     logoSize: 38 },
  { id: 'notion',    logoSize: 38 },
  { id: 'pipedrive', logoSize: 38 },
]

const INNER_RING = [
  { id: 'dropcontact', logoSize: 38 },
  { id: 'google',      logoSize: 38 },
  { id: 'linkedin',    logoSize: 38 },
  { id: 'webhook',     logoSize: 38 },
  { id: 'claude',      logoSize: 38 },
  { id: 'apollo',      logoSize: 38 },
]

// ─── Ripple ─────────────────────────────────────────────────────────────────
function Ripple() {
  const numCircles = 6
  const mainCircleSize = 140
  const step = 65

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse at center, white 0%, white 35%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, white 0%, white 35%, transparent 70%)',
      }}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * step
        const baseOpacity = 0.22 - i * 0.028

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) scale(1)',
              borderRadius: '50%',
              border: `1px solid rgba(240, 242, 255, ${Math.max(baseOpacity, 0.03)})`,
              boxShadow: i === 0 ? '0 0 24px rgba(0, 67, 250, 0.15)' : 'none',
              animation: 'ripple-pulse 2.5s ease-in-out infinite',
              animationDelay: `${i * 0.08}s`,
            }}
          />
        )
      })}
    </div>
  )
}

// ─── Orbiting ring ──────────────────────────────────────────────────────────
function OrbitRing({
  tools,
  radius,
  duration,
  reverse,
}: {
  tools: typeof OUTER_RING
  radius: number
  duration: number
  reverse: boolean
}) {
  const total = tools.length
  const orbitAnim = reverse ? 'orbit-ccw' : 'orbit-cw'
  const counterAnim = reverse ? 'counter-ccw' : 'counter-cw'

  return (
    <>
      {tools.map((tool, i) => {
        const delay = -((i / total) * duration)

        return (
          <div
            key={tool.id}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 0,
              height: 0,
              animation: `${orbitAnim} ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: radius,
                top: 0,
                transform: 'translate(-50%, -50%)',
                animation: `${counterAnim} ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
                width: 48,
                height: 48,
                background: 'rgba(240, 242, 255, 0.07)',
                border: '1px solid rgba(240, 242, 255, 0.13)',
                borderRadius: 12,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 12px rgba(0,0,0,0.35)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/logos/${tool.id}.png`}
                alt=""
                width={tool.logoSize}
                height={tool.logoSize}
                draggable={false}
                style={{ display: 'block', borderRadius: 4 }}
              />
            </div>
          </div>
        )
      })}
    </>
  )
}

// ─── Main component ─────────────────────────────────────────────────────────
export default function SandboxHero() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#0F0F11',
      }}
    >
      <style>{`
        /* Orbit keyframes */
        @keyframes orbit-cw  { to { transform: rotate(360deg); } }
        @keyframes orbit-ccw { to { transform: rotate(-360deg); } }
        @keyframes counter-cw  { to { transform: translate(-50%,-50%) rotate(-360deg); } }
        @keyframes counter-ccw { to { transform: translate(-50%,-50%) rotate(360deg); } }

        /* Ripple keyframe */
        @keyframes ripple-pulse {
          0%, 100% { transform: translate(-50%,-50%) scale(1); }
          50%       { transform: translate(-50%,-50%) scale(0.95); }
        }

        /* Tag dot glow */
        @keyframes tag-dot-glow {
          0%, 100% { box-shadow: 0 0 4px 1px rgba(0,67,250,0.5); }
          50%       { box-shadow: 0 0 10px 3px rgba(0,67,250,0.85); }
        }
      `}</style>

      {/* ── L0: Black hole video ─────────────────────────────────────── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        src="/nodesingularity.webm"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.88,
          zIndex: 0,
        }}
      />

      {/* ── L1: Dark overlay ─────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15,15,17,0.50)',
          zIndex: 1,
        }}
      />

      {/* ── L2–5: Animation center (black hole visual center ~58% from top) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '58%',
          transform: 'translate(-50%, -50%)',
          width: 0,
          height: 0,
          zIndex: 2,
        }}
      >
        {/* L2: Outer ring — clockwise */}
        <OrbitRing tools={OUTER_RING} radius={210} duration={25} reverse={false} />

        {/* L2: Inner ring — counter-clockwise */}
        <OrbitRing tools={INNER_RING} radius={130} duration={18} reverse={true} />

        {/* L3: Radial dark gradient (vignette) — reveals center, masks tool overflow */}
        <div
          style={{
            position: 'absolute',
            width: 600,
            height: 600,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse 55% 50% at 50% 50%, transparent 0%, rgba(15,15,17,0.25) 40%, rgba(15,15,17,0.75) 68%, #0F0F11 100%)',
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />

        {/* L4: Ripple animation */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 4 }}>
          <Ripple />
        </div>

        {/* L5: le-node logo badge */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 5,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="le node"
            width={130}
            height={80}
            draggable={false}
            style={{
              display: 'block',
              borderRadius: 18,
              boxShadow: '0 0 40px rgba(0,67,250,0.35), 0 0 80px rgba(0,67,250,0.15)',
            }}
          />
        </div>
      </div>

      {/* ── L8: Section blur — bottom fade into next section ─────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '32vh',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(15,15,17,0.7) 50%, #0F0F11 100%)',
          zIndex: 8,
          pointerEvents: 'none',
        }}
      />

      {/* ── L50: Content — tag → H1 → tagline → CTAs ─────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          paddingTop: '5rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          pointerEvents: 'none',
        }}
      >
        {/* Tag pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1.1rem',
            borderRadius: 999,
            background: 'rgba(34,34,34,0.85)',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '1.5rem',
            pointerEvents: 'auto',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#0043FA',
              flexShrink: 0,
              display: 'inline-block',
              animation: 'tag-dot-glow 2s ease-in-out infinite',
            }}
          />
          <span
            style={{
              color: '#F0F2FF',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-open-sans)',
              letterSpacing: '0.01em',
            }}
          >
            AI-native operating system
          </span>
        </div>

        {/* H1 */}
        <h1
          style={{
            fontFamily: 'var(--font-nanum)',
            fontWeight: 800,
            fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)',
            lineHeight: 1.1,
            color: '#F0F2FF',
            margin: 0,
            marginBottom: '0.5rem',
          }}
        >
          Your entire GTM Motion
          <br />
          <span style={{ color: '#0043FA' }}>On autopilot</span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'var(--font-open-sans)',
            fontSize: '1rem',
            lineHeight: 1.65,
            color: 'rgba(240,242,255,0.55)',
            maxWidth: '36rem',
            margin: '1.25rem 0 0',
          }}
        >
          le node orchestrates the{' '}
          <strong style={{ color: 'rgba(240,242,255,0.9)', fontWeight: 600 }}>
            best-in-class GTM tools
          </strong>
          <br />
          to connects{' '}
          <strong style={{ color: 'rgba(240,242,255,0.9)', fontWeight: 600 }}>you</strong>{' '}
          with{' '}
          <strong style={{ color: 'rgba(240,242,255,0.9)', fontWeight: 600 }}>your market</strong>.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginTop: '2rem',
            pointerEvents: 'auto',
          }}
        >
          <input
            type="email"
            placeholder="your@email.com"
            style={{
              height: 44,
              padding: '0 1rem',
              borderRadius: 10,
              background: 'rgba(240,242,255,0.07)',
              border: '1px solid rgba(240,242,255,0.18)',
              color: '#F0F2FF',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-open-sans)',
              outline: 'none',
              width: 220,
              backdropFilter: 'blur(8px)',
            }}
          />
          <button
            style={{
              height: 44,
              padding: '0 1.5rem',
              borderRadius: 10,
              background: '#0043FA',
              border: 'none',
              color: '#F0F2FF',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-open-sans)',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.01em',
            }}
          >
            Join waitlist
          </button>
        </div>
      </div>

      {/* ── L60: Next section title ───────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.75rem',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 60,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-nanum)',
            fontSize: '1.05rem',
            color: 'rgba(240,242,255,0.22)',
            letterSpacing: '0.05em',
          }}
        >
          Connect &nbsp;&nbsp; your market &nbsp;&nbsp; your company
        </span>
      </div>
    </section>
  )
}
