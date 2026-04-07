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

**Appear** (`hbIconAppear`): each icon scales in from 0.6→1 and fades from 0→1 opacity, staggered 80ms per icon using CSS `scale` individual transform property (avoids conflict with float).

**Float** (`hbFloat0–4`): 5 float variants (6.5–9s loops) using CSS `translate` + `rotate` individual transform properties, applied round-robin. Floats begin 700ms after the icon's appear animation ends.

> CSS individual transform properties (`scale`, `translate`, `rotate`) are used so appear and float animations target different properties and compose cleanly without conflict.

**Opacity layering**: `hbIconAppear` ends at `opacity: 1`. A wrapping div holds `opacity: 0.6` at rest and transitions to `1.0` when activated — their product gives the correct resting brightness without fighting the CSS animation fill-mode.

**Tools shown** (12 icons):
`clay, dropcontact, salesforce, hubspot, google, slack, linkedin, webhook, notion, claude, apollo, pipedrive`

---

## 2. Beam animation

### Layout

The hero: **h1 → "Join waitlist" CTA → 2-line explanation** (flex-centered in `min-height: 80vh`).

The CTA button is the beam convergence point, approximated at `{ x: 50, y: 52 }` in the percentage coordinate space of the `HeroBackground` container.

### Cycle (~4.5s total, starts 2s after mount)

```
Left tool activates  →  beam left→CTA  →  CTA glows  →  beam CTA→right  →  right tool activates  →  pause
     900ms                  550ms             200ms            550ms                900ms              1300ms
```

Tools are selected round-robin from two groups:
- **Left** (`x < 50%`): clay, dropcontact, google, linkedin, claude, apollo
- **Right** (`x ≥ 50%`): salesforce, hubspot, slack, webhook, notion, pipedrive

### Tool activation

- Outer opacity wrapper: `0.6` at rest → `1.0` active (`transition: opacity 300ms ease`)
- Box shadow: gains a blue ring (`rgba(0,0,250,0.25)`) + soft glow on activation
- Pulse ring (`.hb-pulse-ring`): absolutely positioned sibling, expands from `scale(1)` to `scale(2.4)` and fades out over 700ms

### Beam

An SVG overlay (`viewBox="0 0 100 100"`, `preserveAspectRatio="none"`) covers the full background. Each beam is a `<g>` with two `<line>` elements sharing the same `stroke-dashoffset` draw animation:

| Layer | Stroke | Width |
|-------|--------|-------|
| Glow  | `rgba(0,0,250,0.18)` | 5px |
| Core  | `rgba(0,0,250,0.65)` | 1px |

Both use `vector-effect="non-scaling-stroke"` so stroke width stays in CSS pixels regardless of SVG coordinate scaling. The `stroke-dasharray: 200` → `stroke-dashoffset: 200→0` animation draws the line from start to end over 550ms.

Each beam is a new React element keyed by an incrementing counter, so the CSS animation re-triggers on every cycle without needing JS imperative control.

### CTA glow

A div (`.hb-cta-glow`) absolutely positioned at `left: 50%; top: 52%` with a radial gradient. It expands horizontally (`scaleX 0.5→1.3`) and fades over 700ms. Keyed by an incrementing counter so each beam arrival re-mounts it.

### Grid line color

Updated from `#9E9EB8` to `#E3E3EA` (lighter, cooler tone). Shimmer gradient updated to match.

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
