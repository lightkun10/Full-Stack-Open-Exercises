// const generateId = () => 
//   Number((Math.random() * 1000000).toFixed(0));

const initialState = {};

const notificationReducer = (state = initialState, action) => {
  // console.log('state now: ', state);
  // console.log('action', action.type);

  switch(action.type) {
    case 'SET_MESSAGE':
      return action.data;
    case 'CLEAR_MESSAGE':
      return initialState;
    default:
      return state;
  }
}

export const setNotifMessage = (message) => {
  return {
    type: 'SET_MESSAGE',
    data: {
      message
    }
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE',
    data: {
      message: 'clear'
    }
  }
}

export default notificationReducer;
