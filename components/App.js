// @flow
import React, {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import TextView from './TextView'
import colors from '../libs/Colors'

type Props = {}
type State = {}

export default class App extends PureComponent<Props, State> {
  render (): React$Element<View> {
    return (
      <View style={styles.container}>
        <TextView langKey='test' style={styles.welcome} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.black
  }
})
