# avai-website

Drop-in repo skeleton for building the Avai marketing site with Claude Code.

## What's here

```
CLAUDE.md                          Persistent project context. Claude Code
                                   re-reads this every session. Keep it at root.
PROMPTS.md                         The ten sequenced prompts to run, in order.
reference/
  brand-sheet.jpeg                 Logo, wordmark, mascot poses, app icon
  screen-walkthrough.pdf           24 screens of the real product app
  product-overview.md              What Avai is, commercially and technically
  tagged-paper-sample.csv          A real tagged CBSE paper — the authoritative
                                   tagging schema
  tokens.css                       Brand colours sampled from the brand sheet
  static-site/                     Working static HTML site, all 11 pages.
                                   Content source of truth and regression test.
```

## Getting started

```bash
git init && git add -A && git commit -m "Reference material"
claude
```

Then work through `PROMPTS.md` in order. Commit after every prompt.

Nothing in `reference/` should be edited during the build. Claude Code builds
the Next.js app around it.
