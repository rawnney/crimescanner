// @flow
import {combineReducers} from 'redux'
import AppStateReducer from '../reducers/AppStateReducer'
import UserReducer from '../reducers/UserReducer'
let appState = AppStateReducer
let user = UserReducer

export let Reducer = combineReducers({
  user,
  appState
})
