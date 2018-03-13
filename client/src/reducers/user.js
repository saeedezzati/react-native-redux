// Reducer
// Reducers only update the State
import * as actionType from '../actionTypes/actionTypes';

const user = (state = {
  isFetching: false,
  details: {}  
} , action) => {
  switch(action.type) {
    case actionType.REQUEST_USER_INFO:
      return { 
        ...state,
        isFetching: true,        
      }
    case actionType.RECEIVE_USER_INFO:
      return { 
        ...state,
        isFetching: false,        
        details: action.data,
      }
    case actionType.RECEIVE_USER_TOKEN_INFO:
      return { 
        ...state,
        isFetching: false,        
        details: action.data,
        token: action.token,
      }
    case actionType.SET_TOKEN:
      return { 
        ...state,
        token: action.data   
      }
    case actionType.CLEAR_USER_INFO:
      return{
        isFetching: false,
        details: {},
        token: {},
      }
    default:
      return state;
  }
}
export default user;
