'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plug, Map, Filter, LayoutList, Zap, LucideIcon } from 'lucide-react'

export interface WheelStep {
  title: string
  description: string
  icon: LucideIcon
}

const DEFAULT_STEPS: WheelStep[] = [
  {
    title: 'Connect your stack',
    description: 'Plug in your CRM, sequencer, enrichment tools, and data sources in minutes — no eng required.',
    icon: Plug,
  },
  {
    title: 'Map your market',
    description: 'Define ICPs, build segment criteria, and let le-node surface the right accounts automatically.',
    icon: Map,
  },
  {
    title: 'Qualify signals',
    description: 'Surface intent data and buying signals so your team prioritises accounts most likely to convert.',
    icon: Filter,
  },
  {
    title: 'Build sequences',
    description: 'AI-generated multi-touch sequences tailored to each segment — reviewed by you, deployed instantly.',
    icon: LayoutList,
  },
  {
    title: 'Close on autopilot',
    description: 'Automated follow-ups, handoffs, and reporting so your team focuses on closing, not chasing.',
    icon: Zap,
  },
]

const SIZE   = 380   // SVG viewBox size
const CX     = SIZE / 2
const CY     = SIZE / 2
const RADIUS = 148   // orbit radius for step markers
const TRACK  = 152   // slightly larger for the SVG progress ring

export default function CircularWheelStepper({
  steps = DEFAULT_STEPS,
}: {
  steps?: WheelStep[]
}) {
  const [active, setActive] = useState(0)
  const total = steps.length

  const circumference = 2 * Math.PI * TRACK

  // Arc fills segment by segment; 0 steps done → 0, all done → full
  const segmentAngle = (2 * Math.PI * TRACK) / total
  const dashOffset   = circumference - segmentAngle * (active + 1)

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
          {/* Animated progress arc */}
          <motion.circle
            cx={CX} cy={CY} r={TRACK}
            fill="none"
            stroke="#0043FA"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: dashOffset }}
            initial={{ strokeDashoffset: circumference }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            style={{
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
          const pos     = positions[i]
          const isActive = i === active
          const Icon    = step.icon
          return (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              animate={{ scale: isActive ? 1.18 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              style={{
                position:  'absolute',
                left:      pos.x - 22,
                top:       pos.y - 22,
                width:     44,
                height:    44,
                borderRadius: '50%',
                background:   isActive ? '#0043FA' : 'rgba(15,15,17,0.95)',
                border:       `1.5px solid ${isActive ? '#0043FA' : 'rgba(240,242,255,0.13)'}`,
                boxShadow:    isActive ? '0 0 16px rgba(0,67,250,0.45)' : 'none',
                display:      'flex',
                alignItems:   'center',
                justifyContent: 'center',
                cursor:       'pointer',
                color:        isActive ? '#fff' : 'rgba(240,242,255,0.38)',
                padding:      0,
                zIndex:       2,
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

      {/* ── Navigation ────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.6rem' }}>
        <button
          onClick={() => setActive(Math.max(0, active - 1))}
          disabled={active === 0}
          style={{
            height:     40,
            padding:    '0 1.25rem',
            borderRadius: 9,
            background: 'transparent',
            border:     '1px solid rgba(240,242,255,0.12)',
            color:      active === 0 ? 'rgba(240,242,255,0.18)' : 'rgba(240,242,255,0.55)',
            fontFamily: 'var(--font-open-sans, sans-serif)',
            fontSize:   '0.875rem',
            cursor:     active === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          Back
        </button>
        <button
          onClick={() => setActive(Math.min(total - 1, active + 1))}
          disabled={active === total - 1}
          style={{
            height:     40,
            padding:    '0 1.25rem',
            borderRadius: 9,
            background: active === total - 1 ? 'rgba(0,67,250,0.25)' : '#0043FA',
            border:     'none',
            color:      active === total - 1 ? 'rgba(240,242,255,0.35)' : '#F0F2FF',
            fontFamily: 'var(--font-open-sans, sans-serif)',
            fontSize:   '0.875rem',
            fontWeight:  600,
            cursor:     active === total - 1 ? 'not-allowed' : 'pointer',
            letterSpacing: '0.01em',
          }}
        >
          Next
        </button>
      </div>

    </div>
  )
}
