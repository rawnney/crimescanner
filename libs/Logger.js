// @flow
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
import {isNotProd} from './Config'

let warn = (message: *): * => {
  if (isNotProd()) console.warn(message)
}

export default {warn}
