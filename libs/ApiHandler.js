// @flow
import {apiTimeFormat} from './Moment'
import {isNotProd} from './Config'

const baseUrl = 'https://polisen.se/api/events?'
const __LOCATION__ = 'locationname='
const __TYPE__ = 'type='
const __DATETIME__ = 'DateTime='

export let fetchCrimes = (req: CrimeRequest): Promise<Object> => {
  return new Promise((resolve, reject) => {
    fetch(baseUrl + setParam(req))
      .then(res => res.json())
      .then(json => {
        // eslint-disable-next-line
        if (isNotProd()) console.warn('Body', json)
        resolve(json)
      })
      .catch((err) => {
        // eslint-disable-next-line
        if (isNotProd()) console.warn(err)
        reject(err)
      })
  })
}

let setParam = (req: CrimeRequest): string => {
  let {getAll, location, type, date} = req
  if (getAll) return ''
  if (location) return __LOCATION__ + location
  if (type) return __TYPE__ + type
  if (date) return __DATETIME__ + apiTimeFormat(date)
  return ''
}
