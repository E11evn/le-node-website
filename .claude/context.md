# Project Context
> For Claude Code — last updated 2026-04-13

## What This Is
Marketing website for le-node, a GTM automation platform with two offerings: an AI-native OS product (primary, served at `/`) and a GTM consulting agency arm (`/agence`).

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
| / | app/page.tsx | OS product home: hero, integrations, use cases, how-it-works, CTA |
| /agence | app/agence/page.tsx | Agency page: hero, problem, approach, deliverables, CTA |
| /about | app/about/page.tsx | Company description (two-arm model), bilingual |
| /book | app/book/page.tsx | Google Calendar iframe booking widget |
| /waitlist | app/waitlist/page.tsx | Email signup with Formspree, dark background |
| /privacy | app/privacy/page.tsx | GDPR privacy policy (French) |
| /legal | app/legal/page.tsx | Legal notice (French) |

`/os` is a permanent redirect to `/` (configured in `next.config.mjs`) to preserve external backlinks from the prior split-screen era.

## Components
| Component | File | What it does |
|-----------|------|-------------|
| Hero | components/Hero.tsx | Home hero (`'use client'`): lifts `computing` state, passes `onSetComputing` to HeroBackground and `computing` to NodeLoader; marked `no-top-line no-reveal` (above-the-fold exemption) |
| HeroBackground | components/HeroBackground.tsx | Animated background: grid lines, 12 floating tool icons, grey dotted paths + colored beams; rAF-driven stroke-dashoffset animation; beam uses SVG `feGaussianBlur` glow filter; triggers `computing` pulse between tool switches |
| NodeLoader | components/NodeLoader.tsx | 60px spinning-rings loader; accepts `computing?: boolean`; orbit wrappers pulse at distinct rates; center core intensifies glow during computing |
| Nav | components/Nav.tsx | Sticky nav; logo + OS/agence toggle (OS tab links to `/`); context-aware CTA (waitlist vs book-a-call) via usePathname |
| Footer | components/Footer.tsx | Links to all pages + copyright (le node OS link → `/`) |
| IntegrationDiagram | components/IntegrationDiagram.tsx | SVG flow diagram: 5 inputs → le-node hub → 3 outputs, animated dashed lines |
| UseCases | components/UseCases.tsx | 6 use-case cards (2 span full width) |
| HowItWorks | components/HowItWorks.tsx | 3-step numbered process (Connect → Define → Run) |
| WhyLeNode | components/WhyLeNode.tsx | 3 differentiator cards |
| CTABanner | components/CTABanner.tsx | Blue gradient CTA section |
| ScrollReveal | components/ScrollReveal.tsx | Sitewide motion observer: (1) adds `.line-visible` to sections on scroll for animated top borders; (2) auto-marks section content children with `.reveal` + staggered `--reveal-delay` and flips `.revealed` on viewport entry |
| AgencyHero | components/agency/AgencyHero.tsx | Agency hero with orange badge, two CTAs, social proof; marked `no-reveal` (above-the-fold) |
| AgencyProblem | components/agency/AgencyProblem.tsx | 6 pain-point cards on dark background |
| AgencyApproach | components/agency/AgencyApproach.tsx | Interactive waveform scrubber showing 3 phases (Audit / Implement / Scale) |
| AgencyDeliverables | components/agency/AgencyDeliverables.tsx | 8 deliverables, 2 service tiers, fit assessment |
| AgencyCTA | components/agency/AgencyCTA.tsx | Orange gradient CTA section |

## Utilities / Hooks / Types
| Name | File | Purpose |
|------|------|---------|
| globals.css | app/globals.css | Base styles, animated section borders (`::before` scaleX), vertical frame line keyframes (`.vline`), scroll-reveal primitive (`.reveal` / `.revealed`), unified `--line-color` token, component classes |
| tailwind.config.ts | tailwind.config.ts | Custom colors, fonts (display/display-sm), spacing (content max-width) |
| next.config.mjs | next.config.mjs | `/os` → `/` permanent redirect |

## Assets & Public Resources
- `/public/logos/` — PNG tool logos: clay, dropcontact, salesforce, hubspot, google, slack, linkedin, webhook, notion, claude, apollo, pipedrive (+ more for IntegrationDiagram)
- `/public/logo.png` — le-node wordmark used in Nav

(Removed 2026-04-13: `/public/bgos.jpg` and `/public/bg-office.png` — split-screen background images, no longer needed.)

## Motion system
- **Easing:** `cubic-bezier(0.22, 0.61, 0.36, 1)` (ease-out cubic) is the shared tempo across beam animation, section top lines, vertical frame lines, and content reveals.
- **Line color:** `rgba(128, 128, 128, 0.22)` via `--line-color` — works on both light and dark section backgrounds.
- **Horizontal section lines:** `::before` pseudo-element on every `<section>` except those with `.no-top-line`. `scaleX(0 → 1)` over 0.8s, origin left. Triggered by ScrollReveal adding `.line-visible`.
- **Vertical frame lines (`.vline`):** `scaleY(0 → 1)` over 1.0s on initial paint with 150ms delay, origin top.
- **Content reveal (`.reveal`):** `opacity 0 → 1` + `translateY(14px → 0)` over 0.6s when the element crosses ~12% viewport visibility. Stagger: 60ms per sibling, capped at index 3 (max 180ms). Fires once.
- **Above-the-fold exemption:** Sections marked `.no-reveal` (Hero, AgencyHero) render immediately at mount — their children are not observed.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` forces all reveals to final state and disables vline + dot-glow animations.

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
- `'use client'` required on any component using useState/useEffect/usePathname/useLayoutEffect
- Sections auto-reveal children inside `.container-content` with 60ms stagger on viewport entry. Opt out of the top line with `.no-top-line`, opt out of content reveal with `.no-reveal`. Hero and AgencyHero use both.
- ScrollReveal runs once at mount via `useLayoutEffect` — applies `.reveal` before first paint so content doesn't flash visible then fade out.
- Agency components live in `components/agency/`
- Page sections use `py-20 md:py-28` padding (set in globals.css base layer)

## Implementation History
- Split-screen home page directing users to /os or /agence (retired 2026-04-13)
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
- 2026-04-13: Retired split-screen landing. `/` now serves the OS product page (content moved from `/os`); `/os` is a permanent redirect. Deleted `SplitScreen.tsx`, `bgos.jpg`, `bg-office.png`. Replaced `SectionLineObserver` with `ScrollReveal` — unified observer powering both section top-line animation and sitewide staggered content reveal on scroll. Vertical frame lines in `app/layout.tsx` now animate scaleY(0→1) on page load. Horizontal section line color unified to `rgba(128,128,128,0.22)` so dividers read against all section backgrounds on `/agence`. Added `no-reveal` escape hatch for Hero and AgencyHero. `prefers-reduced-motion` handling added for all new animations.
