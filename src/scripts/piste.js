/**
 * LES NINJAS DE L'ACCUEIL COURENT, SAUTENT ET REVIENNENT (sa demande du 12/10 au soir).
 *
 * Chaque ninja court vers la droite à sa vitesse, sa foulée calée sur ses pas (un cycle
 * de 12 images par longueur de corps parcourue : les pieds ne glissent pas). De temps en
 * temps il saute ; une fois sur quatre, très haut, jusqu'à sortir de la piste par le haut
 * — « qu'ils sautent de l'écran ». Arrivé au bord droit, il disparaît, attend un peu et
 * revient par la gauche. Un toucher sur un ninja le fait sauter.
 *
 * Tout se règle en HAUTEURS DE NINJA (`h`, la taille affichée) : le même mouvement à 130 px
 * sur téléphone et à 170 px sur grand écran.
 *
 * La boucle s'arrête quand la piste sort de l'écran (IntersectionObserver) ; un onglet
 * caché n'a de toute façon plus d'images. « Moins de mouvement » : rien ne bouge, les
 * ninjas restent alignés (la mise en page sans script).
 */
const piste = document.querySelector('[data-piste]');
const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;

const N_COURSE = 12, MONTE = 12, SOMMET = 13, DESCEND = 14, N_IMAGES = 15;
const hasard = (a, b) => a + Math.random() * (b - a);

if (piste && !reduit) {
  const sol = piste.querySelector('.piste-sol');
  const els = [...piste.querySelectorAll('[data-coureur]')];
  let L = 0, h = 0, w = 0;
  const mesurer = () => {
    L = sol.clientWidth;
    h = els[0].offsetHeight;
    w = els[0].offsetWidth;
  };
  piste.classList.add('vivante');
  mesurer();

  // Au départ, les ninjas sont déjà répartis sur la piste : la page ne s'ouvre pas vide.
  const coureurs = els.map((el, i) => ({
    el,
    img: el.querySelector('img'),
    x: (i + hasard(0.1, 0.6)) * (L + w) / els.length - w,
    y: 0, vy: 0,
    v: hasard(0.8, 1.4),          // hauteurs de ninja par seconde
    phase: Math.random(),
    prochainSaut: hasard(0.8, 5),
    attente: 0,                   // secondes hors de l'écran avant de revenir
  }));

  const sauter = (c, grand) => {
    if (c.y > 0 || c.attente > 0) return;
    const haut = grand ? hasard(2.6, 4.2) : hasard(0.45, 0.8);   // en hauteurs de ninja
    c.vy = Math.sqrt(2 * GRAVITE * haut);
  };
  const GRAVITE = 9;              // hauteurs de ninja par seconde²

  coureurs.forEach((c) => c.el.addEventListener('pointerdown', () => sauter(c, true)));

  let avant = 0, raf = 0;
  const pas = (t) => {
    const dt = Math.min(0.05, avant ? (t - avant) / 1000 : 0);
    avant = t;
    for (const c of coureurs) {
      if (c.attente > 0) {
        c.attente -= dt;
        if (c.attente <= 0) { c.x = -w * hasard(1, 2); c.v = hasard(0.8, 1.4); }
        continue;
      }
      c.x += c.v * h * dt;
      if (c.y > 0 || c.vy > 0) {
        c.vy -= GRAVITE * dt;
        c.y = Math.max(0, c.y + c.vy * dt);
        if (c.y === 0) c.vy = 0;
      } else {
        c.phase = (c.phase + c.v * dt) % 1;
        c.prochainSaut -= dt;
        if (c.prochainSaut <= 0) { sauter(c, Math.random() < 0.25); c.prochainSaut = hasard(1.5, 6); }
      }
      if (c.x > L + w) { c.attente = hasard(0.2, 1.2); c.y = 0; c.vy = 0; }
      const image = c.y > 0
        ? (c.vy > 1.2 ? MONTE : c.vy > -1.2 ? SOMMET : DESCEND)
        : Math.floor(c.phase * N_COURSE) % N_COURSE;
      c.el.style.transform = `translate3d(${c.x.toFixed(1)}px, ${(-c.y * h).toFixed(1)}px, 0)`;
      /* En POURCENTAGE de la bande, jamais en pixels : la fenêtre mesure 1,25 × h, un
         nombre à virgule que offsetWidth arrondit ; à la 14ᵉ image l'arrondi faisait
         5 px, et le bord de l'image voisine (une écharpe, un pied) apparaissait comme
         des bouts de couleur détachés du ninja (sa note du 12/10 au soir). */
      c.img.style.transform = `translateX(${(-image * 100 / N_IMAGES).toFixed(4)}%)`;
    }
    raf = requestAnimationFrame(pas);
  };

  new IntersectionObserver(([e]) => {
    cancelAnimationFrame(raf);
    avant = 0;
    if (e.isIntersecting) raf = requestAnimationFrame(pas);
  }).observe(piste);
  addEventListener('resize', mesurer);
}
