// @flow
import MomentHelper from './MomentHelper'

export let formatTime = (date: string): string => MomentHelper()(date, 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DD')

export let isToday = (date: string) => MomentHelper().diff(date, 'days') === 0
export let isYesterday = (date: string) => MomentHelper().diff(date, 'days') === 1
export let isOtherDays = (date: string) => MomentHelper().diff(date, 'days') > 1

export default MomentHelper()
