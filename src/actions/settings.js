import { getDataFromStorage } from '../utils/storage'

import { UPDATE_SETTINGS } from '../constants/actions'

export const updateSettings = (payload) => {
  return {
    type: UPDATE_SETTINGS,
    payload
  }
}

export const loadSettings = (dispatch) => {
  getDataFromStorage('settings').then((data) => {
    dispatch(updateSettings(data))
  })
}