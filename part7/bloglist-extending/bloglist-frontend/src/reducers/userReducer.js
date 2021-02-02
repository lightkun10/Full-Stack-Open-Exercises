const userReducer = (state=null, action) => {
  // console.log('state now: ', state);
  // console.log('action', action.type);

  switch (action.type) {
    case 'SET_USER':
      return action.data;
    case 'CLEAR_USER':
      return null;
    default:
      return state;
  }
}

/*********************
*?  Action creators 
*********************/
export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}


export default userReducer;