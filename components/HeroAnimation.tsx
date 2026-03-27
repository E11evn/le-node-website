'use client'

// ─────────────────────────────────────────────────────────────────────────────
// HERO ANIMATION BLOCK
// Self-contained. To remove: delete this file + the import in Hero.tsx.
// Nothing outside this file depends on it.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState, useRef } from 'react'

// ─── Canvas constants ────────────────────────────────────────────────────────

const W = 900   // design canvas width (px)
const H = 500   // design canvas height (px)
const R = 20    // avatar radius (px)

// ─── Data ────────────────────────────────────────────────────────────────────

interface Profile {
  id: number
  sx: number       // scatter x (canvas px)
  sy: number       // scatter y (canvas px)
  initials: string
  selected: boolean
  name?: string
  title?: string
  company?: string
  phone?: string
  email?: string
}

const PROFILES: Profile[] = [
  { id: 0,  sx: 108, sy: 85,  initials: 'MR', selected: false },
  { id: 1,  sx: 338, sy: 62,  initials: 'KL', selected: false },
  { id: 2,  sx: 568, sy: 112, initials: 'PD', selected: false },
  { id: 3,  sx: 762, sy: 76,  initials: 'TW', selected: false },
  { id: 4,  sx: 828, sy: 245, initials: 'NB', selected: false },
  { id: 5,  sx: 635, sy: 388, initials: 'JF', selected: false },
  { id: 6,  sx: 392, sy: 418, initials: 'CK', selected: false },
  { id: 7,  sx: 140, sy: 375, initials: 'RL', selected: false },
  {
    id: 8, sx: 248, sy: 172, initials: 'SC', selected: true,
    name: 'Sarah Chen',  title: 'Head of Growth', company: 'Vercel',
    phone: '+1 415 823 4421', email: 'sarah@vercel.com',
  },
  {
    id: 9, sx: 488, sy: 248, initials: 'JP', selected: true,
    name: 'James Park',  title: 'VP Sales',        company: 'Linear',
    phone: '+1 650 924 7731', email: 'james@linear.app',
  },
  {
    id: 10, sx: 688, sy: 190, initials: 'MT', selected: true,
    name: 'Mia Torres',  title: 'RevOps Lead',     company: 'Notion',
    phone: '+1 628 401 8823', email: 'mia@notion.so',
  },
  {
    id: 11, sx: 358, sy: 312, initials: 'AK', selected: true,
    name: 'Alex Kim',    title: 'GTM Engineer',    company: 'Stripe',
    phone: '+1 212 771 9934', email: 'alex@stripe.com',
  },
]

const SELECTED = PROFILES.filter(p => p.selected)

// Avatar center positions per phase
const LEFT_COL  = [{ x: 72, y: 105 }, { x: 72, y: 210 }, { x: 72, y: 315 }, { x: 72, y: 420 }]
const RIGHT_COL = [{ x: 755, y: 105 }, { x: 755, y: 210 }, { x: 755, y: 315 }, { x: 755, y: 420 }]

const EMAIL_BODY = "Hi Sarah — Noticed Vercel's growth push. We automate outbound so your reps focus on closing. Worth a quick 15 min call?"

const PHASE_MS     = 2900
const SCAN_MS      = 1850
const PHASE_LABELS = ['Identification', 'Selection', 'Enrichment', 'Contact'] as const
const EASE         = 'cubic-bezier(0.4,0,0.2,1)'

// ─── Component ───────────────────────────────────────────────────────────────

