# Portfolio site revamp — agent handoff plan

This document captures **product intent**, **current state**, **design constraints**, and an **implementation backlog** so another agent (or human) can execute without re-deriving context from chat history.

## Goals (visitor outcomes)

1. **Introduce Lucas** as a person and leader, not only a résumé header: short narrative, proof points, clear “what I want next.”
2. **CV** remains easy to find and download (PDF), including for recruiters skimming quickly.
3. **Storybook** is **discoverable and explained**: link from the site, one paragraph on what lives there, URL `/storybook` (static build + Next rewrite — see existing config).
4. **How the site is deployed / built**: human-readable “build story” (monorepo, Docker/CI, hosting) without dumping raw config.
5. **GitHub**: surfaced projects (pinned / curated), not buried.
6. **Game** (*Echoes: Missing Cat*): flagship treatment — visual, outcome, stack/AI angle, store link.

Use **multiple routes** if needed; avoid a single endless scroll as the only navigation pattern.

## Non-goals for v1

- No CMS, admin UI, or remote content source is required.
- No GitHub API integration is required for launch; curated/manual content is acceptable.
- Do not weaken package boundaries just to move faster.

## Current state (facts in repo)

| Area | Location / behavior |
|------|---------------------|
| Single homepage | `apps/frontend/app/page.tsx` composes marketing blocks (`HomeLeadHero`, credibility, featured work, Storybook teaser, condensed résumé) from `apps/frontend/lib/home-site.ts`, then the existing section components inside `#resume`, using `resumeData` from `@portfolio/resume-content`. |
| App Router routes | `/`, `/build`, and `/projects` (flagship + pinned GitHub) under `apps/frontend/app/`. |
| Profile & links | `packages/resume-content/src/profile.ts` — `contactLinks`: Email, LinkedIn, Google Play; **no GitHub**. |
| Personal projects | `packages/resume-content/src/personal-projects.ts` — one entry (game). |
| Hero + shell | `/` uses `packages/storybook/src/home-marketing/home-lead-hero.tsx` (`HomeLeadHero`) inside `HomePageShell`; `PortfolioHero` remains available for other surfaces. |
| Global chrome | `apps/frontend/app/layout.tsx` composes `ThemeProvider`, `SiteChromeClient`, skip link, sticky `SiteHeader` / `SiteFooter`, and fonts/CSS on `<html>/<body>`. `HomePageShell` puts the home hero **inside** `<main id="main">` with the rest of the page so “Skip to content” reaches the primary `h1` and CTAs (no duplicate footer). |
| Site metadata baseline | `apps/frontend/app/layout.metadata.ts` exports shared root metadata; route-level metadata should extend this rather than reinvent it. |
| CV PDF | `apps/frontend/app/api/cv/route.ts`, `apps/frontend/lib/cv-pdf/*`; home lead hero uses `downloadHref="/api/cv"`. |
| Storybook static URL | `apps/frontend/next.config.ts` rewrites `/storybook` → `/storybook/index.html`; build output under `apps/frontend/public/storybook/` (see `docs/agents/storybook-ui.md`). |
| E2E baseline | `apps/e2e/cv-download.spec.ts` already verifies the generated PDF endpoint. |
| Boundaries | **Do not** import `@portfolio/resume-content` inside `packages/storybook`. App composes data → presentation props. |

## Implementation guardrails

- Keep **presentation components** in `packages/storybook`; keep **route modules, content composition, and mappers** in `apps/frontend`.
- Treat `packages/resume-content` as **résumé/PDF-safe shared data**, not as a dumping ground for every marketing-only field.
- If a datum should appear only on the website (for example curated GitHub repos, featured project callouts, or richer build-story copy), prefer `apps/frontend/lib/**` or route-local content modules.
- If a datum should appear consistently across both the web site and the PDF/CV surfaces, consider `packages/resume-content`.
- Reuse the existing **`/api/cv`** download path regardless of whether a dedicated `/cv` page is added later.
- Prefer manual, typed content for v1 over dynamic fetching.

## Target information architecture (recommended)

Implement incrementally; not every route is required for v1.

