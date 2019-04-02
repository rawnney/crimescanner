// @flow
import {fetchCrimes} from '../libs/ApiHandler'
import {mapCrime} from '../libs/Mapper'
import ct from './CrimeType'
import {SV_DISTRICTS} from '../consts/Coordinates'
import * as Moment from './Moment'

export let getCrimesNearLocation = (position: Object): Promise<Array<Object>> => {
  return fetchCrimes()
    .then(res => {
      return mapCrime(res).filter(key => {
        let {location} = key
        let {latitude, longitude} = location
        return latitude.includes(position.latitude) && longitude.includes(position.longitude)
      })
    })
}

export let getCrimesWithParams = (params: Object): Promise<Object> => {
  return fetchCrimes(params).then((res) => mapCrime(res))
}

export function getCrimeIcon (type: *): string {
  if (type.includes(ct.trafikolycka)) type = ct.trafikolycka
  if (type.includes(ct.larm)) type = ct.larm
  if (type.includes(ct.skottlossning)) type = ct.skottlossning
  if (type.includes(ct.inbrott)) type = ct.bostadsinbrott
  if (type.includes(ct.rån)) type = ct.rån
  if (type.includes(ct.farligt_föremål)) type = ct.farligt_föremål
  if (type.includes(ct.mord_alt || ct.dråp_alt)) type = ct.mord
  if (type.includes(ct.misshandel && ct.grov)) type = ct.grov_misshandel
  if (type.includes(ct.trafikolycka && ct.vilt)) type = ct.vilt_olycka
  switch (type) {
    case ct.alkohollag: return '🍺'
    case ct.anhållen: return '👮'
    case ct.arbetsplatsolycka: return '👷'
    case ct.bedrägeri: return '💸'
    case ct.bostadsinbrott: return '🏠'
    case ct.brand: return '🔥'
    case ct.brott: return '👮️‍'
    case ct.brott_i_nära_relation: return '👫'
    case ct.brottsplatsundersökning: return '🕵'
    case ct.dråp: return '☠️'
    case ct.efterlyst: return '🏃‍'
    case ct.eldningsförbud: return '🚫'
    case ct.envarsgripande: return '👨‍👩‍👦‍👦'
    case ct.fickstölder_och_bagagestölder: return '💰'
    case ct.fylleri_LOB: return '🍸'
    case ct.kontroll_person_fordon: return '🚗'
    case ct.trafikolycka: return '💥'
    case ct.våld_hot_mot_tjänsteman: return '💂'
    case ct.stöld: return '💰'
    case ct.stöld_inbrott: return '💰'
    case ct.rån: return '💰'
    case ct.trafikhinder: return '🚧'
    case ct.ordningslagen: return '☯️'
    case ct.polisinsats_kommendering: return '🚓'
    case ct.bråk: return '💢'
    case ct.larm: return '🔔'
    case ct.vapenlagen: return '🔫'
    case ct.skottlossning: return '🔫'
    case ct.misshandel: return '👊'
    case ct.knivlagen: return '🔪'
    case ct.narkotikabrott: return '💊'
    case ct.farligt_föremål: return '💣'
    case ct.olaga_hot: return '🤬'
    case ct.räddningsinsats: return '🙏'
    case ct.skadegörelse: return '👎'
    case ct.rattfylleri: return '🍷'
    case ct.missbruk_av_urkund: return '📝'
    case ct.detonation: return '💥'
    case ct.fjällräddning: return '⛰️'
    case ct.trafikbrott: return '⛔'
    case ct.trafikkontroll: return '✋'
    case ct.sedlighetsbrott: return '🍆'
    case ct.mord: return '☠️'
    case ct.våldtäkt: return '🙅'
    case ct.grov_misshandel: return '🔨'
    case ct.sjukdom_olycksfall: return '⛑️'
    case ct.vilt_olycka: return '🙈'
    default: return '👮️‍'
  }
}

export function findDistrict (input: string): string {
  let location = ''
  if (SV_DISTRICTS.find(obj => obj.name === input)) location = input
  return location
}

export function districtIsFound (input: string): boolean {
  let bool = false
  if (SV_DISTRICTS.find(obj => obj.name === input))
    bool = true

  return bool
}

export function findCrimeType (input: string): string {
  let type = ''
  Object.keys(ct).forEach(key => {
    if (ct[key] === input) type = input
  })
  return type
}

export function crimeTypeIsFound (input: string): boolean {
  let bool = false
  Object.keys(ct).forEach(key => {
    if (ct[key] === input) bool = true
  })
  return bool
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
