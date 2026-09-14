/**
 * Screenshot a page at a given CSS width, using the pre-installed Chromium over
 * the DevTools protocol. No dependencies.
 *
 * Headless Chrome floors --window-size at 500px wide, so a phone-width capture
 * has to come from Emulation.setDeviceMetricsOverride rather than the window.
 *
 *   node scripts/shot.mjs <url> <out.png> [width] [scale]
 */
import { spawn } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

const [
  url,
  outFile,
  widthArg = '1280',
  scaleArg = '2',
  selector,
  clickSelector,
  settleArg = '250',
] = process.argv.slice(2);
if (!url || !outFile) {
  console.error(
    'usage: node scripts/shot.mjs <url> <out.png> [width] [scale] [selector] [click] [settleMs]\n' +
      '  click     one selector, or several separated by commas, clicked in order\n' +
      '  settleMs  wait between the last click and the capture; drop it to catch\n' +
      '            a transition mid-flight rather than at its resting state',
  );
  process.exit(1);
}
const settleMs = Number(settleArg);
const width = Number(widthArg);
const scale = Number(scaleArg);
const BIN =
  process.env.CHROME_BIN ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const userDir = await mkdtemp(path.join(tmpdir(), 'avai-shot-'));
const chrome = spawn(BIN, [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--hide-scrollbars',
  '--remote-debugging-port=0',
  `--user-data-dir=${userDir}`,
  'about:blank',
]);

const wsUrl = await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('chrome did not start')), 30000);
  chrome.stderr.on('data', (buf) => {
    const m = /ws:\/\/[^\s]+/.exec(buf.toString());
    if (m) {
      clearTimeout(timer);
      resolve(m[0]);
    }
  });
});

const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));

let nextId = 1;
const pending = new Map();
ws.addEventListener('message', (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  }
});

const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', {
  targetId,
  flatten: true,
});

await send('Page.enable', {}, sessionId);

/* REDUCED_MOTION=1 reviews the page as a reader who has asked for less motion:
   autoplay off, transitions off, controls still working. */
if (process.env.REDUCED_MOTION === '1') {
  await send(
    'Emulation.setEmulatedMedia',
    { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] },
    sessionId,
  );
}
await send('Emulation.setDeviceMetricsOverride', {
  width,
  /* A taller viewport lets scroll-triggered reveals fire before the capture:
     an IntersectionObserver never sees content that was always off-screen,
     so a full-page shot of a page with reveals is otherwise half empty. */
  height: Number(process.env.VIEWPORT_HEIGHT ?? 900),
  deviceScaleFactor: scale,
  // mobile:true makes Chrome apply its own viewport fitting, which lands a few
  // dozen pixels off the width asked for. Desktop metrics at a phone width give
  // an exact CSS viewport, which is what the media queries are written against.
  mobile: false,
}, sessionId);

const loaded = new Promise((resolve) => {
  const onEvent = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Page.loadEventFired') {
      ws.removeEventListener('message', onEvent);
      resolve();
    }
  };
  ws.addEventListener('message', onEvent);
});
await send('Page.navigate', { url }, sessionId);
await loaded;
// Let webfonts settle before capture.
await new Promise((r) => setTimeout(r, 1200));

/* Optional clicks open whatever state is being reviewed: a menu, a drawer, a
 * scene in a player. Without them the shot only ever shows the page at rest.
 * Several selectors run in order, so "pause, then chapter 3" is one command. */
if (clickSelector) {
  const steps = clickSelector.split(',').map((step) => step.trim()).filter(Boolean);
  for (const [index, step] of steps.entries()) {
    const clicked = await send(
      'Runtime.evaluate',
      {
        expression: `(() => {
          const el = document.querySelector(${JSON.stringify(step)});
          if (!el) return false;
          el.click();
          return true;
        })()`,
        returnByValue: true,
      },
      sessionId,
    );
    if (!clicked.result.value) {
      console.error(`** click target not found: ${step} **`);
      process.exit(1);
    }
    /* Between clicks, long enough for the first to take effect. */
    if (index < steps.length - 1) await new Promise((r) => setTimeout(r, 220));
  }
}

/*
 * The settle wait applies whether or not anything was clicked. It decides
 * whether the capture lands at rest, mid-transition, or several seconds into a
 * player that advances on its own.
 */
await new Promise((r) => setTimeout(r, settleMs));

/* An optional selector clips the capture to one element, for looking closely at
 * a detail that is unreadable in a full-page shot. */
let clip;
if (selector) {
  const box = await send(
    'Runtime.evaluate',
    {
      expression: `(() => {
        const el = document.querySelector(${JSON.stringify(selector)});
        if (!el) return 'null';
        const r = el.getBoundingClientRect();
        return JSON.stringify({
          x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height, scale: 1,
        });
      })()`,
      returnByValue: true,
    },
    sessionId,
  );
  if (box.result.value === 'null') {
    console.error(`** selector not found: ${selector} **`);
    process.exit(1);
  }
  clip = JSON.parse(box.result.value);
}

const { data } = await send(
  'Page.captureScreenshot',
  { format: 'png', captureBeyondViewport: true, fromSurface: true, ...(clip ? { clip } : {}) },
  sessionId,
);
await writeFile(outFile, Buffer.from(data, 'base64'));

const { result } = await send(
  'Runtime.evaluate',
  {
    expression: `JSON.stringify({
      inner: innerWidth,
      scroll: document.documentElement.scrollWidth,
      body: getComputedStyle(document.body).fontFamily,
      heading: (() => {
        const h = document.querySelector('h1, h2');
        return h ? getComputedStyle(h).fontFamily : '';
      })(),
    })`,
    returnByValue: true,
  },
  sessionId,
);
const metrics = JSON.parse(result.value);
console.log(
  `${outFile}  viewport=${metrics.inner}px  scrollWidth=${metrics.scroll}px` +
    (metrics.scroll > metrics.inner ? '  ** HORIZONTAL OVERFLOW **' : ''),
);

/*
 * A silent fall back to the browser's default serif looks plausible and is
 * entirely wrong, the same class of bug as the 500px viewport floor. If the
 * font variables are not in scope the page is not worth screenshotting, so
 * fail loudly rather than produce a believable picture of the wrong typeface.
 */
const EXPECTED_BODY = 'IBM Plex Sans';
const EXPECTED_HEADING = 'Outfit';
const fontProblems = [];
if (!metrics.body.includes(EXPECTED_BODY)) {
  fontProblems.push(`body is ${metrics.body || '(empty)'}, expected ${EXPECTED_BODY}`);
}
if (metrics.heading && !metrics.heading.includes(EXPECTED_HEADING)) {
  fontProblems.push(
    `heading is ${metrics.heading || '(empty)'}, expected ${EXPECTED_HEADING}`,
  );
}
if (fontProblems.length > 0) {
  console.error(`** FONT FALLBACK ** ${fontProblems.join('; ')}`);
}

ws.close();
chrome.kill();
// Chrome flushes its profile asynchronously; a failed cleanup is not a failed
// screenshot, so never let it fail the run.
await new Promise((r) => setTimeout(r, 300));
await rm(userDir, { recursive: true, force: true }).catch(() => {});

if (fontProblems.length > 0) process.exit(1);
