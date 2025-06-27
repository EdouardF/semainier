# semainier

# Déploiement automatique sur GitHub Pages

## Déploiement manuel

1. Pousse ton code sur la branche `main` de ton repo GitHub `EdouardF/semainier`.
2. Exécute :
   ```sh
   npm run deploy
   ```
3. Le site sera accessible à : https://EdouardF.github.io/semainier

## Déploiement automatique (GitHub Actions)

Un workflow GitHub Actions est fourni dans `.github/workflows/gh-pages.yml`.
À chaque push sur `main`, le site sera automatiquement déployé sur GitHub Pages.

---

© 2025