| Route | Purpose |
|-------|---------|
| `/` | Story-led home: positioning copy, primary CTAs (CV, GitHub, featured work), optional featured strip (game + repos + Storybook). |
| `/projects` | Game + GitHub highlights; cards with image, stack, role, links. |
| `/build` (or `/craft`) | How the site is built: monorepo, Storybook, tests, Docker, CI, deploy; link `/storybook`. |
| `/cv` *(optional)* | Full linear résumé sections **or** keep long CV on `/` and use `/cv` later — decide for SEO/scroll length. |
| `/contact` *(optional)* | Only if footer is insufficient for shared “contact” URLs. |

**Global navigation**: persistent header or sticky TOC — Home · Projects · CV · Build · (Contact).

**Footer**: extend beyond name + role — GitHub, LinkedIn, `/storybook`, link to `/build`, legal/colophon if needed.

**Recommended content split**:

- `/` should answer: who Lucas is, what he is strong at, and where to click next.
- `/projects` should answer: what he has built, with the game treated as the flagship case study.
- `/build` should answer: how this site is made and maintained, with a clear link to `/storybook`.
- `/cv` remains optional because `/api/cv` already covers download/distribution.

## Visual design direction (v1 spec)

Aim for **calm technical credibility**, not flashy agency-portfolio styling. The site should feel modern, minimal, and trustworthy for recruiters, hiring managers, and technical peers.

> **Current baseline vs targets**: The values below are **design targets** for the revamp, not claims about what exists today. Key deltas from the current implementation:
>
> - Shell `max-width` is **48rem (~768px)** today → target **1120px**.
> - Hero name `clamp(2.25rem, 5vw, 3rem)` today → target `clamp(2.5rem, 6vw, 4.5rem)`.
> - Storybook preview section decorator max-width is **42rem (~672px)** → target **720–760px** reading column.
> - `ActionLink` radius is **8px (0.5rem)** today → target **10–12px**; heights are padding-based → target explicit **44/48px** min-height.
> - Theme: only **`prefers-color-scheme`** media query today → target **`data-theme` attribute** with system / light / dark persistence.
>
> Update these components and CSS during implementation; do not assume the targets are already shipped.

### Color system

Base the revamp on the tokens already present in `packages/storybook/src/globals.css`.

| Token | Use | Light | Dark |
|------|-----|-------|------|
| `--background` | Page background | `#fafafa` | `#0a0a0a` |
| `--foreground` | Primary text | `#0a0a0a` | `#fafafa` |
| `--muted` | Secondary text / supporting labels | `#525252` | `#a3a3a3` |
| `--card` | Cards / elevated surfaces | `#ffffff` | `#171717` |
| `--border` | Dividers / card borders | `#e5e5e5` | `#262626` |
| `--accent` | Primary CTA / links / focus emphasis | `#2563eb` | `#60a5fa` |

Recommended usage:

- Support **both light and dark mode in v1** using the existing token structure.
- Keep the page mostly neutral in both themes: the **accent color should be sparse**, reserved for CTAs, active nav states, inline action links, and selected highlights.
- Avoid large saturated gradient backgrounds in v1.
- Use cards sparingly; not every section needs a box.
- Dark mode should feel like a true first-class theme, not inverted light mode. Keep contrast strong and surfaces slightly layered via `--card` and `--border`, not by increasing saturation.

### Typography

- Continue using **Geist Sans** for body/UI and **Geist Mono** for eyebrow labels, section titles, and small technical metadata.
- Hero name/title should stay large and restrained, close to the existing scale:
  - Name: `clamp(2.5rem, 6vw, 4.5rem)`
  - Role / eyebrow: `0.875rem` to `1rem`
  - Lead paragraph: `1.125rem` mobile, up to `1.25rem` desktop
- Body copy should target **16px** base size with generous line-height (`1.6` to `1.7`).
- Limit dense text blocks to **60-70ch** for readability.

### Spacing and layout

- Max content width: **1120px** for the main site shell.
- Reading sections inside that shell should narrow to about **720-760px** where appropriate.
- Section spacing:
  - Mobile: `56px` vertical rhythm
  - Desktop: `80px` to `96px`
