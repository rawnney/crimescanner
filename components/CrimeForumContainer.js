// @flow
import {PureComponent} from 'react'
import {View, StyleSheet} from 'react-native'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import colors from '../libs/Colors'

type Props = {}

type State = {}

export default class CrimeForumContainer extends PureComponent<Props, State> {
  static routeName = 'CrimeForumContainer'
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
