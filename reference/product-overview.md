# Avai — Product Overview

## What it is

A diagnostic engine that reads question-wise marks from exams schools are already conducting, and turns them into a map of exactly where each student's understanding breaks down — down to the concept, not just the subject.

It does not write exams. It does not read answer content. It reads marks against a question paper that has been tagged in advance, and turns a set of numbers into a diagnosis.

Operates commercially as **Avai**, built and owned by **INAT Venture Pvt Ltd**, publicly associated with **Yaadhum** branding for the research and community-facing side of the work.

---

## The core problem it solves

Every school already produces the raw data needed to know exactly where a student is struggling. It's sitting in exam scripts and mark registers. No one extracts it, because doing it by hand for one class is a week of work, and no existing tool goes deeper than subject-level totals.

A report card says a student scored 42/80 in Maths. It doesn't say the 38 marks lost were all on application-level questions, not recall. It doesn't say the same pattern shows up in Science but not in Social Science. That distinction is the difference between "needs more practice" and "has a specific, addressable, cross-subject competency gap."

Nothing in the Indian K-12 diagnostic market currently detects that pattern. Everything stops at the subject total.

---

## Who uses it

**Schools (CBSE, pilot phase)**
The customer and data source. Provides exam scripts/scorecards, gets diagnostic reports back at student, class, and section level.

**Principals / school leadership**
Consume section and class-level reports. Use them for resourcing decisions — where to add remedial time, which teacher needs support on which concept.

**Teachers**
Confirm marks on screen (the human check in the OCR pipeline) and receive class-level diagnostic breakdowns they can act on directly in the classroom.

**Students / parents** (downstream, not billed)
Indirect beneficiaries. No parent-direct billing — the school pays, against verified headcount.

**Yaadhum (trust side)**
Uses the same underlying research — anonymised, consented separately — for scholarship identification and public policy/education research, published openly.

---

## How it works, end to end

### 1. Question paper tagging (before the exam is marked)
Every question in a school's exam paper is tagged against a two-layer schema:

- **Layer 1 — Curriculum**: subject, class, chapter, board unit, concept family, concept variant, prerequisite concept
- **Layer 2 — Assessment demand**: competency tier, complexity, dependency level

This is what turns "Question 14" into "Question 14: Class 10 Maths, Quadratic Equations, applying-tier, moderate complexity, depends on factorisation." Tagging is LLM-assisted (Claude Sonnet) with a two-pass agreement check to catch ambiguous or low-confidence tags before they enter the pipeline.

### 2. Marks capture (after the exam is marked)
Teachers mark the exam as normal, but transcribe marks onto a pre-printed, structured scorecard — one box per question, sections mirroring the paper. Scorecards are scanned and passed through an OCR pipeline (Claude Haiku) that extracts each cell.

Automated checks run on every scorecard before it's accepted:
- Sum of question marks matches the declared total
- Each mark is within the possible range for that question
- Barcode/roll number resolves to a real student
- Blank is distinguished from zero (a student who didn't attempt a question is not the same as one who attempted and scored nothing)

Teachers confirm the extracted marks on screen — this is the human-in-the-loop step that keeps operational cost down and catches anything the automated checks miss.

### 3. Diagnosis
With tagged questions and verified marks, the system doesn't just compute a subject score — it computes performance *per concept, per competency tier*, across every subject the student takes.

This is where the differentiator lives: the system can see that a student consistently loses marks on applying-tier questions in Maths *and* Science, but not in Social Science. That's a specific, transferable reasoning gap, not a subject-specific weakness — and it's invisible to any tool that only looks at subject totals.

### 4. Reporting
Diagnostic output is generated at three levels:
- **Student** — individual concept-level gap map
- **Class** — where the class as a whole is weak, useful for teachers planning remedial focus
- **School section** — pattern visibility for leadership across classes/streams

### 5. Data handling
- Scorecard images are retained 30 days post-extraction (for dispute resolution), then deleted, gated on teacher confirmation
- Multi-tenant by design — every table is scoped to a `school_id`, enforced with row-level security, so one school can never see another's data even at the infrastructure level
- Research use (Yaadhum) and commercial use (Avai) require separate, purpose-specific parental consent — data collected under one cannot silently feed the other

---

## Current pilot

- **Location**: Krishnagiri district, Tamil Nadu
- **Scope**: 5 CBSE schools, onboarded one per week (School 1 debugs the pipeline before School 5 arrives)
- **Grades**: Classes 10 and 12
- **Reference school**: Bharat International Senior Secondary School
- **Backing**: District Collector (Thiru C. Dinesh Kumar) has expressed support for a free diagnostics + scholarship programme in government schools

---

## Pricing model

- Per-student, billed against a verifiable official headcount (CBSE List of Candidates or DGE registration)
- Whole-grade enrollment required — no partial-class billing
- Minimum billable floor: 60 students per grade
- No parent-direct billing; school pays

---

## What makes it defensible

Not the OCR, and not the tagging in isolation — both are increasingly commodity LLM capability. The defensibility is the **combination**: a consistent two-layer tagging schema applied across every subject a student takes, married to verified marks data, producing a *cross-subject* view no current Indian ed-tech or school MIS tool builds toward. Competitors that dashboard subject totals are answering a different, shallower question.
