import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const anecdoteForm = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const value = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(value));

    dispatch(setNotification(`new anecdote '${value}'`, 5000));
  }
  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default anecdoteForm;
