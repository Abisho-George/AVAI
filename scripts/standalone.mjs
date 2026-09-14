/**
 * Wrap the review pages produced by review-page.mjs into single files that open
 * anywhere: fonts inlined as data URIs, a nav across the three, a real document
 * shell. This session runs in a remote container, so a dev server URL is not
 * reachable by the reviewer.
 *
 *   node scripts/standalone.mjs <review-dir> <out-dir>
 */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const [reviewDir, outDir] = process.argv.slice(2);
const PAGES = [
  { src: 'home.html', out: 'avai-home.html', label: 'Home' },
  { src: 'index.html', out: 'avai-findings.html', label: 'What Avai finds' },
];

await mkdir(outDir, { recursive: true });

const assets = new Map();
for (const file of await readdir(path.join(reviewDir, 'assets'))) {
  const buf = await readFile(path.join(reviewDir, 'assets', file));
  assets.set(file, `data:font/woff2;base64,${buf.toString('base64')}`);
}

const NAV_CSS = `
.review-nav{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 18px;padding:14px 24px;
  border-bottom:1px solid var(--line);background:var(--white);font-family:var(--sans);font-size:.85rem}
.review-nav strong{font-family:var(--display);font-weight:500;color:var(--ink);margin-right:6px}
.review-nav a{color:var(--blue);text-decoration:none;border-radius:4px}
.review-nav a:hover{text-decoration:underline}
.review-nav a:focus-visible{outline:2px solid var(--blue-2);outline-offset:3px}
.review-nav a[aria-current]{color:var(--ink);font-weight:500;text-decoration:none}
.review-nav span{color:var(--muted)}
`;

for (const page of PAGES) {
  let src = await readFile(path.join(reviewDir, page.src), 'utf8');
  src = src.replace(/url\(assets\/([^)]+)\)/g, (_, name) => `url(${assets.get(name)})`);

  const title = /<title>([^<]*)<\/title>/.exec(src)?.[1] ?? 'Avai';
  const style = src.slice(src.indexOf('<style>') + 7, src.indexOf('</style>'));
  const markup = src.slice(src.indexOf('</style>') + 8);

  const nav =
    `<nav class="review-nav"><strong>Avai build review</strong>` +
    PAGES.map(
      (p) =>
        `<a href="${p.out}"${p === page ? ' aria-current="page"' : ''}>${p.label}</a>`,
    ).join('') +
    `<span>Internal inspection pages. Not part of the public site.</span></nav>`;

  await writeFile(
    path.join(outDir, page.out),
    `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<style>
${style}${NAV_CSS}</style>
</head>
<body>
${nav}
${markup}
</body>
</html>
`,
  );
  console.log(`${page.out}`);
}
