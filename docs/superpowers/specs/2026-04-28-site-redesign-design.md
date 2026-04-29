# Site Redesign — Design Spec

**Date:** 2026-04-28  
**Status:** Complete — all sections approved

---

## Context

Redesigning dmytropetryshchuk.com from a light two-panel static HTML site into a premium, editorial, spatially-interactive React site.

**Audience:** Technical peers and future collaborators (not clients — OneKeyFlow has its own site).  
**Goal:** Full human — conveys technical depth, taste, and personality. Easy to grasp who Dima is at a glance, rewarding to explore deeper.  
**Philosophy:** Homey but unique. Light, editorial, premium. Not corporate, not a portfolio template.

---

## Tech Stack

- **Framework:** Next.js (React — migrating from vanilla HTML/CSS; Next.js enables SSG for Beehiiv RSS fetch at build time and static export for simple hosting)
- **Chatbot backend:** n8n (self-hosted on Railway) — Chat Trigger → RAG → cheap LLM → Respond to Webhook
- **Model:** Claude Haiku or GPT-4o mini (keep costs low)
- **Persistent memory:** UUID in localStorage, keyed to Postgres Chat Memory node in n8n
- **Hosting:** Current (static) or Railway alongside Ima

---

## Section 1: Overall Spatial Layout ✅ Approved

The "desktop" is a light, textured canvas — off-white, subtle paper grain. No taskbar, no fake OS chrome. Four floating islands live on it:

1. **Intro card** — top-left quadrant, anchored. Name, one-liner, contact links. Clean and editorial.
2. **Ventures wheel** — center-right, the visual anchor. Interactive radial/orbital visualization of projects.
3. **Chatbot drawer** — bottom-right corner, always present as a collapsed tab. Pulls up into a floating chat window. The digital twin.
4. **Mini nav nodes** — three floating edge handles: left (Library), right (Writings), top (Watercolors). Clicking slides that panel over the entire canvas.

Cards have soft shadows and subtle depth. Intro card and chatbot window are freely repositionable on desktop (positions persisted in localStorage). Feels alive.

---

## Section 2: Typography & Color ✅ Approved

**Type stack:**
- **Headlines:** Fraunces (variable serif — warm, editorial, distinctive)
- **Body:** Inter (clean, invisible in the best way)
- **Labels / mono moments:** IBM Plex Mono (technical credibility, already in the site)

**Color system — Warm Paper:**
- Background: `#F8F4EE` (cream with subtle paper-grain texture)
- Cards: `#FFFFFF` with soft shadows
- Text: `#1C1C1C`
- Accent: `#C4781A` (warm amber — carried forward from current site)

---

## Section 3: The Ventures Wheel ✅ Approved

Circular orbital layout — center node (name/icon), 6 project nodes orbiting at varying radii. Closer = more recent/significant.

**Nodes:** OneKeyFlow, ISPY, Valandar, Fairquanta, Midtronics, Slabfolio/Soulprint. Secondary/experimental projects rendered as smaller, dimmer outer-orbit nodes.

**Interactions:**
- **At rest:** Very slow ambient rotation (barely perceptible, like breathing)
- **Hover:** Rotation pauses, hovered node lifts with shadow pulse
- **Click:** Node expands into a floating card (40% canvas width) — project name, role + dates, 2–3 bullets (user's words). Rest of wheel dims behind it.

**Technical:** Built with React + SVG or CSS transforms. No heavy charting library.

---

## Section 4: The Digital Twin Chatbot ✅ Approved

Not a FAQ bot — a version of Dima that visitors can actually talk to. Trained on his writings, philosophy, and project descriptions. Sounds like him.

**UI:**
- Collapsed: Small pill bottom-right, initials `DP` + subtle pulse animation
- Expanded: Floating chat window ~360×500px, soft shadow, draggable by header on desktop
- First message is written by Dima — sets tone immediately on open

**Backend (n8n on Railway):**
- Chat Trigger node → vector store retrieval (writings + resume as RAG context) → Claude Haiku / GPT-4o mini → Respond to Webhook
- Persistent memory: UUID generated on first visit, stored in localStorage, passed as `sessionId` — Postgres Chat Memory node keys history to it
- Return visitors get continuity ("Last time you asked about…")
- System prompt written entirely by Dima in his own voice

**Embed:** `@n8n/chat` CDN widget or custom fetch-based UI posting to n8n webhook

---

## Section 5: Panel Navigation (Library, Writings, Watercolors) ✅ Approved

Each panel is triggered by a floating edge handle always visible on the canvas.

### Library (slides in from left edge)

~440px wide panel. White background, soft shadow on the right edge. Scrolls vertically.

**Header:** "Library" in Fraunces, with a muted subline in Inter.

**Section headers:** Mono, small, uppercase (`BOOKS` / `PODCASTS` / `YOUTUBE`) with a thin rule beneath — Finder sidebar label style.

**List rows:**
- Cover thumbnail left: portrait ratio for books (~44×60px), square for podcasts/YouTube (~48×48px), slightly rounded corners, real cover art
- Title in Inter medium, author/host below in Inter small muted (`#666`)
- Row height ~72px, subtle hover highlight (light gray tint)

**Hover tooltip (Quick Look style):**
- Floating panel appears to the right of the Library panel
- ~260px wide, dark background (`#1C1C1C`), white text, 8px radius, shadow
- Contains: larger cover (~80px), title, author/host, Dima's 1–2 sentence personal note
- 120ms fade-in

**Cover art scraper:** Open Library API for books, iTunes Search API for podcast artwork, YouTube channel thumbnail URL pattern. All cached as local static assets — no runtime API calls.

---

### Writings (slides in from right edge)

Simple title list. Two sections:
- **Essays** — local markdown files
- **Newsletter** — posts fetched from Beehiiv RSS feed at build time

Each item is a clickable title. Section headers match the mono label style from Library.

---

### Watercolors (slides up from top edge)

Lightbox gallery of 4 paintings. Click any painting to open fullscreen lightbox with prev/next navigation.

---

## Section 6: Mobile ✅ Approved

Mobile is an acceptable/simplified experience — same visual personality, different interaction model.

- **Background & cards:** Paper texture and card aesthetic carry through from desktop
- **Layout:** Floating islands → stacked scrollable cards, single-column
- **Ventures wheel:** Tap-to-expand card list with amber accents; no ambient rotation animation
- **Panel navigation:** Fixed bottom nav bar with icons for Library, Writings, and Watercolors
- **Panels:** Open as bottom sheets (swipe up)

---

## Open Questions

- What does Dima write as the chatbot's opening message / system prompt voice?
- n8n hosting: self-hosted Railway vs n8n Cloud
- Vector store choice for RAG: Pinecone, Supabase pgvector, or other
