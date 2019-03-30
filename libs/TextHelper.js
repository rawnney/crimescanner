// @flow
import * as I18n from '../i18n/'
import {transformText} from './Common'
// import {getUserLanguage} from './UserInfo'

let textStrings = {}
setLanguage('sv') // getUserLanguage()

export function setLanguage (lang: string) {
  if (!lang) return
  textStrings = I18n.getTextStrings(lang)
}

export function getText (langKey: *, values?: Array<*>, textTransform?: string = 'capitalize'): string {
  if (typeof textStrings === 'undefined') return ''
  if (!textStrings || !langKey) return ''
  var text = textStrings[langKey]
  if (!text) return ''

  if (values) values.map((item, index) => {
    text = text.split(`%${index + 1}$d`).join(item)
  })

  if (textTransform) transformText(text)
  return text
}
