// @flow
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
import {isNotProd} from './Config'

let warn = (...args: *) => {
  if (isNotProd()) console.warn(...args)
}

export default {warn}
