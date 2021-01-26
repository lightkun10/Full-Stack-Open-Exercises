// const generateId = () => 
//   Number((Math.random() * 1000000).toFixed(0));

const initialState = {};
const notificationReducer = (state = initialState, action) => {
  // console.log('state now: ', state);
  // console.log('action', action.type);

  switch(action.type) {
    case 'SET_MESSAGE':
      return action.data;
    case 'CLEAR_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
}

/*********************
*?  Action creators 
*********************/

let timeoutID;

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(setNotifMessage(message));

    if (timeoutID) clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  }
}

/**
 * Extra functions
 */

export const setNotifMessage = (message) => {
  return {
    type: 'SET_MESSAGE',
    data: {
      message
    }
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
    data: {
      message: 'clear'
    }
  }
}

export default notificationReducer;
