// @flow
import {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import {withNavigation} from 'react-navigation'
import IconButton from './IconButton'
import {ARROW_LEFT} from '../consts/Icons'

type Props = {
  name: string,
  onPress?: Function,
  iconStyle?: StyleSheet,
  style?: StyleSheet,
  navigation: Object
}

class BackButton extends Component<Props> {
  render (): React$Element<View> {
    let {iconStyle, style, name} = this.props
    return <IconButton onPress={this.navigateBack} name={name || ARROW_LEFT} iconStyle={iconStyle} style={style} />
  }

  navigateBack = () => {
    let {navigation} = this.props
    if (navigation) navigation.goBack()
  }
}

export default withNavigation(BackButton)
