# Notes

Things settled outside the code, kept here so they are not re-litigated.

## Product string divergence: "Cause not localised"

The website uses **`Cause not localised`** — Indian English, sentence case, per
the voice rules in `CLAUDE.md`.

The product app currently ships **`Cause Not Localized`** — US spelling, title
case. Confirmed in `reference/screen-walkthrough.pdf` (§5.7, and the Marks Loss
Intelligence caption at §5.3).

The two will read differently until the product is fixed. That is a **product
bug to fix there**, not a website decision. Do not reword the site to match, and
do not "harmonise" the two by adopting the US spelling.

## Unsourced figure removed from the static site

`reference/static-site/` is the source of truth for copy, not for facts. Two
places claimed a cross-subject application gap was worth "roughly sixty Board
marks" / "roughly 60 Board marks":

- `about.html` — the report-card paragraph
- `index.html` — the cross-subject bar chart conclusion

The number is not in the approved-facts list in `CLAUDE.md` and nothing in
`reference/` sources it. Both were cut. The structural claim stays in each
place: a transferable, cross-subject application gap, unquantified.

If the figure is real, add it to the facts list with its source and it can go
back.

## The Insufficient evidence pill is reasoned, not sampled

Every other attention colour in `styles/tokens.css` is sampled from
`reference/brand-sheet.jpeg`. This one is not, because the sheet has no neutral
pill: the fifth attention value post-dates it.

```css
--attention-insuf-bg:     var(--paper-2);
--attention-insuf-fg:     var(--body);
--attention-insuf-border: var(--line);
```

The reasoning, so it is not silently re-tuned later:

- `Insufficient evidence` is the **absence of a signal, not a severity**. It
  should be the quietest of the five and recede rather than compete.
- Warm neutral keeps it clearly distinct from `Investigation required`, which is
  a cool blue tint.
- `--paper-2` is the alternating band background, so a findings grid inside a
  band would make an unbordered pill vanish into the surface. The
  `1px solid var(--line)` border keeps it legible on any background.

**All five attention pills carry a 1px border** so their metrics stay identical:
`transparent` on the four coloured ones, `var(--line)` on this one.

This must not drift into reading as a Board urgency chip. The two treatments
stay visually separate:

| | Fill | Border | Glyph |
|---|---|---|---|
| Attention pill | Solid | 1px, transparent except Insufficient evidence | None |
| Board urgency chip | Transparent | 1px, coloured | Flame or triangle |

If the pair is ever sampled properly, replace the values here and the reasoning
above stops applying.

## The affected scale is derived from the attainment boundaries

`AttainmentBar` carries a required `polarity`, because the same bar serves class
attainment (higher is better) and students affected by section (higher is
worse). The two scales are not the same scale read backwards.

**Attainment**, from the Class X screen in `reference/screen-walkthrough.pdf`:

```
Full mastery of tested Board marks   100
80%+ attainment                      >= 80
60–80% attainment                    >= 60
Below 60%                            <  60
```

**Affected**, derived from those boundaries rather than guessed:

```
None affected          0
Up to 20% affected     <= 20
20–40% affected        <= 40
40–60% affected        <= 60
Over 60% affected      >  60
```

The complement of 60 and 80 is 40 and 20. That gives two boundaries in a
20-point rhythm, and the scale extends the same interval one step to 60. No new
interval is introduced, and "none affected" earns its own band the way full
mastery does at the other end.

The first attempt mapped affected values onto the attainment bands by
complement, which put X-A at 41% and X-D at 72% in the same bottom band. A
section chart is where a principal compares sections. One where the best and
the worst section paint identically has failed at its one job, which is why the
scale carries its own boundaries.

If the attainment boundaries ever move, these move with them.

## Why the font-variable wrapper failed, and why :root works

`review-page.mjs` publishes the body of an exported route. next/font declares
`--font-outfit` and friends on generated classes that sit on `<html>`, so the
body alone rendered every page in the browser's default serif.

The obvious fix, a wrapper element carrying those same classes, **does not
work**, and the reason is not obvious:

```css
:root      { --display: var(--font-outfit), "Segoe UI", sans-serif; }
.__variable_ed3508 { --font-outfit: "Outfit", "Outfit Fallback"; }
```

A custom property is resolved **where it is declared**, at computed-value time.
`--display` is declared on `:root`, and at `:root` there is no `--font-outfit`,
so `--display` is already the guaranteed-invalid value before any descendant
sees it. Putting `--font-outfit` on a wrapper inside the document is too late:
descendants inherit the broken `--display`, not the raw declaration.

So the generated declarations are promoted to `:root` itself, where `--display`
can see them. The same trap applies to any variable that references another
variable set further down the tree.

`scripts/shot.mjs` asserts the computed font on `body` and on the first heading
and exits non-zero on a fallback, because a silent serif fallback produces
output that looks finished and is entirely wrong. It caught the wrapper fix.

## Tabular figures are scoped, not global

CLAUDE.md originally said tabular numerals on `body`. IBM Plex Sans gives the
period a full digit advance in tabular mode, which is correct in a column of
figures and wrong in a sentence: "2.7 marks per student" renders as "2 . 7".

`tokens.css` now applies `font-variant-numeric: tabular-nums` to `table`, `th`,
`td` and a `.tnum` utility.

There were **two** causes of the spaced decimal, and the tabular rule was only
one. `FindingCard`'s stat figure was also set in IBM Plex Mono, where the period
takes a full character cell by definition, so scoping tabular-nums alone left
"2 . 7" on screen. Mono is for IDs and question references, where every glyph
genuinely wants the same advance. A measure inside a sentence is set in the body
face. Use `.tnum` where figures stack: a KPI strip, the
`AttainmentBar` value column, the `StudentReportCard` score. Inline prose
measures stay proportional. Integers look the same either way, so the risk here
runs one way only.
