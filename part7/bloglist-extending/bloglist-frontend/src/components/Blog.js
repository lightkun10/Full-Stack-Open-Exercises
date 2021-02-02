import React, { useState } from 'react';

const Blog = ({ blog, addLike, onDelete }) => {
  if (!blog) return <div>Please wait...</div>

  console.log(blog);
  return (
    <div className="blog__content">
      <div className="blog__content-title">
        <h2>{blog.title}</h2>
      </div>

      <div className="blog__content-url">
        <a className="blog__content-url-link" href={blog.url}>{blog.url}</a>
      </div>

      <div className="blog__content-likes">
        {blog.likes} {blog.likes > 1 ? 'likes' : 'like'} <button onClick={addLike}>like</button>
      </div>

      <div className="blog__content-adder">
        added by {blog.user.name}
      </div>

      {onDelete ?
        <button id="deleteButton" onClick={onDelete}>remove</button> :
        ''
      }
    </div>
  )
}

export default Blog;