'use client'

import { useEffect, useRef, useState } from 'react'

// ─── Tool rings — 3 orbits, 4 icons each ─────────────────────────────────
const INNER_RING = [
  { id: 'google',      logoSize: 21 },
  { id: 'notion',      logoSize: 21 },
  { id: 'claude',      logoSize: 21 },
  { id: 'webhook',     logoSize: 21 },
]
const MIDDLE_RING = [
  { id: 'linkedin',    logoSize: 21 },
  { id: 'slack',       logoSize: 21 },
  { id: 'apollo',      logoSize: 21 },
  { id: 'dropcontact', logoSize: 21 },
]
const OUTER_RING = [
  { id: 'clay',        logoSize: 17 },
  { id: 'salesforce',  logoSize: 21 },
  { id: 'hubspot',     logoSize: 21 },
  { id: 'pipedrive',   logoSize: 21 },
]

// ─── Lerp helper ─────────────────────────────────────────────────────────
function lerp(p: number, a: number, b: number) {
  return Math.max(0, Math.min(1, (p - a) / (b - a)))
}

// ─── Ripple ───────────────────────────────────────────────────────────────
function Ripple({ opacity }: { opacity: number }) {
  const NUM   = 7
  const START = 83
  const STEP  = 44

  return (
    <>
      {Array.from({ length: NUM }, (_, i) => {
        const size    = START + i * STEP
        const baseOp  = Math.max(0.28 - i * 0.032, 0.03)
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
              border: `1px solid rgba(180, 205, 255, ${baseOp * opacity})`,
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
  const total       = tools.length
  const orbitAnim   = reverse ? 'orbit-ccw' : 'orbit-cw'
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
                position:             'absolute',
                left:                  radius,
                top:                   0,
                transform:            'translate(-50%, -50%)',
                animation:            `${counterAnim} ${duration}s linear infinite`,
                animationDelay:       `${delay}s`,
                width:                 30,
                height:                30,
                opacity:               0.8,
                background:           'rgba(240, 242, 255, 0.06)',
                border:               '1px solid rgba(240, 242, 255, 0.12)',
                borderRadius:          7,
                backdropFilter:       'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                display:              'flex',
                alignItems:           'center',
                justifyContent:       'center',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/logos/${tool.id}.png`}
                alt=""
                width={tool.logoSize}
                height={tool.logoSize}
                draggable={false}
                style={{ display: 'block', borderRadius: 2 }}
              />
            </div>
          </div>
        )
      })}
    </>
  )
}

// ─── Particle canvas ─────────────────────────────────────────────────────
interface Particle {
  angle:       number
  radius:      number
  maxRadius:   number
  speed:       number   // px/frame inward
  rotSpeed:    number   // rad/frame angular
  size:        number
  opacity:     number
  blue:        boolean
}

function ParticleCanvas({ centerTopPctRef }: { centerTopPctRef: React.RefObject<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Spawn a fresh particle at a random outer radius (screen-edge distances)
    const spawn = (): Particle => {
      const r = 450 + Math.random() * 250
      return {
        angle:     Math.random() * Math.PI * 2,
        radius:    r,
        maxRadius: r,
        speed:     0.04 + Math.random() * 0.10,
        rotSpeed:  (Math.random() > 0.5 ? 1 : -1) * (0.0005 + Math.random() * 0.001),
        size:      0.4 + Math.random() * 0.9,
        opacity:   0,
        blue:      Math.random() > 0.65,
      }
    }

    const N = 90
    const particles: Particle[] = Array.from({ length: N }, () => {
      const p = spawn()
      // Stagger initial radii within the valid range (400 → maxRadius)
      p.radius    = 400 + Math.random() * (p.maxRadius - 400)
      p.opacity   = 0
      return p
    })

    let rafId: number
    let last = 0

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 16, 3)
      last = now

      const w  = canvas.width
      const h  = canvas.height
      const cx = w * 0.5
      const cy = h * (centerTopPctRef.current ?? 77) / 100

      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.radius -= p.speed * dt
        p.angle  += p.rotSpeed * dt

        if (p.radius < 400) {
          const fresh  = spawn()
          Object.assign(p, fresh)
          continue
        }

        const x = cx + Math.cos(p.angle) * p.radius
        const y = cy + Math.sin(p.angle) * p.radius

        // Opacity: fade in from outer edge, fade out as radius approaches 400
        const ratio = p.radius / p.maxRadius
        const target = ratio > 0.90
          ? (1 - ratio) / 0.10 * 0.65
          : p.radius < 500
          ? ((p.radius - 400) / 100) * 0.65
          : 0.65
        p.opacity += (target - p.opacity) * 0.08 * dt
        if (p.opacity < 0.01) continue

        ctx.save()
        ctx.shadowBlur  = 3
        ctx.shadowColor = p.blue
          ? 'rgba(100,160,255,0.55)'
          : 'rgba(255,255,255,0.35)'
        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.blue
          ? `rgba(170,200,255,${p.opacity})`
          : `rgba(255,255,255,${p.opacity})`
        ctx.fill()
        ctx.restore()
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [centerTopPctRef])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        zIndex: 3, pointerEvents: 'none',
      }}
    />
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────
export default function SandboxHero() {
  const containerRef      = useRef<HTMLDivElement>(null)
  const centerTopPctRef   = useRef<number>(77)          // kept in sync for canvas loop
  const [scrollProgress, setScrollProgress] = useState(0)
  const [linesActive,   setLinesActive]   = useState(false)
  const [windowHeight,  setWindowHeight]  = useState(900)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
    const onResize = () => setWindowHeight(window.innerHeight)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    let rafId: number
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const el = containerRef.current
        if (!el) return
        const { top } = el.getBoundingClientRect()
        const scrolled = -top
        const total = el.offsetHeight - window.innerHeight
        const progress = Math.max(0, Math.min(1, scrolled / total))
        setScrollProgress(progress)
        // Reactive (not one-shot) — so lines disappear when scrolling back up
        setLinesActive(progress >= 0.28)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // ── Derived animation values (all start near scroll=0) ───────────────
  const contentOpacity     = 1 - lerp(scrollProgress, 0.01, 0.28)
  const orbitOpacity       = 1  // tools always visible
  const labelFadeIn        = lerp(scrollProgress, 0.24, 0.40)
  const labelFadeOut       = 1 - lerp(scrollProgress, 0.65, 0.80)
  const labelOpacity       = labelFadeIn * labelFadeOut
  const exitGroupOpacity   = 1 - lerp(scrollProgress, 0.65, 0.82)
  const darkMaskOpacity    = lerp(scrollProgress, 0.60, 0.74)  // 2× faster
  const nextSectionOpacity = lerp(scrollProgress, 0.72, 0.92)

  // Badge/orbital center: starts at 77 % (~100 px higher), moves to 50 %
  const animCenterTopPct = 77 - lerp(scrollProgress, 0.01, 0.40) * 27
  const animCenterTop    = `${animCenterTopPct}%`
  centerTopPctRef.current = animCenterTopPct  // keep canvas in sync (no re-render)

  // Video parallax: shift top so black-hole center tracks the badge
  const videoTop = -((0.90 - animCenterTopPct / 100) * windowHeight)

  return (
    // ── Outer scroll container (600 vh gives 500 vh of scroll range) ──
    <div ref={containerRef} style={{ height: '600vh' }}>

      {/* ── Sticky viewport-height inner ──────────────────────────────── */}
      <div
        className="no-top-line"
        style={{
          position: 'sticky', top: 0,
          width: '100vw', height: '100vh',
          overflow: 'hidden', background: '#0F0F11',
        }}
      >
        <style>{`
          @keyframes orbit-cw    { to { transform: rotate(360deg);  } }
          @keyframes orbit-ccw   { to { transform: rotate(-360deg); } }
          @keyframes counter-cw  { to { transform: translate(-50%,-50%) rotate(-360deg); } }
          @keyframes counter-ccw { to { transform: translate(-50%,-50%) rotate(360deg);  } }

          @keyframes ripple-pulse {
            0%, 100% { transform: translate(-50%,-50%) scale(1);    }
            50%       { transform: translate(-50%,-50%) scale(0.94); }
          }

          .sb-email::placeholder { color: #9C9C9C; }
          .sb-email:focus { outline: none; border-color: rgba(0,67,250,0.5); }
        `}</style>

        {/* ── L0: Black hole video — height 180 % places center at ~90 % ── */}
        <video
          autoPlay muted loop playsInline
          src="/nodesingularity.webm"
          style={{
            position: 'absolute', top: videoTop, left: 0,
            width: '100%', height: '180%',
            objectFit: 'cover', objectPosition: 'center center',
            zIndex: 0,
          }}
        />

        {/* ── L1: Hero layer overlay ────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'rgba(15,15,17,0.34)',
            pointerEvents: 'none',
          }}
        />

        {/* ── L1.5: Particle canvas ─────────────────────────────────────── */}
        <ParticleCanvas centerTopPctRef={centerTopPctRef} />

        {/* ── L2: Orbiting tool icons — three rings ─────────────────────── */}
        <div
          style={{
            position: 'absolute', left: '50%', top: animCenterTop,
            width: 0, height: 0, zIndex: 2,
            opacity: orbitOpacity,
          }}
        >
          <OrbitRing tools={INNER_RING}  radius={92}  duration={54}  reverse={false} />
          <OrbitRing tools={MIDDLE_RING} radius={168} duration={75}  reverse={true}  />
          <OrbitRing tools={OUTER_RING}  radius={248} duration={102} reverse={false} />
        </div>

        {/* ── L3: Dark gradient vignette ────────────────────────────────── */}
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 3,
            background: `radial-gradient(ellipse 60% 52% at 50% ${animCenterTop}, transparent 0%, rgba(15,15,17,0.18) 42%, rgba(15,15,17,0.72) 66%, #0F0F11 88%)`,
            pointerEvents: 'none',
          }}
        />

        {/* ── L4: Ripple — centered on animation center ─────────────────── */}
        <div
          style={{
            position: 'absolute', left: '50%', top: animCenterTop,
            width: 0, height: 0, zIndex: 4,
            opacity: orbitOpacity,
          }}
        >
          <Ripple opacity={1} />
        </div>

        {/* ── L5: Section blur — fades to #0F0F11 from animation center ─── */}
        <div
          style={{
            position: 'absolute', left: 0, right: 0,
            top: animCenterTop, bottom: 0, zIndex: 5,
            background: 'linear-gradient(to bottom, transparent 0%, rgba(15,15,17,0.28) 12%, rgba(15,15,17,0.58) 28%, rgba(15,15,17,0.85) 50%, #0F0F11 72%, #0F0F11 100%)',
            backdropFilter:       'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            pointerEvents: 'none',
          }}
        />

        {/* ── L6: le-node badge ─────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute', left: '50%', top: animCenterTop,
            transform: 'translate(-50%, -50%)', zIndex: 6,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/lenode-badge.png"
            alt="le node"
            width={140}
            height={86}
            draggable={false}
            style={{
              display: 'block', borderRadius: 18,
              boxShadow: '0 0 36px rgba(0,67,250,0.40), 0 0 80px rgba(0,67,250,0.18)',
            }}
          />
        </div>

        {/* ── L47: Connection lines — scaleY from top ───────────────────── */}
        {/* Line 1: your market → badge top */}
        <div style={{
          position: 'absolute', left: '50%',
          top: `calc(${animCenterTop} - 87px)`,
          transform: `translateX(-50%) scaleY(${linesActive ? 1 : 0})`,
          transformOrigin: '50% 0%',
          width: '1px', height: '44px',
          background: 'rgba(240,242,255,0.5)',
          zIndex: 47, pointerEvents: 'none',
          opacity: exitGroupOpacity,
          transition: 'transform 0.8s ease',
        }} />
        {/* Line 2: badge bottom → your company */}
        <div style={{
          position: 'absolute', left: '50%',
          top: `calc(${animCenterTop} + 43px)`,
          transform: `translateX(-50%) scaleY(${linesActive ? 1 : 0})`,
          transformOrigin: '50% 0%',
          width: '1px', height: '44px',
          background: 'rgba(240,242,255,0.5)',
          zIndex: 47, pointerEvents: 'none',
          opacity: exitGroupOpacity,
          transition: linesActive ? 'transform 0.8s ease 0.8s' : 'transform 0.5s ease',
        }} />

        {/* ── L48: "your market" / "your company" labels ────────────────── */}
        <div
          style={{
            position: 'absolute', left: '50%', top: animCenterTop,
            transform: 'translate(-50%, -50%)',
            zIndex: 48, opacity: exitGroupOpacity,
            pointerEvents: 'none',
          }}
        >
          {/* your market — above badge */}
          <div style={{
            position: 'absolute',
            transform: 'translate(-50%, calc(-50% - 130px))',
            fontFamily: 'var(--font-nanum)', fontSize: '1.25rem',
            fontWeight: 700, color: 'rgba(240,242,255,0.85)',
            letterSpacing: '0.04em', whiteSpace: 'nowrap',
            opacity: labelOpacity, transition: 'opacity 0.4s ease',
          }}>
            your market
          </div>

          {/* your company — below badge */}
          <div style={{
            position: 'absolute',
            transform: 'translate(-50%, calc(-50% + 130px))',
            fontFamily: 'var(--font-nanum)', fontSize: '1.25rem',
            fontWeight: 700, color: 'rgba(240,242,255,0.85)',
            letterSpacing: '0.04em', whiteSpace: 'nowrap',
            opacity: labelOpacity, transition: 'opacity 0.4s ease',
          }}>
            your company
          </div>
        </div>

        {/* ── L50: Content — tag → H1 → tagline → CTAs ─────────────────── */}
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 50,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            textAlign: 'center', paddingTop: '7rem',
            paddingLeft: '1.5rem', paddingRight: '1.5rem',
            pointerEvents: 'none',
            opacity: contentOpacity,
          }}
        >
          {/* Tag pill */}
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.35rem 1rem', borderRadius: 999,
              background: 'rgba(34,34,34,0.88)',
              border: '1px solid rgba(255,255,255,0.10)',
              marginBottom: '32px', pointerEvents: 'auto',
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
              fontSize: '52px', lineHeight: 1.15,
              color: '#F0F2FF', margin: 0, marginBottom: '20px',
              whiteSpace: 'nowrap',
            }}
          >
            Your GTM Motion{' '}
            <span style={{ color: '#0043FA' }}>on autopilot</span>
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: 'var(--font-open-sans)', fontSize: '0.875rem',
              lineHeight: 1.7, color: 'rgba(240,242,255,0.52)',
              maxWidth: '32rem', margin: '0 0 32px',
            }}
          >
            le node orchestrates the{' '}
            <strong style={{ color: 'rgba(240,242,255,0.88)', fontWeight: 600 }}>
              best-in-class GTM tools
            </strong>
            <br />
            to connect{' '}
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
              pointerEvents: 'auto',
            }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="sb-email"
              style={{
                height: 48, padding: '0 1rem', borderRadius: 9,
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.10)',
                color: '#222222', fontSize: '0.875rem',
                fontFamily: 'var(--font-open-sans)',
                width: 248,
              }}
            />
            <button
              style={{
                height: 48, padding: '0 1.4rem', borderRadius: 9,
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

        {/* ── L54: Full-screen dark mask — reaches 100% before unlock ──── */}
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 54,
            background: '#0F0F11',
            opacity: darkMaskOpacity,
            pointerEvents: 'none',
          }}
        />

        {/* ── L55: Next section placeholder — fades in at end ───────────── */}
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 55,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'flex-end', paddingBottom: '8rem',
            opacity: nextSectionOpacity,
            pointerEvents: nextSectionOpacity > 0.5 ? 'auto' : 'none',
            background: 'linear-gradient(to top, rgba(15,15,17,0.95) 30%, transparent 100%)',
          }}
        >
          <div style={{ textAlign: 'center', paddingBottom: '2rem' }}>
            {/* Logo strip */}
            <p style={{
              fontFamily: 'var(--font-open-sans)', fontSize: '0.6875rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(240,242,255,0.28)', marginBottom: '1.5rem',
            }}>
              Trusted by revenue teams
            </p>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '2rem', flexWrap: 'wrap', marginBottom: '3rem',
            }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{
                  width: 72, height: 16,
                  background: 'rgba(240,242,255,0.10)',
                  borderRadius: 4,
                }} />
              ))}
            </div>
            {/* CTA */}
            <h2 style={{
              fontFamily: 'var(--font-nanum)', fontWeight: 800,
              fontSize: '2rem', color: '#F0F2FF', margin: '0 0 0.75rem',
            }}>
              Put your GTM motion{' '}
              <span style={{ color: '#0043FA' }}>on autopilot</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-open-sans)', fontSize: '0.875rem',
              lineHeight: 1.65, color: 'rgba(240,242,255,0.42)',
              margin: '0 auto 1.75rem', maxWidth: '28rem',
            }}>
              Join the waitlist and be the first to connect your stack,<br />
              map your market, and close on autopilot.
            </p>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.6rem', flexWrap: 'wrap',
            }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  height: 48, padding: '0 1rem', borderRadius: 9,
                  background: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.10)',
                  color: '#222222', fontSize: '0.875rem',
                  fontFamily: 'var(--font-open-sans)',
                  width: 220,
                }}
              />
              <button style={{
                height: 48, padding: '0 1.4rem', borderRadius: 9,
                background: '#0043FA', border: 'none',
                color: '#F0F2FF', fontSize: '0.875rem',
                fontFamily: 'var(--font-open-sans)', fontWeight: 600,
                cursor: 'pointer', letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
              }}>
                Join waitlist
              </button>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}
