/** Le catalogue : chaque fichier de `src/produits/` est un produit, rangé par numéro. */
const modules = import.meta.glob('../produits/*.js', { eager: true });

export const PRODUITS = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.numero - b.numero);

/** « N°01 » : le numéro de catalogue, toujours sur deux chiffres. */
export const numero = (n) => 'N°' + String(n).padStart(2, '0');

/** « iPhone et Android » */
export const plateformes = (p) => p.plateformes.join(' et ');
