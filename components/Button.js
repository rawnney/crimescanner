// @flow
import {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import ButtonWrapper from './ButtonWrapper'
import TextView from './TextView'
import commonStyles from '../libs/CommonStyles'
import colors from '../libs/Colors'
import Fonts from '../libs/Fonts';

type Props = {
  onPress?: Function,
  disable?: boolean,
  text?: string,
  langKey?: string,
  style?: StyleSheet,
  textColor?: string,
  backgroundColor?: string,
}

export default class Button extends Component <Props> {
  render (): React$Element<View> {
    let {onPress, disable, text, langKey, style, backgroundColor, textColor} = this.props
    return <ButtonWrapper onPress={onPress} style={[styles.buttonStyle, {backgroundColor: backgroundColor || colors.black}, style]} disable={disable} >
      <TextView text={text} langKey={langKey} style={[styles.text, {color: textColor || colors.white}]} />
    </ButtonWrapper>
  }
}

export let styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    height: commonStyles.buttonHeight,
    alignSelf: 'center',
    padding: commonStyles.space,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  text: {
    ...Fonts.bold,
    fontSize: 18
  }
})
