'use client'

import { useLayoutEffect } from 'react'

// ScrollReveal
// ─────────────────────────────────────────────────────────────────────────────
// Combined observer that powers two visual systems across the site:
//
//  1. Animated top line on every <section> that doesn't opt out with
//     `.no-top-line`. The line itself is defined in globals.css; this
//     observer adds `.line-visible` when a section scrolls into view,
//     triggering the scaleX(0 → 1) transition.
//
//  2. Staggered fade/slide reveal of section contents. For every
//     <section> that doesn't opt out with `.no-reveal`, we auto-mark
//     its primary-container children with `.reveal` + a CSS
//     `--reveal-delay` (60ms stagger, capped at index 3). A second
//     IntersectionObserver adds `.revealed` when the element enters
//     viewport, flipping opacity/transform.
//
// Auto-targeting keeps per-component churn to zero: every section that
// wraps its body in `.container-content` gets reveal behavior for free.
export default function ScrollReveal() {
  useLayoutEffect(() => {
    const STAGGER_MS = 60
    const STAGGER_CAP = 3 // indices 0..3 → 0, 60, 120, 180ms; cap after that

    // ── 1. Section top-line observer ──────────────────────────────────
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('section:not(.no-top-line)')
    )

    const lineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('line-visible')
            lineObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )
    sections.forEach((s) => lineObserver.observe(s))

    // ── 2. Auto-mark reveal targets ───────────────────────────────────
    const revealSections = document.querySelectorAll<HTMLElement>(
      'section:not(.no-reveal)'
    )

    const revealTargets: HTMLElement[] = []

    revealSections.forEach((section) => {
      // Prefer children of the primary container. Fall back to direct
      // section children when no container is used.
      const container = section.querySelector<HTMLElement>(':scope > .container-content')
        ?? section.querySelector<HTMLElement>('.container-content')
      const host = container ?? section

      const children = Array.from(host.children) as HTMLElement[]
      children.forEach((child, i) => {
        if (child.classList.contains('no-reveal')) return
        child.classList.add('reveal')
        const delay = Math.min(i, STAGGER_CAP) * STAGGER_MS
        child.style.setProperty('--reveal-delay', `${delay}ms`)
        revealTargets.push(child)
      })
    })

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    revealTargets.forEach((el) => revealObserver.observe(el))

    return () => {
      lineObserver.disconnect()
      revealObserver.disconnect()
    }
  }, [])

  return null
}
