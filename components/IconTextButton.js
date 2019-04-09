// @flow
import {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import ButtonWrapper from './ButtonWrapper'
import Icon from './Icon'
import TextView from './TextView'
import Fonts from '../libs/Fonts'
import commonStyles from '../libs/CommonStyles'

type Props = {
  name: string,
  onPress: Function,
  iconStyle?: StyleSheet,
  style?: StyleSheet,
  textStyle?: StyleSheet,
  text?: string,
  langKey?: string,
  color?: string,
  horisontal?: boolean
}

export default class IconTextButton extends Component<Props> {
  render (): React$Element<View> {
    let {onPress, iconStyle, style, name, text, langKey, color, textStyle, horisontal} = this.props
    return <ButtonWrapper onPress={onPress} style={[styles.container, horisontal ? styles.horisontal : undefined, style]}>
      <TextView text={text} langKey={langKey} style={[styles.text, {color: color}, textStyle]} />
      <Icon name={name} iconStyle={iconStyle} color={color} />
    </ButtonWrapper>
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: commonStyles.space
  },
  horisontal: {
    flexDirection: 'row'
  },
  text: {
    ...Fonts.regular,
    textAlign: 'center'
  }
})
