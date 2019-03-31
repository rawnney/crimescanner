// @flow
import {isIOS} from '../libs/Common'
import colors from '../libs/colors'

let space = 15
let smallSpace = space / 2
let buttonHeight = 55
let navbarHeight = isIOS() ? 45 : 56
var iosStatusBarHeight = isIOS ? 20 : 0
var navBarHeightAndStatusBarHeight = navbarHeight + iosStatusBarHeight
export default {
  space,
  smallSpace,
  buttonHeight,
  navbarHeight,
  navBarHeightAndStatusBarHeight,
  invisibleHeader: {
    width: '100%',
    backgroundColor: colors.transparent,
    top: 0,
    marginTop: 20,
    position: 'absolute',
    elevation: 0,
    borderColor: colors.transparent,
    borderWidth: 0,
    zIndex: 5000,
    height: undefined,
    shadowColor: colors.transparent,
    shadowOffset: {top: 0},
    shadowOpacity: 0,
    shadowRadius: 0
  }
}
