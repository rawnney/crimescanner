// @flow
import React, {Component} from 'react'
import {StyleSheet, View, ActivityIndicator} from 'react-native'
import TextView from './TextView'
import colors from '../libs/Colors'

type Props = {
  textStyle?: StyleSheet,
  loadingWrapper?: StyleSheet
}

export default class LoadingView extends Component<Props> {
  render (): React$Element<View> {
    let {textStyle, loadingWrapper} = this.props
    return <View style={[styles.wrapper, loadingWrapper]}>
      <ActivityIndicator style={styles.indicator} tintColor={colors.black} size='small' />
      <TextView style={[styles.text, {color: colors.black}, textStyle]} langKey='general_loading' />
    </View>
  }
}

export let styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicator: {
    padding: 30
  },
  text: {
    fontSize: 25
  }
})
