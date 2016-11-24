import update from 'react/lib/update'
import _ from 'lodash'
import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const SET_EVENTS_LOADING = 'events/SET_EVENTS_LOADING'
const SET_EVENTS_DATA = 'events/SET_EVENTS_DATA'
const SET_EVENT_LOADING = 'events/SET_EVENT_LOADING'
const SET_EVENT_DATA = 'events/SET_EVENT_DATA'
const DELETE_EVENT_DATA = 'events/DELETE_EVENT_DATA'
const UPDATE_EVENT_DATA = 'events/UPDATE_EVENT_DATA'

const initialState = {
  resources: {
    data: [],
    loading: false
  },
  resource: {
    data: {},
    loading: false
  }
}

// ------------------------------------
// Actions
// ------------------------------------
export const setEventsData = createAction(SET_EVENTS_DATA)
export const setEventsLoading = createAction(SET_EVENTS_LOADING)
export const setEventData = createAction(SET_EVENT_DATA)
export const setEventLoading = createAction(SET_EVENT_LOADING)
export const deleteEventData = createAction(DELETE_EVENT_DATA)
export const updateEventData = createAction(UPDATE_EVENT_DATA)

// ------------------------------------
// Action creators
// ------------------------------------
export function getEvents () {
  return (dispatch, getState, client) => {
    dispatch(setEventsLoading(true))
    return client.get('events')
      .then((response) => {
        dispatch(setEventsData(response.resources))
        dispatch(setEventsLoading(false))
      })
      .catch((error) => {
        dispatch(setEventsLoading(false))
        throw error
      })
  }
}

export function getEvent (id) {
  return (dispatch, getState, client) => {
    dispatch(setEventLoading(true))
    return client.get(`events/${id}`)
      .then((response) => {
        dispatch(setEventData(response.resource))
        dispatch(setEventLoading(false))
      })
      .catch((error) => {
        dispatch(setEventLoading(false))
        throw error
      })
  }
}

export function createEvent (data, userID) {
  return (dispatch, getState, client) => {
    dispatch(setEventLoading(true))
    return client.post(`users/${userID}/events`, { data: { resource: data } })
      .then((response) => {
        dispatch(setEventData(response.resource))
        dispatch(setEventLoading(false))
      })
      .catch((error) => {
        dispatch(setEventLoading(false))
        throw error
      })
  }
}

export function updateEvent (id, data) {
  return (dispatch, getState, client) => {
    dispatch(setEventLoading(true))
    return client.put(`events/${id}`, { data: { resource: data } })
      .then((response) => {
        dispatch(updateEventData(response.resource))
        dispatch(setEventLoading(false))
      })
      .catch((error) => {
        dispatch(setEventLoading(false))
        throw error
      })
  }
}

export function removeEvent (id) {
  return (dispatch, getState, client) => {
    dispatch(setEventLoading(true))
    return client.del(`events/${id}`)
      .then((response) => {
        dispatch(deleteEventData(response.resource))
        dispatch(setEventLoading(false))
      })
      .catch((error) => {
        dispatch(setEventLoading(false))
        throw error
      })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_EVENTS_DATA]: (state, action) => ({
    ...state,
    resources: { data: action.payload, loading: state.resources.loading }
  }),
  [SET_EVENT_DATA]: (state, action) => ({
    ...state,
    resource: { data: action.payload, loading: state.resource.loading }
  }),
  [UPDATE_EVENT_DATA]: (state, action) => {
    const updatedEvent = _.find(state.resources.data, { id: action.payload.id })
    return update(state, {
      resources: {
        data: { [state.resources.data.indexOf(updatedEvent)]: { $set: action.payload } }
      },
      resource: {
        data: { $set: action.payload }
      }
    })
  },
  [DELETE_EVENT_DATA]: (state, action) => {
    const deletedEvent = _.find(state.resources.data, { id: action.payload.id })
    return update(state, {
      resources: {
        data: { $splice: [[state.resources.data.indexOf(deletedEvent), 1]] }
      }
    })
  },
  [SET_EVENTS_LOADING]: (state, action) => ({
    ...state,
    resources: { data: state.resources.data, loading: action.payload }
  }),
  [SET_EVENT_LOADING]: (state, action) => ({
    ...state,
    resource: { data: state.resource.data, loading: action.payload }
  })
}, initialState)
