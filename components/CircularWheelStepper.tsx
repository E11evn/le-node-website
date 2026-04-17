'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion'
import { Users, Target, MessageSquare, RefreshCw, TrendingUp, LucideIcon } from 'lucide-react'

export interface WheelStep {
  title: string
  description: string
  icon: LucideIcon
}

const DEFAULT_STEPS: WheelStep[] = [
  {
    title: 'Analyse your data',
    description: 'le node connects to your existing business data to learn who your ICP is.',
    icon: Users,
  },
  {
    title: 'Scope your market',
    description: 'le node detects intent signals, qualifies and scores prospects based on your ICP.',
    icon: Target,
  },
  {
    title: 'Engage',
    description: "le node finds your leads' contact info to engage them in relevant conversations and generate opportunity, on autopilot.",
    icon: MessageSquare,
  },
  {
    title: 'Sync back',
    description: 'Then syncs back to your stack to maintain your CRM up to date, and hands over the opportunities where your team already works.',
    icon: RefreshCw,
  },
  {
    title: 'Measure and learn',
    description: 'Track performance. le node continuously learns from results to enhance your outbound approach.',
    icon: TrendingUp,
  },
]

const SIZE   = 380   // SVG viewBox size
const CX     = SIZE / 2
const CY     = SIZE / 2
const RADIUS = 148   // orbit radius for step markers
const TRACK  = 152   // slightly larger for the SVG progress ring

const STEP_DURATION_S = 5  // seconds for arc to fill from one icon to the next

export default function CircularWheelStepper({
  steps = DEFAULT_STEPS,
}: {
  steps?: WheelStep[]
}) {
  const [active, setActive] = useState(0)
  const total = steps.length

  const circumference = 2 * Math.PI * TRACK
  const segmentLength = circumference / total

  // Arc endpoint is animated continuously from active → active+1 over 5s
  const dashOffset = useMotionValue(circumference - segmentLength * active)

  useEffect(() => {
    const start = circumference - segmentLength * active
    const end   = circumference - segmentLength * (active + 1)
    dashOffset.set(start)
    const controls = animate(dashOffset, end, {
      duration: STEP_DURATION_S,
      ease: 'linear',
      onComplete: () => setActive((a) => (a + 1) % total),
    })
    return () => controls.stop()
  }, [active, total, circumference, segmentLength, dashOffset])

  // Positions of step markers on the circle (top = -90°)
  const positions = steps.map((_, i) => {
    const angle = (i / total) * 2 * Math.PI - Math.PI / 2
    return {
      x: CX + RADIUS * Math.cos(angle),
      y: CY + RADIUS * Math.sin(angle),
    }
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

      {/* ── Wheel ─────────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', width: SIZE, height: SIZE }}>

        {/* SVG rings */}
        <svg
          width={SIZE} height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
        >
          {/* Background track */}
          <circle
            cx={CX} cy={CY} r={TRACK}
            fill="none"
            stroke="rgba(240,242,255,0.07)"
            strokeWidth={1.5}
          />
          {/* Animated progress arc — drains over 5s from one icon to next */}
          <motion.circle
            cx={CX} cy={CY} r={TRACK}
            fill="none"
            stroke="#0043FA"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset: dashOffset,
              transform: 'rotate(-90deg)',
              transformOrigin: `${CX}px ${CY}px`,
            }}
          />
          {/* Connector lines from center to each marker */}
          {positions.map((pos, i) => (
            <line
              key={i}
              x1={CX} y1={CY}
              x2={pos.x} y2={pos.y}
              stroke="rgba(240,242,255,0.04)"
              strokeWidth={1}
            />
          ))}
        </svg>

        {/* Step markers */}
        {steps.map((step, i) => {
          const pos       = positions[i]
          const isFilled  = i <= active    // all visited + current are highlighted
          const isCurrent = i === active   // only the current one scales + glows
          const Icon      = step.icon
          return (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              animate={{ scale: isCurrent ? 1.18 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              style={{
                position:  'absolute',
                left:      pos.x - 22,
                top:       pos.y - 22,
                width:     44,
                height:    44,
                borderRadius: '50%',
                background:   isFilled ? '#0043FA' : 'rgba(15,15,17,0.95)',
                border:       `1.5px solid ${isFilled ? '#0043FA' : 'rgba(240,242,255,0.13)'}`,
                boxShadow:    isCurrent ? '0 0 16px rgba(0,67,250,0.45)' : 'none',
                display:      'flex',
                alignItems:   'center',
                justifyContent: 'center',
                cursor:       'pointer',
                color:        isFilled ? '#fff' : 'rgba(240,242,255,0.38)',
                padding:      0,
                zIndex:       2,
                transition:   'background 0.35s ease, border-color 0.35s ease, color 0.35s ease',
              }}
            >
              <Icon size={16} strokeWidth={2} />
            </motion.button>
          )
        })}

        {/* Center text */}
        <div style={{
          position:   'absolute',
          left:       CX - 90,
          top:        CY - 90,
          width:      180,
          height:     180,
          display:    'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign:  'center',
          pointerEvents: 'none',
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.88, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{    opacity: 0, scale: 0.88, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <p style={{
                fontFamily:    'var(--font-open-sans, sans-serif)',
                fontSize:      '0.625rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color:         'rgba(0,67,250,0.8)',
                marginBottom:  '0.4rem',
              }}>
                {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </p>
              <h3 style={{
                fontFamily:  'var(--font-nanum, serif)',
                fontWeight:   800,
                fontSize:    '0.9375rem',
                lineHeight:   1.25,
                color:        '#F0F2FF',
                marginBottom: '0.4rem',
              }}>
                {steps[active].title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-open-sans, sans-serif)',
                fontSize:   '0.6875rem',
                lineHeight:  1.55,
                color:       'rgba(240,242,255,0.40)',
              }}>
                {steps[active].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  )
}
