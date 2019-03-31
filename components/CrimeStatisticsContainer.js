// @flow
import {PureComponent} from 'react'
import {View, StyleSheet} from 'react-native'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import colors from '../libs/colors'

type Props = {}

type State = {}

export default class CrimeStatisticsContainer extends PureComponent<Props, State> {
  static routeName = 'CrimeStatisticsContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state)
  })
  render (): React$Element<View> {
    return <View style={styles.container}>
      <View />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
})
