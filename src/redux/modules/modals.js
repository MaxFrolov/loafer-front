const CHANGE = 'MODALS/CHANGE'
const TOGGLE = 'MODALS/TOGGLE'
const SHOW_ONLY = 'MODALS/SHOW_ONLY'

export default function reducer (state = {}, action = {}) {
  switch (action.type) {
    case CHANGE:
      return {
        ...state,
        [action.modal]: action.show
      }
    case TOGGLE:
      return {
        ...state,
        [action.modal]: !state[action.modal]
      }
    case SHOW_ONLY:
      return {
        [action.modal]: !state[action.modal],
        data: action.data
      }
    default:
      return state
  }
}

export function showOnly (modalName, data) {
  return {
    type: SHOW_ONLY,
    modal: modalName,
    data
  }
}

export function show (modalName) {
  return {
    type: CHANGE,
    modal: modalName,
    show: true
  }
}

export function hide (modalName, delay = 0) {
  return (dispatch) => {
    setTimeout(() => dispatch({
      type: CHANGE,
      modal: modalName,
      show: false
    }), delay)
  }
}

export function toggle (modalName) {
  return {
    type: TOGGLE,
    modal: modalName
  }
}

export function change (modalName, visibility) {
  return {
    type: CHANGE,
    modal: modalName,
    show: visibility
  }
}
