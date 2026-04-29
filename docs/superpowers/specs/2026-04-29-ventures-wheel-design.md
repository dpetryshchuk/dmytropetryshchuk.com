# Ventures Wheel — Design Spec

**Date:** 2026-04-29
**Status:** Complete — all sections approved

---

## Context

The Ventures Wheel is the visual centerpiece of dmytropetryshchuk.com. It sits on the spatial canvas alongside the IntroCard and shows Dima's projects as orbiting nodes around a center avatar. Visitors can hover to pause the rotation and click any node to read a project summary card.

---

## Section 1: Architecture & Data ✅ Approved

### Files

```
site/src/
  data/
    projects.ts                    # Typed project data — all 7 projects
  components/ventures/
    VenturesWheel.tsx              # Main SVG component + orbital animation
    ProjectCard.tsx                # Floating expanded card on click
    useOrbitalAnimation.ts         # requestAnimationFrame hook (angle ref, pause on hover)
```

### Data Shape

Hardcoded array in `projects.ts`:

```ts
interface Project {
  id: string
  name: string
  role: string
  dates: string
  bullets: string[]           // empty array = placeholder ("Coming soon.")
  tier: 'primary' | 'secondary'
  color: string               // node accent color (hex)
}
```

### Project Data

**Primary tier** (inner ring, radius ~130px from center):

| id | name | role | dates | color |
|----|------|------|-------|-------|
| `onekeyflow` | OneKeyFlow | Founder | Feb 2026 – Present | `#C4781A` |
| `ispy` | ISPY | — | — | `#6366F1` |
| `valandar` | Valandar | Cofounder | Jan – Feb 2026 | `#0EA5E9` |
| `fairquanta` | Fairquanta | AI Engineer & Product Developer | Dec 2025 – Feb 2026 | `#10B981` |
| `midtronics` | Midtronics | Embedded Software Engineer | May 2023 – Nov 2025 | `#F59E0B` |

**Secondary tier** (outer ring, radius ~185px, 65% opacity, smaller nodes):

| id | name | role | dates | color |
|----|------|------|-------|-------|
| `slabfolio` | Slabfolio | Founder | Nov – Dec 2025 | `#8B5CF6` |
| `soulprint` | Soulprint | Founder | Jan 2025 – Present | `#EC4899` |

### Bullets (from current site)

**OneKeyFlow:**
- Founded an AI automation agency building workflows for businesses that save time and money.
- Built an automation for a $45m/yr ecom company that turned a 23-hr manual process into a few minutes by generating financial reports for 70+ SKUs.
- Integrated a CRM into lead capture for a $2M auto-transport logistics company.

**ISPY:** *(placeholder — no bullets)*

**Valandar:**
- Built a Word add-in that cut contract review from 6 hours to 20 minutes for 30 documents per month.
- Full-stack: Python, OpenAI Responses API, JavaScript (Word.js API), Django, Heroku.
- Makes it easy for lawyers at mid-size firms to run contracts through their clause playbooks.

**Fairquanta:**
- Researched AI memory systems, long-horizon task planning, collaborative filtering, and psychometrics to shape the architecture, UI, and product direction of a team-coordination AI platform.

**Midtronics:**
- Built and architected C firmware for an EV battery module balancer in a team of 3, from concept to live demo in Japan in 8 months.
- Wrote internal dev tools: Jira REST API scripts, signal monitors (ADC, GPIO, Serial, PWMs), and calibration tools.
- Ran a successful AI development workshop for 20+ embedded engineers on safe AI dev practices.

**Slabfolio:**
- A better padfolio built to be minimal, clean, and not-leather.
- Built a Shopify store, designed landing page, and networked with potential users (Mom Test).
- First e-commerce exploration: learned COGS, RoAS, Revenue, Profit, and physical product design.

**Soulprint / Clarity Engine:**
- Interviewed people about their past, present, and aspirations to uncover patterns in their lives.
- Mined their story with AI to find core patterns and inclinations in the subtext.
- Coached biweekly to align with these insights and integrate.

### Canvas Placement

Wrapped in `DraggableCard` (same pattern as IntroCard). Default position: `{ x: 420, y: 60 }`. Position persisted in Zustand store under id `"ventures"`.

---

## Section 2: SVG Layout & Animation ✅ Approved

### SVG Structure

Single `<svg>` element, `400×400` viewBox, center at `(200, 200)`.

Node positions computed from angle + radius:
```
x = 200 + radius * cos(angleRad + nodeOffset)
y = 200 + radius * sin(angleRad + nodeOffset)
```

