/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleVote } from '../reducers/anecdoteReducer';
import { setNotifMessage, clearMessage } from '../reducers/notificationReducer';

const Anecdote = ({ content, votes, handleClick }) => {
  return (
    <div>
      <div>
        {content}
      </div>
      <div>
        has {votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = (props) => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state.anecdotes);

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} 
          content={anecdote.content}
          votes={anecdote.votes}
          handleClick={() => {
            dispatch(toggleVote(anecdote.id));

            dispatch(setNotifMessage(`you voted '${anecdote.content}'`));

            setTimeout(() => {
              dispatch(clearMessage());
            }, 5000);
          }}
        />
      )}
    </div>
  )
}

export default AnecdoteList;
