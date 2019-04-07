// @flow
import {isIOS} from './Common'
import colors from './Colors'

let defaultFont = isIOS() ? 'Thonburi-Light' : 'Roboto'
let defaultColor = colors.black

export default {
  regular: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: defaultFont,
    color: defaultColor
  },
  semiBold: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: defaultFont,
    color: defaultColor
  },
  bold: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: defaultFont,
    color: defaultColor
  },
  light: {
    fontSize: 14,
    fontWeight: '100',
    fontFamily: defaultFont,
    color: defaultColor
  }
}
