/**
 * Turn the static export into a self-contained page for review: the
 * server-rendered markup, the CSS inlined, the hydration scripts dropped
 * (these pages have no client components) and the self-hosted fonts rewritten
 * to sit beside the page.
 *
 *   node scripts/review-page.mjs <route> <out.html>
 *
 * The fonts are the trap. next/font declares --font-outfit and friends on
 * generated classes that sit on <html>, and taking the body alone leaves them
 * behind: every font variable resolves to nothing and the page renders in the
 * browser's default serif while still looking finished.
 *
 * A wrapper element carrying those classes does not fix it either. tokens.css
 * declares --display: var(--font-outfit), ... on :root, and a custom property
 * resolves where it is declared: at :root --font-outfit is unset, so --display
 * is already invalid before anything can inherit it. The generated
 * declarations have to reach :root itself.
 */
import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const [route, outFile] = process.argv.slice(2);
const OUT = path.join(process.cwd(), 'out');
const ASSET_DIR = path.join(path.dirname(outFile), 'assets');
const VARIABLE_CLASS = /\.__variable_[a-z0-9]+\s*\{([^}]*)\}/g;

const html = await readFile(path.join(OUT, route, 'index.html'), 'utf8');

const body = html.slice(
  html.indexOf('<body') + html.slice(html.indexOf('<body')).indexOf('>') + 1,
  html.lastIndexOf('</body>'),
);

const cssHrefs = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(
  (m) => m[1],
);

await mkdir(ASSET_DIR, { recursive: true });
const fonts = new Set();
const rootVars = [];

let css = '';
for (const href of cssHrefs) {
  let sheet = await readFile(path.join(OUT, href.replace(/^\//, '')), 'utf8');
  for (const m of sheet.matchAll(/url\((\/_next\/static\/media\/[^)]+)\)/g)) {
    fonts.add(m[1]);
  }
  sheet = sheet.replace(/url\(\/_next\/static\/media\/([^)]+)\)/g, 'url(assets/$1)');
  for (const m of sheet.matchAll(VARIABLE_CLASS)) rootVars.push(m[1].trim());
  css += sheet + '\n';
}

if (rootVars.length === 0) {
  console.error('** no next/font variable classes found: the page would render serif **');
  process.exit(1);
}
css += `:root{${rootVars.join(';')}}\n`;

for (const font of fonts) {
  await copyFile(
    path.join(OUT, font.replace(/^\//, '')),
    path.join(ASSET_DIR, path.basename(font)),
  );
}

const title = /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? 'Avai';

await writeFile(
  outFile,
  `<title>${title}</title>\n<style>\n${css}</style>\n` +
    `${body.replace(/<script[\s\S]*?<\/script>/g, '')}\n`,
);

console.log(
  `${outFile}  css=${cssHrefs.length}  fonts=${fonts.size}  rootVars=${rootVars.length}`,
);
console.log('   verify with scripts/shot.mjs, which fails on a serif fallback');
