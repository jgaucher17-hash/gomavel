/**
 * LE LOGO : le carré au G EST la première lettre de GOMAVEL (sa demande du 12/10 au
 * soir : « le logo doit devenir le G de Gomavel »). On lit [G]OMAVEL, d'un seul dessin.
 *
 * Construit à partir des tracés de `marque.js`, dans le repère du mot (unités de la
 * police, 1000 par cadratin) : la ligne de base est à y = 700, la hauteur des capitales
 * d'Archivo est 686.
 *
 * ⚠️ SON RETOUR DU 12/10 : « le G de Gomavel est trop petit ou OMAVEL trop grand ». À la
 * hauteur exacte d'une capitale, le carré se lisait comme une lettre de plus, sans poids.
 * Il est donc `TAILLE` fois plus haut que les lettres et centré sur elles : le G domine,
 * OMAVEL le suit. Les deux réglages (`TAILLE`, `GRAND`) sont les seuls à toucher.
 */
import { G_CARRE, MOT, MOT_HAUTEUR } from './marque.js';

const BASE = 700, CAP = 686;
/** Hauteur du carré, en capitales. 1 = la hauteur d'une lettre. */
const TAILLE = 1.45;
const COTE = Math.round(CAP * TAILLE);
const HAUT = Math.round(BASE - CAP / 2 - COTE / 2);   // le carré centré sur la capitale
const APPROCHE = Math.round(COTE * 0.13);

/* Le bord gauche du O : le plus petit x de son tracé (toutes les valeurs d'un tracé
   d'opentype sont des paires x y). */
const xs = (d) => (d.match(/-?\d+(\.\d+)?/g) || []).map(Number).filter((_, i) => i % 2 === 0);
const gaucheO = Math.min(...xs(MOT[1]));
const droite = Math.max(...MOT.slice(1).flatMap(xs));
const decale = COTE + APPROCHE - gaucheO;

export const LOGO_LARGEUR = Math.round(droite + decale);
/** La boîte du logo : du haut du carré au bas du carré (il dépasse les lettres). */
export const LOGO_HAUT = Math.min(0, HAUT);
export const LOGO_HAUTEUR = Math.max(MOT_HAUTEUR, HAUT + COTE) - LOGO_HAUT;
/** Le carré : sa place dans le logo, et le G blanc ramené de 0..100 à la capitale.
 *  `grand` : dans le logo, le G est 1,3 fois plus grand que dans le carré seul (85 % de
 *  la largeur au lieu de 65 %). Posé comme une lettre, le carré ne fait que 19 à 22 px :
 *  avec le G du favicon, on lisait un pavé noir avant de lire un G (aperçu du 12/10). */
const GRAND = 1.18;
export const LOGO_CARRE = {
  x: 0, y: HAUT, cote: COTE, g: G_CARRE, echelle: COTE / 100,
  grand: `translate(50 50) scale(${GRAND}) translate(-50 -50)`,
};
/** O, M, A, V, E, L : le décalage à appliquer à leurs tracés. */
export const LOGO_LETTRES = MOT.slice(1);
export const LOGO_DECALAGE = Math.round(decale * 10) / 10;
