# Scholar — version React

Application de gestion et de paiement des frais de scolarité, convertie depuis la version HTML/Tailwind.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # version de production dans dist/
```

## Technologies
- React 19 + Vite
- React Router (une route par page)
- Tailwind CSS v4 (même design que la version HTML)
- Font Awesome (icônes)

## Pages
| Route | Ancienne page |
|---|---|
| `/` | bienvenue.html |
| `/connexion` | connexion.html |
| `/inscription` | inscription.html |
| `/accueil` | accueil.html |
| `/etablissement` | etablissement.html |
| `/paiement` | paiement.html |
| `/nouvel-eleve` | new_student.html |
| `/eleves` | list_student.html |
| `/eleves/:id/modifier` | edit_student.html |
| `/nouvel-etablissement` | new_school.html |
| `/historique` | historique.html |
| `/mon-compte` | my_account.html |
| `/support` | support.html |
| `/a-propos` | about.html |
| `/contact` | contact.html |

## Données
Comme dans la version HTML, les données sont gardées dans le navigateur (localStorage) :
profil, établissements, élèves et historique des paiements. Tout passe par `src/lib/storage.js`,
qu'il suffira de remplacer par des appels à votre API quand le serveur sera prêt.

Le paiement MTN / Orange Money est simulé (voir le `TODO` dans `src/pages/Paiement.jsx`).
