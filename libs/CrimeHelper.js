// @flow
import {fetchCrimes} from '../libs/ApiHandler'
import {mapCrime} from '../libs/Mapper'

export let getCrimesNearLocation = (position: Object): Promise<Array<Object>> => {
  return fetchCrimes({getAll: true})
    .then((res) => {
      return mapCrime(res).filter(key => {
        let {location} = key
        let {latitude, longitude} = location
        return latitude.includes(position.latitude) && longitude.includes(position.longitude)
      })
    })
}
