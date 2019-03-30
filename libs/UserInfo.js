// @flow
import DeviceInfo from 'react-native-device-info'
// import {supportedLanguageCodes} from '../i18n/index'
// import Store from './Store'
// import {ENGLISH} from '../consts/Languages'
// import {IMPERIAL, METRIC, IS_DEV, FAHRENHEIT_SIGN, CELSIUS_SIGN} from './Consts'

// let defaultLang = ENGLISH
// let defaultLocale = ENGLISH
// let defaultDegreeSign = FAHRENHEIT_SIGN
// let defaultDegreeUnit = IMPERIAL

export let getLocale = () => DeviceInfo.getDeviceLocale()

// export let getUserLocale = (): string => {
//   let locale = getLocale()
//   if (IS_DEV) return defaultLocale
//   if (!locale || typeof locale !== 'string') return defaultLocale
//   return locale
// }

// export let getUserLanguage = (): string => {
//   let lang = getUserLocale()
//   let isSupported = !!supportedLanguageCodes.find(lang => lang)
//   if (!lang || typeof lang !== 'string' || !isSupported) return defaultLang
//   return lang
// }

// export let getUserDegreeSign = (): string => {
//   let degreeSign = Store.getState().user.unit
//   switch (degreeSign) {
//     case METRIC: return CELSIUS_SIGN
//     case IMPERIAL: return FAHRENHEIT_SIGN
//     default: return defaultDegreeSign
//   }
// }

// export let getUserDegreeUnit = (): string => {
//   let degreeUnit = Store.getState().user.unit
//   if (!degreeUnit) return defaultDegreeUnit
//   return degreeUnit
// }

// export let hasImperialUnit = (): boolean => {
//   let unit = getUserDegreeUnit()
//   if (unit === IMPERIAL) return true
//   return false
// }
