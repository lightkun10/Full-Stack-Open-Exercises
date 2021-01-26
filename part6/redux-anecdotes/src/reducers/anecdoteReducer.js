// import setNotifMessage from './notificationReducer';

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action.type);

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const anecToChange = state.find((anec) => anec.id === id);
      // console.log(anecToChange);
      const voted = {
        ...anecToChange,
        votes: anecToChange.votes + 1
      }
      // setNotifMessage(`you voted '${voted.content}'`);
      return state.map((anec) => 
        anec.id !== id ? anec : voted).sort((a, b) => 
          b.votes - a.votes); // sort by the most number of votes
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
}

/*********************
*?  Action creators 
*********************/
// https://redux.js.org/tutorials/fundamentals/part-6-async-logic#synchronous-action-creators
export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data,
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export const toggleVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  };
}

export default anecdoteReducer;
