'use client'

import { useState } from 'react'

// ── Deterministic waveform bar generator ──────────────────────────────────────
// Uses a linear congruential generator so bars are stable across renders
function makeBars(count: number, seed: number): number[] {
  const out: number[] = []
  let s = seed
  for (let i = 0; i < count; i++) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    out.push(4 + ((s >>> 0) % 30))
  }
  return out
}

type PhaseId = 'audit' | 'implement' | 'execute'

const ACCENT = '#FA7900'

// flex proportions mirror phase duration: Audit=2w, Implement=6w, Execute=ongoing(~8w eq)
const phases = [
  {
    id: 'audit' as PhaseId,
    label: 'Week 1–2',
    title: 'Audit',
    grow: 2,
    // ~60 bars for 2 flex units (fills ~200px at 3px/bar)
    bars: makeBars(80, 7),
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
    // ~180 bars for 6 flex units
    bars: makeBars(220, 13),
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
    id: 'execute' as PhaseId,
    label: 'Month 3+',
    title: 'Execute',
    grow: 4,
    // ~120 bars for 4 flex units
    bars: makeBars(150, 23),
    weekLabels: ['Month 3', 'Month 4', 'Month 5+'],
    description:
      "We run campaigns alongside your team, iterate weekly on what's working, and own pipeline development until the motion is proven and self-sustaining.",
    deliverables: [
      'Weekly campaign management',
      'Performance reporting',
      'Iteration cycles',
      'Team coaching',
    ],
  },
]

export default function AgencyApproach() {
  const [active, setActive] = useState<PhaseId>('audit')

  return (
    <section id="approach" className="bg-[#0C0C14]">
      <div className="container-content">

        {/* ── Section header ───────────────────────────────────────────── */}
        <span
          className="text-xs font-semibold tracking-widest uppercase mb-4 block"
          style={{ color: ACCENT }}
        >
          Our Method
        </span>
        <h2 className="text-display-sm font-bold text-white mb-4 max-w-2xl">
          Audit. Implement. Execute. Fast.
        </h2>
        <p className="text-white/40 text-lg mb-12 max-w-xl">
          We don&apos;t hand you a deck and disappear. We build the system and run it
          alongside your team until it works.
        </p>

        {/* ── Waveform scrubber ────────────────────────────────────────── */}
        <div
          className="flex gap-0 cursor-pointer mb-1"
          style={{ height: 48 }}
        >
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
                    background:
                      active === phase.id
                        ? ACCENT
                        : 'rgba(255,255,255,0.11)',
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Week / month labels */}
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
                  style={{
                    color:
                      active === phase.id
                        ? ACCENT
                        : 'rgba(255,255,255,0.2)',
                  }}
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
                  background: isActive
                    ? 'rgba(250,121,0,0.08)'
                    : 'rgba(255,255,255,0.02)',
                  borderColor: isActive
                    ? 'rgba(250,121,0,0.35)'
                    : 'rgba(255,255,255,0.06)',
                }}
                onClick={() => setActive(phase.id)}
              >
                {/* Phase label */}
                <p
                  className="text-[10px] font-mono font-semibold uppercase tracking-widest mb-4 transition-colors duration-200"
                  style={{
                    color: isActive ? ACCENT : 'rgba(255,255,255,0.25)',
                  }}
                >
                  {phase.label} — {phase.title}
                </p>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-5 transition-colors duration-200"
                  style={{
                    color: isActive
                      ? 'rgba(255,255,255,0.65)'
                      : 'rgba(255,255,255,0.35)',
                  }}
                >
                  {phase.description}
                </p>

                {/* Deliverables */}
                <ul className="space-y-2">
                  {phase.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs transition-colors duration-200"
                      style={{
                        color: isActive
                          ? 'rgba(255,255,255,0.5)'
                          : 'rgba(255,255,255,0.2)',
                      }}
                    >
                      <span
                        className="mt-0.5 flex-shrink-0 transition-colors duration-200"
                        style={{ color: isActive ? ACCENT : 'rgba(255,255,255,0.15)' }}
                      >
                        →
                      </span>
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
