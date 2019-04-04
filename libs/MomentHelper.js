// @flow
import moment from 'moment'
import 'moment/locale/da'
import 'moment/locale/en-gb'
import 'moment/locale/fi'
import 'moment/locale/nl'
import 'moment/locale/fr'
import 'moment/locale/nb'
import 'moment/locale/sv'
import 'moment/locale/it'
import 'moment/locale/es'
import 'moment/locale/de'
import 'moment/locale/is'
import 'moment/locale/be'
import 'moment/locale/et'
import {getLocale} from './UserInfo'
import Config from './Config'

export let getUserLang = () => {
  let lang = getLocale()
  if (Config.enableLanguageSupport) return lang
  lang = 'sv'
  return lang
}

export default () => {
  moment.locale(getUserLang())
  return moment
}
