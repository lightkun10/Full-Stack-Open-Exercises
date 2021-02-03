import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '../reducers/blogReducer';

const Blog = ({ blog, addLike, onDelete, onAddComment }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  if (!blog) return <div>Please wait...</div>

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    // console.log(event.target.comment.value);
    const comment = event.target.comment.value;
    event.target.submit.disabled = true;
    const button = event.target.submit;
    dispatch(addComment(blog, comment, () => {
      console.log(event.target.comment);
      event.target.comment = '';
      button.disabled = false;
    }))
  }

  // console.log(blog);
  return (
    <div className="blog__content">
      <div className="blog__content-title">
        <h2>{blog.title}</h2>
      </div>

      <div className="blog__content-url">
        <a className="blog__content-url-link" 
          href={blog.url}>
            {blog.url}
        </a>
      </div>

      <div className="blog__content-likes">
        {blog.likes} {blog.likes > 1 ? 'likes' : 'like'} <button onClick={addLike}>like</button>
      </div>

      <div className="blog__content-adder">
        added by {blog.user.name}
      </div>

      <div className="blog__content-removeButton">
        {onDelete ?
          <button id="deleteButton" onClick={onDelete}>remove</button> :
          ''
        }
      </div>
      
      <div className="blog__content-comments">
        <h3>comments</h3>

        <form className="blog__content-comments-form" onSubmit={handleCommentSubmit}>
          <div className="blog__content-comments-form-comment">
            <input
              id="comment"
              type="text"
              value={comment}
              name="Comment"
              onChange={handleCommentChange}
            />
          </div>
          
          <button
            className="blog__addform__form__submit"
            type="submit">
              add comment
          </button>
        </form>

        <ul>
          {blog.comments.map((comment) => 
            <li key={comment.id}>
              {comment.comment}
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Blog;