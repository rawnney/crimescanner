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
    let displayTime = moment(datetime, 'YYYY-MM-DDTHH:mm:ss').format('DD MMM YYYY HH:MM')
    datetime = formatTime(datetime)
    let icon = getCrimeIcon(type) || '👮️'
    location = {name, latitude, longitude}
    return {...item, datetime, displayTime, title, location, icon}
  })
}
