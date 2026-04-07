# Animation System

Reference for all animation logic on the le-node website.

---

## 1. Hero background (`components/HeroBackground.tsx`)

A purely declarative component — no JS, all CSS animations.

### 1a. Grid line appear

On page load, 8 vertical + 5 horizontal lines animate from `scaleX/Y(0)` to `scaleX/Y(1)` with a brief shimmer pulse. Positions match `public/reference for js animation/reference grid.svg`.

- **Horizontal lines** (`hbDrawX`): scale from center (`transform-origin: 50% 50%`), 800ms, staggered from 150ms
- **Vertical lines** (`hbDrawY`): scale from top (`transform-origin: 50% 0%`), 900ms, staggered from 500ms
- **Shimmer** (`hbShimmer`): each line has a `::after` pseudo-element with a gradient that fades in/out over 900ms
- Color: `#9E9EB8` at ~45% opacity at rest

### 1b. Tool icon appear + float

12 tool logos in `#F0F0F2` rounded boxes at positions from `public/reference for js animation/reference 100% opacity.png`.

**Appear** (`hbIconAppear`): each icon scales in from 0.6→1 and fades from 0→0.6 opacity, staggered 80ms per icon using CSS `scale` individual transform property (avoids conflict with float).

**Float** (`hbFloat0–4`): 5 float variants (6.5–9s loops) using CSS `translate` + `rotate` individual transform properties, applied round-robin. Floats begin 700ms after the icon's appear animation ends.

> CSS individual transform properties (`scale`, `translate`, `rotate`) are used so appear and float animations target different properties and compose cleanly without conflict.

**Tools shown** (12 icons):
`clay, dropcontact, salesforce, hubspot, google, slack, linkedin, webhook, notion, claude, apollo, pipedrive`

Hub center position: `(52%, 52%)` — reserved for future beam animation target.

---

## 2. Beam animation — PLANNED, NOT YET IMPLEMENTED

### Target layout (from `reference with CTA.png`)

The hero layout is: **h1 → "Join waitlist" CTA pill → 2-line explanation**.

The CTA button ("Join waitlist") is the **beam target** — beams will travel from each floating tool icon toward the button, passing through it.

### Planned behavior
- Every ~1–2s, a random tool icon brightens (opacity 0.6 → 1)
- An animated element (orb or line) travels from the icon along a curved path toward the CTA button
- The CTA button pulses/brightens when a beam arrives
- Icon and beam fade back after a hold (~2.8s cycle total)

### Technical approach (to implement)
- The CTA button needs an `id` (e.g. `id="hb-cta-target"`) so JS can get its bounding rect
- Beam paths computed from each tool's `(x%, y%)` to the button's center position (recalculated on resize)
- SVG overlay with `preserveAspectRatio="none"` for beam paths
- Orb travels using `getPointAtLength()` per `requestAnimationFrame` (same approach as CPU animation reference)
- JS loop: `activate(i)` → brighten icon → animate orb → pulse CTA → fade back → `scheduleNext()`

> Note: The `HUB` constant and hub card were removed when the beam animation was stripped. The CTA button replaces the hub as the beam convergence point.

---

## 3. Section border line animation (site-wide)

All `<section>` elements (except `no-top-line`) have an animated top border that draws from left to right as the section scrolls into view.

### How it works

**CSS** (`globals.css`): Each section gets a `::before` pseudo-element (1px, `#E5E7EB`) starting at `scaleX(0)`. The `.line-visible` class triggers `scaleX(1)` via an 800ms ease transition (`cubic-bezier(0.22, 0.61, 0.36, 1)`).

**JS** (`components/SectionLineObserver.tsx`): A client component in the root layout runs an `IntersectionObserver` on all qualifying sections. When a section enters the viewport (5% threshold), it adds `.line-visible`. Animates once.

**Excluded sections**: Add class `no-top-line` to suppress the border entirely (used on the Hero section which sits at the top of the page).

### Animation spec
- Direction: left → right (`transform-origin: 0% 50%`)
- Duration: 800ms
- Easing: `cubic-bezier(0.22, 0.61, 0.36, 1)` (same as grid lines)
- Trigger: 5% of section visible + 40px bottom margin (slight delay into scroll)
- Fires once per section, not on scroll back up

---

## 4. Reference files

| File | Purpose |
|------|---------|
| `public/reference for js animation/reference grid.svg` | Grid line positions (V: 8 lines, H: 5 lines) |
| `public/reference for js animation/reference 100% opacity.png` | Tool icon layout at full opacity |
| `public/reference for js animation/reference with CTA.png` | Hero target layout showing CTA as beam convergence point |
| `public/reference for js animation/logo background.png` | Style reference for tool/hub icon boxes (`#F0F0F2` light rounded square) |
