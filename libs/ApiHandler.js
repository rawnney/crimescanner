// @flow
import Logger from './Logger'

const baseUri = 'https://polisen.se/api/events?'
const __LOCATION__ = 'locationname='
const __TYPE__ = 'type='
const __DATETIME__ = 'DateTime='

export let fetchCrimes = (params?: Object): Promise<Object> => {
  return new Promise((resolve, reject) => {
    let uri = baseUri + setParams(params)
    Logger.warn(uri)
    fetch(uri)
      .then((response, error) => {
        if (error) return reject(error)
        Logger.warn('Response', response)
        return response.json()
      })
      .then(json => {
        // Logger.warn('JSON', json)
        return resolve(json)
      })
      .catch((err) => {
        Logger.warn(err)
        return reject(err)
      })
  })
}

let setParams = (params?: CrimeRequest): string => {
  if (!params) return ''
  let {location, type, date} = params
  if (location) return (__LOCATION__ + location).replace(/ /g, '%20')
  if (type) return (__TYPE__ + type).replace(/ /g, '%20')
  if (date) return __DATETIME__ + date
  return ''
}
