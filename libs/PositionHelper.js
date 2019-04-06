// @flow
import {NO_COORDS, STOCKHOLM_DISTRICT} from '../consts/Coordinates'
import {isEmulator} from './Common'
import {isNotProd} from './Config'

const COORD_LENGTH = 5

let logger = isNotProd() && isEmulator()

let formatPosition = (pos: Object): Object => {
  let {coords} = pos
  return {
    longitude: coords.longitude.toString().substring(0, COORD_LENGTH),
    latitude: coords.latitude.toString().substring(0, COORD_LENGTH)
  }
}

export let getPosition = (): Promise<Object> => {
  return new Promise((resolve, reject): Object => {
    navigator.geolocation.getCurrentPosition(pos => {
      let position
      if (pos) position = formatPosition(pos)
      if (isEmulator()) return resolve(fakePosition())
      if (position === undefined) reject(new Error(NO_COORDS))
      // eslint-disable-next-line
      if (logger) console.warn(position)
      return resolve(position)
    })
  })
}

let fakePosition = () => {
  let position = formatPosition(STOCKHOLM_DISTRICT)
  // eslint-disable-next-line
  if (logger) console.warn(position)
  return position
}
