// @flow
import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import colors from '../libs/Colors'

type Props = {
  style?: StyleSheet,
  vertical?: boolean
}

export default class LineBreak extends Component<Props> {
  render (): React$Element<View> {
    let {style, vertical} = this.props
    return <View style={[styles.line, vertical ? styles.vertical : styles.horizontal, style]} />
  }
}

export let styles = StyleSheet.create({
  line: {
    borderColor: colors.gray
  },
  horizontal: {
    width: '100%',
    borderBottomWidth: 1
  },
  vertical: {
    height: '100%',
    borderLeftWidth: 1
  }
})
