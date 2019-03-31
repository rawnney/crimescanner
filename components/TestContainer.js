// @flow
import {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import TextView from './TextView'
import Button from './Button'
import colors from '../libs/Colors'
import StartContainer from './StartContainer'
import {goTo} from '../libs/AppNavigation'

type Props = {}
type State = {}

export default class TestContainer extends PureComponent<Props, State> {
  static routeName = 'TestContainer'
  render (): React$Element<View> {
    return <View style={styles.container}>
      <TextView text='TestContainer' />
      <Button text='text' onPress={this.goToStart} />
    </View>
  }

  goToStart = () => {
    goTo(StartContainer)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
})
