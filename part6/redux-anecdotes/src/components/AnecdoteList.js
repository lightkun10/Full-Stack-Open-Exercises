/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { connect } from 'react-redux';
import { toggleVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

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
  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} 
          content={anecdote.content}
          votes={anecdote.votes}
          handleClick={() => {
            props.toggleVote(anecdote);

            props.setNotification(`you voted '${anecdote.content}'`, 5000);
          }}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log(state);
  if (state.filter === '') {
    return { anecdotes: state.anecdotes };
  }

  return {
    anecdotes: state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  }
}

const mapDispatchToProps = {
  toggleVote, setNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps, 
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdotes;