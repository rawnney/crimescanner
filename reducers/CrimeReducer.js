// @flow
let defaultState = {
}

export default (state: Object = defaultState, action: Object = {}) => {
  switch (action.type) {
    case 'UPDATE_CRIMES': return {...state, ...action.crimes}
    default: return state
  }
}
