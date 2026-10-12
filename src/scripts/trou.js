/**
 * LA 404 : « Cette page est tombée dans un trou. » — et un jeu d'un seul geste pour
 * passer le temps (sa réponse du 12/10 : avec un mini-jeu).
 *
 * Un carré noir court sur une ligne noire ; il faut sauter les trous. Comme dans
 * Shuriken Storm : appuyer pour sauter, plus longtemps pour sauter plus haut, une
 * seconde fois en l'air pour le double saut. Noir et blanc, comme le studio.
 *
 * Rien ne bouge tant qu'on n'a pas appuyé (« moins de mouvement » respecté de fait), le
 * jeu se met en pause quand l'onglet est caché, et le record reste dans le navigateur.
 */
const cadre = document.querySelector('[data-trou]');
const canvas = cadre?.querySelector('canvas');
const sortie = document.querySelector('[data-score]');
const recordEl = document.querySelector('[data-record]');

if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const CLE = 'gomavel.trou.record';
  let record = 0;
  try { record = Number(localStorage.getItem(CLE)) || 0; } catch {}
  const afficherRecord = () => { if (recordEl) recordEl.textContent = record ? `Record : ${record} m` : ''; };
  afficherRecord();

  let W = 0, H = 0, sol = 0, dpr = 1;
  function taille() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height; sol = H - 30;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dessiner();
  }

  const C = 20;                 // le côté du carré
  const X = 56;                 // sa place à l'écran
  const GRAVITE = 2600, ELAN = 760, COUPE = 0.45;
  let etat = 'attente', y = 0, vy = 0, sauts = 0, appuye = false;
  let vitesse = 320, distance = 0, trous = [], prochain = 0, avant = 0, raf = 0;

  function remettre() {
    y = sol - C; vy = 0; sauts = 0; vitesse = 320; distance = 0;
    trous = []; prochain = W + 220;
  }

  function surLeSol() {
    const pieds = [X + 2, X + C - 2];
    return !trous.some((t) => pieds.every((px) => px > t.x && px < t.x + t.w));
  }

  function appui() {
    if (etat !== 'jeu') { remettre(); etat = 'jeu'; avant = performance.now(); boucle(avant); }
    if (sauts < 2) { vy = -ELAN * (sauts ? 0.86 : 1); sauts += 1; }
    appuye = true;
  }
  function relache() {
    if (appuye && vy < 0) vy *= COUPE;
    appuye = false;
  }

  function pas(dt) {
    vitesse = Math.min(720, vitesse + 9 * dt);
    distance += vitesse * dt;
    for (const t of trous) t.x -= vitesse * dt;
    trous = trous.filter((t) => t.x + t.w > -10);
    prochain -= vitesse * dt;
    if (prochain < W + 40) {
      const w = 46 + Math.random() * (24 + vitesse * 0.1);
      trous.push({ x: prochain, w });
      prochain += w + 230 + Math.random() * (260 + vitesse * 0.35);
    }
    vy += GRAVITE * dt;
    y += vy * dt;
    if (y >= sol - C && vy >= 0 && y <= sol - C + 18 && surLeSol()) { y = sol - C; vy = 0; sauts = 0; }
    if (y > H + 40) fin();
  }

  function fin() {
    etat = 'fin';
    cancelAnimationFrame(raf);
    const m = Math.round(distance / 10);
    if (m > record) { record = m; try { localStorage.setItem(CLE, String(record)); } catch {} afficherRecord(); }
    if (sortie) sortie.textContent = `${m} m`;
    dessiner();
  }

  function dessiner() {
    if (!W) return;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#000';
    // La ligne du sol, coupée par les trous.
    let x0 = 0;
    for (const t of [...trous].sort((a, b) => a.x - b.x)) {
      if (t.x > x0) ctx.fillRect(x0, sol, t.x - x0, 3);
      x0 = Math.max(x0, t.x + t.w);
    }
    if (x0 < W) ctx.fillRect(x0, sol, W - x0, 3);
    // Le carré, écrasé un instant quand il se pose.
    const ecrase = etat === 'jeu' && sauts === 0 && vy === 0 ? 0 : Math.min(4, Math.abs(vy) / 220);
    ctx.fillRect(X - ecrase / 2, y - (vy < 0 ? ecrase : 0), C + ecrase, C + (vy < 0 ? ecrase : 0));
    ctx.font = '600 12px "Archivo Variable", Arial, sans-serif';
    ctx.textBaseline = 'top';
    if (etat === 'jeu' || etat === 'fin') {
      const m = `${Math.round(distance / 10)} m`;
      ctx.textAlign = 'right'; ctx.fillText(m, W - 4, 6);
    }
    ctx.textAlign = 'left';
    if (etat === 'attente') ctx.fillText('APPUIE SUR ESPACE, OU TOUCHE LE CADRE', 4, 6);
    if (etat === 'fin') ctx.fillText('ENCORE UNE ? APPUIE POUR REJOUER', 4, 6);
  }

  function boucle(t) {
    if (etat !== 'jeu') return;
    const dt = Math.min(0.034, (t - avant) / 1000);
    avant = t;
    pas(dt);
    if (etat === 'jeu') { dessiner(); raf = requestAnimationFrame(boucle); }
  }

  cadre.addEventListener('pointerdown', (e) => { e.preventDefault(); cadre.focus({ preventScroll: true }); appui(); });
  addEventListener('pointerup', relache);
  addEventListener('pointercancel', relache);
  addEventListener('keydown', (e) => {
    if (e.code !== 'Space' && e.code !== 'ArrowUp') return;
    if (e.target instanceof HTMLElement && e.target.closest('a, button, input, textarea')) return;
    e.preventDefault();
    if (!e.repeat) appui();
  });
  addEventListener('keyup', (e) => { if (e.code === 'Space' || e.code === 'ArrowUp') relache(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && etat === 'jeu') { cancelAnimationFrame(raf); etat = 'pause'; dessiner(); }
    else if (!document.hidden && etat === 'pause') { etat = 'jeu'; avant = performance.now(); boucle(avant); }
  });
  new ResizeObserver(() => { const enJeu = etat === 'jeu'; taille(); if (!enJeu) { y = sol - C; dessiner(); } }).observe(canvas);
  taille(); remettre(); dessiner();
  if (document.fonts) document.fonts.ready.then(dessiner);
}
