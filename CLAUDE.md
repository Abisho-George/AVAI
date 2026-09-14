# Avai — marketing website

This repo is the **public website** for Avai. It is not the product app.
The product app lives separately and uses Next.js 15 App Router with
hand-written CSS and no Tailwind. Match those conventions here.

---

## What Avai is (get this right — most mistakes start here)

Avai is a **diagnostic engine for schools**. It reads question-wise marks from
exams schools are already conducting, against a question paper that has been
mapped to the Board blueprint in advance, and produces findings: named
competency gaps with what they cost in marks, how urgent they are for the
Board exam, and how confident the system is that the pattern is real.

Operated commercially as **Avai**, built and owned by **INAT Venture Pvt Ltd**.
The same research runs openly as **Yaadhum** for scholarship identification and
public education research, under separate consent.

**Avai is not a tutoring app, a practice app, a question bank, or an LMS.**
If any copy you write implies students practising questions inside Avai,
it is wrong. Delete it.

### What Avai never does — treat these as hard constraints on all copy
- Never sets or grades an exam
- Never reads answer content (it reads numbers only)
- Never evaluates or ranks a teacher
- Never shows a **student** a classmate, a rank, a percentile, or a class average.
  This rule is scoped to the student surface. A principal does see rank, in
  Student Intelligence, where it is present but never the headline: the row's
  payload is what is stopping that student. `/roles` must show that difference
  rather than implying a blanket ban.
- Never bills a parent (the school pays, against a verified headcount)
- Never lets research data and commercial data mix

---

## The positioning, in priority order

1. **Upload in, reports out.** The homepage headline is now the outcome claim:
   "Upload your question paper and your marks. Avai sends back a report for
   every student, and everything your principal needs to see, from one login."
   *"What is stopping students from scoring higher?"* is still taken verbatim
   from the product UI and stays on the homepage as the secondary line, the
   question those reports answer.
2. **"Lost marks = lost Board potential"** — the economic argument. Principals
   buy Board marks, not "concept-level diagnostics".
3. **The honesty rules are the moat.** Avai reports when it cannot explain
   something. Competitors will not copy this because copying it means admitting
   limits. Give it real estate, not a footnote.
4. Cross-subject competency detection — the technical differentiator.

`A brighter tomorrow for every student.` is the **brand signature**. It belongs
in the footer and the portal welcome panel. It is not the hero headline.

It is the **only** tagline in this build. The brand sheet also carries
`Curiosity today. Opportunities tomorrow.` and
`More than a platform, a partner for every possibility.` Both are retired.
The second one breaks the voice rules below in any case.

---

## Voice

**Show the outcome, never explain the mechanism.** This is a showcase site, not
the product and not documentation. A finding card, a student report and a
dashboard are self-explanatory at a glance. The tagging process, Board-blueprint
mapping, "competency tier" language, blueprint-coverage percentages and the four
limited-evidence states as a taught concept are all sales-call material and do
not belong on a public page. If a figure does not mean something to a principal
in three seconds, cut it.

- Plain declarative sentences. Short. A principal in a district office is the reader.
- Indian English spellings: "localised", "analysed", "programme". Sentence case,
  never title case. The product app currently ships the US, title-cased string
  "Cause Not Localized". That is a product bug to fix there, not a website
  decision: the site says "Cause not localised". See `NOTES.md`.
- Say the number. "146 of 240 students", "4.2 marks per student", not "many students".
- Never use: "revolutionise", "empower", "unlock", "supercharge", "game-changing",
  "AI-powered", "cutting-edge", "seamless", "leverage".
- Never claim prediction accuracy, score improvement percentages, or outcomes
  we have not measured. There is no "35% improvement" number. Do not invent one.
- Avoid em-dash asides and "not X, but Y" constructions.

---

## Three status dimensions — never merge them

This is Avai's visual signature and it is load-bearing. Three independent
signals, three different visual treatments, never collapsed into one
red-amber-green scale:

| Dimension | Treatment | Meaning |
|---|---|---|
| **Attention** | Solid pill | What the school should do about it. `Immediate` / `Watch` / `On track` / `Investigation required` / `Insufficient evidence` |
| **Board urgency** | Outlined chip with a flame/triangle glyph | How often this competency recurs in recent Board papers. `Very high · 4/4 years` down to `Low · 1/4 years` |
| **Confidence** | Three-dot meter | Strength of evidence that the pattern exists at all. `High` / `Medium` / `Emerging` |

