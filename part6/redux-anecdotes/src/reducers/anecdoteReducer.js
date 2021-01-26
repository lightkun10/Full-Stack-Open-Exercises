import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state);
  // console.log('action', action.type);

  switch (action.type) {
    case 'VOTE':
      // console.log(action.data);
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
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  }
}

export const createAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const toggleVote = (anecdote) => {
  return async dispatch => {
    const updatedVote = await anecdoteService
      .upVote(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 });
    dispatch({
      type: 'VOTE',
      data: updatedVote,
    });
  };
}

export default anecdoteReducer;
