import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from '@material-ui/core';

const AddBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const newBlog = (event) => {
    event.preventDefault()
    createBlog({
      title, author, url
    });

    setTitle(''); setAuthor(''); setUrl('')
  }

  const margin = { 
    marginTop: 5,
  };

  return (
    <div className="blog__addform">
      <h2 className="blog__addform__header">create new</h2>
      <form className="blog__addform__form" onSubmit={newBlog}>
        <div className="blog__addform__form__title">
          <TextField
            label="title"
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div className="blog__addform__form__author">
          <TextField
            label="author"
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div className="blog__addform__form__url">
          <TextField
            label="url"
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <Button
          style={margin}
          variant="contained"
          color="primary"
          className="blog__addform__form__submit"
          type="submit">
            create
        </Button>
      </form>
    </div>
  )
}

AddBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default AddBlogForm
