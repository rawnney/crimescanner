// @flow
import * as Redux from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import DefaultState from '../config/DefaultState'
import {Reducer} from '../reducers/Reducers'

const middleware = Redux.applyMiddleware(thunk, promise)

let STORE = Redux.createStore(Reducer, DefaultState)

export let createStore = (state: Object = DefaultState) => {
  STORE = Redux.createStore(Reducer, state, Redux.compose(middleware))
  return STORE
}

export default {
  dispatch: (action: Object) => STORE.dispatch(action),
  getState: () => STORE.getState()
}
