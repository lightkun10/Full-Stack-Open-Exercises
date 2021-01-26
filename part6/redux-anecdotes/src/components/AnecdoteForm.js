import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotifMessage, clearMessage } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const anecdoteForm = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const value = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(value));

    dispatch(setNotifMessage(`successfully created '${value}'`));
    setTimeout(() => {
      dispatch(clearMessage());
    }, 5000);
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
