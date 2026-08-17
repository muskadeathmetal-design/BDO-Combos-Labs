BDO COMBOS LABS — DEPLOIEMENT WEB V109

Contenu:
- index.html : application publique
- _headers : en-têtes de sécurité Cloudflare Pages

CLOUDFLARE PAGES + GITHUB (recommandé)
1. Créer un dépôt GitHub, par exemple bdo-combos-labs.
2. Mettre index.html et _headers à la racine du dépôt.
3. Dans Cloudflare: Workers & Pages > Create application > Pages > Connect to Git.
4. Sélectionner le dépôt GitHub.
5. Production branch: main.
6. Aucun framework.
7. Build command: exit 0
8. Build output directory: .
9. Déployer.

SUPABASE AUTH — APRES LE PREMIER DEPLOIEMENT
1. Copier l'URL publique Cloudflare, par exemple https://bdo-combos-labs.pages.dev
2. Supabase Dashboard > Authentication > URL Configuration.
3. Site URL = l'URL publique avec https://
4. Ajouter la même URL dans Redirect URLs, avec /* ou /** pour les chemins nécessaires.
5. Pour la production finale, préférer l'URL exacte du site.
6. Tester: création de compte, confirmation e-mail, connexion, déconnexion.
7. Tester avec deux navigateurs/comptes différents le partage et les J'aime.

IMPORTANT
La clé Supabase incluse dans index.html est une clé PUBLISHABLE destinée au navigateur.
Ne jamais mettre de service_role key ou secret serveur dans ce fichier.