- Card radius: **12px to 16px**.
- Hairline borders and soft shadows only; avoid heavy elevation.

## Shell and navigation behavior

> **Current state (post–Phase 1)**: Sticky header, mobile nav panel, skip link, enriched footer, and theme switch ship from `packages/storybook/src/site-chrome/` and are composed in `apps/frontend/app/layout.tsx`. Remaining shell items below (e.g. scroll-aware mobile bottom bar) are **not** implemented yet unless called out elsewhere.

### Theme mode and switching

- Default theme on first visit: **system preference** (`prefers-color-scheme`).
- Persist the user choice so returning visitors keep the selected mode.
- Recommended persisted states:
  - `system`
  - `light`
  - `dark`
- Preferred implementation shape:
  - store the explicit choice in local storage
  - reflect the active theme on `<html>` via a class or data attribute
  - avoid flash-of-wrong-theme during hydration

Theme switch placement:

- **Desktop**: place the theme toggle in the sticky header, right-aligned near nav / CTA.
- **Mobile**: expose it in the header row as an icon button or inside the mobile nav sheet if space gets tight.
- The control should always be reachable within **one tap/click**, not hidden in the footer.

Theme switch UI:

- Preferred control: compact segmented or cycle button with clear text label and icon.
- Recommended labels:
  - `System`
  - `Light`
  - `Dark`
- If visual space is tight, use an icon button that opens a small menu/sheet with the three explicit options.
- Do not use a binary sun/moon toggle unless the app still provides a way to return to `System`.

Theme switch behavior:

- The theme switch must update the entire site shell immediately.
- The selected theme should affect:
  - page background
  - text
  - cards
  - borders
  - hover states
  - focus rings
- The CV PDF endpoint does **not** need to mirror site theme selection; the PDF remains a separate output.

### Header

- Use a **sticky top header** on desktop and mobile.
- Header height:
  - Mobile: about **64px**
  - Desktop: about **72px**
- Header contents:
  - Left: wordmark / name (`Lucas Abritta`)
  - Right: nav links, theme switch, and one compact CTA
- Recommended nav items: `Home`, `Projects`, `Build`, `CV`.
- Add a compact desktop CTA in the header: **`Download CV`**.

### Floating / sticky action recommendation

Do **not** use a floating circular FAB as the primary pattern on desktop.

Recommended behavior:

- **Desktop**: no floating button. Keep CTA in the sticky header and hero.
- **Mobile**: use a **sticky bottom action bar** only after the hero scrolls out of view.
- Mobile sticky action bar contents:
  - Primary: `Download CV`
  - Secondary: `GitHub` or `Projects`
- Hide the sticky bottom bar when the hero CTA group is fully visible to avoid duplication.
- The sticky bottom bar should respect safe-area insets and never cover critical content or footer links.

Reasoning: this keeps desktop polished and uncluttered while preserving conversion on small screens.

### Footer

- Footer should feel editorial, not utility-only.
- Include:
  - Name + short one-line descriptor
  - GitHub
  - LinkedIn
  - Storybook
  - CV download
  - Optional short colophon line such as “Built with Next.js, Storybook, and Vercel”

## Page-level visual spec

### `/` Home

Recommended structure:

1. Sticky header
2. Hero
3. Credibility strip / proof points
4. Selected work preview
5. Build/storybook preview
6. Optional condensed CV preview
7. Footer

Hero layout:

- Desktop: two-column feel, but still content-led rather than image-led.
  - Left: eyebrow, name, leadership positioning, CTA group
  - Right: optional highlight card with 3 proof points or flagship project callout
- Mobile: single column, stacked in this order:
  - eyebrow
  - name
  - role/positioning
  - short narrative
  - CTA group
  - proof/highlight card

Hero CTAs:

- Primary button: `Download CV`
- Secondary button: `View Projects`
- Tertiary text link: `Open Storybook`

### `/projects`

- Use a clean list/grid hybrid:
  - First block: flagship feature for *Echoes: Missing Cat*
  - Then: 3-6 curated GitHub/project cards
