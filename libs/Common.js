// @flow
import DeviceInfo from 'react-native-device-info'
import {Platform, Vibration} from 'react-native'
import Config from './Config'
import moment, {formatTime} from './moment'

export function isIOS (): boolean {
  return Platform.OS === 'ios'
}
export function isAndroid (): boolean {
  return Platform.OS === 'android'
}
export function isWeb (): boolean {
  return Platform.OS === 'web'
}

export let isEmulator = (): boolean => {
  if (DeviceInfo.isEmulator()) return true
  return false
}

export let hasNotch = (): boolean => {
  if (DeviceInfo.hasNotch()) return true
  return false
}

export function truncateString (string: string, length: number): string {
  if (string.length > length) return `${string.substring(0, length)}...`
  return string
}

export function truncateWords (string: string, noWords: number): string {
  return string.split(' ').splice(0, noWords).join(' ')
}

export function capitalize (string: string): string {
  if (typeof string !== 'string') return string
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function fraction (value: number, fractions?: number = 2): * {
  return parseFloat(value).toFixed(fractions)
}

export function kelvinToCelcius (value: *): * {
  if (!value) return null
  if (value !== Number(value)) value = Number(value)
  value = parseFloat(value)
  let celcius = value - 273.15
  return celcius.toFixed(1)
}

export function mphToKmh (mph: number): * {
  let kmh = mph * 1.609344
  return fraction(kmh)
}

export function mphToMs (mph: number): * {
  return fraction(mph * 0.44704)
}

export function transformText (text: string, textTransform?: string = 'capitalize'): string {
  switch (textTransform) {
    case 'uppercase': return text = text.toUpperCase()
    case 'capitalize': return text = text.charAt(0).toUpperCase() + text.slice(1)
    case 'lowercase': return text = text.toLowerCase()
    default: return text
  }
}

export let delay = (time: number, res: *): Promise<Object> => {
  return new Promise(resolve => setTimeout(() => resolve(res), time))
}

export let doNothing = () => {}

export let isString = (myVar: string): boolean => {
  if (typeof myVar === 'string' || myVar instanceof String) return true
  return false
}

export let getRandomArrayNumber = (length: number) => {
  let randomize = Math.floor(Math.random() * length)
  return randomize
}

export function randomKey (): string {
  let key = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  return key() + '-' + key() + '-' + key() + '-' + key()
}

export let vibrationFeedback = (pattern?: Array<number>): Promise<Function> => {
  return new Promise((resolve, reject) => {
    if (Config.enableVibration) resolve(Vibration.vibrate(pattern))
    reject(new Error('enableVibration is false'))
  })
}

export let keyExtractor = (item: Object, index: number) => index.toString()

export let findOccurrence = (arr: Array<*>): string => {
  return arr.sort((a, b) => arr.filter(v => v === a).length - arr.filter(v => v === b).length).pop()
}

export let getPrevWeeksDates = (date: *): Array<string> => {
  var startOfWeek = moment(date).startOf('isoWeek')
  var endOfWeek = moment(date).endOf('isoWeek')
  var days = []
  var day = startOfWeek
  while (day <= endOfWeek) {
    days.push(formatTime(day.toDate()))
    day = day.clone().add(1, 'd')
  }
  return days
}

export let getOneDayEarlier = (crimes: Array<Crime>): string => {
  let latestDate = crimes.length !== 0 ? crimes[crimes.length - 1].datetime : ''
  if (!latestDate) return ''
  let minusOneDay = moment(latestDate).subtract(1, 'day')
  return formatTime(minusOneDay)
}
