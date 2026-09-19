# Building the Avai site with Claude Code

## Before you type anything

Set the repo up first. Claude Code is dramatically better when the reference
material is on disk than when it's described in a message.

```
avai-website/
├── CLAUDE.md                       ← the context file
├── reference/
│   ├── brand-sheet.jpeg            ← the mascot + logo sheet
│   ├── screen-walkthrough.pdf      ← the 24-screen product deck
│   ├── product-overview.md
│   └── static-site/                ← the working HTML site, all 11 pages
└── (Claude Code builds the rest)
```

Then:
```bash
cd avai-website
git init && git add -A && git commit -m "Reference material"
claude
```

Commit after every prompt below. If a step goes sideways you want one
`git checkout .` between you and a clean slate, not an afternoon of untangling.

**Use plan mode** (Shift+Tab twice) for prompts 1, 4 and 7. Those are the ones
where a wrong structural decision is expensive to undo.

---

## Prompt 1 — Orientation, no code

> Read CLAUDE.md, then read every file in `reference/`. Look at
> `reference/brand-sheet.jpeg` carefully — the mascot poses, the wordmark, the
> wing gradient. Page through `reference/screen-walkthrough.pdf` and pay
> attention to how findings, the three status dimensions, and the
> limited-evidence states are rendered in the real product.
>
> Then tell me, without writing any code:
> 1. What Avai does and what it explicitly does not do
> 2. The three status dimensions and why they are kept separate
> 3. Where the mascot is allowed to appear and where it is banned
> 4. Anything in the reference material that contradicts CLAUDE.md
>
> If your summary is wrong on any of these I want to correct it before we build.

**Do not skip this.** Everything downstream inherits whatever it understands
here. Read the answer properly and correct it if it drifts — especially if it
describes Avai as a learning or practice platform.

---

## Prompt 2 — Scaffold

> Scaffold a Next.js 15 project with the App Router and TypeScript in this
> directory, configured for static export. No Tailwind — we use hand-written CSS
> with CSS Modules, per CLAUDE.md.
>
> Set up `next/font/google` for Outfit, IBM Plex Sans and IBM Plex Mono, exposed
> as CSS variables. Create `styles/tokens.css` from the file I'm about to give
> you and import it globally. Add a `/health` route that renders the full token
> palette as swatches with their variable names, so I can eyeball the colours.
>
> Then run the build and show me it passes.

Paste `tokens.css` when it asks. Open `/health` and check the colours against
the brand sheet before moving on.

---

## Prompt 3 — The mascot

> Build `components/Mascot.tsx`. Avai is the bird from
> `reference/brand-sheet.jpeg`: cream body, a fanned wing running navy → blue →
> teal → gold, orange tail streaks, a small orange beak, dark eye with a
> highlight.
>
> Ship it as inline SVG with a `pose` prop supporting `hello`, `improve`,
> `achieve`, `wait`, and `calm`, plus a `size` prop. `wait` gets a gentle bob
> animation wrapped in a reduced-motion guard. `achieve` gets a gold star.
> Also export a `MascotMark` — the head-only crop for the app icon and favicon.
>
> Add a `/health/mascot` page rendering every pose at 48px, 96px and 160px so I
> can see them side by side.
>
> This is a stand-in for real artwork. Keep every shape in one file with clear
> names so swapping in final vectors touches nothing else.

Look at `/health/mascot`. Iterate here until the bird reads correctly at 48px —
it's much cheaper to fix now than after it's embedded across nine pages.

---

## Prompt 4 — The six display components

> Build the six reusable display components listed in CLAUDE.md: `FindingCard`,
> `SignalCluster`, `EvidenceNote`, `AttainmentBar`, `EvidencePanel`,
> `StudentReportCard`. Use `reference/screen-walkthrough.pdf` for their visual
> language and `reference/static-site/` for the markup and copy.
>
> Hard requirements:
> - `SignalCluster` renders the three dimensions with three different visual
>   treatments and they never merge into one colour scale
> - `EvidenceNote` supports all four limited-evidence states and none of them
>   is styled as an error
> - `FindingCard` never renders a bare statistic — every number carries its
>   denominator or its unit
> - No mascot in any of these six components
>
> Put demo instances of all six on `/health/components` at desktop and mobile
> widths. Show me a plan before you write files.

This prompt is the highest-leverage one in the list. Nine pages are assembled
from these six components, so an hour spent iterating here saves a day later.

---

## Prompt 5 — Shell

> Build `Header`, `Footer`, `PageHeader` and `CtaBand`, plus the root layout.
>
> Header: logo lockup (the AVAI wordmark with a teal "A", "LEARN GROW ACHIEVE"
> beneath it), primary nav, a School portal link and a Request a pilot button.
> Sticky with a translucent backdrop. Collapses to a working mobile menu under
> 1000px.
>
> Footer: dark navy, the logo, the brand signature "A brighter tomorrow for
> every student.", the INAT Venture / Yaadhum line, three link columns, and the
> legal line from `reference/static-site/`.
>
> Nav labels must be short enough not to wrap at 1280px. Check with a screenshot.

---

## Prompt 6 — The hero loop