- Flagship project should have:
  - large image area
  - short pitch
  - role + stack chips
  - outcome / lessons block
  - action links
- Desktop: flagship project can use a 60/40 or 55/45 split.
- Mobile: image first, then content, then links.

### `/build`

- This page should read like a concise engineering narrative, not docs pasted into the site.
- Use 3-5 blocks such as:
  - Architecture
  - UI system / Storybook
  - Quality checks / CI
  - Deployment / Vercel
- Prefer icon-less or very light-icon cards; the tone should stay technical and mature.

## Wireframe-level page breakdown

These wireframes are written so implementation can start even without static mockups.

### Home wireframe

Desktop order:

1. **Sticky header**
   - left: `Lucas Abritta`
   - right: `Home`, `Projects`, `Build`, `CV`, theme switch, `Download CV`
2. **Hero section**
   - left column:
     - mono eyebrow like `Engineering Manager`
     - main headline introducing Lucas
     - 2-3 sentence positioning paragraph
     - CTA row: `Download CV` / `View Projects` / `Open Storybook`
   - right column:
     - one highlight card with 3 proof points
     - or one flagship teaser for *Echoes: Missing Cat*
3. **Credibility strip**
   - 3 horizontally aligned proof items on desktop
   - examples: startup growth, platform quality, hands-on technical leadership
4. **Featured work preview**
   - one large featured project row
   - 2 smaller supporting cards underneath or beside it
5. **Build/storybook preview**
   - short explanation of the build system
   - one CTA to `/build`
   - one secondary CTA to `/storybook`
6. **Optional condensed CV preview**
   - 2-3 timeline snippets max
   - CTA to full CV route if `/cv` exists, otherwise CTA stays `Download CV`
7. **Editorial footer**

Mobile order:

1. Sticky header with name, menu trigger, theme switch
2. Hero copy
3. Full-width hero CTAs stacked or wrapped
4. Highlight card
5. Credibility strip as stacked cards or rows
6. Featured work preview
7. Build/storybook preview
8. Optional condensed CV preview
9. Footer
10. Sticky bottom CTA bar appears only after the hero CTA group scrolls away

### Projects wireframe

Desktop order:

1. Sticky header
2. Intro band
   - page title
   - one short sentence about selected work
3. Flagship project block
   - left: large image / media frame
   - right: title, pitch, chips, role, hardest problem, outcomes, CTA row
4. Supporting projects grid
   - 2 or 3 columns depending on width
   - each card includes title, one-line summary, chips, primary outbound link
5. GitHub curation block
   - optional compact list or card row if not merged into supporting projects
6. Footer

Mobile order:

1. Sticky header
2. Intro band
3. Flagship project image
4. Flagship project content
5. Supporting project cards in a single column
6. GitHub curation block
7. Footer

### Build wireframe

Desktop order:

1. Sticky header
2. Intro band
   - title such as `How this site is built`
   - one paragraph explaining the philosophy
3. Four narrative blocks
   - `Architecture`
   - `Shared UI / Storybook`
   - `Quality / CI`
   - `Deploy / Vercel`
4. Optional closing block
   - `Explore the component library`
   - CTA to `/storybook`
5. Footer

Mobile order:

1. Sticky header
2. Intro band
3. Narrative blocks stacked vertically
4. Storybook CTA block
5. Footer

Section-level notes:

- Intro bands should be visually lighter than the home hero; they are page introductions, not second heroes.
- Every page should surface at least one clear CTA above the fold.
- Repeated shell elements must keep exactly the same spacing and theme-switch behavior across routes.

## Component specs

### Primary buttons

- Background: `var(--accent)`
- Text: white
- Height:
  - Mobile: **44px min**
  - Desktop: **48px**
- Horizontal padding: **16px to 20px**
- Border radius: **10px to 12px**
- Font size: `0.95rem` to `1rem`
- Font weight: `500` to `600`

### Secondary buttons

- Surface: `var(--card)`
- Border: `1px solid var(--border)`
- Same height as primary buttons
- Use for lower-priority actions like `GitHub`, `Storybook`, `Contact`
- In dark mode, secondary buttons should remain clearly outlined and not blend into the background.

