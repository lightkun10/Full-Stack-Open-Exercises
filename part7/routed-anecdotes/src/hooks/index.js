import React, { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const resetInput = () => setValue('');

  return { type, value, onChange, resetInput };
}

export const CreateNew = (props) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  // console.log(content.value);
  const handleSubmit = (e) => {
    // console.log(content);
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button 
          type='reset' 
          onClick={
            () => {
              content.resetInput()
              author.resetInput()
              info.resetInput()
            }
          }>
            reset
        </button>
      </form>
    </div>
  )
}