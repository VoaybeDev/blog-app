import React, { useState, useEffect } from 'react';

/**
 * Composant pour ajouter ou éditer un article de blog.
 */
const BlogPost = ({ post, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      onSave({ title, content, id: post?.id });
      setTitle('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="blog-post-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button type="submit">{post ? 'Update Post' : 'Add Post'}</button>
    </form>
  );
};

export default BlogPost;