const initialState = {};

const notificationReducer = (state=initialState, action) => {
  // console.log('state now: ', state);
  // console.log('action', action.type);
  switch (action.type) {
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
export const setNotifMessage = (message, notifType) => {
  return {
    type: 'SET_MESSAGE',
    data: {
      message,
      notifType
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

export const setNotification = (message, type='', time) => {
  return async dispatch => {
    dispatch(setNotifMessage(message, type));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  }
}

export default notificationReducer;