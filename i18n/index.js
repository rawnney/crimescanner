// @flow
import sv from './text_strings/client/sv.json'
import en from './text_strings/client/en.json'
import _default from './text_strings/client/default.json'

export let supportedLanguageCodes = ['sv', 'en']

export let getTextStrings = (lang: string): Object => {
  switch (lang) {
    case 'sv': return {..._default, ...sv}
    default: return {..._default, ...en}
  }
}
