/**
 * LES QUATRE SEULS COMPORTEMENTS DU SITE, et rien d’autre.
 *
 * 1. LE LOGO SAUTE quand on le touche : le carré prend son élan et retombe, puis les
 *    lettres, une à une. C'est le geste du studio (planche du 12/10) ; sur l'accueil, le
 *    toucher remonte en haut au lieu de recharger la page.
 * 2. LES BLOCS APPARAISSENT quand on descend jusqu'à eux. Seulement ceux qui sont encore
 *    sous l'écran au chargement : ce qu'on voit déjà ne clignote jamais, et sans script
 *    la page est complète.
 * 3. LE MENU RANGÉ se referme (plus bas).
 * 4. LES NINJAS DE L'ACCUEIL courent, sautent et reviennent : `scripts/piste.js`.
 *
 * « Moins de mouvement » demandé par le téléphone : le logo ne saute plus, les blocs sont
 * là d'emblée.
 */
const reduit = matchMedia('(prefers-reduced-motion: reduce)');

function sauter(logo) {
  if (reduit.matches || !logo.animate) return;
  const marque = logo.querySelector('.carre');
  marque?.animate(
    [
      { transform: 'none' },
      { transform: 'scale(1.1, .86)', offset: 0.16 },
      { transform: 'translateY(-38%) scale(.94, 1.08)', offset: 0.5 },
      { transform: 'translateY(0) scale(1.08, .9)', offset: 0.82 },
      { transform: 'none' },
    ],
    { duration: 640, easing: 'cubic-bezier(.33,.66,.36,1)' },
  );
  logo.querySelectorAll('.lettre:not(.carre)').forEach((l, i) => {
    l.animate(
      [
        { transform: 'none' },
        { transform: 'translateY(-34%) scale(.96, 1.05)', offset: 0.45 },
        { transform: 'translateY(0) scale(1.06, .9)', offset: 0.8 },
        { transform: 'none' },
      ],
      { duration: 560, delay: 90 + i * 45, easing: 'cubic-bezier(.33,.66,.36,1)' },
    );
  });
}

document.querySelectorAll('[data-logo]').forEach((logo) => {
  logo.addEventListener('click', (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      if (scrollY > 0) scrollTo({ top: 0, behavior: reduit.matches ? 'auto' : 'smooth' });
    }
    sauter(logo);
  });
});

/* 3. LE MENU RANGÉ SE REFERME (il s'ouvre sans script, c'est un <details>) : Échap, et le
   retour arrière (Safari rend la page de son cache telle qu'on l'a quittée, menu ouvert).
   ⚠️ JAMAIS au toucher d'un lien : sur Safari d'iPhone, refermer le <details> pendant le
   clic cache le lien et ANNULE la navigation — le menu se fermait et Shuriken Storm ne
   s'ouvrait pas (vu au simulateur, iOS 26.5, le 12/10 — ⚠️ ses touchers arrivent parfois
   en double ou en retard : ne juger qu'avec une sonde qui écrit les événements reçus). Seul un lien vers la page où l'on est déjà (« Nouveautés »
   depuis Nouveautés) le referme, après coup. */
const menu = document.querySelector('[data-menu]');
if (menu) {
  const fermer = () => { menu.open = false; };
  menu.querySelectorAll('.menu-panneau a').forEach((a) => a.addEventListener('click', () => {
    if (new URL(a.href).pathname === location.pathname) setTimeout(fermer, 0);
  }));
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.open) { fermer(); menu.querySelector('summary').focus(); }
  });
  addEventListener('pageshow', fermer);
  /* Juste avant la photo de la page qu'on quitte (transition entre pages) : sans ça, le
     panneau noir « Jeux · Shuriken Storm » restait à l'écran pendant le fondu. */
  addEventListener('pageswap', fermer);
}

if (!reduit.matches && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entrees) => {
    for (const e of entrees) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('apparu');
      e.target.classList.remove('attend');
      io.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -8% 0px' });
  for (const el of document.querySelectorAll('[data-apparait]')) {
    if (el.getBoundingClientRect().top < innerHeight * 0.92) continue;
    el.classList.add('attend');
    io.observe(el);
  }
}
