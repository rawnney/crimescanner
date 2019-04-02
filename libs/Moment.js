// @flow
import moment from 'moment'

export let apiTimeFormat = (date: string): string => moment(date).format('YYYY-MM-DD')

export default moment