A finding can be very-high urgency with only an emerging signal. The UI must be
able to show that disagreement.

### Attention has five values. Two of them are easy to confuse.

- `Investigation required` - the problem is confirmed. The cause is not known.
- `Insufficient evidence` - we cannot confirm there is a problem at all.

These are different findings and they read differently. Do not collapse them.

`Insufficient evidence` is also not a restatement of the confidence meter.
Confidence says how sure we are the pattern is real. Attention says what the
school should do about it. The two correlate. They are not the same axis, and a
component must be able to render them independently.

---

## The four limited-evidence states

Render these as calm information. **Never as errors.** Never red.

| State | Copy |
|---|---|
| Cause not localised | Problem confirmed. Cause not localised. Manual review recommended. |
| Paper under-tests this area | This assessment included too few application questions to confidently assess application readiness. |
| Early signal | A possible pattern is visible, but there is not yet enough evidence for a strong conclusion. |
| Trend not yet available | Trend and consistency insights require at least one additional analysed assessment. |

Also non-negotiable: every section comparison carries the note *"A section gap
describes tested performance on this assessment only. It is not a measure of
teaching quality, and Avai does not attribute it to any teacher."*

Risk groups are named **High Potential Gap** and **High Academic Risk**.
Never "weak students", never "low performers".

### The honesty position on the public site is one sentence

This is a showcase site, not documentation. The four states are **not taught**
as a concept on any public page. The whole position is one line near the bottom
of the homepage:

> Avai tells you when a paper didn't give it enough to be sure. It doesn't guess.

`EvidenceNote` stays in the component library and still renders on a finding
where it applies, `Cause not localised` included, carrying its own unbuilt
caption. What is gone is the tabbed panel that explained all four as a feature.

---

## Avai the mascot

Avai is the bird from the brand sheet: cream body, navy-to-teal-to-gold wing,
orange tail.

### Pose vocabulary for this site: exactly five

`hello` · `improve` · `achieve` · `wait` · `neutral`

`neutral` is not on the brand sheet and is not Hello reused. Build it. It is how
Avai avoids celebrating an unearned result: on a flat outcome the pose drops to
neutral and the trend arrow goes sideways.

**Practice, Learn and Explore are not used on this site.** The brand sheet was
made before the product narrowed, and it depicts an aspirational student
companion that does not exist. Also out of scope, and not to be rendered or
gestured at in copy: the In-app Assistant chat bubble, the Student Guidance
COLLEGE / CAREER / OPPORTUNITIES signpost, and anything implying coaching,
tutoring or careers advice.

The Exam Feedback card survives as the **layout** for `StudentReportCard` and
not as its tone. No exclamation marks. No "Great progress!".

### Placement rules — enforce these
- **Never on a data-dense surface.** Not beside a finding card. Not in a
  dashboard screenshot. Not near a table of numbers.
- Allowed: hero, wait/loading states, student report cards, portal welcome
  panel, form confirmations, empty states, footer, 404.
- **One bird per viewport.** Never two in the same scroll frame.
- Never floating decoratively in a corner.
- Motion only in response to something the user did, or in a genuine wait state.
  No scroll-triggered mascot animation.
- **Achieve is reserved for a genuine standout.** On the website that means it
  appears exactly once, at the final call to action.
- At small sizes use the head-only app-icon crop. Full body only at 120px and up.

The bird is a **narrator**, not a feature. It explains and points. It does not
tutor, and no copy should suggest it does.

---

## Tech

- Next.js 15, App Router, TypeScript
- **Hand-written CSS with CSS custom properties. No Tailwind.** Matches the product app.
- CSS Modules per component, plus one global `tokens.css`
- No component library. No Framer Motion unless a specific interaction needs it.
- Static export target (`output: 'export'`) — this site has no server needs
- Fonts: `next/font/google` — Outfit (display), IBM Plex Sans (body), IBM Plex Mono (marks/IDs)
- Tabular numerals **where figures stack into columns**, not globally. IBM Plex
  Sans gives the period a full digit advance in tabular mode, so a global rule
  renders "4.2 marks per student" as "4 . 2" in running text. `tokens.css`
  applies it to `table`, `th`, `td` and a `.tnum` utility; inline prose measures
  use proportional figures. See `NOTES.md`.

