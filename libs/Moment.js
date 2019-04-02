// @flow
import moment from 'moment'

moment.suppressDeprecationWarnings = true

export let apiTimeFormat = (date: string): string => moment(date).format('YYYY-MM-DD')

export let formatCrimeDate = (date: string) => {
  return moment(date).format('DD MMM YYYY HH:MM')
}

export let isToday = (date: string) => moment().diff(date, 'days') === 0

export let isYesterday = (date: string) => moment().diff(date, 'days') === 1

export let isOtherDays = (date: string) => moment().diff(date, 'days') > 1

export default moment
