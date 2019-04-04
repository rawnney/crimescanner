// @flow
import {apiTimeFormat} from './moment'

export let mapCrime = (obj: Object): Object => {
  return obj.map((item, index) => {
    let {location, datetime} = item
    let title = item.name
    let {name, gps} = location
    let latitude = gps.split(',')[0]
    let longitude = gps.split(',')[1]
    datetime = apiTimeFormat(datetime)
    location = {
      name,
      latitude,
      longitude
    }  
    return {...item, datetime, title, location}
  })
}
