# /os

Route: `/` (the `/os` path permanently redirects to `/`)

---

<aside>

`top nav`

from left to right

logo le-node (image: /logo.png)

aligned centered: switch between **le node** and **agence** pages

CTA "Join waitlist" (OS page) / "Book a call" (agency page)

> Spec:
> sticky on scroll
> background: #212226
> file: components/Nav.tsx
>

</aside>

---

<aside>

`hero`

AI tag: **AI-native operating system** (blue pill badge with animated glowing dot)

H1: Your GTM Motion,
H1 (blue): on Autopilot.

nodeloader (60px animated spinner, centered over the background, reacts to tool beam animation)

p: le-node orchestrates the best-in-class GTM tools to automatically identify and engage with your ideal customers, and gets back to you with opportunities.

Main CTA: **Join waitlist** → /waitlist

Secondary CTA: **Discover how that works →** (anchor scroll to #how-it-works)

> Spec:
> background animation: floating tool icons (Google, Slack, Clay, HubSpot, etc.) with animated beam connecting them to central NodeLoader
> min-height / max-height: 80vh
> file: components/Hero.tsx, components/HeroBackground.tsx, components/NodeLoader.tsx
>

</aside>

---

<aside>

`section trusted by`

label: TRUSTED BY REVENUE TEAMS

[5 logo placeholder blocks — to be replaced with real customer logos]

> Spec:
> Not yet defined — placeholder logos only
> inline in app/page.tsx
>

</aside>

---

<aside>

`section how it works`

eyebrow: How does it work

H2: Plug and play. 24/7. Dead easy.

**Step 01 — Learn your ICP**
p: le-node connects to your existing business data to learn who your ideal customer is.

**Step 02 — Detect & qualify**
p: le-node detects intent signals, qualifies and scores prospects based on your ideal customer profile.

**Step 03 — Engage on autopilot**
p: le-node finds your leads' contact info to engage them in relevant conversations and generate opportunities, on autopilot.

**Step 04 — Sync your stack**
p: Then syncs back to your stack to maintain your CRM up to date, and hands over opportunities where your team already works.

**Step 05 — Optimize continuously**
p: Track performance — le-node continuously learns from results to enhance your outbound approach.

> Spec:
> UI: vertical timeline — numbered badges (01–05) on left, thin vertical spine line connecting them, content on right
> section id: "how-it-works" (used as anchor from hero secondary CTA)
> file: components/HowItWorks.tsx
>

</aside>

---

<aside>

`section why le node`

eyebrow: Why le-node

H2: Best-in-class GTM stack.

p: le-node natively connects your stack to the best performing GTM tools in the industry.

**Card 1 — Dead simple setup**
p: No Zapier chains. No API tokens. No developers. If your team can use email, they can use le-node.

**Card 2 — Fast time to value**
p: Most teams are running their first automated workflow the same day. Not weeks, not sprints.

**Card 3 — No technical lift**
p: Your RevOps or sales manager owns it. Engineering is never in the loop unless you want them to be.

> Spec:
> 3-card grid layout with icon badges
> file: components/WhyLeNode.tsx
>

</aside>

---

<aside>

`section pricing`

Not yet defined

> Spec:
>

</aside>

---

<aside>

`section testimonial`

Not yet defined

> Spec:
>

</aside>

---

<aside>

`section faq`

Not yet defined

> Spec:
>

</aside>

---

<aside>

`pre footer`

H2: Ready to automate your GTM?

p: Tell us about your team and we'll show you exactly how le-node fits.

CTA: **Join waitlist →** → /waitlist

> Spec:
> blue gradient background: linear-gradient(to right, #0000FA, #0043FA)
> file: components/CTABanner.tsx
>

</aside>

---

<aside>

`footer`

from left to right

logo: le-node (text link → /)

nav links: le node OS (/) · Agence (/agence) · About (/about) · Legal notice (/legal) · Privacy (/privacy)

copyright: © [year] le-node. All rights reserved.

> Spec:
> file: components/Footer.tsx
>

</aside>
