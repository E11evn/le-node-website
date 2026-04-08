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
| Hero | components/Hero.tsx | /os hero (`'use client'`): lifts `computing` state, passes `onSetComputing` to HeroBackground and `computing` to NodeLoader; tag + h1 wrapped in div with `marginTop: -48px` to sit higher; 100px spacer for NodeLoader; NodeLoader absolutely centered |
| HeroBackground | components/HeroBackground.tsx | Animated background: grid lines, 12 floating tool icons, grey dotted paths + colored beams; accepts `onSetComputing` prop; animation starts Google→Slack (leftCursor/rightCursor init at 2); beam uses SVG `feGaussianBlur` glow filter + strokeWidth 4; after beam returns to node, triggers 1400ms computing pulse before routing to right tool |
| NodeLoader | components/NodeLoader.tsx | 60px spinning-rings loader; accepts `computing?: boolean`; when computing, each orbit wrapper animates scale at distinct rate/amplitude (nlPulse0–3, 0.38–0.70s) and center core uses nlCorePulse (scale 1→2.4 + glow intensify) |
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
- Clay tool beam color is red `#EF4444` (differs from other tools which use their brand color)
- Percentage-based positioning for HeroBackground tool icons (x/y in 0–100 space matching a 100×100 SVG viewBox)
- HeroBackground animation uses two-layer mask architecture: visual dotted `<line>` (`vectorEffect="non-scaling-stroke"`, `strokeDasharray="0 9"`, `strokeLinecap="round"`) for consistent px dot spacing + `<mask>` with thick `<line>` (`pathLength="1"`) controlling which portion is visible. Never combine `pathLength` and `vectorEffect` on the same element (they conflict under `preserveAspectRatio="none"`)
- Animation is driven by `requestAnimationFrame` with direct `setAttribute` on refs — no SMIL `<animate>` elements (SMIL inside `<defs>`/`<mask>` is unreliable with React state updates, causes flicker)
- SVG mask + visual line pairs are persistent singletons (stable mask IDs, no remounting). Coordinates updated imperatively via refs each cycle
- Grey path: mask dashoffset `1→0` draw (1.2s), `0→-1` rewind (0.8s). Rewind direction `0→-1` hides from the tool end back toward nodeloader
- Beam: mask `dasharray="0.18 2"` (pattern total > pathLength to prevent tiling), dashoffset `0.18→-1` (1.4s). Gap must exceed 1.0 or a second beam window appears at the start as the first exits
- NodeLoader computing pulsation: each ring is wrapped in an absolute `inset:0` div with `transformOrigin:50% 50%`; the wrapper animates scale while the inner div continues spinning — this avoids needing to merge multiple CSS animations on one element
- `'use client'` required on any component using useState/useEffect/usePathname
- Sections get animated top border via SectionLineObserver unless they have the `no-top-line` class
- Agency components live in `components/agency/`
- Page sections use `py-20 md:py-28` padding (set in globals.css base layer)

## Implementation History
- Split-screen home page directing users to /os or /agence
- Full /os product page: grid-based hero background with 12 floating tool icons, beam animation, integration diagram, use cases, how-it-works, why le-node, CTA banner
- Full /agence consulting page: interactive waveform phase scrubber (AgencyApproach), deliverables table with two service tiers
- Scroll-triggered animated section top borders via IntersectionObserver
- Hero redesign (/os): "AI-native operating system" pill tag above h1; NodeLoader spinning ring absolutely centered; 10-step animation cycle: left tool activates → grey path draws node→tool → beam travels tool→node → path rewinds → computing pulse → grey path draws node→right tool → beam travels node→tool → right tool activates → path rewinds
- HeroBackground animation rewritten from SMIL to requestAnimationFrame with imperative refs — eliminated flicker caused by SMIL `<animate>` inside `<defs>`/`<mask>` interacting unreliably with React state updates and key remounting
- NodeLoader resized 80px → 60px; computing state added: orbits pulse at staggered scales/rates (4 keyframes), center core enlarges + glows
- Hero animation cycle starts with Google + Slack pair (leftCursor/rightCursor init at index 2 in their respective side arrays)
- Beam brightness improved: strokeWidth 3→4, feGaussianBlur glow filter added to beam visual line
- Clay beam color changed to red (#EF4444) to distinguish it from other tools
- Tag + h1 raised 48px higher in hero layout via negative marginTop wrapper
