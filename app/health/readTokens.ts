import { readFile } from 'node:fs/promises';
import path from 'node:path';

export type Token = { name: string; value: string; note?: string };
export type Group = { title: string; tokens: Token[] };

/**
 * Reads styles/tokens.css at build time and returns its custom properties in
 * source order, grouped by the section comments. Parsing the real file rather
 * than restating the values keeps this page honest: if a token changes, the
 * swatch changes with it.
 */
export async function readTokens(): Promise<Group[]> {
  const css = await readFile(
    path.join(process.cwd(), 'styles', 'tokens.css'),
    'utf8',
  );

  const groups: Group[] = [];
  let current: Group | null = null;

  for (const rawLine of css.split('\n')) {
    const line = rawLine.trim();

    const heading = line.match(/^\/\*\s*-{2,}\s*(.+?)\s*-{2,}\s*\*\/$/);
    if (heading) {
      current = { title: heading[1], tokens: [] };
      groups.push(current);
      continue;
    }

    const decl = line.match(
      /^(--[\w-]+):\s*([^;]+);(?:\s*\/\*\s*(.*?)\s*\*\/)?/,
    );
    if (!decl) continue;

    if (!current) {
      current = { title: 'Tokens', tokens: [] };
      groups.push(current);
    }
    current.tokens.push({
      name: decl[1],
      value: decl[2].trim(),
      note: decl[3],
    });
  }

  return groups.filter((g) => g.tokens.length > 0);
}

/** True for tokens that can be painted as a colour swatch. */
export function isColour(token: Token): boolean {
  return /^#|^rgb|^hsl/.test(token.value);
}
