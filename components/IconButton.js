// @flow
import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import ButtonWrapper from './ButtonWrapper'
import Icon from './Icon'

type Props = {
  name: string,
  onPress: Function,
  iconStyle?: StyleSheet,
  style?: StyleSheet
}

export default class IconButton extends Component <Props> {
  render (): React$Element<View> {
    let {onPress, iconStyle, style, name} = this.props
    return <ButtonWrapper onPress={onPress} style={style}>
      <Icon name={name} iconStyle={iconStyle} />
    </ButtonWrapper>
  }
}
