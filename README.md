# ✦ BlogCraft — Application de Blog CRUD

> Une application de blog moderne construite avec **React**, dotée d'un design gradient sombre premium, d'une recherche temps réel et d'un filtrage par catégorie.

<br/>

## 📸 Aperçu

```
┌─────────────────────────────────────────┐
│  ✦ BlogCraft                  3 articles│  ← Navbar sticky glassmorphism
├─────────────────────────────────────────┤
│                                         │
│  Créer un article                       │  ← Formulaire CRUD
│  ┌──────────────┐  ┌──────────────┐     │
│  │ Titre        │  │ Auteur       │     │
│  └──────────────┘  └──────────────┘     │
│  ┌──────────────────────────────────┐   │
│  │ Catégorie ▾                      │   │
│  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────┐   │
│  │ Contenu de l'article...          │   │
│  └──────────────────────────────────┘   │
│  [ + Publier l'article ]                │
│                                         │
│  🔍 Rechercher...   [ Toutes cat. ▾ ]   │  ← Barre de recherche + filtre
│                                         │
│  ┌──────────┐  ┌──────────┐             │  ← Grille responsive
│  │ DESIGN   │  │ TECHNO   │             │
│  │ Titre…   │  │ Titre…   │             │
│  │ Corps…   │  │ Corps…   │             │
│  │ Auteur   │  │ Auteur   │             │
│  │ ✏️ 🗑    │  │ ✏️ 🗑    │             │
│  └──────────┘  └──────────┘             │
│                                         │
│    ⌨️ Crafted by VoaybeDev →           │  ← Signature cliquable
└─────────────────────────────────────────┘
```

<br/>

## 🚀 Démarrage rapide

### Prérequis

