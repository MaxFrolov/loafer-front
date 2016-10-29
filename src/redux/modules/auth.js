import { clearData } from 'helpers/authData'

// ACTION TYPES

const SET_USER = 'auth/SET_USER'
const UPDATE_USER = 'auth/UPDATE_USER'

const LOGOUT = 'auth/LOGOUT'

const initialState = {}

// AUTH REDUCER

export function auth (state = initialState, action = {}) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state, user: action.user
      }
    case UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.userData
        }
      }
    case LOGOUT:
      return {
        ...initialState
      }
    default:
      return state
  }
}

export function updateCurrentUser (userData) {
  return {
    type: UPDATE_USER,
    userData
  }
}

export function setCurrentUser (user) {
  return {
    type: SET_USER,
    user
  }
}

export function logout () {
  return (dispatch, getState, client) => (client.del('/auth/sign_out')
    .then(() => {
      dispatch({ type: LOGOUT })
      clearData()
    }))
}

export function recoveryPassword (data) {
  return (dispatch, getState, client) => client.post('auth/password', { data })
}

export function registration (data) {
  return (dispatch, getState, client) => client.post('auth', { data, auth: true })
    .then((response) => dispatch(setCurrentUser(response)))
}

export function login (data) {
  return (dispatch, getState, client) => client.post('auth/sign_in', { data, auth: true })
    .then((response) => dispatch(setCurrentUser(response)))
}
