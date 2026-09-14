/**
 * Turn the static export into a self-contained page that can be published for
 * review. Takes the server-rendered markup, inlines the CSS, drops the
 * hydration scripts (these pages have no client components), and rewrites the
 * self-hosted font URLs to sit beside the page.
 *
 *   node scripts/review-page.mjs <route> <out.html>
 */
import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const [route, outFile] = process.argv.slice(2);
const OUT = path.join(process.cwd(), 'out');
const ASSET_DIR = path.join(path.dirname(outFile), 'assets');

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

let css = '';
for (const href of cssHrefs) {
  let sheet = await readFile(path.join(OUT, href.replace(/^\//, '')), 'utf8');
  for (const m of sheet.matchAll(/url\((\/_next\/static\/media\/[^)]+)\)/g)) {
    fonts.add(m[1]);
  }
  sheet = sheet.replace(/url\(\/_next\/static\/media\/([^)]+)\)/g, 'url(assets/$1)');
  css += sheet + '\n';
}

for (const font of fonts) {
  await copyFile(path.join(OUT, font.replace(/^\//, '')), path.join(ASSET_DIR, path.basename(font)));
}

const title = /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? 'Avai';

await writeFile(
  outFile,
  `<title>${title}</title>\n<style>\n${css}</style>\n${body.replace(/<script[\s\S]*?<\/script>/g, '')}\n`,
);

console.log(`${outFile}  css=${cssHrefs.length}  fonts=${fonts.size}`);
