# Project Context
> For Claude Code — last updated 2026-04-14

## What This Is
Marketing website for le-node, a GTM automation platform with two offerings: an AI-native OS product (served at `/`) and a GTM consulting agency arm (`/agence`).

## Stack
- **Framework:** Next.js 14.2 (App Router)
- **Styling:** Tailwind CSS v3 with custom design tokens
- **Deployment:** Vercel (auto-deploy from GitHub `E11evn/le-node-website`)
- **Fonts:** Geist Sans + Geist Mono (via `geist` npm package)
- **Key libraries:** React 18, TypeScript 5

## Routes & Pages
| Route | File | Purpose |
|-------|------|---------|
| / | app/page.tsx | OS product home: hero → social proof → how-it-works → why-le-node → CTA |
| /os | — | Permanent redirect → `/` (next.config.mjs) |
| /agence | app/agence/page.tsx | Agency page: hero, problem, approach, deliverables, CTA |
| /about | app/about/page.tsx | Company description (two-arm model), bilingual |
| /book | app/book/page.tsx | Google Calendar iframe booking widget |
| /waitlist | app/waitlist/page.tsx | Email signup with Formspree, dark background |
| /privacy | app/privacy/page.tsx | GDPR privacy policy (French) |
| /legal | app/legal/page.tsx | Legal notice (French) |

## Components
| Component | File | What it does |
|-----------|------|-------------|
| Hero | components/Hero.tsx | Home hero (`'use client'`): "AI-native operating system" pill tag, H1 "Your GTM Motion, on Autopilot.", description, primary filled CTA (Join waitlist → /waitlist) + secondary stroke/outlined CTA (Discover how that works, anchors `#how-it-works`); marked `no-top-line no-reveal` |
| HeroBackground | components/HeroBackground.tsx | Animated background: grid lines, 12 floating tool icons, grey dotted paths + colored beams; rAF-driven stroke-dashoffset animation; beam uses SVG `feGaussianBlur` glow; triggers `computing` pulse between tool switches |
| NodeLoader | components/NodeLoader.tsx | 60px spinning-rings loader; accepts `computing?: boolean`; orbit wrappers pulse at distinct rates; center core intensifies glow during computing |
| HowItWorks | components/HowItWorks.tsx | 5-step vertical timeline; eyebrow "How does it work", H2 "Plug and play. 24/7. Dead easy."; numbered badges 01–05 with vertical spine line; `id="how-it-works"` |
| WhyLeNode | components/WhyLeNode.tsx | H2 "Best-in-class GTM stack." + intro paragraph + 3 differentiator cards (Dead simple setup / Fast time to value / No technical lift) |
| CTABanner | components/CTABanner.tsx | Blue gradient CTA section ("Ready to automate your GTM?") |
| Nav | components/Nav.tsx | Sticky nav; logo + OS/agence toggle; context-aware CTA (Join waitlist on OS, Book a call on agency) via `usePathname` |
| Footer | components/Footer.tsx | Links to all pages + copyright |
| ScrollReveal | components/ScrollReveal.tsx | Sitewide motion observer: (1) adds `.line-visible` to sections for animated top borders; (2) auto-marks section content children with `.reveal` + staggered `--reveal-delay`, fires `.revealed` on viewport entry |
| AgencyHero | components/agency/AgencyHero.tsx | Agency hero with orange badge, two CTAs; marked `no-reveal` |
| AgencyProblem | components/agency/AgencyProblem.tsx | 6 pain-point cards on dark background |
| AgencyApproach | components/agency/AgencyApproach.tsx | Interactive waveform scrubber showing 3 phases (Audit / Implement / Scale) |
| AgencyDeliverables | components/agency/AgencyDeliverables.tsx | 8 deliverables, 2 service tiers, fit assessment |
| AgencyCTA | components/agency/AgencyCTA.tsx | Orange gradient CTA section |
| IntegrationDiagram | components/IntegrationDiagram.tsx | SVG flow: 5 inputs → le-node hub → 3 outputs — built but not currently used on any page |
| UseCases | components/UseCases.tsx | 6 use-case cards — built but not currently used on any page |

## Utilities / Hooks / Types
| Name | File | Purpose |
|------|------|---------|
| globals.css | app/globals.css | Base styles, section border animation (`::before` scaleX), vline keyframes, scroll-reveal primitives (`.reveal`/`.revealed`), `--line-color` token, `.btn-primary` / `.btn-agency` / `.btn-secondary` classes |
| tailwind.config.ts | tailwind.config.ts | Custom colors, fonts (text-display / text-display-sm), spacing (max-w-content) |
| next.config.mjs | next.config.mjs | `/os` → `/` permanent redirect |

