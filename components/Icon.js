// @flow
import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import FontAwesome from 'react-native-fontawesome'
import commonStyles from '../libs/CommonStyles'
// import ScalableText from './ScalableText'
import {ARROW_LEFT} from '../consts/Icons'

type Props = {
  name: string,
  style?: StyleSheet,
  size?: number
}

type State = {}

export default class Icon extends Component<Props, State> {
  render (): React$Element<View> {
    let {style, name, size} = this.props
    return <View style={[styles.icon, style, size ? {fontSize: size} : 20]}>
      <FontAwesome>
        {name || ARROW_LEFT}
      </FontAwesome>
    </View>
    // <ScalableText style={[styles.icon, size ? {fontSize: size} : {}, style]}>
    //   <FontAwesome>
    //     {name}
    //   </FontAwesome>
    // </ScalableText>
  }
}

export let styles = StyleSheet.create({
  icon: {
    padding: commonStyles.smallSpace
  }
})
