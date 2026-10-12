#!/usr/bin/env node
/**
 * LES BANDES DE COURSE DE L'ACCUEIL — de la sortie du banc du jeu aux fichiers du site.
 *
 *   (dans ninja-runner) node tools/sans-tete.mjs /tools/site-coureurs.js > /tmp/coureurs.txt
 *   node outils/coureurs.mjs /tmp/coureurs.txt
 *
 * Chaque bande : 15 images de 200×240 (12 de course, 3 de saut), ramenées aux trois
 * quarts (150×180, soit deux pixels par point pour un ninja affiché à 90 px de haut) et
 * écrites en WebP transparent dans `src/assets/coureurs/<id>.webp`.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const texte = readFileSync(process.argv[2], 'utf8');
const json = JSON.parse(texte.slice(texte.indexOf('COUREURS ') + 9, texte.lastIndexOf('}') + 1));
if (json.sansTete.length) console.warn('⚠️ têtes non chargées :', json.sansTete.join(', '));
for (const [id, url] of Object.entries(json.sortie)) {
  const png = Buffer.from(url.split(',')[1], 'base64');
  const { width, height } = await sharp(png).metadata();
  const sortie = join(RACINE, 'src/assets/coureurs', `${id}.webp`);
  const info = await sharp(png).resize(Math.round(width * 0.75), Math.round(height * 0.75))
    .webp({ quality: 86, alphaQuality: 90, effort: 6 }).toFile(sortie);
  console.log(`${id}.webp  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} Ko`);
}
