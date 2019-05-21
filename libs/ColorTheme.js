// @flow
import {STATUS_BAR_LIGHT, KEYBOARD_COLOR_LIGHT, STATUS_BAR_DARK, KEYBOARD_COLOR_DARK} from './Consts'
import colors from './Colors'
import Store from '../libs/Store'

let lightMode: ColorTheme = {
  primary: colors.white,
  secondary: colors.deepSparkle,
  primaryText: colors.black,
  secondaryText: colors.black,
  warning: colors.darkPink,
  disabled: colors.gray,
  headerBarTint: STATUS_BAR_LIGHT,
  keyboardAppearance: KEYBOARD_COLOR_LIGHT
}

let darkMode: ColorTheme = {
  primary: colors.black,
  secondary: colors.deepSparkle,
  primaryText: colors.white,
  secondaryText: colors.white,
  warning: colors.darkPink,
  disabled: colors.gray,
  headerBarTint: STATUS_BAR_DARK,
  keyboardAppearance: KEYBOARD_COLOR_DARK
}

let status = () => {
  let {isDarkMode} = Store.getState().appState
  if (isDarkMode) return darkMode
  return lightMode
}

export let primary = () => status().primary
export let secondary = () => status().secondary
export let primaryText = () => status().primaryText
export let secondaryText = () => status().secondaryText
export let warning = () => status().warning
export let disabled = () => status().disabled
export let headerBarTint = () => status().headerBarTint
export let keyboardAppearance = () => status().keyboardAppearance