export default function HeroAnimation() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale,    setScale]    = useState(1)
  const [phase,    setPhase]    = useState(0)
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const [enriched, setEnriched] = useState(false)
  const [typed,    setTyped]    = useState('')
  const [sent,     setSent]     = useState(false)

  // Responsive scale: canvas fills wrapper width, never exceeds 1:1
  useEffect(() => {
    const calc = () => {
      if (!wrapRef.current) return
      setScale(Math.min(wrapRef.current.offsetWidth / W, 1))
    }
    calc()
    const ro = new ResizeObserver(calc)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [])

  // Phase cycling
  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 4), PHASE_MS)
    return () => clearInterval(id)
  }, [])

  // Per-phase behavior
  useEffect(() => {
    setEnriched(false)
    setTyped('')
    setSent(false)

    const fns: Array<() => void> = []
    const after = (ms: number, fn: () => void) => {
      const id = setTimeout(fn, ms)
      fns.push(() => clearTimeout(id))
    }

    // Phase 0 — Identification: reveal avatars progressively as scan bar descends
    if (phase === 0) {
      setRevealed(new Set())
      ;[...PROFILES].sort((a, b) => a.sy - b.sy).forEach(p => {
        after((p.sy / H) * SCAN_MS, () =>
          setRevealed(prev => new Set([...prev, p.id]))
        )
      })
    }

    // Phase 2 — Enrichment: slide in contact data after brief pause
    if (phase === 2) {
      after(500, () => setEnriched(true))
    }

    // Phase 3 — Contact: typewriter effect, then send
    if (phase === 3) {
      let intervalId: ReturnType<typeof setInterval>
      after(700, () => {
        let i = 0
        intervalId = setInterval(() => {
          i++
          setTyped(EMAIL_BODY.slice(0, i))
          if (i >= EMAIL_BODY.length) {
            clearInterval(intervalId)
            after(480, () => setSent(true))
          }
        }, 13)
        fns.push(() => clearInterval(intervalId))
      })
    }

    return () => fns.forEach(fn => fn())
  }, [phase])

  // ─── Derived values ──────────────────────────────────────────────────────

  const getPos = (p: Profile, si: number) => {
    if (!p.selected) return { x: p.sx, y: p.sy }
    if (phase === 1 || phase === 2) return LEFT_COL[si]
    if (phase === 3) return RIGHT_COL[si]
    return { x: p.sx, y: p.sy }
  }

  const isVisible  = (p: Profile) => phase === 0 ? revealed.has(p.id) : p.selected
  const isBlue     = (p: Profile) => p.selected && phase >= 1
  const showCards  = phase === 1 || phase === 2
  const showEmail  = phase === 3

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div
      ref={wrapRef}
      style={{ width: '100%', height: H * scale, position: 'relative', userSelect: 'none' }}
    >
      {/* Keyframes */}
      <style>{`
        @keyframes le-scan {
          from { top: -2px; }
          to   { top: ${H + 2}px; }
        }
        @keyframes le-blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes le-ping {
          0%   { transform: scale(1);   opacity: 0.55; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes le-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* Scaled canvas */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: W, height: H,
        transformOrigin: 'top left',
        transform: `scale(${scale})`,
        background: '#ffffff',
        backgroundImage: [
          'linear-gradient(rgba(14,52,244,0.04) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(14,52,244,0.04) 1px, transparent 1px)',
        ].join(','),
        backgroundSize: '44px 44px',
        borderRadius: 16,
        border: '1px solid #E5E7EB',
        overflow: 'hidden',
      }}>

        {/* HUD corners */}
        <div style={{ position:'absolute', top:14,    left:14,  width:18, height:18, borderTop:   '1.5px solid rgba(14,52,244,0.2)', borderLeft:  '1.5px solid rgba(14,52,244,0.2)' }} />
        <div style={{ position:'absolute', top:14,    right:14, width:18, height:18, borderTop:   '1.5px solid rgba(14,52,244,0.2)', borderRight: '1.5px solid rgba(14,52,244,0.2)' }} />
        <div style={{ position:'absolute', bottom:14, left:14,  width:18, height:18, borderBottom:'1.5px solid rgba(14,52,244,0.2)', borderLeft:  '1.5px solid rgba(14,52,244,0.2)' }} />
        <div style={{ position:'absolute', bottom:14, right:14, width:18, height:18, borderBottom:'1.5px solid rgba(14,52,244,0.2)', borderRight: '1.5px solid rgba(14,52,244,0.2)' }} />

        {/* Phase label */}
        <div style={{ position:'absolute', top:18, left:42, display:'flex', alignItems:'center', gap:7 }}>
          <div style={{
            width:6, height:6, borderRadius:'50%',
            background:'#0E34F4',
            boxShadow:'0 0 0 3px rgba(14,52,244,0.16)',
          }} />
          {/* key on the outer span forces remount → CSS animation restarts each phase */}
          <span key={phase} style={{
            fontSize:10, fontWeight:700, letterSpacing:'0.14em',
            textTransform:'uppercase', color:'#0E34F4',
            fontFamily:'var(--font-geist-mono), monospace',
            animation:'le-fade-in 0.3s ease',
          }}>
            {PHASE_LABELS[phase]}
          </span>
        </div>

        {/* Scan bar — Phase 0 only */}
        {phase === 0 && (
          <div style={{
            position:'absolute', left:0, right:0, height:2,
            background:'linear-gradient(90deg, transparent 0%, rgba(14,52,244,0.5) 20%, rgba(14,52,244,0.95) 50%, rgba(14,52,244,0.5) 80%, transparent 100%)',
            boxShadow:'0 0 20px 8px rgba(14,52,244,0.1)',
            animation:`le-scan ${SCAN_MS}ms ease-in-out forwards`,
          }} />
        )}

        {/* Avatars */}
        {PROFILES.map(p => {
          const si  = SELECTED.findIndex(s => s.id === p.id)
          const pos = getPos(p, si)
          const vis = isVisible(p)
          const blue = isBlue(p)

          return (
            <div key={p.id} style={{
              position:'absolute',
              left: pos.x - R,
              top:  pos.y - R,
              width: R * 2, height: R * 2,
              opacity:   vis ? 1 : 0,
              transform: `scale(${vis ? 1 : 0.6})`,
              transition: `left 0.78s ${EASE}, top 0.78s ${EASE}, opacity 0.4s ease, transform 0.4s ease`,
              zIndex: p.selected ? 2 : 1,
            }}>
              {/* Selection ping ring */}
              {blue && phase === 1 && (
                <div style={{
                  position:'absolute', inset:-5, borderRadius:'50%',
                  border:'1.5px solid rgba(14,52,244,0.45)',
                  animation:'le-ping 0.9s ease-out forwards',
                }} />
              )}
              {/* Circle */}
              <div style={{
                width:'100%', height:'100%', borderRadius:'50%',
                background: blue ? '#0E34F4' : '#F3F4F6',
                border:`2px solid ${blue ? '#0E34F4' : '#D1D5DB'}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                transition:'background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
                boxShadow: blue
                  ? '0 0 0 3px rgba(14,52,244,0.12), 0 2px 10px rgba(14,52,244,0.3)'
                  : '0 1px 3px rgba(0,0,0,0.07)',
              }}>
                <span style={{
                  fontSize:9, fontWeight:700, letterSpacing:'0.04em',
                  color: blue ? '#fff' : '#9CA3AF',
                  fontFamily:'var(--font-geist-sans), sans-serif',
                  transition:'color 0.3s ease',
                }}>
                  {p.initials}
                </span>
              </div>
            </div>
          )
        })}

        {/* Profile cards — Phases 1 & 2 */}
        {SELECTED.map((p, i) => (
          <div key={`card-${p.id}`} style={{
            position:'absolute',
            left: LEFT_COL[i].x + R + 14,
            top:  LEFT_COL[i].y - R,
            width: 248,
            opacity:   showCards ? 1 : 0,
            transform: `translateX(${showCards ? 0 : -10}px)`,
            transition: `opacity 0.42s ease ${i * 0.07}s, transform 0.42s ease ${i * 0.07}s`,
            background:'#fff',
            border:'1px solid #E5E7EB',
            borderRadius:8,
            padding:'9px 12px',
            boxShadow:'0 2px 8px rgba(0,0,0,0.055)',
            zIndex:3,
          }}>
            {/* Name */}
            <div style={{
              fontSize:12, fontWeight:600, color:'#111827', marginBottom:1,
              fontFamily:'var(--font-geist-sans), sans-serif',
            }}>
              {p.name}
            </div>
            {/* Title · Company */}
            <div style={{
              fontSize:10, color:'#6B7280',
              fontFamily:'var(--font-geist-sans), sans-serif',
              marginBottom: enriched ? 7 : 0,
              transition:'margin-bottom 0.3s ease',
            }}>
              {p.title} · {p.company}
            </div>
            {/* Enrichment fields */}
            <div style={{
              maxHeight: enriched ? 60 : 0,
              opacity:   enriched ? 1 : 0,
              overflow:'hidden',
              transition:`max-height 0.38s ease ${i * 0.07}s, opacity 0.38s ease ${i * 0.07}s`,
            }}>
              <div style={{ height:1, background:'#F3F4F6', marginBottom:5 }} />
              {[{ icon:'↗', val: p.phone }, { icon:'@', val: p.email }].map(row => (
                <div key={row.icon} style={{ display:'flex', alignItems:'center', gap:5, marginBottom:3 }}>
                  <span style={{ fontSize:8, color:'#9CA3AF', width:10, textAlign:'center' }}>{row.icon}</span>
                  <span style={{
                    fontSize:9.5, fontFamily:'var(--font-geist-mono), monospace',
                    color:'#374151',
                    background:'rgba(14,52,244,0.06)',
                    padding:'1px 5px', borderRadius:3,
                  }}>
                    {row.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Email composer modal — Phase 3 */}
        <div style={{
          position:'absolute', left:116, top:64, width:394,
          opacity:   showEmail ? 1 : 0,
          transform: `translateY(${showEmail ? 0 : 8}px) scale(${showEmail ? 1 : 0.98})`,
          transition:'opacity 0.42s ease, transform 0.42s ease',
          background:'#fff',
          border:'1px solid #E5E7EB',
          borderRadius:12,
          boxShadow:'0 8px 36px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.04)',
          zIndex:10,
          overflow:'hidden',
          pointerEvents:'none',
        }}>
          {/* Title bar */}
          <div style={{
            padding:'10px 14px', borderBottom:'1px solid #F3F4F6',
            display:'flex', alignItems:'center', justifyContent:'space-between',
            background:'#FAFAFA',
          }}>
            <span style={{ fontSize:12, fontWeight:600, color:'#111827', fontFamily:'var(--font-geist-sans)' }}>
              New Message
            </span>
            <div style={{ display:'flex', gap:5 }}>
              {['#FF5F57','#FEBC2E','#28C840'].map(c => (
                <div key={c} style={{ width:10, height:10, borderRadius:'50%', background:c }} />
              ))}
            </div>
          </div>
          {/* To */}
          <div style={{ padding:'7px 14px', borderBottom:'1px solid #F9FAFB', display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:10, color:'#9CA3AF', fontFamily:'var(--font-geist-sans)', minWidth:28 }}>To</span>
            <span style={{
              fontSize:10, fontFamily:'var(--font-geist-mono)', color:'#0E34F4', fontWeight:500,
              background:'rgba(14,52,244,0.07)', padding:'2px 7px', borderRadius:4,
            }}>
              sarah@vercel.com
            </span>
          </div>
          {/* Subject */}
          <div style={{ padding:'7px 14px', borderBottom:'1px solid #F9FAFB', display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:10, color:'#9CA3AF', fontFamily:'var(--font-geist-sans)', minWidth:28 }}>Subj</span>
            <span style={{ fontSize:10.5, fontFamily:'var(--font-geist-sans)', color:'#374151', fontWeight:500 }}>
              Quick thought on your pipeline
            </span>
          </div>
          {/* Body */}
          <div style={{ padding:'12px 14px', minHeight:118 }}>
            <span style={{
              fontSize:11, color:'#374151', lineHeight:1.65,
              fontFamily:'var(--font-geist-sans)', whiteSpace:'pre-wrap',
            }}>
              {typed}
              {!sent && showEmail && (
                <span style={{
                  display:'inline-block', width:1.5, height:11,
                  background:'#0E34F4', marginLeft:1, verticalAlign:'middle',
                  animation:'le-blink 0.8s step-end infinite',
                }} />
              )}
            </span>
          </div>
          {/* Footer */}
          <div style={{
            padding:'8px 14px 10px', borderTop:'1px solid #F3F4F6',
            display:'flex', justifyContent:'flex-end',
          }}>
            <div style={{
              padding:'6px 18px', borderRadius:6,
              background: sent ? '#10B981' : '#0E34F4',
              color:'#fff', fontSize:11, fontWeight:600,
              fontFamily:'var(--font-geist-sans)',
              transition:'background 0.4s ease, transform 0.2s ease',
              transform: sent ? 'scale(0.96)' : 'scale(1)',
              display:'flex', alignItems:'center', gap:5,
            }}>
              {sent ? '✓ Sent' : 'Send →'}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
