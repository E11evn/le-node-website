# Project Context
> For Claude Code — last updated 2026-04-15

## What This Is
Marketing website for le-node, a GTM automation platform with two offerings: an AI-native OS product (served at `/`) and a GTM consulting agency arm (`/agence`).

## Stack
- **Framework:** Next.js 14.2 (App Router)
- **Styling:** Tailwind CSS v3 with custom design tokens
- **Deployment:** Vercel (auto-deploy from GitHub `E11evn/le-node-website`)
- **Fonts:** Geist Sans + Geist Mono (global); NanumMyeongjo + Open Sans loaded via `next/font/google` on `/sandbox` only
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
| /sandbox | app/sandbox/page.tsx | Isolated staging page (noindex); Nav + SandboxHero + empty 100vh section for scroll |

## Components
| Component | File | What it does |
|-----------|------|-------------|
| Hero | components/Hero.tsx | Home hero (`'use client'`): tag pill, H1, description, primary + stroke CTAs; `no-top-line no-reveal` |
| HeroBackground | components/HeroBackground.tsx | Animated background: grid lines, 12 floating tool icons, grey dotted path + colored beam; rAF stroke-dashoffset; triggers `computing` pulse |
| NodeLoader | components/NodeLoader.tsx | 60px spinning-rings loader; `computing` prop pulses orbits + core glow |
| HowItWorks | components/HowItWorks.tsx | 5-step vertical timeline; `id="how-it-works"` |
| WhyLeNode | components/WhyLeNode.tsx | H2 + 3 differentiator cards |
| CTABanner | components/CTABanner.tsx | Blue gradient pre-footer CTA section |
| Nav | components/Nav.tsx | Sticky nav; logo + OS/agence mode toggle; context-aware CTA via `usePathname` |
| Footer | components/Footer.tsx | Links to all pages + copyright |
| ScrollReveal | components/ScrollReveal.tsx | Sitewide observer: `.line-visible` on sections + staggered `.reveal`/`.revealed` on content children |
| SandboxHero | components/SandboxHero.tsx | `/sandbox` full-screen hero; see "Sandbox Hero" section below |
| AgencyHero | components/agency/AgencyHero.tsx | Agency hero, orange badge, two CTAs; `no-reveal` |
| AgencyProblem | components/agency/AgencyProblem.tsx | 6 pain-point cards on dark background |
| AgencyApproach | components/agency/AgencyApproach.tsx | Interactive waveform scrubber (3 phases: Audit / Implement / Scale) |
| AgencyDeliverables | components/agency/AgencyDeliverables.tsx | 8 deliverables, 2 service tiers, fit assessment |
| AgencyCTA | components/agency/AgencyCTA.tsx | Orange gradient CTA section |
| IntegrationDiagram | components/IntegrationDiagram.tsx | SVG flow diagram — built but not used on any page |
| UseCases | components/UseCases.tsx | 6 use-case cards — built but not used on any page |

## Sandbox Hero — Layer Stack
`SandboxHero` is the `/sandbox` page's full-screen hero. All layers are flat siblings (no nested stacking contexts) keyed off `ANIM_CENTER_TOP = '62%'`.

| z | Layer | Implementation detail |
|---|---|---|
| 0 | Black hole video | `/public/nodesingularity.webm`; `height: 124%` pushes black hole center to 62% of viewport |
| 1 | Hero layer blur | `rgba(15,15,17,0.34)` full-viewport dark overlay |
| 2 | Orbiting tools | 3 rings (inner 92px CW 54s / middle 168px CCW 75s / outer 248px CW 102s); 12 icons, 30×30px boxes, 20-21px logos, `opacity: 0.8`, no box-shadow |
| 3 | Dark gradient vignette | `radial-gradient` transparent center → `#0F0F11` at 88% — masks orbital extremes |
| 4 | Ripple | 7 concentric rings, `START=83px STEP=44px`; `ripple-pulse` keyframe (scale 1↔0.94, 2.5s); circles are direct children of 0×0 container — keyframe `translate(-50%,-50%)` centers them |
| 5 | Section blur | Starts at `ANIM_CENTER_TOP`; `linear-gradient` transparent→`#0F0F11`; `backdropFilter: blur(8px)` |
| 6 | le-node logo | `/public/logos/lenode-badge.png`; centered at `ANIM_CENTER_TOP` (section blur top bisects logo) |
| 50 | Content | Tag pill + H1 (40px NanumMyeongjo) + tagline + email input (white bg) + button; 50px gap between each element |
| 60 | "Connect…" footer text | NanumMyeongjo, `rgba(240,242,255,0.20)`, bottom 1.5rem |

