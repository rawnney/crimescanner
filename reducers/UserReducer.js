// @flow
let defaultState = {
}

export default (state: Object = defaultState, action: Object = {}) => {
  switch (action.type) {
    case 'UPDATE_USER': return {...state, ...action.user}
    default: return state
  }
}
