import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxAsyncConnect } from 'redux-async-connect'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { reducer as form } from 'redux-form'
import modals from './modals'
import { LOGOUT, auth } from './auth'

const appReducer = combineReducers({
  routing: routerReducer,
  toastr: toastrReducer,
  reduxAsyncConnect,
  form,
  modals,
  auth
})

export default (state, action) => {
  if (action.type === LOGOUT) state = undefined // eslint-disable-line no-param-reassign
  return appReducer(state, action)
}