## Sandbox Layout
`app/sandbox/layout.tsx` — loads NanumMyeongjo + Open Sans via `next/font/google`, exposes `--font-nanum` and `--font-open-sans` CSS variables on a wrapper div.

## Utilities / Hooks / Types
| Name | File | Purpose |
|------|------|---------|
| globals.css | app/globals.css | Section border animation, vline keyframes, `.reveal`/`.revealed`, `--line-color`, `.btn-primary` / `.btn-agency` / `.btn-secondary`, `dot-glow` keyframe + `.animate-dot-glow` |
| tailwind.config.ts | tailwind.config.ts | Custom colors (`accent #0043FA`, `agency #FA7900`, etc.), `text-display`, `max-w-content` |
| next.config.mjs | next.config.mjs | `/os` → `/` permanent redirect |

## Assets & Public Resources
- `/public/logos/` — PNG tool logos: clay, dropcontact, salesforce, hubspot, google, slack, linkedin, webhook, notion, claude, apollo, pipedrive + extras (ga4, segment, webflow, meta, gmail, teams, airtable, fullenrich, gads, db, code, le-node-alt, le-node-notext, lenode-badge)
- `/public/logo.png` — le-node wordmark used in Nav
- `/public/logos/lenode-badge.png` — large blue badge logo used in SandboxHero (from `LOGO LENODE.png` reference)
- `/public/nodesingularity.webm` — black hole video, background of SandboxHero

## Living Documents
- `os-page-structuration.md` — OS page copy/structure doc. Edit text here, then ask Claude to apply.

## Motion System
- **Easing:** `cubic-bezier(0.22, 0.61, 0.36, 1)` shared across beam, section lines, vlines, content reveals
- **Line color:** `rgba(128, 128, 128, 0.22)` via `--line-color`
- **Horizontal section lines:** `::before` on every `<section>` except `.no-top-line`; `scaleX(0→1)` over 0.8s, triggered by `.line-visible`
- **Content reveal:** `opacity 0→1` + `translateY(14px→0)` over 0.6s on ~12% viewport entry; 60ms stagger per sibling (max 180ms); fires once
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` forces reveals to final state, disables vline + dot-glow
- **SVG draw:** always `pathLength="1"` + dasharray in 0–1 space — bare pixel values complete in <10% of duration

## Conventions & Rules
- Brand colors: blue `#0043FA` / `#0000FA` (OS), orange `#FA7900` / `#FA9E00` (agence), dark `#1D1D22`
- Sandbox design tokens: white `#F0F2FF`, dark `#0F0F11`, blue `#0043FA`
- Secondary/stroke button: transparent bg, `border border-[#1D1D22]`, inline on hero (`.btn-secondary` targets light-bg pages)
- SVG mask pattern: visual `<line>` (`vectorEffect="non-scaling-stroke"`) + mask `<line>` (`pathLength="1"`); never both on the same element under `preserveAspectRatio="none"`
- `rAF` + `setAttribute` on refs for animation — no SMIL
- `'use client'` on any file using useState / useEffect / usePathname
- Sections auto-reveal; opt out with `.no-top-line` or `.no-reveal`
- Ripple in SandboxHero: circles placed directly in a 0×0 container — do NOT add an `inset:0` wrapper (it clips everything because the container is 0×0)

## Implementation History
- Built full /os product page: hero + grid/beam animation, how-it-works (5-step), why-le-node, CTA banner
- Built full /agence page: AgencyHero, pain-point cards, waveform scrubber (3 phases), deliverables with two tiers, AgencyCTA
- Retired split-screen landing (2026-04-13): `/` serves OS directly, `/os` is a permanent redirect
- Replaced `SectionLineObserver` with unified `ScrollReveal`
- HeroBackground animation rewritten SMIL → rAF to eliminate flicker in React
- NodeLoader 80px → 60px; computing state with orbit pulse and core glow added
- 2026-04-14: OS page synced to Notion spec — updated copy, Hero H1, secondary CTA; HowItWorks redesigned to 5-step vertical timeline; CLAUDE.md expanded
- 2026-04-15: Built `/sandbox` SandboxHero — full-screen layered hero with black hole video (`nodesingularity.webm`), 3-ring orbiting tool icons (54s/75s/102s), ripple, section blur, le-node badge logo; NanumMyeongjo + Open Sans fonts loaded per-route; removed BlackHole WebGL component (Three.js) and its docs
- 2026-04-15: Tuned SandboxHero over multiple iterations — flat z-index layer stack, fixed ripple clipping bug (inset:0 on 0×0 parent), video height 124% to align black hole at 62% viewport, ANIM_CENTER_TOP constant drives all layers, hero layer blur 0.60→0.34, tools 30×30px boxes with opacity 0.8 and no box-shadow, ripple START=83 STEP=44, 50px inter-element spacing, Nav added to sandbox page
