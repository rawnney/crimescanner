// @flow
import {Component} from 'react'
import {TouchableOpacity, StyleSheet, View} from 'react-native'
import {doNothing} from '../libs/Common'

type Props = {
  children: *,
  onPress?: Function,
  style?: StyleSheet,
  disable?: boolean,
  onLongPress?: Function
}

export default class ButtonWrapper extends Component <Props> {
  render (): React$Element<View> {
    let {onPress, style, disable, children, onLongPress} = this.props
    return <TouchableOpacity
      style={style}
      onPress={disable ? doNothing() : onPress}
      disable={disable}
      onLongPress={onLongPress}>
      {children}
    </TouchableOpacity>
  }
}
