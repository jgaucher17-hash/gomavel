# Gomavel — le site du studio

Site statique (Astro), hébergé sur Cloudflare Pages. Aucun serveur, aucune base, aucun cookie.

- **Local** : `npm run dev` → http://localhost:4321
- **Mettre en ligne** : `npm run deploy` → https://gomavel.pages.dev
- **Icônes et images de partage** : `node outils/images.mjs` (après un changement de logo, d'accroche ou de produit)

## La règle de l'identité

Le noir et blanc, c'est le studio ; la couleur, ce sont les produits. Aucune couleur n'entre
dans `src/styles/global.css` : elle n'arrive que par les images d'un produit, posées dans un
cadre. Le logo est le G noir et blanc (`marque/`), tracé d'après Archivo Expanded ExtraBold.

## Ajouter un produit (« un onglet par produit »)

1. `src/produits/<slug>.js` : copier `shuriken-storm.js` et le remplir (numéro, textes, liens).
2. Ses images dans `src/assets/produits/<slug>/` (au moins `heros.jpg` et `titre.png`).
3. Ses textes dans `src/produits/<slug>/confidentialite.md` et `support.md`.
4. `node outils/images.mjs` pour son image de partage.

Le menu, l'accueil, sa page, sa confidentialité, son support et le plan du site suivent seuls.

## Avant l'ouverture sur gomavel.com

- `src/data/site.js` : `url` → `https://gomavel.com`, `indexable` → `true`, les e-mails, l'adresse et le téléphone de l'éditeur.
- `public/robots.txt` : `Allow: /` et `Sitemap: https://gomavel.com/sitemap-index.xml`.
- `src/produits/shuriken-storm.js` : l'adresse de contact du jeu, les liens des boutiques.
- `public/app-ads.txt` : la ligne d'AdMob (la même que dans le dépôt du jeu).
