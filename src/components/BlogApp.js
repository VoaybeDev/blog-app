/**
 * @file BlogApp.jsx
 * @description Application de Blog CRUD complète construite avec React.
 *              Permet de créer, lire, modifier et supprimer des articles.
 *              Inclut une recherche temps réel et un filtre par catégorie.
 *
 * @author VoaybeDev
 * @link   https://github.com/VoaybeDev?tab=repositories
 * @version 2.0.0
 *
 * Structure du composant :
 *  ├── <Navbar />        → Barre de navigation sticky avec compteur d'articles
 *  ├── <FormCard />      → Formulaire de création / modification d'article
 *  ├── <Topbar />        → Barre de recherche + filtre catégorie
 *  ├── <Grid />          → Grille responsive des articles
 *  │     └── <Card />    → Carte individuelle d'article (CRUD actions)
 *  └── <Footer />        → Signature VoaybeDev avec lien GitHub
 */

import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTES & UTILITAIRES
// ─────────────────────────────────────────────────────────────────────────────

/** Liste des catégories disponibles pour les articles */
const CATEGORIES = [
  "Technologie",
  "Design",
  "Science",
  "Culture",
  "Voyage",
  "Lifestyle",
];

/** Articles de démonstration affichés au premier chargement */
const INITIAL_POSTS = [
  {
    id: 1,
    title: "L'essor du design brutaliste en 2025",
    content:
      "Le brutalisme numérique revient en force avec des interfaces audacieuses, crues et intentionnellement déstabilisantes. Une réaction directe à l'uniformisation des UI kits modernes.",
    author: "Léa Moreau",
    category: "Design",
    date: "15 Fév. 2025",
  },
  {
    id: 2,
    title: "IA générative : où en sommes-nous vraiment ?",
    content:
      "Au-delà du battage médiatique, l'IA générative s'intègre discrètement dans les workflows créatifs. Les équipes qui gagnent sont celles qui l'utilisent comme copilote, pas comme remplacement.",
    author: "Omar Diallo",
    category: "Technologie",
    date: "10 Fév. 2025",
  },
  {
    id: 3,
    title: "Slow travel : redécouvrir l'art de partir",
    content:
      "Voyager moins vite, mais mieux. Le slow travel invite à s'immerger dans un territoire plutôt que de le consommer. Une philosophie qui transforme le regard sur l'ailleurs.",
    author: "Nina Bauer",
    category: "Voyage",
    date: "3 Fév. 2025",
  },
];

/** Compteur interne pour générer des IDs uniques */
let nextId = 4;

/**
 * Génère les initiales d'un nom complet (max 2 lettres).
 * @param {string} name - Le nom complet de l'auteur.
 * @returns {string} Les initiales en majuscules.
 * @example initials("Léa Moreau") → "LM"
 */
const initials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

/**
 * Retourne la date actuelle formatée en français.
 * @returns {string} Ex : "20 Fév. 2025"
 */
const formatDate = () =>
  new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

/**
 * BlogApp — Composant racine de l'application.
 * Gère l'état global (posts, formulaire, recherche, filtre).
 */
