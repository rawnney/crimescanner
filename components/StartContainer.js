// @flow
import {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import TextView from './TextView'
import colors from '../libs/Colors'

type Props = {}
type State = {}

export default class StartContainer extends PureComponent<Props, State> {
  static routeName = 'StartContainer'
  render (): React$Element<View> {
    return <View style={styles.container}>
      <TextView text='StartContainer' />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
})
