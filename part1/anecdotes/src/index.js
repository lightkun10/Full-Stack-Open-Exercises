import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(newFilledArray(anecdotes.length, 0))

  // Generate random anecdotes.
  const generateAnec = () => {
    // generate random number for the index of selected anecdotes.
    const randNum = Math.floor(Math.random() * anecdotes.length)

    // Set state to the random generated number as index.
    setSelected(randNum)
  }

  const voteUp = () => {
    let copyVotes = [...votes]
    // Increment the currently used at state.
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <div>has {votes[selected]} votes</div>

      <div>
        <Button onClick={() => voteUp()} text="vote" />
        <Button onClick={() => generateAnec()} text="next anecdote" />
      </div>
    </div>
  )
}

const Button = ({ onClick, text }) =>
  <button onClick={onClick}>{text}</button>

// Create a zero-filled array of a desired length.
// https://jsperf.com/zeroarrayjs
function newFilledArray(len, val) {
  let rv = new Array(len);
  while (--len >= 0) {
    rv[len] = val;
  }
  return rv;
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)