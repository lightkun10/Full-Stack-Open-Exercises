const generateId = () => 
  Number((Math.random() * 1000000).toFixed(0));

const initialState = {};

const notificationReducer = (state = initialState, action) => {
  // console.log('state now: ', state);
  // console.log('action', action.type);

  switch(action.type) {
    case 'SET_MESSAGE':
      return action.data;
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

export default notificationReducer;
