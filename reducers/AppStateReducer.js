// @flow
import DefaultState from '../config/DefaultState'
module.exports = (state: Object = DefaultState.appState, action: Object) => {
  switch (action.type) {
    case 'APP_STATE':
      return {...state, ...action.item}
    case 'RESET_APP_STATE':
      return action.appState
    default: return {...state}
  }
}
