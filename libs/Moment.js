// @flow
import moment from 'moment'

export let apiTimeFormat = (date: string): string => moment(date).format('YYYY-MM-DD')

export let formatCrimeDate = (date: string) => {
  moment.suppressDeprecationWarnings = true
  return moment(date).format('DD MMM YYYY HH:MM')
}

export default moment
