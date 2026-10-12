/**
 * N°01 — SHURIKEN STORM. Une fiche = un produit : le menu, l'accueil, sa page, sa
 * confidentialité, son support et le plan du site se construisent à partir d'elle.
 * Ajouter un produit : copier ce fichier, ses images dans `src/assets/produits/<slug>/`,
 * et ses deux textes dans `src/produits/<slug>/`.
 *
 * ⚠️ CE QUI EST ÉCRIT ICI DOIT ÊTRE VRAI DANS LE JEU DU JOUR (relu contre le dépôt
 * ninja-runner le 12/10/2026) :
 *   - « un seul geste » : l'aide du jeu, « Une seule commande » (`ui/screens.js`) ;
 *   - « jusqu'à 44 » lames : 8 + 14 + 22 places de la nuée (`game/nuee.js`, B2a) ;
 *   - cinq décors + la salle rare, que le jeu ne nomme jamais (`data/biomes/index.js`,
 *     hors de `BIOME_LIST`) : le site ne la nomme pas non plus ;
 *   - rien de ce qui n'est pas fini : ni la roue du jour, ni les boss rares, ni le compte.
 * Sa note du 12/10, « trop poussé sur le gameplay » : trois points, pas davantage.
 *
 * LES NINJAS MONTRÉS : les huit skins 100 % originaux. Les autres évoquent encore des
 * personnages connus ; un avis de retrait visant le site viserait le domaine du studio,
 * donc tous ses produits. Les images viennent du vrai jeu, rendues sans interface.
 */
import heros from '../assets/produits/shuriken-storm/heros.jpg';
import titre from '../assets/produits/shuriken-storm/titre.png';
import temple from '../assets/produits/shuriken-storm/decor-temple.jpg';
import bambous from '../assets/produits/shuriken-storm/decor-bambous.jpg';
import savane from '../assets/produits/shuriken-storm/decor-savane.jpg';
import caldeira from '../assets/produits/shuriken-storm/decor-caldeira.jpg';
import cote from '../assets/produits/shuriken-storm/decor-cote.jpg';
import kage from '../assets/produits/shuriken-storm/ninja-kage.png';
import kurenai from '../assets/produits/shuriken-storm/ninja-kurenai.png';
import aoi from '../assets/produits/shuriken-storm/ninja-aoi.png';
import yorumaru from '../assets/produits/shuriken-storm/ninja-yorumaru.png';
import ronin from '../assets/produits/shuriken-storm/ninja-ronin.png';
import kagerou from '../assets/produits/shuriken-storm/ninja-kagerou.png';
import raijin from '../assets/produits/shuriken-storm/ninja-raijin.png';
import tengu from '../assets/produits/shuriken-storm/ninja-tengu.png';

export default {
  slug: 'shuriken-storm',
  numero: 1,
  annee: 2026,
  nom: 'Shuriken Storm',
  type: 'Jeu mobile',
  categorie: 'jeu',
  plateformes: ['iPhone', 'Android'],
  statut: 'En développement',
  resume: 'Un ninja, un seul geste, une tempête de shurikens.',
  description:
    'Shuriken Storm, le jeu mobile de Gomavel : un ninja court sans s’arrêter, tu touches l’écran pour sauter, ses shurikens partent tout seuls. Bientôt sur iPhone et Android.',

  /* L'adresse du jeu, avant la sortie (sa décision du 12/10). Vide : la page support
     le dit, sans inventer d'adresse. */
  contact: '',
  /* Les liens des boutiques, dès que ses comptes Apple et Google existent (pré-commande
     et pré-inscription comprises). Vides : aucun bouton, « Bientôt sur… ». */
  liens: { appStore: '', googlePlay: '' },

  heros: {
    image: heros,
    alt: 'Shuriken Storm : le ninja court au crépuscule devant un temple, entre les lanternes et les pièces d’or.',
  },
  titre: { image: titre, alt: 'Shuriken Storm' },

  intro:
    'Un ninja court sans jamais s’arrêter. Tu touches l’écran pour sauter ; ses shurikens partent tout seuls. Plus tu vas loin, plus la tempête grossit.',
  points: [
    { titre: 'Un seul geste', texte: 'Toucher pour sauter, deux fois pour le double saut, même en pleine chute.' },
    { titre: 'La nuée', texte: 'Chaque bandeau ramassé devient une lame qui tourne autour de toi. Jusqu’à 44.' },
    { titre: 'Cinq décors, et un secret', texte: 'Temple, bambous, savane, caldeira, côte aux mille torii. Le sixième, à toi de le trouver.' },
  ],
  galerie: [
    { image: temple, legende: 'Temple oublié', alt: 'Le ninja saute au-dessus d’une pierre devant le temple, un ninja ennemi en face.' },
    { image: bambous, legende: 'Forêt de bambous', alt: 'Le ninja en plein saut dans la forêt de bambous, au-dessus d’un trou.' },
    { image: savane, legende: 'Savane du crépuscule', alt: 'La nuée de shurikens autour du ninja dans la savane, sous un ciel orange.' },
    { image: caldeira, legende: 'Caldeira', alt: 'Le ninja saute entre deux corniches au pied des volcans.' },
    { image: cote, legende: 'Côte aux mille torii', alt: 'La nuit sur la côte, les torii dans l’eau et les lanternes suspendues.' },
  ],
  personnages: {
    titre: 'Les ninjas',
    texte: 'Chacun sa tenue, sa traînée et sa façon de courir.',
    liste: [
      { image: kage, nom: 'Kage' },
      { image: kurenai, nom: 'Kurenai' },
      { image: aoi, nom: 'Aoi' },
      { image: yorumaru, nom: 'Yorumaru' },
      { image: ronin, nom: 'Rōnin' },
      { image: kagerou, nom: 'Kagerō' },
      { image: raijin, nom: 'Raijin' },
      { image: tengu, nom: 'Tengu' },
    ],
  },
};
