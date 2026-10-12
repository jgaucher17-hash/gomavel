/**
 * LE LOGO : le carré au G EST la première lettre de GOMAVEL (sa demande du 12/10 au
 * soir : « le logo doit devenir le G de Gomavel »). On lit [G]OMAVEL, d'un seul dessin.
 *
 * Construit à partir des tracés de `marque.js`, dans le repère du mot (unités de la
 * police, 1000 par cadratin) : la ligne de base est à y = 700, la hauteur des capitales
 * d'Archivo est 686. Le carré fait exactement la hauteur d'une capitale et se pose sur
 * la ligne de base ; les lettres O M A V E L le suivent avec l'approche d'une lettre.
 */
import { G_CARRE, MOT, MOT_HAUTEUR } from './marque.js';

const BASE = 700, CAP = 686, APPROCHE = 84;

/* Le bord gauche du O : le plus petit x de son tracé (toutes les valeurs d'un tracé
   d'opentype sont des paires x y). */
const xs = (d) => (d.match(/-?\d+(\.\d+)?/g) || []).map(Number).filter((_, i) => i % 2 === 0);
const gaucheO = Math.min(...xs(MOT[1]));
const droite = Math.max(...MOT.slice(1).flatMap(xs));
const decale = CAP + APPROCHE - gaucheO;

export const LOGO_LARGEUR = Math.round(droite + decale);
export const LOGO_HAUTEUR = MOT_HAUTEUR;
/** Le carré : sa place dans le logo, et le G blanc ramené de 0..100 à la capitale.
 *  `grand` : dans le logo, le G est 1,3 fois plus grand que dans le carré seul (85 % de
 *  la largeur au lieu de 65 %). Posé comme une lettre, le carré ne fait que 19 à 22 px :
 *  avec le G du favicon, on lisait un pavé noir avant de lire un G (aperçu du 12/10). */
const GRAND = 1.3;
export const LOGO_CARRE = {
  x: 0, y: BASE - CAP, cote: CAP, g: G_CARRE, echelle: CAP / 100,
  grand: `translate(50 50) scale(${GRAND}) translate(-50 -50)`,
};
/** O, M, A, V, E, L : le décalage à appliquer à leurs tracés. */
export const LOGO_LETTRES = MOT.slice(1);
export const LOGO_DECALAGE = Math.round(decale * 10) / 10;
