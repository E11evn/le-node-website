'use client'

import { useState } from 'react'

// ── Bar generators with intentional height profiles ───────────────────────────
// Step 1 — Audit: all bars small (3–9 px)
function makeAuditBars(count: number): number[] {
  const out: number[] = []
  let s = 7
  for (let i = 0; i < count; i++) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    out.push(3 + ((s >>> 0) % 7))
  }
  return out
}

// Step 2 — Implement: crescendo, small → tall left to right
function makeImplementBars(count: number): number[] {
  const out: number[] = []
  let s = 13
  for (let i = 0; i < count; i++) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const progress = i / count                   // 0 → 1
    const minH = 3  + Math.round(progress * 16)  // 3  → 19
    const maxH = 9  + Math.round(progress * 27)  // 9  → 36
    out.push(minH + ((s >>> 0) % Math.max(1, maxH - minH + 1)))
  }
  return out
}

// Step 3 — Scale: all bars at maximum (28–36 px)
function makeScaleBars(count: number): number[] {
  const out: number[] = []
  let s = 23
  for (let i = 0; i < count; i++) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    out.push(28 + ((s >>> 0) % 9))
  }
  return out
}

type PhaseId = 'audit' | 'implement' | 'scale'
const ACCENT = '#FA7900'

const phases = [
  {
    id: 'audit' as PhaseId,
    label: 'Week 1–2',
    title: 'Audit',
    grow: 2,
    bars: makeAuditBars(80),
    weekLabels: ['Week 1', 'Week 2'],
    description:
      "We diagnose before we prescribe. Deep-dive into your ICP, messaging, channels, CRM health, and team dynamics. You get a clear picture of what's broken and what to do next.",
    deliverables: [
      'ICP clarity report',
      'Messaging gap analysis',
      'Channel audit',
      'CRM health check',
      'GTM roadmap',
    ],
  },
  {
    id: 'implement' as PhaseId,
    label: 'Week 3–8',
    title: 'Implement',
    grow: 6,
    bars: makeImplementBars(220),
    weekLabels: ['Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    description:
      'We build the engine with you — not for you. Outbound sequences, CRM workflows, lead scoring, sales playbooks. Everything documented and owned by your team.',
    deliverables: [
      'Outbound sequences',
      'CRM automation',
      'Lead scoring model',
      'Sales playbook',
      'Tech stack configuration',
    ],
  },
  {
    id: 'scale' as PhaseId,
    label: 'Month 3+',
    title: 'Scale',
    grow: 4,
    bars: makeScaleBars(150),
    weekLabels: ['Month 3', 'Month 4', 'Month 5+'],
    description:
      "We run campaigns alongside your team, hit revenue targets together, and hand off a fully self-sustaining GTM motion your team can own and grow independently.",
    deliverables: [
      'Weekly campaign management',
      'Pipeline reporting & OKRs',
      'Hiring & team ramp plan',
      'Revenue operations setup',
      'Handoff & independence plan',
    ],
  },
]

export default function AgencyApproach() {
  const [active, setActive] = useState<PhaseId>('audit')

  return (
    <section id="approach" className="bg-[#0C0C14]">
      <div className="container-content">

        {/* Header */}
        <span
          className="text-xs font-semibold tracking-widest uppercase mb-4 block"
          style={{ color: ACCENT }}
        >
          Our Method
        </span>
        <h2 className="text-display-sm font-bold text-white mb-4 max-w-2xl">
          Audit. Implement. Scale.
        </h2>
        <p className="text-white/40 text-lg mb-12 max-w-xl">
          We don&apos;t hand you a deck and disappear. We build the system and run it
          alongside your team until it works.
        </p>

        {/* ── Waveform scrubber ────────────────────────────────────────── */}
        <div className="flex gap-0 cursor-pointer mb-1" style={{ height: 48 }}>
          {phases.map((phase) => (
            <div
              key={phase.id}
              className="flex items-end gap-[2px] overflow-hidden"
              style={{ flex: phase.grow }}
              onClick={() => setActive(phase.id)}
            >
              {phase.bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 rounded-[1px] transition-colors duration-300"
                  style={{
                    width: 2,
                    height: h,
                    background: active === phase.id ? ACCENT : 'rgba(255,255,255,0.11)',
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Week labels */}
        <div className="flex mb-4">
          {phases.map((phase) => (
            <div
              key={phase.id}
              className="flex justify-between overflow-hidden cursor-pointer pr-4"
              style={{ flex: phase.grow }}
              onClick={() => setActive(phase.id)}
            >
              {phase.weekLabels.map((lbl) => (
                <span
                  key={lbl}
                  className="text-[9px] font-mono font-medium transition-colors duration-200 select-none"
                  style={{ color: active === phase.id ? ACCENT : 'rgba(255,255,255,0.2)' }}
                >
                  {lbl}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* ── Phase selector buttons ───────────────────────────────────── */}
        <div className="flex rounded-lg overflow-hidden border border-white/[0.07] mb-8">
          {phases.map((phase, i) => {
            const isActive = active === phase.id
            return (
              <button
                key={phase.id}
                onClick={() => setActive(phase.id)}
                className={`relative py-3 px-4 text-left transition-all duration-200 focus:outline-none ${
                  i < phases.length - 1 ? 'border-r border-white/[0.07]' : ''
                }`}
                style={{
                  flex: phase.grow,
                  background: isActive
                    ? `linear-gradient(to right, ${ACCENT}, #FA9E00)`
                    : 'rgba(255,255,255,0.02)',
                  color: isActive ? 'white' : 'rgba(255,255,255,0.35)',
                }}
              >
                <span className="block text-[10px] font-mono tracking-wide opacity-75 mb-0.5 leading-none">
                  {phase.label}
                </span>
                <span className="text-sm font-semibold leading-none">{phase.title}</span>
              </button>
            )
          })}
        </div>

        {/* ── Phase content cards ──────────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-3">
          {phases.map((phase) => {
            const isActive = active === phase.id
            return (
              <div
                key={phase.id}
                className="rounded-xl p-6 border transition-all duration-300 cursor-pointer"
                style={{
                  background: isActive ? 'rgba(250,121,0,0.08)' : 'rgba(255,255,255,0.02)',
                  borderColor: isActive ? 'rgba(250,121,0,0.35)' : 'rgba(255,255,255,0.06)',
                }}
                onClick={() => setActive(phase.id)}
              >
                <p
                  className="text-[10px] font-mono font-semibold uppercase tracking-widest mb-4 transition-colors duration-200"
                  style={{ color: isActive ? ACCENT : 'rgba(255,255,255,0.25)' }}
                >
                  {phase.label} — {phase.title}
                </p>
                <p
                  className="text-sm leading-relaxed mb-5 transition-colors duration-200"
                  style={{ color: isActive ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.35)' }}
                >
                  {phase.description}
                </p>
                <ul className="space-y-2">
                  {phase.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs transition-colors duration-200"
                      style={{ color: isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)' }}
                    >
                      <span className="mt-0.5 flex-shrink-0" style={{ color: isActive ? ACCENT : 'rgba(255,255,255,0.15)' }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
