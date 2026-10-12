import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/data/site.js';

/**
 * Le site de Gomavel : statique de bout en bout (aucun serveur, aucune base).
 *
 * `inlineStylesheets: 'never'` n'est pas un réglage de performance : l'en-tête
 * Content-Security-Policy de `public/_headers` n'autorise que les feuilles et les
 * scripts servis par le site lui-même ('self'). Une feuille recopiée dans la page
 * serait bloquée par le navigateur, sans erreur visible pour le visiteur.
 */
export default defineConfig({
  site: SITE.url,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'never' },
  integrations: [sitemap()],
  /* Même raison que `inlineStylesheets` : sans ce zéro, Astro recopie dans la page un
     script court au lieu de le servir en fichier, et la CSP le bloquerait. */
  vite: { build: { assetsInlineLimit: 0 } },
  devToolbar: { enabled: false },
  /* PORT gagne quand l'environnement en impose un (le panneau de l'appli Claude). */
  server: { port: Number(process.env.PORT) || 4321 },
});
