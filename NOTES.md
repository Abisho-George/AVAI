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
