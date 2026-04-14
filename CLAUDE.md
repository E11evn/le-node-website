# CLAUDE.md — le-node Website

Context for AI assistants working in this repo.

## What This Is

The le-node agency website. Built with Next.js, Tailwind CSS, and deployed on Vercel.

## Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Repo:** E11evn/le-node-website (GitHub → auto-deploy on Vercel)

## Page Structure

### `/` (OS product page — `/os` redirects here)

Section order:
1. **Nav** — sticky, dark bg, mode toggle (le node / agence), CTA
2. **Hero** — animated background, NodeLoader, H1, description, two CTAs (primary filled + secondary stroke/outlined)
3. **Trusted by** — placeholder logo strip
4. **How it works** — 5-step vertical timeline
5. **Why le-node** — 3-card grid
6. **CTABanner** — blue gradient pre-footer
7. **Footer**

Living document: `os-page-structuration.md` (edit text/structure here, then ask Claude to apply)

### `/agence` (Agency page)

Separate page for the agency offering.

## Key Components

| Component | File | Notes |
|---|---|---|
| Hero | `components/Hero.tsx` | Animated bg, NodeLoader, two-CTA layout |
| HeroBackground | `components/HeroBackground.tsx` | SVG grid + floating tool icons + beam animation |
| NodeLoader | `components/NodeLoader.tsx` | 60px spinner, idle/computing states |
| HowItWorks | `components/HowItWorks.tsx` | 5-step vertical timeline |
| WhyLeNode | `components/WhyLeNode.tsx` | 3 differentiator cards |
| CTABanner | `components/CTABanner.tsx` | Blue gradient section |
| Nav | `components/Nav.tsx` | Sticky, context-aware CTA |
| Footer | `components/Footer.tsx` | Links + copyright |
| ScrollReveal | `components/ScrollReveal.tsx` | Intersection observer for reveal animations |

## Design Tokens

- **OS blue:** `#0000FA` / `#0043FA`
- **Agency orange:** `#FA7900` / `#FA9E00`
- **Foreground:** `#1D1D22`
- **Muted text:** via `text-muted` class
- **Border:** via `border-border` class

## Button Styles (globals.css)

- `.btn-primary` — blue gradient fill, white text
- `.btn-agency` — orange gradient fill, white text
- `.btn-secondary` — transparent bg, dark border, dark text (stroke style)

## SVG Animation Pattern

Always use `pathLength="1"` + `strokeDasharray: 1` for SVG draw animations. Using bare pixel values (e.g. `dasharray: 200`) causes the animation to complete in under 10% of its duration. See memory for details.

## Claude Code Skills

### Absorb

**Trigger phrases:** "absorb this", "extract what's useful from", "integrate the good parts of", "compare this to what we have"

Use when handing over any external resource (a competitor site, a design reference, a copy doc, a component library) to selectively extract value. The skill produces a **delta map** classifying each difference (net new / better approach / overlap / already stronger / irrelevant), presents only actionable items as explicit choices, and applies nothing until you approve. Never absorbs wholesale — always curates first.

Skill file: `.claude/skills/absorb/SKILL.md`