### Accessibility, non-negotiable
- All animation wrapped in `@media (prefers-reduced-motion: no-preference)`
- Hero loop must have a pause control and chapter navigation
- Every interactive element keyboard reachable with a visible focus ring
- Colour is never the only carrier of meaning — pair it with a label or glyph
- Target WCAG AA contrast throughout

### Performance
- Lighthouse 95+ on performance and accessibility for the homepage
- No layout shift from the hero loop — reserve its height
- Mascot ships as inline SVG, not a raster image

---

## Sitemap

| Route | Purpose |
|---|---|
| `/` | Hero loop, lost-marks argument, three signals, honesty, pilot proof, CTA |
| `/findings` | Anatomy of a finding, marks loss intelligence, risk groups, intervention plan |
| `/how-it-works` | Three steps: send the paper and marks, Avai analyses it, reports appear |
| `/roles` | Same finding scoped to principal / teacher / student; permission model |
| `/pilot` | Krishnagiri, week by week, what the school provides and receives |
| `/trust` | Data handling, isolation, consent separation, what Avai never does |
| `/pricing` | Per student, verified headcount, whole grade, 60-student floor |
| `/about` | INAT Venture, Yaadhum, the government-school programme |
| `/contact` | Pilot request form |
| `/portal` | School portal sign-in — two tabs (staff / student) plus demo role switcher |
| `/portal/school` | School overview. Board years lead as cards, the rest in a table |
| `/portal/class` | Class level, kept light. Attainment, sections, the assessment table |
| `/portal/assessment` | The weight of the demo: findings, the three signals, the detail drawer |

The portal demo mirrors the real hierarchy. A principal signs in to a school,
not to an assessment, and the School → Class → Assessment depth is itself part
of the pitch. `/roles` already claims those three levels, so a flat demo would
contradict the page beside it. Breadcrumbs run `School / Class X / Unit Test 2`.

### School and class are thin on purpose

The assessment view is the demo's payload. School and class exist to prove the
hierarchy is real and to give the breadcrumb somewhere to go. Do not make them
impressive.

`reference/static-site/dashboard.html` is a single flat page, so these two
levels have no copy to inherit. Write it from `reference/screen-walkthrough.pdf`,
not from the HTML. Where the walkthrough gives an exact on-screen sentence — the
disabled-action reasons, the non-attribution note — use it verbatim.

**`/portal/school`** — school name, board, state, academic year. A count strip:
standards, students, standards analysed, papers stored. The two
Board-examination years, X and XII, as cards; other standards in a plain table.
Class XII shows its real state, marks entered and nothing analysed yet, rather
than borrowed numbers, and its "Open BoardX" action is **disabled with its
reason stated**, never hidden. That honesty rule is the reason this level is
worth rendering at all.

**`/portal/class`** — Class X. The assessment table leads, and it is the way
down: only the analysed assessment opens, the others say why they cannot. Then
class attainment bands, the section table, the subject table, and the three
findings carrying the most marks exposure, linking through to the full set in
the assessment view.

**`/portal/assessment`** — everything `dashboard.html` has today, unchanged.

---

## Component inventory

Six components carry the whole site. Build them once in `components/` and reuse.

1. **`FindingCard`** — subject, competency, students affected, avg marks lost,
   the three signals, one observation sentence, suggested action. Never a bare stat.
2. **`SignalCluster`** — attention pill + urgency chip + confidence meter.
3. **`EvidencePanel`** — per-question breakdown plus a per-section bar chart.
4. **`AttainmentBar`** — label, track, fill, value. Fill colour from the wing gradient.
5. **`EvidenceNote`** — the four limited-evidence states. Soft border, never red.
6. **`StudentReportCard`** — score, trend arrow, mascot pose, two lists, download.

Plus `HeroLoop`, `Mascot`, `Header`, `Footer`, `PageHeader`, `CtaBand`.

---

## Facts you may use. Do not invent others.

- Pilot: 5 CBSE schools, Krishnagiri district, Tamil Nadu, onboarded one per week
- Grades: Classes X and XII
- Reference school: Bharat International Senior Secondary School
- District Collector Thiru C. Dinesh Kumar has expressed support for a free
  diagnostics and scholarship programme in government schools
