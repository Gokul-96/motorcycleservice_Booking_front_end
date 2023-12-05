const initialState = {
    user: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGNIN_SUCCESS':
        return {
          ...state,
          user: action.payload,
        };
        case 'LOGOUT':
            return {
              ...state,
              user: null,
            };
      default:
        return state;
    }
  };
  
  export default userReducer;