### Text links

- Use accent or inline-neutral variants already present in primitives.
- Underlines should appear on hover/focus, not all the time, unless used in body copy.

### Cards

- Radius: `12px` or `16px`
- Padding:
  - Mobile: **20px**
  - Desktop: **24px**
- Shadow: very light only
- Avoid nested cards inside cards unless there is a strong semantic need

### Chips / tech tags

- Small, low-contrast, neutral chips.
- Use chips for stack labels or role markers, not as the primary visual attraction.

## Responsive behavior

### Mobile (`<768px`)

- Single-column layout by default.
- Sticky header remains visible.
- Theme switch remains reachable from the first viewport.
- Bottom sticky CTA bar may appear after hero scroll threshold.
- Buttons can stack full-width in hero and key conversion areas.
- Keep side padding around **20px**.

### Tablet (`768px-1023px`)

- Transition to two-column compositions where helpful, but keep reading flow simple.
- Hero CTA row can remain wrapped rather than forcing one line.

### Desktop (`1024px+`)

- Use multi-column layouts selectively for hero, flagship project, and build overview.
- Keep text content visually anchored to the left with generous whitespace.
- No floating action button; rely on sticky header CTA and in-content CTAs.
- Keep the theme switch visible in the header without competing visually with the primary CTA.

## Interaction and motion

- Keep motion subtle:
  - hover opacity/background transitions around **150-200ms**
  - no parallax for v1
  - no auto-advancing carousels
- Sticky elements should appear/disappear smoothly, not pop abruptly.
- Theme changes should feel fast and calm; avoid animated full-page crossfades.
- Focus states must remain clearly visible and use the accent color consistently.

## Implementation note

This document is intentionally specific enough to guide implementation without requiring a Figma file first. If a future pass introduces a dedicated design system or mockups, that work should refine these values rather than contradict the existing token-based direction without a reason.

## Phased backlog (execution order)

### Phase 1 — Navigation, discovery, parity

- [x] Add **site chrome** (header + nav + enriched footer) in `@portfolio/storybook` as presentational components; **compose** in `apps/frontend/app/layout.tsx` or a small `SiteShell` wrapper so all new pages share it.
- [x] Implement a **theme system** with `system` / `light` / `dark` options and a persistent header control.
  - This requires a **client boundary**: a `ThemeProvider` (or equivalent `"use client"` wrapper) that reads/writes `localStorage` and sets a `data-theme` attribute on `<html>`.
  - Add **`[data-theme="light"]` / `[data-theme="dark"]`** token overrides in `globals.css` alongside the existing `prefers-color-scheme` media query (keep the media query as the `system` fallback).
  - Include a **small inline `<script>`** in `layout.tsx` (before React hydrates) to apply the persisted theme class immediately and **avoid FOUC**.
- [x] Decide whether **GitHub** is **résumé data** (`packages/resume-content`) or **site-only marketing data** (`apps/frontend/lib/**`); implement the smaller model that matches intended reuse.
- [x] Footer (or header): explicit **`/storybook`** link with accessible label (e.g. “Component library (Storybook)”).
- [x] Ensure a **GitHub profile URL** exists in the data model chosen above before wiring header/footer links to it.
- [x] Add **`/build`** route: static/marketing content first (**TSX** by default; MDX is an option but requires adding `@next/mdx` + config, which is not present today); no backend required.
- [x] **Metadata**: extend the existing `siteMetadata` baseline with route-specific title/description (OG later if desired).
- [x] Add Storybook coverage for any new shared chrome components introduced in `packages/storybook`.

**Acceptance**: From any page, user can reach CV download, GitHub, Storybook, and Build in ≤2 clicks; keyboard/focus order sane; theme switch visible and persistent; no Storybook package boundary violations.

### Phase 2 — Projects and GitHub narrative

- [x] Add **`/projects`** route; pass **curated** project data from the app (props or small `lib/projects.ts` in frontend — **not** inside `packages/storybook` if it would couple to résumé types incorrectly; prefer presentation types in storybook + mappers in app).
- [x] Expand **game** content: hero image asset in `apps/frontend/public/`, copy blocks (pitch, “hardest problem,” AI pipeline honesty, link to Play Store).
- [x] **GitHub section**: 3–6 pinned repos with title, one-liner, tech tags, link; manual list v1 (API later optional).
- [x] Add image/content fallbacks so the projects page still renders well before final art is ready.

