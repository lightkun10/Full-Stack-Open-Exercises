import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_AUTHOR_BIRTH } from '../queries';

const EditAuthorBirth = (props) => {
  const [authorName, setAuthorName] = useState('');
  const [authorBirth, setAuthorBirth] = useState('');

  const [ changeBirth ] = useMutation(EDIT_AUTHOR_BIRTH);

  const submitBirthChange = (event) => {
    event.preventDefault();
    changeBirth({ variables: { name: authorName, birth: Number(authorBirth) } })
    setAuthorName('');
    setAuthorBirth('');
  }

  return(
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submitBirthChange}>
      <div>
        name
        <input
          value={authorName}
          onChange={({ target }) => setAuthorName(target.value)}
        />
        </div>
        <div>
          born
          <input
            type='number'
            value={authorBirth}
            onChange={({ target }) => setAuthorBirth(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
};

export default EditAuthorBirth;