// @flow
import {POLISEN_URI, LOCATION_URI_PART, TYPE_URI_PART, DATETIME_URI_PART} from './Consts'
import Logger from './Logger'

export let fetchCrimes = (params?: Object): Promise<Object> => {
  return new Promise((resolve, reject) => {
    let uri = POLISEN_URI + setParams(params)
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
  if (location) return (LOCATION_URI_PART + location).replace(/' '/g, '%20')
  if (type) return (TYPE_URI_PART + type).replace(/' '/g, '%20')
  if (date) return DATETIME_URI_PART + date
  return ''
}
