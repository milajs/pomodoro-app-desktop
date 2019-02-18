import { UPDATE_SETTINGS } from '../constants/actions'

const initialState = {
  autoStartAfterBreak: false
}

export default function todos(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return { ...state, ...action.payload }
    default:
      return state
  }
}