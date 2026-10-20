/**
 * TOUT CE QUE LE SITE DIT DU STUDIO, À UN SEUL ENDROIT.
 *
 * Ses décisions du 12/10/2026 (planche « Proposition Gomavel ») :
 *   - le studio fait des applications ET des jeux mobiles (des fiches de révision un
 *     jour, pas seulement des jeux) : rien ici ne doit parler du studio comme d'un
 *     studio de jeux vidéo seulement ;
 *   - l'accroche : « Un autre level. » (12/10, tard), SES MOTS : « un truc du genre un autre
 *     niveau, ou qui rime avec level, genre un autre level » — et GomaVEL rime avec LEVEL.
 *     Avant elle : « Petit écran, grand soin. » (« vague »), puis « Un pouce suffit. »,
 *     qu'il a rangée dans le « texte inutile » ;
 *   - le ton : sobre pour le studio (« Gomavel… », vous), complice sur la page d'un
 *     jeu (tu), comme dans le jeu lui-même ;
 *   - rien sur la façon dont les jeux sont fabriqués ;
 *   - les adresses e-mail du studio et de Shuriken Storm arrivent AVANT LA SORTIE :
 *     tant que `emails.studio` est vide, la section Contact et son lien n'existent
 *     pas (un « bientôt » sur la page d'accueil ferait chantier).
 */
export const SITE = {
  nom: 'Gomavel',
  accroche: 'Un autre level.',
  description:
    "Gomavel est un studio indépendant d'applications et de jeux mobiles, en France. Peu de produits, faits avec soin, pour iPhone et Android.",
  /* L'ADRESSE OÙ VIT LE SITE : elle fait les liens absolus (images de partage, plan du
     site, données structurées). gomavel.pages.dev tant que le domaine n'est pas acheté
     (sa réponse du 12/10) ; à passer à https://gomavel.com le jour de l'ouverture, avec
     `indexable` ci-dessous. */
  url: 'https://gomavel.pages.dev',
  fondation: 2026,

  /* FAUX TANT QUE LE SITE VIT SUR gomavel.pages.dev (sa réponse du 12/10 : le domaine
     plus tard). Faux = `noindex` sur chaque page et robots.txt fermé : un moteur qui
     indexerait l'adresse provisoire la garderait des mois après l'ouverture du vrai
     domaine. À passer à `true` le jour où gomavel.com pointe ici (et robots.txt avec). */
  indexable: false,

  emails: {
    studio: 'gomavelstudio@gmail.com',
  },

  /* LES MENTIONS LÉGALES D'UN ENTREPRENEUR INDIVIDUEL (service-public.fr, F31228) : nom
     suivi de « EI », adresse, téléphone, e-mail, numéro d'immatriculation, hébergeur.
     Adresse et téléphone : à lui demander avant l'ouverture sur le vrai domaine. Un champ
     vide s'affiche « à compléter », jamais une valeur inventée. */
  editeur: {
    nom: 'Jean Gaucher',
    mention: 'EI',
    nomCommercial: 'Gomavel',
    forme: 'Entrepreneur individuel (micro-entreprise)',
    siren: '131 040 099',
    adresse: '',
    telephone: '',
    tva: 'TVA non applicable, article 293 B du Code général des impôts',
    directeurPublication: 'Jean Gaucher',
  },

  /* Le téléphone de Cloudflare est celui de son dépôt à la SEC (« business phone »). */
  hebergeur: {
    nom: 'Cloudflare, Inc.',
    adresse: '101 Townsend Street, San Francisco, CA 94107, États-Unis',
    telephone: '+1 888 993 5273',
    site: 'https://www.cloudflare.com',
  },
};
