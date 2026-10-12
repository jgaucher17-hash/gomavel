/**
 * LES NOUVEAUTÉS — ce qui arrive, puis ce qui est déjà arrivé.
 *
 * Sa demande du 12/10, d'après supercell.com (dont l'accueil est un fil d'actualités,
 * chaque carte étiquetée du nom de son jeu) : « une page d'info sur les nouveautés qui
 * arrivent ». Une entrée = une carte : l'étiquette (le produit, ou le studio), l'état,
 * un titre, deux phrases, et parfois une image du produit dans un cadre (la couleur
 * n'entre que par là, la règle du site).
 *
 * ⚠️ CE QUI EST ANNONCÉ ICI DOIT ÊTRE DÉCIDÉ DANS LE DÉPÔT DU JEU (relu contre
 * ninja-runner/A-FAIRE.md le 12/10/2026) :
 *   - la roue du jour : W1, ses 24 réponses du 11/10 (3 tours par jour chacun contre une
 *     pub, pièces, diamants, caisse, caisse rare qu'on ne trouve que là, chances derrière
 *     un « i ») ; la sauvegarde et les images sont faites, l'écran pas encore ;
 *   - le compte : A15, sa réponse du 30/09 (Apple, Google, e-mail ; pas de téléphone) ;
 *     il attend son projet Firebase et le programme Apple : d'où « En préparation » ;
 *   - les huit langues : A14, faites le 30/09, la dernière passe avant la sortie ;
 *   - les codes cadeaux : SA demande du 12/10 au soir (réductions, cosmétiques uniques,
 *     caisses, donnés par des TikTok pour en mesurer l'effet), entrés sur le site par un
 *     joueur connecté avec le mail de son compte : ils attendent le compte (A15), d'où
 *     « En préparation » et AUCUN formulaire tant qu'il ne peut rien livrer ;
 *   - AUCUNE DATE pour ce qui arrive : la date de sortie est levée depuis le 30/09
 *     (« je préfère prendre mon temps »). « Bientôt » = c'est en cours de construction ;
 *     « En préparation » = décidé, pas commencé.
 * Le jour où une nouveauté sort dans le jeu, elle passe en `etat: 'sorti'` avec sa date
 * et descend dans le journal.
 *
 * Le ton suit la règle du site : « tu » quand c'est un jeu qui parle, « vous » le studio.
 */
import caisseRare from '../assets/nouveautes/roue-caisse-rare.png';
import kage from '../assets/produits/shuriken-storm/ninja-kage.png';

export const ETATS = {
  bientot: 'Bientôt',
  preparation: 'En préparation',
  sorti: 'Sorti',
};

export const NOUVEAUTES = [
  {
    produit: 'shuriken-storm',
    etat: 'bientot',
    titre: 'La roue du jour',
    texte:
      'Trois tours de roue chaque jour : des pièces, des diamants, une caisse, et parfois la caisse rare, qu’on ne trouve nulle part ailleurs. Les chances de chaque case sont écrites à côté.',
    image: { src: caisseRare, alt: 'La caisse rare : une caisse bleu nuit cerclée d’or, un œuf doré sur la serrure.' },
  },
  {
    produit: 'shuriken-storm',
    etat: 'bientot',
    titre: 'La sortie sur iPhone et Android',
    texte:
      'Shuriken Storm arrive sur l’App Store et Google Play. Pas de date : il sortira quand il sera prêt, pas avant.',
    image: { src: kage, alt: 'Kage, le ninja bleu nuit à l’écharpe turquoise, en pleine course.' },
  },
  {
    produit: 'shuriken-storm',
    etat: 'bientot',
    titre: 'Huit langues dès le premier jour',
    texte:
      'Français, anglais, allemand, espagnol, italien, portugais du Brésil, russe et chinois simplifié.',
  },
  {
    produit: 'shuriken-storm',
    etat: 'preparation',
    titre: 'Des codes cadeaux',
    texte:
      'Des codes à entrer ici, sur le site, pour une tenue introuvable ailleurs, une caisse ou une réduction. Ils se trouveront sur TikTok.',
  },
  {
    produit: 'shuriken-storm',
    etat: 'preparation',
    titre: 'Ta partie sur tous tes appareils',
    texte:
      'Un compte, par Apple, Google ou e-mail, pour retrouver ta progression sur un autre téléphone et ne jamais la perdre.',
  },
];