export default function BlogApp() {
  // ── State ────────────────────────────────────────────────────────────────

  /** Liste de tous les articles */
  const [posts, setPosts] = useState(INITIAL_POSTS);

  /** Données du formulaire (création ou modification) */
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    category: CATEGORIES[0],
  });

  /** ID de l'article en cours de modification (null = mode création) */
  const [editId, setEditId] = useState(null);

  /** Texte de recherche (filtre en temps réel) */
  const [search, setSearch] = useState("");

  /** Catégorie sélectionnée pour le filtre */
  const [filterCat, setFilterCat] = useState("Tous");

  // ── Handlers ─────────────────────────────────────────────────────────────

  /**
   * Met à jour un champ du formulaire.
   * @param {React.ChangeEvent} e - Événement de changement de l'input.
   */
  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  /**
   * Soumet le formulaire.
   * - Si editId est défini → met à jour l'article existant.
   * - Sinon → crée un nouvel article et l'insère en tête de liste.
   * Valide que les champs obligatoires (titre, contenu, auteur) sont remplis.
   */
  const handleSubmit = () => {
    if (!form.title.trim() || !form.content.trim() || !form.author.trim())
      return;

    if (editId !== null) {
      // Mode édition : on met à jour l'article ciblé
      setPosts((p) =>
        p.map((post) => (post.id === editId ? { ...post, ...form } : post))
      );
      setEditId(null);
    } else {
      // Mode création : on ajoute l'article en premier
      setPosts((p) => [{ id: nextId++, ...form, date: formatDate() }, ...p]);
    }

    // Réinitialise le formulaire
    setForm({ title: "", content: "", author: "", category: CATEGORIES[0] });
  };

  /**
   * Passe en mode édition pour un article donné.
   * Pré-remplit le formulaire et scroll en haut de page.
   * @param {Object} post - L'article à modifier.
   */
  const handleEdit = (post) => {
    setEditId(post.id);
    setForm({
      title: post.title,
      content: post.content,
      author: post.author,
      category: post.category,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   * Supprime un article par son ID.
   * @param {number} id - L'identifiant de l'article à supprimer.
   */
  const handleDelete = (id) =>
    setPosts((p) => p.filter((post) => post.id !== id));

  /**
   * Annule le mode édition et réinitialise le formulaire.
   */
  const handleCancel = () => {
    setEditId(null);
    setForm({ title: "", content: "", author: "", category: CATEGORIES[0] });
  };

  // ── Filtrage ─────────────────────────────────────────────────────────────

  /**
   * Articles filtrés selon la recherche textuelle et la catégorie.
   * La recherche porte sur le titre et le nom de l'auteur (insensible à la casse).
   */
  const filtered = posts.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      p.title.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q);
    const matchCat = filterCat === "Tous" || p.category === filterCat;
    return matchSearch && matchCat;
  });

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="app">

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <nav className="navbar">
        <span className="navbar-brand">✦ BlogCraft</span>
        <span className="navbar-count">
          {posts.length} article{posts.length !== 1 ? "s" : ""}
        </span>
      </nav>

      <div className="container">

        {/* ── Formulaire de création / modification ──────────────────── */}
        <div className={`form-card${editId !== null ? " form-card--edit" : ""}`}>
          <p className="section-title">
            {editId !== null ? "✏️ Modifier l'article" : "Créer un article"}
          </p>
          <p className="section-sub">
            {editId !== null
              ? "Mettez à jour les informations de votre article."
              : "Partagez vos idées avec le monde."}
          </p>

          {/* Ligne titre + auteur */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Titre</label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Un titre accrocheur…"
                value={form.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Auteur</label>
              <input
                id="author"
                type="text"
                name="author"
                placeholder="Votre nom"
                value={form.author}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Catégorie */}
          <div className="form-group">
            <label htmlFor="category">Catégorie</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Contenu */}
          <div className="form-group">
            <label htmlFor="content">Contenu</label>
            <textarea
              id="content"
              name="content"
              placeholder="Rédigez votre article ici…"
              value={form.content}
              onChange={handleChange}
            />
          </div>

          {/* Actions du formulaire */}
          <div className="form-actions">
            {editId !== null ? (
              <>
                <button className="btn btn--update" onClick={handleSubmit}>
                  ✓ Mettre à jour
                </button>
                <button className="btn btn--cancel" onClick={handleCancel}>
                  Annuler
                </button>
              </>
            ) : (
              <button className="btn btn--primary" onClick={handleSubmit}>
                + Publier l'article
              </button>
            )}
          </div>
        </div>

        {/* ── Barre de recherche + filtre ────────────────────────────── */}
        <div className="topbar">
          <div className="search-wrap">
            <span className="search-icon" aria-hidden="true">🔍</span>
            <input
              type="text"
              placeholder="Rechercher un article ou un auteur…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
          >
            <option value="Tous">Toutes catégories</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* ── Grille des articles ────────────────────────────────────── */}
        <div className="grid">
          {filtered.length === 0 ? (
            /* État vide */
            <div className="empty">
              <span className="empty-icon" aria-hidden="true">📝</span>
              <h3>Aucun article trouvé</h3>
              <p>Essayez un autre mot-clé ou créez le premier article !</p>
            </div>
          ) : (
            filtered.map((post, i) => (
              /**
               * Card d'article individuelle.
               * La classe `card--editing` surligne la card en cours d'édition.
               */
              <article
                key={post.id}
                className={`card${editId === post.id ? " card--editing" : ""}`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                {/* En-tête : badge catégorie + date */}
                <div className="card-header">
                  <span className="card-badge">{post.category}</span>
                  <p className="card-date">{post.date}</p>
                </div>

                {/* Titre de l'article */}
                <h2 className="card-title">{post.title}</h2>

                {/* Corps / extrait */}
                <p className="card-body">{post.content}</p>

                {/* Auteur avec avatar */}
                <div className="card-author">
                  <div className="avatar" aria-hidden="true">
                    {initials(post.author)}
                  </div>
                  <div>
                    <div className="author-name">{post.author}</div>
                    <div className="author-info">Auteur</div>
                  </div>
                </div>

                {/* Actions CRUD */}
                <div className="card-actions">
                  <button
                    className="btn btn--edit"
                    onClick={() => handleEdit(post)}
                    aria-label={`Modifier l'article : ${post.title}`}
                  >
                    ✏️ Modifier
                  </button>
                  <button
                    className="btn btn--delete"
                    onClick={() => handleDelete(post.id)}
                    aria-label={`Supprimer l'article : ${post.title}`}
                  >
                    🗑 Supprimer
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      {/* ── Footer — Signature VoaybeDev ──────────────────────────────── */}
      <footer className="footer">
        <a
          href="https://github.com/VoaybeDev?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="signature"
          aria-label="Voir les projets de VoaybeDev sur GitHub"
        >
          <span className="signature-icon">⌨️</span>
          <span className="signature-text">
            Crafted by <strong>VoaybeDev</strong>
          </span>
          <span className="signature-arrow">→</span>
        </a>
      </footer>

    </div>
  );
}