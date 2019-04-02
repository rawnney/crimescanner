// @flow
import {apiTimeFormat} from './Moment'
import {isNotProd} from './Config'

const baseUri = 'https://polisen.se/api/events?'
const __LOCATION__ = 'locationname='
const __TYPE__ = 'type='
const __DATETIME__ = 'DateTime='

let logger = true

export let fetchCrimes = (params?: Object): Promise<Object> => {
  return new Promise((resolve, reject) => {
    let uri = baseUri + setParams(params)
    // eslint-disable-next-line
    if (logger) console.warn(uri)
    fetch(uri)
      .then((response, error) => {
        if (error) return reject(error)
        // eslint-disable-next-line
        if (isNotProd() && logger) console.warn('Response', response)
        return response.json()
      })
      .then(json => {
        // eslint-disable-next-line
        if (isNotProd() && logger) console.warn('JSON', json)
        return resolve(json)
      })
      .catch((err) => {
        // eslint-disable-next-line
        if (isNotProd() && logger) console.warn(err)
        return reject(err)
      })
  })
}

let setParams = (params?: CrimeRequest): string => {
  if (!params) return ''
  let {location, type, date} = params
  if (location) return __LOCATION__ + location
  if (type) return __TYPE__ + type
  if (date) return __DATETIME__ + apiTimeFormat(date)
  return ''
}