## Assets & Public Resources
- `/public/logos/` — PNG tool logos: clay, dropcontact, salesforce, hubspot, google, slack, linkedin, webhook, notion, claude, apollo, pipedrive, ga4, segment, webflow, meta, gmail, teams, airtable, fullenrich, gads, db, code, le-node-alt, le-node-notext
- `/public/logo.png` — le-node wordmark used in Nav

## Living Documents
- `os-page-structuration.md` — OS page structure doc (`<aside>` blocks per section, verbatim copy + spec notes). Edit text/structure here, then ask Claude to apply to the codebase.

## Motion System
- **Easing:** `cubic-bezier(0.22, 0.61, 0.36, 1)` shared across beam, section lines, vlines, content reveals
- **Line color:** `rgba(128, 128, 128, 0.22)` via `--line-color`
- **Horizontal section lines:** `::before` on every `<section>` except `.no-top-line`; `scaleX(0→1)` over 0.8s, origin left, triggered by `.line-visible`
- **Vertical frame lines (`.vline`):** `scaleY(0→1)` over 1.0s at paint, 150ms delay, origin top
- **Content reveal (`.reveal`):** `opacity 0→1` + `translateY(14px→0)` over 0.6s on ~12% viewport entry; 60ms stagger per sibling, capped at index 3 (max 180ms); fires once
- **Above-the-fold exemption:** `.no-reveal` prevents observer on Hero and AgencyHero
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` forces all reveals to final state, disables vline + dot-glow

## Conventions & Rules
- Brand colors: blue `#0043FA` / `#0000FA` (OS), orange `#FA7900` / `#FA9E00` (agence), dark `#1D1D22` (text/UI)
- Secondary/stroke button style: transparent bg, `border border-[#1D1D22]`, dark text, `hover:bg-black/5` — inline this on the hero rather than using `.btn-secondary` (which targets light-bg page contexts)
- SVG draw animations: always `pathLength="1"` + dasharray in 0–1 space. Bare pixel dasharray values complete in <10% of duration
- HeroBackground: two-layer mask — visual dotted `<line>` (`vectorEffect="non-scaling-stroke"`) + `<mask>` thick `<line>` (`pathLength="1"`). Never combine both on the same element (conflict under `preserveAspectRatio="none"`)
- Animation driven by `requestAnimationFrame` + direct `setAttribute` on refs — no SMIL (unreliable with React)
- NodeLoader computing: scale animation on wrapper div (not the spinning div) — avoids merging multiple CSS animations
- `'use client'` required on useState / useEffect / usePathname / useLayoutEffect
- Sections auto-reveal children inside `.container-content`; opt out with `.no-top-line` or `.no-reveal`
- Agency components live in `components/agency/`

## Implementation History
- Built full /os product page: animated hero background with 12 floating tool icons + beam, integration diagram, use cases, how-it-works (3-step), why-le-node (3 cards), CTA banner
- Built full /agence page: AgencyHero, AgencyProblem pain-point cards, AgencyApproach waveform scrubber, AgencyDeliverables with two service tiers, AgencyCTA
- Retired split-screen landing (2026-04-13): `/` now serves OS product directly, `/os` is a permanent redirect
- Replaced `SectionLineObserver` with unified `ScrollReveal` — single observer for top-border animation and staggered content reveal sitewide
- HeroBackground animation rewritten from SMIL to `requestAnimationFrame` — eliminated flicker from SMIL inside `<defs>`/`<mask>` with React
- NodeLoader resized 80px → 60px; computing state added with orbit pulse and core glow
- Hero animation starts with Google + Slack pair; tag + h1 raised 48px via negative marginTop wrapper
- Clay beam color set to red `#EF4444`; beam strokeWidth 3→4 with feGaussianBlur glow
- 2026-04-14: OS page synced to Notion spec — removed IntegrationDiagram, UseCases, and "What is le-node" from page (components remain in repo but unused). Hero H1 → "Your GTM Motion, on Autopilot.", description updated to Notion copy. Secondary CTA added as stroke/outlined button ("Discover how that works", no arrow, anchors `#how-it-works`). HowItWorks redesigned from 3-step horizontal grid to 5-step vertical timeline with Notion content. WhyLeNode headline → "Best-in-class GTM stack." with intro paragraph. `os-page-structuration.md` created as living document. CLAUDE.md expanded with full stack/component/convention reference.
