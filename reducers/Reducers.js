// @flow
import {combineReducers} from 'redux'
import AppStateReducer from '../reducers/AppStateReducer'
import UserReducer from '../reducers/UserReducer'
import ConfigReducer from '../reducers/ConfigReducer'
let appState = AppStateReducer
let user = UserReducer
let config = ConfigReducer

export let Reducer = combineReducers({
  user,
  appState,
  config
})