- Pricing: per student, against CBSE List of Candidates or DGE registration;
  whole grade only; minimum 60 students per grade; school pays
- Data: scorecard images retained 30 days post-extraction, gated on teacher
  confirmation; every table scoped to `school_id` with row-level security
- Sample figures used throughout the demo data: 240 students in Class X,
  5 sections, 146 students affected by the Quadratic Equations finding,
  4.2 average marks lost, Board recurrence 2022–2025

### The demo findings, in full

Traced to `reference/static-site/` and the product's own mock fixture by way of
the walkthrough. Approved for use on any page.

| Finding | Students affected | Avg marks lost | Board urgency | Attention | Confidence |
|---|---|---|---|---|---|
| Mathematics · Quadratic Equations, application problems | 146 of 240 | 4.2 per student | Very high · 4/4 years | Immediate | High |
| Physics · Electricity, numericals | 122 of 240 | 3.8 per student | High · 3/4 years | Immediate | High |
| Physics · Light, whole chapter, no single sub-skill | 84 of 240 | 2.7 per student | High · 3/4 years | Investigation required | High |

Physics · Light is the Light card: cause not localised, so it carries no
suggested action.

Behind the Quadratic Equations finding: 3 questions tested, Board recurrence
2022, 2023, 2024, 2025, and the observation "61% of analysed students
demonstrate the underlying concept but lose marks when it appears in
application-style questions."

- Evidence from the paper: Q7 · 3 marks, 58% partial credit; Q12 · 4 marks, 41%
  attempted; Concept MCQ Q2, 87% correct
- Students affected by section: X-A 41%, X-B 66%, X-C 55%, X-D 72%, X-E 58%
- Sections: X-A to X-E, 48 students each
- Student rows: Aarav X-A 17/17, no blocker; Riya X-C 16/17, Physics numericals;
  Rahul X-B 12/17, Maths application; Aditi R. X-A 16/17, no blocker

### The homepage and /findings figures

From `reference/static-site/`, approved on the same basis as the rest.

- The lost-marks comparison: a report card reading Mathematics 42/80, Science
  49/80, Social Science 63/80, with 38 lost marks in Maths. Against it, Avai's
  tiers: recall 88%, understanding 74%, application 31%, the same application
  tier in Science 34%, and Social Science 81%.
- The pilot strip: 5 CBSE schools onboarded one per week, Classes X and XII,
  0 new exams a school has to write, about 1 hour of teacher time per exam.
- The risk groups: High potential gap, 34 students, high confidence. High
  academic risk, 28 students, medium confidence.

Risk groups carry a confidence value and **no attention value**. Attention
answers what the school should do about a *finding*, and a group is not a
finding. `ConfidenceMeter` renders the meter on its own for exactly this case.

### The /how-it-works and /roles figures

From `reference/static-site/`, approved on the same basis as the rest.

- Diagnostic strength: blueprint coverage 82% (8 of 9 chapters), application
  questions 22% against 30% expected, higher-order questions 10% against 20%
  expected.
- The Quadratic Equations finding, scoped to Class X-A for the teacher view:
  29 of 48 students, 4.1 marks per student (a section-level subset of the
  school-level 146 of 240, 4.2, which stays the principal-scoped figure).

### The hero loop's figures

From `reference/static-site/index.html`, and used only in the four-scene loop.

- Scene 1, the scorecard: Unit Test 2, Class X-B, Mathematics, 48 students.
  Q1 2/2, Q2 3/3, Q3 1/1, Q4 2/2, Q5 3/4, Q6 2/2, Q7 1/3, Q8 3/3, Q9 2/2,
  Q10 4/4, Q11 2/3, Q12 1/4. Total 26/33. Q7, Q11 and Q12 are the
  application-tier questions scene 2 keeps lit.
- Scene 4, the student report: Aditi R., Mathematics · Term 2, 78 of 80.

The static site gives that report card the line "Keep going. You're on the right
path." That is the retired brand-sheet tone, so the site says what was actually
observed instead: "Your recall answers held up. The marks you lost were on
application-style quadratic equations."

