// @flow
import {isIOS} from './Common'

let defaultFont = isIOS() ? 'Thonburi-Light' : 'Roboto'

export default {
  regular: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: defaultFont
  },
  semiBold: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: defaultFont
  },
  bold: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: defaultFont
  },
  light: {
    fontSize: 14,
    fontWeight: '100',
    fontFamily: defaultFont
  }
}
