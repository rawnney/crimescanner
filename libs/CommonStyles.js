// @flow
import {isIOS} from '../libs/Common'

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
  navBarHeightAndStatusBarHeight
}
