// @flow
import {combineReducers} from 'redux'
import AppStateReducer from '../reducers/AppStateReducer'
import UserReducer from '../reducers/UserReducer'
import ConfigReducer from '../reducers/ConfigReducer'
import CrimeReducer from '../reducers/CrimeReducer'
let appState = AppStateReducer
let user = UserReducer
let config = ConfigReducer
let crimes = CrimeReducer

export let Reducer = combineReducers({
  user,
  appState,
  config,
  crimes
})
