//Actions
import * as actionType from '../actionTypes/actionTypes';

// APP Actions
export const setAppState = (data) => {
  return {
    type: actionType.SET_APP_STATE,
    data
  }
}
export const clearAppState = () => {
  return {
    type: actionType.CLEAR_APP_STATE,
  }
}


// USERS Actions
export const requestUserInfo = (data) => {
  return {
    type: actionType.REQUEST_USER_INFO,
    data
  }
}
export const receiveUserInfo = (data) => {
  return {
    type: actionType.RECEIVE_USER_INFO,
    data
  }
}
export const receiveUserTokenInfo = (data, token) => {
  return {
    type: actionType.RECEIVE_USER_TOKEN_INFO,
    data,
    token
  }
}

export const clearUserInfo = () => {
  return {
    type: actionType.CLEAR_USER_INFO,
  }
}
export const setToken = (data) => {
  return {
    type: actionType.SET_TOKEN,
    data
  }
}
