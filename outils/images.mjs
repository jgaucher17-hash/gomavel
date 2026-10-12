#!/usr/bin/env node
/**
 * LES IMAGES FABRIQUÉES DU SITE : icônes et images de partage (Open Graph).
 *
 *   node outils/images.mjs
 *
 * Tout part des tracés de `src/data/marque.js` et des images des produits : rien n'est
 * dessiné à la main. Le rendu passe par un navigateur sans tête (Opera, du Chromium, déjà
 * sur ce Mac ; NAVIGATEUR=/chemin pour un autre), pour que la police soit celle du site.
 *
 * Sortie dans `public/` : favicon-32.png, apple-touch-icon.png (180, opaque : iOS ne
 * veut pas de transparence), icon-512.png (aussi l'icône du compte Google Play), et
 * og/<page>.png en 1200 × 630.
 */
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const { G_CARRE } = await import(pathToFileURL(join(RACINE, 'src/data/marque.js')).href);
const L = await import(pathToFileURL(join(RACINE, 'src/data/logo.js')).href);
const { SITE } = await import(pathToFileURL(join(RACINE, 'src/data/site.js')).href);
const produits = await Promise.all(readdirSync(join(RACINE, 'src/produits')).filter((f) => f.endsWith('.js'))
  .map(async (f) => ({ slug: f.replace('.js', ''), src: readFileSync(join(RACINE, 'src/produits', f), 'utf8') })));

const police = pathToFileURL(join(RACINE, 'node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2')).href;
const carre = (px) => `<svg width="${px}" height="${px}" viewBox="0 0 100 100"><rect width="100" height="100" fill="#000"/><path d="${G_CARRE}" fill="#fff"/></svg>`;
/* [G]OMAVEL, le carré tenant la place de la première lettre (src/data/logo.js). */
const logo = (h) => `<svg height="${h}" viewBox="0 ${L.LOGO_HAUT} ${L.LOGO_LARGEUR} ${L.LOGO_HAUTEUR}" style="width:auto"><rect x="0" y="${L.LOGO_CARRE.y}" width="${L.LOGO_CARRE.cote}" height="${L.LOGO_CARRE.cote}"/><path d="${L.LOGO_CARRE.g}" fill="#fff" transform="translate(0 ${L.LOGO_CARRE.y}) scale(${L.LOGO_CARRE.echelle}) ${L.LOGO_CARRE.grand}"/><g transform="translate(${L.LOGO_DECALAGE} 0)">${L.LOGO_LETTRES.map((d) => `<path d="${d}"/>`).join('')}</g></svg>`;
const base = (corps, w, h) => `<!doctype html><meta charset="utf-8"><style>
@font-face { font-family: A; src: url(${police}) format('woff2'); font-weight: 100 900; font-stretch: 62% 125%; }
* { margin: 0; box-sizing: border-box; } html, body { width: ${w}px; height: ${h}px; overflow: hidden; background: #fff; }
body { font-family: A, sans-serif; color: #000; -webkit-font-smoothing: antialiased; }
.label { font-weight: 620; font-stretch: 125%; letter-spacing: .12em; text-transform: uppercase; }
</style>${corps}`;

const PAGES = [];
PAGES.push({ fichier: 'favicon-32.png', w: 32, h: 32, html: base(carre(32), 32, 32) });
PAGES.push({ fichier: 'apple-touch-icon.png', w: 180, h: 180, html: base(carre(180), 180, 180) });
PAGES.push({ fichier: 'icon-512.png', w: 512, h: 512, html: base(carre(512), 512, 512) });

const [debut, fin] = SITE.accroche.split(/(?<=,)\s*/);
PAGES.push({ fichier: 'og/gomavel.png', w: 1200, h: 630, html: base(`
  <div style="position:absolute;left:72px;top:72px">${logo(62)}</div>
  <p style="position:absolute;left:68px;bottom:96px;font-weight:760;font-size:128px;line-height:.9;letter-spacing:-.048em">${debut}<br>${fin ?? ''}</p>
  <p class="label" style="position:absolute;right:72px;bottom:104px;font-size:15px;color:#646464">Applications et jeux mobiles</p>
  <div style="position:absolute;left:72px;right:72px;bottom:64px;height:1px;background:#000"></div>`, 1200, 630) });

for (const p of produits) {
  const heros = pathToFileURL(join(RACINE, 'src/assets/produits', p.slug, 'heros.jpg')).href;
  const titre = pathToFileURL(join(RACINE, 'src/assets/produits', p.slug, 'titre.png')).href;
  const n = Number(/numero:\s*(\d+)/.exec(p.src)?.[1] || 1);
  const statut = /statut:\s*'([^']+)'/.exec(p.src)?.[1] || '';
  PAGES.push({ fichier: `og/${p.slug}.png`, w: 1200, h: 630, html: base(`
    <img src="${heros}" style="position:absolute;left:0;top:0;width:1200px;height:470px;object-fit:cover">
    <div style="position:absolute;left:0;right:0;bottom:0;height:160px;background:#000;color:#fff">
      <img src="${titre}" style="position:absolute;left:56px;top:34px;height:92px">
      <div style="position:absolute;right:56px;top:44px;text-align:right;display:grid;gap:10px">
        <p class="label" style="font-size:15px">N°${String(n).padStart(2, '0')} · Gomavel</p>
        <p style="font-size:20px;color:#a3a3a3">${statut === 'En développement' ? 'Bientôt sur iPhone et Android' : 'iPhone et Android'}</p>
      </div>
    </div>`, 1200, 630) });
}

const NAV = process.env.NAVIGATEUR || '/Applications/Opera.app/Contents/MacOS/Opera';
const PROFIL = mkdtempSync(join(tmpdir(), 'gomavel-images-'));
const PORT = 9800 + Math.floor(Math.random() * 90);
const nav = spawn(NAV, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFIL}/u`, '--no-first-run',
  '--disable-extensions', '--allow-file-access-from-files', 'about:blank'], { stdio: 'ignore' });
const dort = (ms) => new Promise((r) => setTimeout(r, ms));
let t = null;
for (let i = 0; i < 60 && !t; i++) { await dort(250); try { t = (await (await fetch(`http://127.0.0.1:${PORT}/json`)).json()).find((x) => x.type === 'page'); } catch {} }
const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener('open', r));
let id = 0; const att = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && att.has(m.id)) { att.get(m.id)(m); att.delete(m.id); } });
const cdp = (method, params = {}) => new Promise((r) => { const i = ++id; att.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await cdp('Page.enable'); await cdp('Runtime.enable');
for (const pg of PAGES) {
  const f = join(PROFIL, 'p.html'); writeFileSync(f, pg.html);
  await cdp('Emulation.setDeviceMetricsOverride', { width: pg.w, height: pg.h, deviceScaleFactor: 1, mobile: false });
  await cdp('Page.navigate', { url: pathToFileURL(f).href });
  await dort(500);
  await cdp('Runtime.evaluate', { expression: 'document.fonts.ready.then(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))))', awaitPromise: true });
  await dort(150);
  const s = await cdp('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: pg.w, height: pg.h, scale: 1 } });
  const sortie = join(RACINE, 'public', pg.fichier);
  mkdirSync(dirname(sortie), { recursive: true });
  writeFileSync(sortie, Buffer.from(s.result.data, 'base64'));
  console.log(`public/${pg.fichier}  ${pg.w}×${pg.h}`);
}
ws.close(); nav.kill();
setTimeout(() => { try { rmSync(PROFIL, { recursive: true, force: true }); } catch {} process.exit(0); }, 500);
