// @flow
import React, {PureComponent} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import colors from '../libs/Colors'

type Props = {}
type State = {}

export default class App extends PureComponent<Props, State> {
  render (): React$Element<View> {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
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
    margin: 10,
    color: colors.black
  }
})
