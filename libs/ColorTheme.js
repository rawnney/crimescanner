// @flow
import {STATUS_BAR_LIGHT, KEYBOARD_COLOR_LIGHT, STATUS_BAR_DARK, KEYBOARD_COLOR_DARK} from './Consts'
import colors from './Colors'

export let lightMode: ColorTheme = {
  isDarkMode: false,
  backgroundColor: colors.white,
  color: colors.black,
  disabled: colors.gray,
  headerBarTint: STATUS_BAR_LIGHT,
  keyboardAppearance: KEYBOARD_COLOR_LIGHT
}

export let darkMode: ColorTheme = {
  isDarkMode: true,
  backgroundColor: colors.black,
  color: colors.black,
  disabled: colors.gray,
  headerBarTint: STATUS_BAR_DARK,
  keyboardAppearance: KEYBOARD_COLOR_DARK
}