**Acceptance**: Projects page tells a story per item; game is visually distinct from generic résumé bullets; all external links `rel="noopener noreferrer"` where applicable.

### Phase 3 — Home repositioning

- [x] Refactor `/` so above-the-fold is **person-first** (short narrative + CTAs), with optional “continue to full CV” or move detailed timeline to `/cv`.
- [x] Reuse existing section components where possible; avoid duplicating large CSS.
- [x] Keep the first viewport scannable for recruiter/hiring-manager traffic: title, differentiation, and primary CTA should not compete equally.

**Acceptance**: 10-second test: role, differentiation, and one primary CTA are obvious without scrolling past first viewport on common laptop breakpoints.

*Automation:* CI does not assert viewport height; do a quick laptop-width spot-check before release, or add a Phase 4 Storybook `play` / Playwright assertion when that work is scheduled.

### Phase 4 — Polish and quality gates

- [x] **E2E** (`apps/e2e`): keep the existing CV download coverage and add nav smoke / critical-route checks.
- [x] **Unit tests**: new routes/components as per repo conventions (`apps/frontend`, `packages/storybook` split).
- [x] **Storybook interactions/a11y**: add or extend stories/tests for newly introduced shared UI.
- [x] Run checks per **`docs/agents/agent-workflow.md`** / **`nextjs-change-checklist`** skill (lint, typecheck, tests, build) — preferably via Docker Compose per project rules. CI splits per package in **`.github/workflows/`** (`ci-frontend.yml`, `ci-storybook.yml`, `ci-resume-content.yml`, `ci-e2e.yml`, `ci-build.yml`); ensure touched packages pass their workflow.

## Content the owner must supply (non-code)

- One **positioning paragraph** (non-résumé tone).
- **Game**: hero image (or approved placeholder), 3–5 bullets, optional “lessons learned.”
- **GitHub**: list of repos to pin + one-line hook each.
- **`/build`**: facts to highlight (Vercel, GitHub Actions, Docker — align with truth in README/workflows).
- Preferred **target role / audience emphasis** if the homepage should optimize for EM leadership, hands-on platform work, or AI/product narrative.

## Open decisions (pick one before deep implementation)

1. **CV on `/` vs `/cv`**: single long page vs split; affects scroll and SEO.
2. **GitHub placement/model**: add to `resume-content` for shared reuse, or keep as site-only curated data in frontend.
3. **Route naming**: `/build` vs `/craft` (recommend `/build` unless a more editorial voice is preferred).
4. **Internationalization**: English-only v1 is implied; call out if ES copy is needed later.
5. **GitHub data source**: manual curation (recommended v1) vs GitHub API (token, caching, rate limits).

## References for implementers

- [`docs/agents/project-overview.md`](project-overview.md) — workspace boundaries.
- [`docs/agents/repository-map.md`](repository-map.md) — where UI and data live.
- [`docs/agents/storybook-ui.md`](storybook-ui.md) — Storybook build, `/storybook`, Vitest addon.
- [`docs/agents/cv-pdf-docker.md`](cv-pdf-docker.md) — CV PDF pipeline and Docker.
- [`.cursor/rules/nextjs-react.mdc`](../../.cursor/rules/nextjs-react.mdc) — view/logic/style separation.

## Success criteria (definition of done for revamp v1)

- [ ] New routes: at minimum **`/projects`** and **`/build`**, plus improved **`/`** and global nav/footer.
- [ ] GitHub + Storybook + CV are **obvious** from first visit.
- [ ] Game has **flagship** treatment (visual + narrative).
- [ ] New content lives in the correct package: shared presentation in Storybook, shared résumé facts in `resume-content`, route composition in frontend.
- [ ] No ESLint boundary violations; CI green for touched packages.

---

*Last validated against repo layout on 2026-04-16; adjust file paths if the tree moves.*
