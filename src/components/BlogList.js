import React from 'react';

/**
 * Composant pour afficher la liste des articles.
 */
const BlogList = ({ posts, onEdit, onDelete }) => (
  <div className="blog-list">
    {posts.map(post => (
      <div key={post.id} className="blog-item">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <button onClick={() => onEdit(post)}>Edit</button>
        <button onClick={() => onDelete(post.id)}>Delete</button>
      </div>
    ))}
  </div>
);

export default BlogList;