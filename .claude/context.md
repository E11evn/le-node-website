# Project Context
> For Claude Code — last updated 2026-04-08

## What This Is
Marketing website for le-node, a GTM automation platform with two offerings: an AI-native OS product and a GTM consulting agency arm.

## Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v3 with custom design tokens
- **Deployment:** Vercel
- **Fonts:** Geist Sans + Geist Mono (via `geist` npm package)
- **Forms:** Formspree (waitlist page)
- **Key libraries:** React 18, TypeScript 5

## Routes & Pages
| Route | File | Purpose |
|-------|------|---------|
| / | app/page.tsx | Split-screen home — links to /os and /agence |
| /os | app/os/page.tsx | OS product page: hero, integrations, use cases, how-it-works, CTA |
| /agence | app/agence/page.tsx | Agency page: hero, problem, approach, deliverables, CTA |
| /about | app/about/page.tsx | Company description (two-arm model), bilingual |
| /book | app/book/page.tsx | Google Calendar iframe booking widget |
| /waitlist | app/waitlist/page.tsx | Email signup with Formspree, dark background |
| /privacy | app/privacy/page.tsx | GDPR privacy policy (French) |
| /legal | app/legal/page.tsx | Legal notice (French) |

## Components
| Component | File | What it does |
|-----------|------|-------------|
| Hero | components/Hero.tsx | /os hero (80vh max): tag badge → h1 → NodeLoader spacer (100px) → description → CTA; NodeLoader absolutely centered, equal gap from h1 and tagline |
| HeroBackground | components/HeroBackground.tsx | Animated background: grid lines, 12 floating tool icons, grey connection paths (stroke-dashoffset progressive draw) + colored beam pulses (same-width overlay traveling inside path) cycling between tools and NodeLoader |
| NodeLoader | components/NodeLoader.tsx | 80px spinning-rings loader in brand palette (blue #0043FA / dark #1D1D22); no text |
| Nav | components/Nav.tsx | Sticky nav; context-aware CTA (waitlist vs book-a-call) via usePathname |
| Footer | components/Footer.tsx | Links to all pages + copyright |
| SplitScreen | components/SplitScreen.tsx | Home page two-panel layout with hover overlays and scale effect |
| IntegrationDiagram | components/IntegrationDiagram.tsx | SVG flow diagram: 5 inputs → le-node hub → 3 outputs, animated dashed lines |
| UseCases | components/UseCases.tsx | 6 use-case cards (2 span full width) |
| HowItWorks | components/HowItWorks.tsx | 3-step numbered process (Connect → Define → Run) |
| WhyLeNode | components/WhyLeNode.tsx | 3 differentiator cards |
| CTABanner | components/CTABanner.tsx | Blue gradient CTA section |
| SectionLineObserver | components/SectionLineObserver.tsx | IntersectionObserver utility: adds `.line-visible` to sections on scroll to trigger animated top border |
| AgencyHero | components/agency/AgencyHero.tsx | Agency hero with orange badge, two CTAs, social proof |
| AgencyProblem | components/agency/AgencyProblem.tsx | 6 pain-point cards on dark background |
| AgencyApproach | components/agency/AgencyApproach.tsx | Interactive waveform scrubber showing 3 phases (Audit / Implement / Scale) |
| AgencyDeliverables | components/agency/AgencyDeliverables.tsx | 8 deliverables, 2 service tiers, fit assessment |
| AgencyCTA | components/agency/AgencyCTA.tsx | Orange gradient CTA section |

## Utilities / Hooks / Types
| Name | File | Purpose |
|------|------|---------|
| globals.css | app/globals.css | Base styles, animated section borders, component classes (btn-primary, btn-agency, btn-secondary, card, container-content, section-eyebrow) |
| tailwind.config.ts | tailwind.config.ts | Custom colors, fonts (display/display-sm), spacing (content max-width) |

## Assets & Public Resources
- `/public/logos/` — PNG tool logos: clay, dropcontact, salesforce, hubspot, google, slack, linkedin, webhook, notion, claude, apollo, pipedrive (+ more for IntegrationDiagram)
- `/public/logo.png` — le-node wordmark used in Nav
- `/public/bgos.jpg` — Background image for SplitScreen OS panel
- `/public/bg-office.png` — Background image for SplitScreen agence panel

## Conventions & Rules
- Brand colors: blue `#0043FA` (OS/product), orange `#FA7900` (agence), dark `#1D1D22` (text/UI)
- Percentage-based positioning for HeroBackground tool icons (x/y in 0–100 space matching a 100×100 SVG viewBox)
- SVG animations always use `pathLength="1"` + `stroke-dasharray/dashoffset` — never bare pixel dash values (they complete in <10% of duration)
- Grey path + beam use two-layer architecture: visual dotted `<line>` (`vectorEffect="non-scaling-stroke"`, `strokeDasharray="0 9"`, `strokeLinecap="round"`, 2.5px) for consistent px dot spacing + `<mask>` with thick SMIL-animated line (`pathLength="1"`) controlling which portion is visible. SMIL `<animate>` MUST use `begin="indefinite"` + ref callback `el.beginElement()` — default `begin="0s"` fires relative to document timeline, not element insertion, causing instant reveal
- Grey connection path: dotted line revealed progressively via mask dashoffset `1→0` (0.6s); retracts via dashoffset `0→1` (0.4s)
- Traveling beam: same dot pattern as grey, colored with tool color, masked by a short 18%-length window (`dasharray="0.18 0.82"`, `dashoffset 0.18→-1`, 0.7s) that sweeps start to end
- `'use client'` required on any component using useState/useEffect/usePathname
- Sections get animated top border via SectionLineObserver unless they have the `no-top-line` class
- Agency components live in `components/agency/`
- Page sections use `py-20 md:py-28` padding (set in globals.css base layer)

## Implementation History
- Split-screen home page directing users to /os or /agence
- Full /os product page: grid-based hero background with 12 floating tool icons, beam animation, integration diagram, use cases, how-it-works, why le-node, CTA banner
- Full /agence consulting page: interactive waveform phase scrubber (AgencyApproach), deliverables table with two service tiers
- Scroll-triggered animated section top borders via IntersectionObserver
- HeroBackground animation refactored: beam now uses `pathLength="1"` pattern to fix sub-10% completion bug
- Hero redesign (/os): added "AI-native operating system" pill tag above h1; moved CTA below description paragraph; replaced CTA beam target with NodeLoader (spinning ring, blue/dark palette); animation rearchitected to 8-phase cycle (left tool activates → grey line draws node→tool → colored spark travels tool→node → line rewinds → grey line draws node→right tool → colored spark travels node→tool → right tool activates → line rewinds); Clay logo reduced from 38px to 28px; hero min-height increased to 100vh
- NodeLoader refined: scaled to 120px; hero spacer reduced to 180px
- HeroBackground animation fully rewritten with mask-based approach: visual dotted lines (`strokeDasharray="0 9"`, round caps, 2.5px, `vectorEffect`) masked by thick SMIL-animated lines (`pathLength="1"`) for progressive reveal/travel; beam uses same dot pattern as grey, colored per-tool, masked by a short traveling window; both layers separated so px-based spacing and pathLength-based animation don't conflict
- Critical SMIL fix: `<animate>` elements must use `begin="indefinite"` + `el.beginElement()` ref callback — default `begin="0s"` fires relative to document load timeline, not DOM insertion, so dynamically added elements showed the animation's end state instantly
- Hero reduced to 80vh max; NodeLoader scaled to 80px; spacer 100px; h1 mb-4 for equal NodeLoader gap