> Build `components/HeroLoop.tsx`: a looping four-scene player that follows one
> finding from a mark to a student report. See
> `reference/static-site/index.html` for the working reference implementation.
>
> Scenes and timings:
> 1. **Marks** (5s) — a question-wise scorecard grid, Q1 through Q12, plain
>    numbers, nothing highlighted. Caption: the marks your teachers already entered.
> 2. **Finding** (7s) — the grid dims to grey, three application-tier cells stay
>    lit, and a `FindingCard` for Mathematics · Quadratic Equations resolves
>    below it. Caption: not a subject total, a named gap with what it costs.
> 3. **Evidence** (6s) — an `EvidencePanel` with the three questions it read,
>    concluding "Students know the concept. They lose it in application."
>    Plus the paper-under-tests note. Caption: every number opens.
> 4. **Report** (6s) — a `StudentReportCard`, 78/80, Avai in the Improve pose.
>    Caption: same diagnosis, no rank, no percentile.
>
> Requirements:
> - Cross-fade between scenes; never more than two elements animating at once
> - Four chapter dots and a working pause/play control
> - Under `prefers-reduced-motion`, autoplay is off and the dots still work
> - Reserve the stage height so there is zero layout shift
> - Keyboard accessible; the dots are a proper tablist
> - The mascot appears only in scene 4
>
> Screenshot each of the four scenes at 1280px and 390px and show me.

---

## Prompt 7 — Pages, in batches

Do these as three separate prompts, not one. Commit between each.

> **7a.** Build `/` and `/findings` using the components we've built and the
> copy from `reference/static-site/`. Keep the copy — improve the
> implementation, not the words. Screenshot both at 1280px and 390px.

> **7b.** Build `/how-it-works`, `/roles` and `/trust`.
> `/how-it-works` needs the four limited-evidence states as a tabbed panel.
> `/roles` needs a three-way switcher rendering the same Quadratic Equations
> finding as principal, teacher and student — this is the page that proves the
> permission model, so make the difference between the three views obvious.
> Screenshot each at both widths.

> **7c.** Build `/pilot`, `/pricing`, `/about` and `/contact`.
> The contact form is client-side only for now: validate, prevent default, show
> a success state with the mascot. Leave a clearly marked TODO where the
> endpoint goes. Every field needs a real label and an error state.

---

## Prompt 8 — The portal demo

> Build `/portal` and `/portal/dashboard` from
> `reference/static-site/portal.html` and `dashboard.html`, and from the
> principal screens in `reference/screen-walkthrough.pdf`.
>
> `/portal`: split layout, dark navy panel on the left with the mascot in the
> Hello pose and the brand signature, sign-in form on the right with two tabs
> (School staff / Student). Both tabs give the same generic failure message so
> a failed sign-in never reveals why. Below the form, a clearly labelled demo
> role switcher.
>
> `/portal/dashboard`: sidebar nav, breadcrumbs School / Class X / Unit Test 2,
> KPI strip, findings grid, section comparison table with its non-attribution
> note, student table, and the four limited-evidence states gathered in one
> section. Clicking a finding opens a right-side drawer with per-question
> evidence and the section spread. Drawer closes on Escape, backdrop, and ✕.
>
> A persistent banner marks this as sample data. **No mascot anywhere on the
> dashboard** — it is a data-dense surface.
>
> This is a demo, not authentication. Make that obvious in the code.

---

## Prompt 9 — Polish

> Pass over the whole site:
> - Per-page metadata, Open Graph tags, and a generated OG image using the
>   wordmark and a mascot pose
> - Favicon and apple-touch-icon from `MascotMark`
> - A 404 page — Avai in the Hello pose, one calm line, a link home
> - `sitemap.xml` and `robots.txt`
> - Audit every animation for a reduced-motion guard
> - Audit focus rings on every interactive element
> - Check colour contrast against WCAG AA and fix anything failing
>
> Then run a Lighthouse pass on `/` and show me the scores.

---

## Prompt 10 — Self-review

> Re-read CLAUDE.md, then audit the site you've built against it. Specifically:
>
> 1. Does any copy imply Avai tutors, practises, grades, or evaluates teachers?
> 2. Does the mascot appear on any data-dense surface?
> 3. Is there more than one mascot in any single viewport?
> 4. Are the three status dimensions ever merged into one colour scale?
> 5. Is any limited-evidence state styled as an error?
> 6. Are there statistics, testimonials or school names not in CLAUDE.md's
>    approved facts list?
> 7. Does "Achieve" appear more than once?
>
> Report violations with file and line. Do not fix them yet — show me the list first.

Run this one again any time you've made a big batch of changes. It catches the
drift that accumulates when a model has been generating copy for an hour.

---

## Practical notes

**Add the Playwright MCP server** so Claude Code can screenshot and check its
own work instead of asking you to look. It roughly halves the review cycles.

**Give feedback in the product's own vocabulary.** "The confidence meter is
reading as a rating" lands better than "make that look nicer", because the
first tells it which constraint you think it broke.

**When it drifts into generic edtech copy**, the fix is almost always to point
back at a specific reference file rather than to describe what you want:
"reread the honesty section of CLAUDE.md and rewrite this".

**Keep the static site in `reference/` for the whole build.** It is your
regression test. When a page looks worse than the HTML version, you have
something concrete to diff against.
