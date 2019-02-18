import { UPDATE_SETTINGS } from '../constants/actions'

export const updateSettings = (payload) => {
  return {
    type: UPDATE_SETTINGS,
    payload
  }
}