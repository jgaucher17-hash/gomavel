/*
 * LE CADRE QUI S'OUVRE D'UNE PAGE À L'AUTRE (navigateurs qui savent faire une
 * transition entre deux documents : Chrome, Edge, Safari récents ; les autres
 * changent de page normalement).
 *
 * L'image de la fenêtre, sur l'accueil, devient l'image d'en-tête du produit, et
 * inversement. Le nom de transition est posé AU DERNIER MOMENT, sur un seul élément
 * par page (pageswap sur la page qu'on quitte, pagereveal sur celle qui arrive) : avec
 * plusieurs produits au catalogue, un nom fixe en CSS serait porté par plusieurs images
 * et le navigateur annulerait la transition.
 *
 * Fichier classique et bloquant dans le <head>, pas un module : `pagereveal` part avant
 * la première image de la page, un script différé arriverait trop tard. Et un fichier,
 * pas un script recopié dans la page : la CSP n'accepte que les scripts du site.
 */
(function () {
  var NOM = 'produit';
  function fenetre(chemin) { return document.querySelector('.fenetre[href="' + chemin + '"] img'); }
  function heros() { return document.querySelector('.heros-image img'); }

  addEventListener('pageswap', function (e) {
    if (!e.viewTransition || !e.activation || !e.activation.entry) return;
    var vers = new URL(e.activation.entry.url).pathname;
    var img = location.pathname === '/' ? fenetre(vers) : (vers === '/' ? heros() : null);
    if (img) img.style.viewTransitionName = NOM;
  });

  addEventListener('pagereveal', function (e) {
    if (!e.viewTransition) return;
    var nav = window.navigation;
    if (!nav || !nav.activation || !nav.activation.from) return;
    var de = new URL(nav.activation.from.url).pathname;
    var img = de === '/' ? heros() : (location.pathname === '/' ? fenetre(de) : null);
    if (!img) return;
    img.style.viewTransitionName = NOM;
    e.viewTransition.finished.finally(function () { img.style.viewTransitionName = ''; });
  });

  /* Une page rendue par le cache arrière garde le nom posé avant de partir. */
  addEventListener('pageshow', function () {
    var n = document.querySelectorAll('img[style*="view-transition-name"]');
    for (var i = 0; i < n.length; i++) n[i].style.viewTransitionName = '';
  });
})();
