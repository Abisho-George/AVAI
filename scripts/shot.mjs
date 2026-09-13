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

const [url, outFile, widthArg = '1280', scaleArg = '2'] = process.argv.slice(2);
if (!url || !outFile) {
  console.error('usage: node scripts/shot.mjs <url> <out.png> [width] [scale]');
  process.exit(1);
}
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
await send('Emulation.setDeviceMetricsOverride', {
  width,
  height: 900,
  deviceScaleFactor: scale,
  mobile: width < 700,
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

const { data } = await send(
  'Page.captureScreenshot',
  { format: 'png', captureBeyondViewport: true, fromSurface: true },
  sessionId,
);
await writeFile(outFile, Buffer.from(data, 'base64'));

const { result } = await send(
  'Runtime.evaluate',
  {
    expression:
      'JSON.stringify({ inner: innerWidth, scroll: document.documentElement.scrollWidth })',
    returnByValue: true,
  },
  sessionId,
);
const metrics = JSON.parse(result.value);
console.log(
  `${outFile}  viewport=${metrics.inner}px  scrollWidth=${metrics.scroll}px` +
    (metrics.scroll > metrics.inner ? '  ** HORIZONTAL OVERFLOW **' : ''),
);

ws.close();
chrome.kill();
// Chrome flushes its profile asynchronously; a failed cleanup is not a failed
// screenshot, so never let it fail the run.
await new Promise((r) => setTimeout(r, 300));
await rm(userDir, { recursive: true, force: true }).catch(() => {});
