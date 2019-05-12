// @flow
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
import {isNotProd} from './Config'
import Store from './Store'

let warn = (...args: *) => {
  let {enableLogger} = Store.getState().appState
  if (isNotProd() && enableLogger) console.warn(...args)
}

export default {warn}
