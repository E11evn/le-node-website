'use client'

import { useEffect } from 'react'

// Observes every <section> that doesn't have .no-top-line and adds
// .line-visible when it scrolls into view, triggering the animated
// top border line defined in globals.css.
export default function SectionLineObserver() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section:not(.no-top-line)')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('line-visible')
            observer.unobserve(entry.target) // animate once
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )

    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return null
}
