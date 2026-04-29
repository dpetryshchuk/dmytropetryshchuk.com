# Site Redesign: Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the Next.js React app with the spatial canvas, paper texture, draggable intro card, edge handles, and panel shells — the skeleton every other plan builds on.

**Architecture:** Next.js 14 App Router in `site/` subdirectory. Zustand store owns canvas state (card positions, active panel, z-index). react-rnd handles card dragging with localStorage persistence via Zustand persist middleware. Framer Motion AnimatePresence drives panel slide-ins. Panel content is left empty (placeholder) — filled by subsequent plans.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS v3, react-rnd, framer-motion, zustand, Vitest + React Testing Library

---

## File Structure

```
site/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout: fonts, metadata
│   │   ├── page.tsx                # Mounts Canvas (server component shell)
│   │   └── globals.css             # Design tokens, paper texture, base styles
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── Canvas.tsx          # Full-viewport canvas with paper texture
│   │   │   └── EdgeHandle.tsx      # Panel trigger tab on canvas edge
│   │   ├── cards/
│   │   │   ├── DraggableCard.tsx   # react-rnd wrapper with Zustand position
│   │   │   └── IntroCard.tsx       # Name, tagline, contact links
│   │   └── panels/
│   │       └── Panel.tsx           # Framer Motion slide-in shell
│   ├── store/
│   │   └── canvas.ts               # Zustand store: positions, activePanel, z-index
│   └── test/
│       └── setup.ts                # Vitest + Testing Library setup
├── tailwind.config.ts
├── vitest.config.ts
└── package.json
```

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: `site/` (entire directory)

- [ ] **Step 1: Create Next.js app**

Run from the repo root:
```bash
npx create-next-app@latest site --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbo
```
When prompted, accept all defaults.

- [ ] **Step 2: Install runtime dependencies**

```bash
cd site && npm install react-rnd framer-motion zustand
```

- [ ] **Step 3: Install test dependencies**

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 4: Create Vitest config**

Create `site/vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

- [ ] **Step 5: Create test setup file**

Create `site/src/test/setup.ts`:
```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Add test script to package.json**

In `site/package.json`, add to `"scripts"`:
```json
"test": "vitest",
"test:run": "vitest run"
```

- [ ] **Step 7: Verify dev server starts**

```bash
npm run dev
```
Expected: `ready - started server on 0.0.0.0:3000`

Open `http://localhost:3000` — default Next.js page loads.

- [ ] **Step 8: Commit**

```bash
cd .. && git add site/ && git commit -m "feat: scaffold Next.js site with Vitest"
```

---

## Task 2: Design tokens and paper texture

**Files:**
- Modify: `site/src/app/globals.css`
- Modify: `site/tailwind.config.ts`
- Modify: `site/src/app/layout.tsx`

- [ ] **Step 1: Configure Tailwind with design tokens**

Replace the contents of `site/tailwind.config.ts`:
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        fraunces: ['var(--font-fraunces)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        paper: '#F8F4EE',
        accent: '#C4781A',
        ink: '#1C1C1C',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Add Google Fonts to layout.tsx**

Replace `site/src/app/layout.tsx`:
```tsx
import type { Metadata } from 'next'
import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Dmytro Petryshchuk',
  description: 'Builder. Curious about people and systems.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Write design tokens and paper texture in globals.css**

Replace `site/src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Paper grain texture — SVG feTurbulence as data URI, no external request */
.noise-overlay {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E");
  background-repeat: repeat;
}

/* Prevent default margin/scroll on the canvas page */
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
}
```

- [ ] **Step 4: Verify fonts and color load**

```bash
cd site && npm run dev
```

Open `http://localhost:3000`. In DevTools → Computed styles on `<body>`, confirm `--font-fraunces`, `--font-inter`, `--font-mono` CSS variables are present.

- [ ] **Step 5: Commit**

```bash
cd .. && git add site/ && git commit -m "feat: design tokens, Tailwind config, and paper grain texture"
```

---

## Task 3: Zustand canvas store

**Files:**
- Create: `site/src/store/canvas.ts`
- Create: `site/src/store/canvas.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `site/src/store/canvas.test.ts`:
```ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useCanvasStore } from './canvas'