**One conflict, resolved.** `index.html` gives Electricity as
`Very high · 4/4 years`; `findings.html` gives `High · 3/4 years` and ranks it
second behind Quadratic Equations. The site uses **High · 3/4 years**: two
findings cannot both be the top-recurrence one, and the priority table is the
more specific source.

If you need a number that is not in this list, ask. Do not fill it in.

**When `reference/static-site/` and this list disagree, this list wins.** The
static site is the source of truth for *copy*, not for *facts*. Its "worth
roughly sixty Board marks" was unsourced and has been cut: the structural claim
stays, the number goes.

Say "Classes X and XII", not "Classes 10 and 12".

"Avg marks lost" is per student. "Marks exposure" is the cohort aggregate. Both
are correct in their own context. They are not alternative names for one number.

---

## Reference material in this repo

- `reference/brand-sheet.jpeg` — logo, mascot poses, colours, app icon
- `reference/static-site/` — a working static HTML version of this site, all
  eleven pages. **This is the content source of truth.** Copy the copy from it.
  Improve the implementation, not the words, unless asked. It is also the
  regression test: if a rebuilt page reads worse than the HTML version,
  the rebuild is wrong.
- `reference/tokens.css` — brand tokens sampled from the brand sheet. Import
  these; do not invent approximations.
- `reference/product-overview.md` — what Avai is, commercially and technically
- `reference/screen-walkthrough.pdf` — 24 screens of the real product app
  (24 captures; the PDF runs to 27 pages including covers and one blank).
  Use it for UI vocabulary and to keep the website's components visually
  consistent with the product.
- `reference/tagged-paper-sample.csv` — a real tagged CBSE Science paper from
  the production pipeline. **This is the authoritative tagging schema**, and it
  is richer than the summary in `product-overview.md`. Read the real column
  names (`skill_observed`, `concept_family`, `category`, `cross_chapter`,
  `choice_status`, `in_syllabus_current`, `category_source`, `notes`) before
  writing any copy about how tagging works. The `notes` column shows real
  two-pass resolution in action — useful, concrete material for
  `/how-it-works`. Do not reproduce question text on the public site.

  **All `/how-it-works` tagging copy comes off this CSV, not off
  `product-overview.md`.** The overview describes a Layer 2 of "competency tier,
  complexity, dependency level" that the pipeline does not ship. Use the real
  column names. Describe the two-pass mechanism; quote no question text.

---

## Unbuilt

These four are drawn in the shapes the spec describes and are marked as backend
work in the product source. They are **not running**:

1. Cause not localised
2. The Potential Ladder
3. The intervention priority score
4. The anomaly pattern labels

**No copy anywhere may describe an unbuilt capability in the present tense.**
Check every page against this list before calling it done.

### How to render an unbuilt shape

Three rules, and they apply together, anywhere on the site:

1. **Show it in its designed shape.** Do not drop it and do not redraw it as
   something vaguer. `Cause not localised` keeps its tab in the four-state panel
   on `/how-it-works`.
2. **Describe it in the conditional.** What Avai *will* report when it cannot
   localise a cause, not what it does today. The three built states stay in the
   present tense, because they run.
3. **Label it plainly.** Carry a short present-tense caption on the shape itself:

   > Designed. Not yet running in the current build.

   Flat and factual. No apology, no cleverness, no nodding at how on-brand the
   admission is. Same visual weight as any other small caption. It is a caption,
   not a badge and not a callout, and it gets no colour, border or icon of its
   own.

### The honesty argument rests on the three built states

`Trend not yet available`, `Paper under-tests this area`, `Early signal`. Audit
finished: the static site does not yet do this. On `/`, the honesty section
leads with `Cause not localised` and its third item, "No dominant common
blocker", is the Potential Ladder. On `/findings`, the anatomy example is the
Cause-not-localised card, and the intervention plan table describes the
priority score in the present tense. The rebuild fixes all of that: write the
three built states into the `/` honesty section and give `/findings` a built
finding as its anatomy example.

---

## Working agreement

- Show a plan before writing files for anything spanning more than one component.
- After building any page, screenshot it at 1280px and 390px and check it yourself
  before telling me it is done.
- Run `npm run build` and `npx tsc --noEmit` before claiming a task is complete.
- Do not add dependencies without asking.
- Do not invent statistics, testimonials, school names, or logos.
