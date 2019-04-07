// @flow
import React, {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import IconTextButton from './IconTextButton'
import {COG} from '../consts/Icons'

type Props = {
  textStyle?: StyleSheet,
  loadingWrapper?: StyleSheet,
  onPress: () => Promise<*>
}

export default class PermissionView extends PureComponent<Props> {
  render (): React$Element<View> {
    let {textStyle, loadingWrapper, onPress} = this.props
    return <View style={[styles.wrapper, loadingWrapper]}>
      <IconTextButton name={COG} onPress={onPress} text={'Turn on location services to see closeby crimes'} textStyle={textStyle} style={styles.iconButton} />
    </View>
  }
}

export let styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconButton: {
    maxWidth: '75%',
    alignItems: 'center'
  }
})
