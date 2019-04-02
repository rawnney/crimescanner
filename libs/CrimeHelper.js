// @flow
import {fetchCrimes} from '../libs/ApiHandler'
import {mapCrime} from '../libs/Mapper'

export let getCrimesNearLocation = (position: Object): Promise<Array<Object>> => {
  return fetchCrimes({getAll: true})
    .then((res) => {
      return mapCrime(res).filter(key => {
        let {latitude, longitude} = key
        if (latitude.includes(position.latitude)) return false
        return true
        // console.warn(position)
        // return true
        // let {latitude, longitude} = key
        // return latitude.includes(position.latitude) && longitude.includes(position.longitude)
      })
    })
}