describe('useCanvasStore', () => {
  beforeEach(() => {
    useCanvasStore.setState({
      cardPositions: {},
      activePanel: null,
      zCounter: 10,
      zMap: {},
    })
  })

  it('setCardPosition stores position by id', () => {
    useCanvasStore.getState().setCardPosition('intro', { x: 100, y: 200 })
    expect(useCanvasStore.getState().cardPositions['intro']).toEqual({ x: 100, y: 200 })
  })

  it('setCardPosition does not overwrite other positions', () => {
    useCanvasStore.getState().setCardPosition('intro', { x: 10, y: 20 })
    useCanvasStore.getState().setCardPosition('other', { x: 50, y: 60 })
    expect(useCanvasStore.getState().cardPositions['intro']).toEqual({ x: 10, y: 20 })
  })

  it('setActivePanel updates activePanel', () => {
    useCanvasStore.getState().setActivePanel('library')
    expect(useCanvasStore.getState().activePanel).toBe('library')
  })

  it('setActivePanel accepts null to close panels', () => {
    useCanvasStore.getState().setActivePanel('library')
    useCanvasStore.getState().setActivePanel(null)
    expect(useCanvasStore.getState().activePanel).toBeNull()
  })

  it('bringToFront increments zCounter and sets zMap entry', () => {
    useCanvasStore.getState().bringToFront('intro')
    expect(useCanvasStore.getState().zCounter).toBe(11)
    expect(useCanvasStore.getState().zMap['intro']).toBe(11)
  })

  it('bringToFront gives the latest card the highest z', () => {
    useCanvasStore.getState().bringToFront('a')
    useCanvasStore.getState().bringToFront('b')
    const { zMap } = useCanvasStore.getState()
    expect(zMap['b']).toBeGreaterThan(zMap['a'])
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
cd site && npm run test:run -- src/store/canvas.test.ts
```
Expected: FAIL — `Cannot find module './canvas'`

- [ ] **Step 3: Implement the store**

Create `site/src/store/canvas.ts`:
```ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type PanelType = 'library' | 'writings' | 'watercolors'

interface CardPosition { x: number; y: number }

interface CanvasStore {
  cardPositions: Record<string, CardPosition>
  activePanel: PanelType | null
  zCounter: number
  zMap: Record<string, number>
  setCardPosition: (id: string, pos: CardPosition) => void
  setActivePanel: (panel: PanelType | null) => void
  bringToFront: (id: string) => void
}

export const useCanvasStore = create<CanvasStore>()(
  persist(
    (set) => ({
      cardPositions: {},
      activePanel: null,
      zCounter: 10,
      zMap: {},
      setCardPosition: (id, pos) =>
        set((state) => ({ cardPositions: { ...state.cardPositions, [id]: pos } })),
      setActivePanel: (panel) => set({ activePanel: panel }),
      bringToFront: (id) =>
        set((state) => {
          const z = state.zCounter + 1
          return { zCounter: z, zMap: { ...state.zMap, [id]: z } }
        }),
    }),
    {
      name: 'canvas-state',
      partialize: (state) => ({ cardPositions: state.cardPositions }),
    }
  )
)
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm run test:run -- src/store/canvas.test.ts
```
Expected: 6 tests pass.

- [ ] **Step 5: Commit**

```bash
cd .. && git add site/ && git commit -m "feat: Zustand canvas store with position and panel state"
```

---

## Task 4: Canvas component

**Files:**
- Create: `site/src/components/canvas/Canvas.tsx`
- Create: `site/src/components/canvas/Canvas.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `site/src/components/canvas/Canvas.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { Canvas } from './Canvas'

describe('Canvas', () => {
  it('renders children', () => {
    render(<Canvas><div data-testid="child">hello</div></Canvas>)
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('has noise-overlay layer', () => {
    const { container } = render(<Canvas><div /></Canvas>)
    expect(container.querySelector('.noise-overlay')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
cd site && npm run test:run -- src/components/canvas/Canvas.test.tsx
```
Expected: FAIL — `Cannot find module './Canvas'`

- [ ] **Step 3: Implement Canvas**

Create `site/src/components/canvas/Canvas.tsx`:
```tsx
'use client'

export function Canvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-paper">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      {children}
    </div>
  )
}
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
npm run test:run -- src/components/canvas/Canvas.test.tsx
```
Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
cd .. && git add site/ && git commit -m "feat: Canvas component with paper texture"
```

---

## Task 5: EdgeHandle component

**Files:**
- Create: `site/src/components/canvas/EdgeHandle.tsx`
- Create: `site/src/components/canvas/EdgeHandle.test.tsx`

- [ ] **Step 1: Write the failing tests**

Create `site/src/components/canvas/EdgeHandle.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { EdgeHandle } from './EdgeHandle'
import { useCanvasStore } from '@/store/canvas'

describe('EdgeHandle', () => {
  beforeEach(() => {
    useCanvasStore.setState({ activePanel: null })
  })

  it('renders the panel label', () => {
    render(<EdgeHandle panel="library" />)
    expect(screen.getByText('Library')).toBeInTheDocument()
  })

  it('calls setActivePanel with the panel type on click', () => {
    render(<EdgeHandle panel="library" />)
    fireEvent.click(screen.getByText('Library'))
    expect(useCanvasStore.getState().activePanel).toBe('library')
  })

  it('closes panel when clicking the active handle', () => {
    useCanvasStore.setState({ activePanel: 'library' })
    render(<EdgeHandle panel="library" />)
    fireEvent.click(screen.getByText('Library'))
    expect(useCanvasStore.getState().activePanel).toBeNull()
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
cd site && npm run test:run -- src/components/canvas/EdgeHandle.test.tsx
```
Expected: FAIL — `Cannot find module './EdgeHandle'`

- [ ] **Step 3: Implement EdgeHandle**

Create `site/src/components/canvas/EdgeHandle.tsx`:
```tsx
'use client'

import { useCanvasStore, PanelType } from '@/store/canvas'

const CONFIG: Record<PanelType, { label: string; position: string; writing: string }> = {
  library: {
    label: 'Library',
    position: 'left-0 top-1/2 -translate-y-1/2',
    writing: 'vertical-rl',
  },
  writings: {
    label: 'Writings',
    position: 'right-0 top-1/2 -translate-y-1/2',
    writing: 'vertical-rl',
  },
  watercolors: {
    label: 'Watercolors',
    position: 'top-0 left-1/2 -translate-x-1/2',
    writing: 'horizontal-tb',
  },
}

export function EdgeHandle({ panel }: { panel: PanelType }) {
  const activePanel = useCanvasStore((s) => s.activePanel)
  const setActivePanel = useCanvasStore((s) => s.setActivePanel)
  const { label, position, writing } = CONFIG[panel]
  const isActive = activePanel === panel

  return (
    <button
      onClick={() => setActivePanel(isActive ? null : panel)}
      className={`absolute ${position} z-40 bg-white border border-neutral-200 rounded-sm px-2 py-3 font-mono text-[10px] uppercase tracking-widest shadow-sm transition-colors ${
        isActive
          ? 'text-accent border-accent'
          : 'text-neutral-400 hover:text-accent hover:border-amber-300'
      }`}
      style={{ writingMode: writing as React.CSSProperties['writingMode'] }}
    >
      {label}
    </button>
  )
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm run test:run -- src/components/canvas/EdgeHandle.test.tsx
```
Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
cd .. && git add site/ && git commit -m "feat: EdgeHandle component with panel toggle"
```

---

## Task 6: Panel shell component

**Files:**
- Create: `site/src/components/panels/Panel.tsx`
- Create: `site/src/components/panels/Panel.test.tsx`

- [ ] **Step 1: Write the failing tests**

Create `site/src/components/panels/Panel.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Panel } from './Panel'
import { useCanvasStore } from '@/store/canvas'

describe('Panel', () => {
  beforeEach(() => {
    useCanvasStore.setState({ activePanel: null })
  })

  it('does not render children when panel is inactive', () => {
    useCanvasStore.setState({ activePanel: null })
    render(<Panel type="library"><div data-testid="content">content</div></Panel>)
    expect(screen.queryByTestId('content')).not.toBeInTheDocument()
  })

  it('renders children when panel is active', () => {
    useCanvasStore.setState({ activePanel: 'library' })
    render(<Panel type="library"><div data-testid="content">content</div></Panel>)
    expect(screen.getByTestId('content')).toBeInTheDocument()
  })

  it('does not render for a different active panel', () => {
    useCanvasStore.setState({ activePanel: 'writings' })
    render(<Panel type="library"><div data-testid="content">content</div></Panel>)
    expect(screen.queryByTestId('content')).not.toBeInTheDocument()
  })

  it('close button sets activePanel to null', () => {
    useCanvasStore.setState({ activePanel: 'library' })
    render(<Panel type="library"><div>content</div></Panel>)
    fireEvent.click(screen.getByLabelText('Close panel'))
    expect(useCanvasStore.getState().activePanel).toBeNull()
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
cd site && npm run test:run -- src/components/panels/Panel.test.tsx
```
Expected: FAIL — `Cannot find module './Panel'`

- [ ] **Step 3: Implement Panel**

Create `site/src/components/panels/Panel.tsx`:
```tsx
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCanvasStore, PanelType } from '@/store/canvas'

const VARIANTS: Record<PanelType, {
  initial: object
  animate: object
  exit: object
  className: string
}> = {
  library: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
    className: 'left-0 top-0 h-full w-[440px]',
  },
  writings: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    className: 'right-0 top-0 h-full w-[440px]',
  },
  watercolors: {
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit: { y: '-100%' },
    className: 'top-0 left-0 w-full h-[60vh]',
  },
}

export function Panel({ type, children }: { type: PanelType; children: React.ReactNode }) {
  const activePanel = useCanvasStore((s) => s.activePanel)
  const setActivePanel = useCanvasStore((s) => s.setActivePanel)
  const { initial, animate, exit, className } = VARIANTS[type]

  return (
    <AnimatePresence>
      {activePanel === type && (
        <motion.div
          key={type}
          initial={initial}
          animate={animate}
          exit={exit}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className={`absolute ${className} bg-white shadow-2xl z-50 overflow-y-auto`}
        >
          <button
            aria-label="Close panel"
            onClick={() => setActivePanel(null)}
            className="absolute top-4 right-4 font-mono text-xs text-neutral-400 hover:text-ink transition-colors"
          >
            ✕
          </button>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm run test:run -- src/components/panels/Panel.test.tsx
```
Expected: 4 tests pass.

- [ ] **Step 5: Commit**

```bash
cd .. && git add site/ && git commit -m "feat: Panel shell with Framer Motion slide-in animation"
```

---

## Task 7: DraggableCard component

**Files:**
- Create: `site/src/components/cards/DraggableCard.tsx`
- Create: `site/src/components/cards/DraggableCard.test.tsx`

- [ ] **Step 1: Write the failing tests**

Create `site/src/components/cards/DraggableCard.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { DraggableCard } from './DraggableCard'
import { useCanvasStore } from '@/store/canvas'

describe('DraggableCard', () => {
  beforeEach(() => {
    useCanvasStore.setState({ cardPositions: {}, zMap: {}, zCounter: 10 })
  })

  it('renders children', () => {
    render(
      <DraggableCard id="test" defaultPosition={{ x: 0, y: 0 }}>
        <div data-testid="child">content</div>
      </DraggableCard>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('uses stored position if available', () => {
    useCanvasStore.setState({
      cardPositions: { test: { x: 150, y: 250 } },
      zMap: {},
      zCounter: 10,
    })
    render(
      <DraggableCard id="test" defaultPosition={{ x: 0, y: 0 }}>
        <div>content</div>
      </DraggableCard>
    )
    // react-rnd applies position as inline style
    const rnd = document.querySelector('[style*="transform"]') as HTMLElement
    expect(rnd).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
cd site && npm run test:run -- src/components/cards/DraggableCard.test.tsx
```
Expected: FAIL — `Cannot find module './DraggableCard'`

- [ ] **Step 3: Implement DraggableCard**

Create `site/src/components/cards/DraggableCard.tsx`:
```tsx
'use client'

import { Rnd } from 'react-rnd'
import { useCanvasStore } from '@/store/canvas'

interface Props {
  id: string
  defaultPosition: { x: number; y: number }
  defaultSize?: { width: number | string; height: number | string }
  children: React.ReactNode
}

export function DraggableCard({
  id,
  defaultPosition,
  defaultSize = { width: 'auto', height: 'auto' },
  children,
}: Props) {
  const position = useCanvasStore((s) => s.cardPositions[id]) ?? defaultPosition
  const z = useCanvasStore((s) => s.zMap[id]) ?? 10
  const setCardPosition = useCanvasStore((s) => s.setCardPosition)
  const bringToFront = useCanvasStore((s) => s.bringToFront)

  return (
    <Rnd
      position={position}
      size={defaultSize}
      enableResizing={false}
      dragHandleClassName="drag-handle"
      bounds="parent"
      style={{ zIndex: z }}
      onMouseDown={() => bringToFront(id)}
      onDragStop={(_, d) => setCardPosition(id, { x: d.x, y: d.y })}
    >
      {children}
    </Rnd>
  )
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm run test:run -- src/components/cards/DraggableCard.test.tsx
```
Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
cd .. && git add site/ && git commit -m "feat: DraggableCard with react-rnd and Zustand position persistence"
```

---

## Task 8: IntroCard component

**Files:**
- Create: `site/src/components/cards/IntroCard.tsx`

No isolated unit tests — this is a pure presentational component. Visual verification in the browser.

- [ ] **Step 1: Implement IntroCard**

Create `site/src/components/cards/IntroCard.tsx`:
```tsx
'use client'

export function IntroCard() {
  return (
    <div className="drag-handle cursor-grab active:cursor-grabbing bg-white rounded-xl shadow-md p-6 w-[300px] select-none">
      <h1 className="font-fraunces text-[22px] font-semibold text-ink leading-tight">
        Dmytro Petryshchuk
      </h1>
      <p className="mt-1.5 font-inter text-sm text-neutral-500 leading-relaxed">
        Builder. Curious about people and systems.
      </p>
      <div className="mt-5 flex gap-4 font-mono text-[11px] text-accent">
        <a
          href="mailto:dmytro2@illinois.edu"
          className="hover:underline transition-opacity hover:opacity-80"
          onClick={(e) => e.stopPropagation()}
        >
          Email
        </a>
        <a
          href="https://github.com/dmytropetryshchuk"
          target="_blank"
          rel="noreferrer"
          className="hover:underline transition-opacity hover:opacity-80"
          onClick={(e) => e.stopPropagation()}
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/dmytropetryshchuk"
          target="_blank"
          rel="noreferrer"
          className="hover:underline transition-opacity hover:opacity-80"
          onClick={(e) => e.stopPropagation()}
        >
          LinkedIn
        </a>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd .. && git add site/ && git commit -m "feat: IntroCard component"
```

---

## Task 9: Wire page.tsx and verify in browser

**Files:**
- Modify: `site/src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx**

Replace `site/src/app/page.tsx`:
```tsx
import { Canvas } from '@/components/canvas/Canvas'
import { DraggableCard } from '@/components/cards/DraggableCard'
import { IntroCard } from '@/components/cards/IntroCard'
import { EdgeHandle } from '@/components/canvas/EdgeHandle'
import { Panel } from '@/components/panels/Panel'

export default function Home() {
  return (
    <Canvas>
      <DraggableCard id="intro" defaultPosition={{ x: 40, y: 60 }}>
        <IntroCard />
      </DraggableCard>

      <EdgeHandle panel="library" />
      <EdgeHandle panel="writings" />
      <EdgeHandle panel="watercolors" />

      <Panel type="library">
        <div className="p-6 pt-12">
          <h2 className="font-fraunces text-xl text-ink">Library</h2>
          <p className="mt-1 font-inter text-sm text-neutral-400">Coming soon.</p>
        </div>
      </Panel>

      <Panel type="writings">
        <div className="p-6 pt-12">
          <h2 className="font-fraunces text-xl text-ink">Writings</h2>
          <p className="mt-1 font-inter text-sm text-neutral-400">Coming soon.</p>
        </div>
      </Panel>

      <Panel type="watercolors">
        <div className="p-6 pt-12">
          <h2 className="font-fraunces text-xl text-ink">Watercolors</h2>
          <p className="mt-1 font-inter text-sm text-neutral-400">Coming soon.</p>
        </div>
      </Panel>
    </Canvas>
  )
}
```

- [ ] **Step 2: Start dev server and verify**

```bash
cd site && npm run dev
```

Open `http://localhost:3000` and verify:
- Cream paper background with subtle grain texture
- Intro card visible, draggable by grabbing it
- Dragging and releasing persists position on page refresh
- "Library" tab on left edge, "Writings" on right, "Watercolors" on top
- Clicking each handle slides its panel in from the correct edge
- Close button (✕) dismisses the panel
- Clicking a card brings it above others if multiple were present

- [ ] **Step 3: Run all tests**

```bash
npm run test:run
```
Expected: All tests pass.

- [ ] **Step 4: Commit**

```bash
cd .. && git add site/ && git commit -m "feat: wire canvas, cards, handles, and panels into page"
```

---

## Task 10: Build verification

**Files:** None

- [ ] **Step 1: Run production build**

```bash
cd site && npm run build
```
Expected: Build completes with no errors. Note: TypeScript type errors will surface here — fix any that appear before committing.

- [ ] **Step 2: Run production preview**

```bash
npm run start
```
Open `http://localhost:3000`. Verify the same behaviours as Task 9 Step 2 work in the production build.

- [ ] **Step 3: Final commit**

```bash
cd .. && git add site/ && git commit -m "feat: foundation complete — canvas, draggable cards, panel shells"
```

---

## What's next

This plan ends here. The following features each have their own plan:

- **Ventures Wheel** — orbital SVG visualization of projects
- **Library Panel** — system list with cover art and Quick Look tooltips
- **Writings Panel** — Beehiiv RSS + local markdown essays
- **Watercolors Panel** — lightbox gallery
- **Mobile** — stacked cards + bottom sheet panels
