# 📚 TP React : Catalogue de la bibliothèque universitaire

Petite application React (créée avec Vite) pour gérer un catalogue de livres : afficher les livres, les emprunter / rendre, et en ajouter de nouveaux.

## Notions mises en pratique

| Notion | Où on l'utilise |
|---|---|
| Composant | `App` et `BookCard` |
| Props | `BookCard` reçoit `titre`, `auteur`, `estDisponible`, `onClickEmprunt` |
| Affichage conditionnel (ternaire) | Statut et texte du bouton dans `BookCard` |
| `.map()` et `key` | Affichage de la liste des livres dans `App` |
| `useState` | La liste `books` et les champs du formulaire |
| Champs contrôlés | Les deux `<input>` du formulaire |
| Événements | `onClick`, `onChange`, `onSubmit` |

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir l'adresse affichée dans le terminal (en général `http://localhost:5173`).

## Structure du projet

```
03/
├── public/
├── src/
│   ├── components/
│   │   └── BookCard.jsx    ← composant enfant (une carte de livre)
│   ├── App.jsx             ← composant principal (state, liste, formulaire)
│   ├── index.css           ← styles de toute l'application
│   └── main.jsx            ← point d'entrée (branche React sur la page)
├── index.html
└── package.json
```

---

# Ce qui a été fait, étape par étape

## Étape 1 : Initialisation du projet

1. Création du projet avec Vite :
   ```bash
   npm create vite@latest 03
   ```
   Choix : **React** puis **JavaScript**.
2. Installation des dépendances et lancement :
   ```bash
   cd 03
   npm install
   npm run dev
   ```
3. Nettoyage des fichiers inutiles dans `src/` :
   - suppression du dossier `assets/`
   - suppression de `App.css`
   - `index.css` vidé
4. `App.jsx` remplacé par un composant minimal (un simple titre).
5. Création du dossier `src/components/`.

## Étape 2 : Le composant enfant `BookCard`

Création de `src/components/BookCard.jsx`.

- Le composant reçoit **4 props** par déstructuration :
  `{ titre, auteur, estDisponible, onClickEmprunt }`
- Il affiche le titre et l'auteur avec des accolades `{ }` dans le JSX.
- **Affichage conditionnel** avec un ternaire :
  - `estDisponible` vrai : « ✅ Disponible » et bouton « Emprunter »
  - `estDisponible` faux : « ❌ Emprunté » et bouton « Rendre »
- Le bouton déclenche `onClickEmprunt` au clic (`onClick`).
- Le composant ne sait pas **comment** emprunter un livre : il prévient seulement son parent. C'est le rôle d'une prop de type fonction.
- Le composant est testé temporairement dans `App.jsx` avec deux cartes écrites à la main.

## Étape 3 : Affichage dynamique dans `App.jsx`

- Import de `useState` et de `BookCard`.
- Création de l'état `books`, un tableau de 4 objets :
  ```js
  { id, titre, auteur, estDisponible }
  ```
- Calcul du **nombre de livres disponibles** en temps réel :
  ```js
  const nombreDisponibles = books.filter((book) => book.estDisponible).length;
  ```
  Cette valeur est recalculée à chaque affichage, donc elle se met à jour automatiquement quand `books` change. Pas besoin d'un state séparé.
- Affichage de la liste avec **`.map()`**, un `BookCard` par livre, avec la prop **`key={book.id}`** (identifiant unique, nécessaire pour que React suive chaque élément).

## Étape 4 : Interactivité et formulaire d'ajout

### A. Gestion de l'emprunt

Création de la fonction `onClickEmprunt(bookId)` :

```jsx
function onClickEmprunt(bookId) {
  setBooks(
    books.map((book) =>
      book.id === bookId
        ? { ...book, estDisponible: !book.estDisponible }
        : book
    )
  );
}
```

- On ne modifie **jamais** le state directement : on crée un **nouveau tableau** et on le passe à `setBooks`.
- Le livre cliqué est recopié avec `...book` (opérateur spread), et sa valeur `estDisponible` est inversée avec `!`.
- Dans le `.map()`, la fonction est passée en prop avec une fonction fléchée :
  ```jsx
  onClickEmprunt={() => onClickEmprunt(book.id)}
  ```
  Sans la flèche, la fonction s'exécuterait immédiatement à l'affichage au lieu d'attendre le clic.

### B. Formulaire d'ajout

- Deux états pour les champs : `titre` et `auteur` (initialisés à `""`).
- Deux **champs contrôlés** : leur valeur vient du state (`value={titre}`) et chaque frappe le met à jour (`onChange={(e) => setTitre(e.target.value)}`).
- Fonction `handleSubmit` appelée par `onSubmit` :
  1. `e.preventDefault()` empêche le rechargement de la page.
  2. Vérification que les champs ne sont pas vides (avec `.trim()` pour ignorer les espaces).
  3. Création du nouveau livre, disponible par défaut, avec `id: Date.now()`.
  4. Ajout à la liste : `setBooks([...books, nouveauLivre])`.
  5. Vidage des champs : `setTitre("")` et `setAuteur("")`.

## Étape 5 : Le style

Les styles écrits directement dans le JSX (`style={{ ... }}`) sont remplacés par un vrai fichier CSS.

- Tous les styles sont dans `src/index.css` (déjà importé par `main.jsx`).
- En JSX, on utilise **`className`** à la place de `class`.
- Classes créées : `.app`, `.titre-principal`, `.formulaire`, `.champ`, `.btn`, `.btn-rendre`, `.carte`, `.auteur`, `.statut`, `.statut-disponible`, `.statut-emprunte`.
- **Le style réagit au state** : la classe est choisie avec un ternaire.
  ```jsx
  className={estDisponible ? "statut statut-disponible" : "statut statut-emprunte"}
  ```
  Badge vert si disponible, rouge si emprunté. Bouton bleu pour emprunter, orange pour rendre.
- La logique de `App.jsx` n'a pas changé : seul le visuel a été modifié.

---

## Résultat final

- Le titre indique le nombre de livres disponibles, mis à jour en direct.
- Chaque livre est affiché dans une carte stylisée.
- Le bouton **Emprunter / Rendre** inverse le statut du livre.
- Le formulaire permet d'ajouter un livre (refusé si un champ est vide).
- La page ne se recharge jamais.

## Pistes d'amélioration

- Afficher un message d'erreur quand le formulaire est incomplet.
- Ajouter un bouton **Supprimer** sur chaque carte.
- Ajouter un filtre « Disponibles seulement ».
- Ajouter une barre de recherche par titre ou par auteur.