- [Node.js](https://nodejs.org/) ≥ 18.x
- npm ≥ 9.x (ou pnpm / yarn)

### Installation

```bash
# 1. Créer le projet React (si pas encore fait)
npx create-react-app blog-app
cd blog-app

# 2. Copier les fichiers du projet
cp BlogApp.jsx  src/BlogApp.jsx
cp index.css    src/index.css

# 3. Modifier src/App.jsx
```

**`src/App.jsx`**
```jsx
import BlogApp from './BlogApp';

export default function App() {
  return <BlogApp />;
}
```

```bash
# 4. Lancer l'application
npm start
```

L'application s'ouvre sur **http://localhost:3000**

<br/>

## 🗂️ Structure des fichiers

```
blog-app/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx          ← Point d'entrée React
│   ├── BlogApp.jsx      ← Composant principal (CRUD + logique)
│   └── index.css        ← Tous les styles (design tokens + composants)
├── package.json
└── README.md
```

<br/>

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| **Créer** | Formulaire avec titre, auteur, catégorie, contenu |
| **Lire** | Grille responsive de cards avec badge et avatar |
| **Modifier** | Pré-remplit le formulaire, surligne la card en édition |
| **Supprimer** | Suppression directe de l'article |
| **Recherche** | Filtre temps réel sur le titre et l'auteur |
| **Filtre catégorie** | Menu déroulant pour filtrer par catégorie |
| **Responsive** | Adaptatif mobile / tablette / desktop |
| **Animations** | Entrées animées, micro-interactions hover |
| **Signature** | Lien cliquable vers le GitHub de VoaybeDev |

<br/>

## 🧩 Architecture du composant

```
<BlogApp>
 ├── State
 │    ├── posts[]         → Liste des articles
 │    ├── form{}          → Données du formulaire en cours
 │    ├── editId          → ID de l'article en édition (null = création)
 │    ├── search          → Texte de recherche
 │    └── filterCat       → Catégorie sélectionnée
 │
 ├── Handlers
 │    ├── handleChange()  → Met à jour un champ du formulaire
 │    ├── handleSubmit()  → Crée ou met à jour un article
 │    ├── handleEdit()    → Active le mode édition
 │    ├── handleDelete()  → Supprime un article
 │    └── handleCancel()  → Annule le mode édition
 │
 └── Render
      ├── <nav.navbar>         → Barre de navigation
      ├── <div.form-card>      → Formulaire CRUD
      ├── <div.topbar>         → Recherche + filtre
      ├── <div.grid>           → Grille d'articles
      │    └── <article.card>  → Card individuelle
      └── <footer>             → Signature VoaybeDev
```

<br/>

## 🎨 Design System

### Palette (CSS Custom Properties)

| Variable | Valeur | Usage |
|---|---|---|
| `--grad-bg` | `135deg, #0f0c29 → #302b63 → #24243e` | Fond de l'application |
| `--grad-text` | `90deg, #f093fb → #f5576c → #fda085` | Titres en gradient |
| `--grad-btn-primary` | `#f093fb → #f5576c` | Bouton publier |
| `--grad-btn-edit` | `#4facfe → #00f2fe` | Bouton modifier |
| `--grad-btn-update` | `#43e97b → #38f9d7` | Bouton mettre à jour |
| `--grad-btn-del` | `#f5576c → #f093fb` | Bouton supprimer |
| `--border` | `rgba(255,255,255,0.1)` | Bordures subtiles |
| `--text` | `rgba(255,255,255,0.92)` | Texte principal |
| `--text-muted` | `rgba(255,255,255,0.45)` | Texte secondaire |

### Typographie

| Police | Usage |
|---|---|
| [Clash Display](https://fonts.google.com/) | Titres, navbar, boutons |
| [Bricolage Grotesque](https://fonts.google.com/) | Corps de texte, labels, inputs |

### Breakpoints responsive

| Breakpoint | Comportement |
|---|---|
| `> 768px` | Grille multi-colonnes (`auto-fill, minmax(300px, 1fr)`) |
| `≤ 768px` | Grille 1 colonne |
| `≤ 600px` | Formulaire 1 colonne, topbar vertical |
| `≤ 480px` | Boutons pleine largeur, padding réduit |

<br/>

## 📦 Catégories disponibles

```
Technologie · Design · Science · Culture · Voyage · Lifestyle
```

Pour ajouter / modifier les catégories, éditer le tableau `CATEGORIES` dans `BlogApp.jsx` :

```jsx
const CATEGORIES = [
  "Technologie",
  "Design",
  "Science",
  "Culture",
  "Voyage",
  "Lifestyle",
  "Ma nouvelle catégorie", // ← Ajouter ici
];
```

<br/>

## 🛠️ Personnalisation

### Changer les couleurs du thème

Modifier les variables dans `index.css` → section `DESIGN TOKENS` :

```css
:root {
  --grad-bg:    linear-gradient(135deg, #votre-couleur-1, #votre-couleur-2);
  --grad-text:  linear-gradient(90deg, #couleur-a, #couleur-b);
  /* ... */
}
```

### Ajouter des articles par défaut

Modifier le tableau `INITIAL_POSTS` dans `BlogApp.jsx` :

```jsx
const INITIAL_POSTS = [
  {
    id: 1,
    title: "Mon premier article",
    content: "Contenu de l'article...",
    author: "Votre Nom",
    category: "Technologie",
    date: "20 Fév. 2025",
  },
  // ...
];
```

### Connecter une API REST

Remplacer `useState(INITIAL_POSTS)` par un `useEffect` avec `fetch` :

```jsx
import { useState, useEffect } from "react";

// Dans BlogApp :
const [posts, setPosts] = useState([]);

useEffect(() => {
  fetch("https://votre-api.com/posts")
    .then((res) => res.json())
    .then(setPosts);
}, []);

// Pour créer :
const handleSubmit = async () => {
  const res = await fetch("https://votre-api.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  const newPost = await res.json();
  setPosts((p) => [newPost, ...p]);
};
```

<br/>

## 🔍 Guide des classes CSS

| Classe | Description |
|---|---|
| `.app` | Wrapper global + blobs décoratifs |
| `.navbar` | Barre de navigation sticky |
| `.navbar-brand` | Logo / titre de l'app |
| `.container` | Conteneur centré max 1120px |
| `.form-card` | Card du formulaire |
| `.form-card--edit` | Variante bleue (mode édition) |
| `.form-row` | Grille 2 colonnes pour les inputs |
| `.btn` | Base des boutons |
| `.btn--primary` | Bouton publier (rose) |
| `.btn--edit` | Bouton modifier (bleu) |
| `.btn--update` | Bouton mettre à jour (vert) |
| `.btn--delete` | Bouton supprimer (rouge) |
| `.btn--cancel` | Bouton annuler (neutre) |
| `.topbar` | Barre recherche + filtre |
| `.grid` | Grille auto des articles |
| `.card` | Card d'article |
| `.card--editing` | Card en cours d'édition |
| `.card-badge` | Badge catégorie |
| `.avatar` | Avatar avec initiales |
| `.signature` | Lien signature footer |

<br/>

## 📄 Licence

Ce projet est open source — libre de le modifier et de le distribuer.  
Un ⭐ sur le dépôt est toujours apprécié !

<br/>

---

<div align="center">

**⌨️ Crafted with ❤️ by [VoaybeDev](https://github.com/VoaybeDev?tab=repositories)**

</div>