**Radii:**
- Primary nodes: `130px` from center
- Secondary nodes: `185px` from center
- Center avatar: `48px` radius

**Angular spacing:**
- Primary: 5 nodes at `72°` intervals (360° / 5)
- Secondary: 2 nodes at `180°` apart, offset `36°` from primary (nestled between)

### SVG Layers (bottom to top)

1. **Orbit rings** — two `<circle>` strokes at r=130 and r=185, dashed (`strokeDasharray="4 8"`), `stroke="#E5E7EB"` (neutral-200), no fill
2. **Secondary nodes** — `<g>` per node: 16px radius circle, muted fill (node color at 40% opacity), white border, 65% overall opacity
3. **Primary nodes** — `<g>` per node: 28px radius circle, white fill, 2px colored border (node color), drop shadow via SVG filter
4. **Center avatar** — 48px radius `<clipPath>` + `<image href="/avatar.jpg">`, amber ring border (`stroke="#C4781A" strokeWidth="2"`)

### Node Labels

Primary nodes: node name rendered in a `<text>` element below the circle, `font-family: var(--font-inter)`, `font-size: 9px`, `fill: #6B7280`, centered on `x`.

Secondary nodes: no label (too small).

### Ambient Rotation

`useOrbitalAnimation` hook:
- `angleRef = useRef(0)` — current rotation angle in radians, mutated directly (no setState)
- `isPausedRef = useRef(false)` — set true on hover
- `rafRef = useRef<number>` — animation frame handle for cleanup
- Each tick: `if (!isPausedRef.current) angleRef.current += 0.00005` (≈ 0.003°/frame at 60fps — barely perceptible)
- Re-renders triggered by a `tickState` counter incremented each frame via `useState`
- Returns `{ angle: angleRef.current, pause: () => { isPausedRef.current = true }, resume: () => { isPausedRef.current = false } }`
- Cleanup: `cancelAnimationFrame(rafRef.current)` on unmount

### Hover State

`useState<string | null>(null)` — hovered project id.

On hover of a node group:
- Call `pause()` from the animation hook
- Apply `transform="translate(0, -10)"` to the hovered node `<g>` (lifts up)
- Increase drop shadow intensity via a second SVG filter

On mouse leave:
- Call `resume()`
- Reset transform

### Dimming on Card Open

When `selectedProject !== null`, the `<svg>` element gets `className="opacity-40 transition-opacity duration-200"`. The ProjectCard renders outside the SVG.

---

## Section 3: ProjectCard ✅ Approved

### Layout

Fixed-position div, rendered as a sibling to `VenturesWheel` in `page.tsx` (NOT inside the DraggableCard wrapper — avoids moving with the wheel or being clipped):

- Width: `w-[40vw]` with `min-w-[280px]`
- Position: `fixed`, centered vertically, right-of-center horizontally (`right-8 top-1/2 -translate-y-1/2`)
- Background: white, `rounded-xl`, `shadow-2xl`, `z-50`
- Padding: `p-6`

### Content Structure

```
[Close ✕]                         ← absolute top-4 right-4, font-mono text-xs
[Project Name]                    ← font-fraunces text-xl text-ink
[Role] · [Dates]                  ← font-mono text-xs text-neutral-400 mt-1
────────────────────────────      ← thin divider mt-4 mb-4
• Bullet one                      ← font-inter text-sm text-neutral-600
• Bullet two
• Bullet three
```

**ISPY / empty bullets:** renders `"Coming soon."` in italic Inter instead of bullet list.

### Dismissal

- Click ✕ button: `setSelectedProject(null)`
- Click anywhere on the canvas outside the card: close via `onMouseDown` on the SVG

### Animation

CSS opacity transition only: `transition: opacity 150ms ease`. No Framer Motion — card appears/disappears instantly with a fast fade. Keeps it lightweight.

---

## Technical Notes

- **No heavy libraries** — pure SVG + `requestAnimationFrame`. No D3, no charting library.
- **`'use client'`** — required on `VenturesWheel.tsx` (uses hooks and event handlers).
- **`rerender-defer-reads`** — store write actions (`setCardPosition`, `bringToFront`) accessed via `useCanvasStore.getState()` inside handlers, not subscribed at render time.
- **SVG accessibility** — each node `<g>` gets `role="button"` and `aria-label={project.name}` for keyboard/screen reader access.
- **Avatar fallback** — if `/avatar.jpg` is missing, center node renders initials `DP` in Fraunces on an amber background.
