// @flow
import {NO_COORDS, STOCKHOLM_DISTRICT} from '../consts/Coordinates'
import {isNotProd} from './Config'

const distance = -5

export let getPosition = (): Promise<Object> => {
  return new Promise((resolve, reject): Object => {
    navigator.geolocation.getCurrentPosition(pos => {
      let position = pos.coords
      if (isNotProd()) {
        position = STOCKHOLM_DISTRICT.coords
        position = {
          name: STOCKHOLM_DISTRICT.name,
          longitude: position.longitude.slice(0, distance),
          latitude: position.latitude.slice(0, distance)
        }
        // eslint-disable-next-line
        // console.warn(position)
        resolve(position)
      }
      if (position === undefined) reject(new Error(NO_COORDS))
      resolve(position)
    })
  })
}
