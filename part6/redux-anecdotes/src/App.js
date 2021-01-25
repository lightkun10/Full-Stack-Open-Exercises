import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, toggleVote } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const addVote = (id) => {
    // console.log('vote', id);
    dispatch(toggleVote(id));
  }

  const addAnecdote = (event) => {
    event.preventDefault();
    const value = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(value));
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App