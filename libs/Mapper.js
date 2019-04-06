// @flow
import moment, {formatTime} from './moment'
import {getCrimeIcon} from './CrimeHelper'

export let mapCrime = (arr: Array<Object>): Array<Crime> => {
  return arr.map((item, index) => {
    let {location, datetime, type} = item
    let title = item.name
    let {name, gps} = location
    let latitude = gps.split(',')[0]
    let longitude = gps.split(',')[1]
    datetime = formatTime(datetime)
    let displayTime = moment(datetime).format('DD MMM YYYY HH:MM')
    let icon = getCrimeIcon(type) || '👮️'
    location = {name, latitude, longitude}
    return {...item, datetime, displayTime, title, location, icon}
  })
}
