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
