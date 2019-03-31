// @flow
import {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import TextView from './TextView'
import colors from '../libs/Colors'
import Button from './Button'
import TestContainer from './TestContainer'
import {goTo} from '../libs/AppNavigation'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'

type Props = {}
type State = {}

export default class HomeContainer extends PureComponent<Props, State> {
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state),
    headerLeft: <View />
  })
  static routeName = 'HomeContainer'
  render (): React$Element<View> {
    return <View style={styles.container}>
      <TextView text='HomeContainer' />
      <Button text='text' onPress={this.goToTest} />
    </View>
  }
  goToTest = () => {
    goTo(TestContainer)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
})
