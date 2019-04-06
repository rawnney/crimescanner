// @flow
import {fetchCrimes} from '../libs/ApiHandler'
import {mapCrime} from '../libs/Mapper'
import {SV_DISTRICTS} from '../consts/Coordinates'
import * as Moment from './moment'
import {CRIME_TYPE} from '../consts/CrimeType'

export let getCrimesNearLocation = (position: Object): Promise<Array<Object>> => {
  return fetchCrimes()
    .then(res => {
      return mapCrime(res).filter(crime => {
        let {location} = crime
        let {latitude, longitude} = location
        return latitude.includes(position.latitude) && longitude.includes(position.longitude)
      })
    })
}

export let getCrimesWithParams = (params: Object): Promise<Object> => {
  return fetchCrimes(params).then(res => mapCrime(res))
}

export let getCrimeIcon = (type: string): string => {
  let crime = CRIME_TYPE.find(obj => obj.key === type)
  if (!!crime && !!crime.icon) return crime.icon
  return ''
}

export let getCrimeParams = (type: string): string => {
  let crime = CRIME_TYPE.find(obj => obj.key === type)
  if (!!crime && !!crime.param) return crime.param
  return type
}

export let findCrimeType = (type: string): * => CRIME_TYPE.find(obj => obj.key === type ? obj.key : null)

export function findDistrict (input: string): string {
  let location = ''
  if (SV_DISTRICTS.find(obj => obj.name === input)) location = input
  return location
}

export let mapTodaysCrimes = (crimes: Array<Crime>) => {
  let crimesToday = []
  crimes.map(crime => {
    if (Moment.isToday(crime.datetime)) crimesToday.push(crime)
  })
  return crimesToday
}

export let mapYesterdaysCrimes = (crimes: Array<Crime>) => {
  let crimesYesterday = []
  crimes.map(crime => {
    if (Moment.isYesterday(crime.datetime)) crimesYesterday.push(crime)
  })
  return crimesYesterday
}

export let mapOtherDaysCrimes = (crimes: Array<Crime>) => {
  let crimesOtherDays = []
  crimes.map(crime => {
    if (Moment.isOtherDays(crime.datetime)) crimesOtherDays.push(crime)
  })
  return crimesOtherDays
}
