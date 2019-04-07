// @flow
import {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import FontAwesome from 'react-native-fontawesome'
import commonStyles from '../libs/CommonStyles'
import colors from '../libs/Colors'

type Props = {
  name: string,
  style?: StyleSheet,
  size?: number,
  color?: string
}

export default class Icon extends Component<Props> {
  render (): React$Element<View> {
    let {style, name, size, color} = this.props
    return <FontAwesome style={[styles.icon, {fontSize: size || 20}, {color: color || colors.black}, style]}>
      {name}
    </FontAwesome>
  }
}

export let styles = StyleSheet.create({
  icon: {
    padding: commonStyles.smallSpace
  }
})
