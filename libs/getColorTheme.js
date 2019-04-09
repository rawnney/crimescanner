// @flow
import Store from '../libs/Store'
import {lightMode, darkMode} from '../libs/ColorTheme'

export default () => {
  let {isDarkMode} = Store.getState().appState
  if (isDarkMode) return darkMode
  return lightMode
}
