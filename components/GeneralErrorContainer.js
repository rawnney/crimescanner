// @flow
import {PureComponent} from 'react'
import {View, StyleSheet} from 'react-native'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import TextView from './TextView'
import colors from '../libs/Colors'

type Props = {
  err?: *
}

type State = {}

export default class GeneralErrorContainer extends PureComponent<Props, State> {
  static routeName = 'GeneralErrorContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state),
    headerStyle: {backgroundColor: colors.darkPink}
  })
  render (): React$Element<View> {
    return <View style={styles.container}>
      <TextView text='Something went wrong...' style={styles.text} />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkPink
  },
  text: {
    alignSelf: 'center',
    fontSize: 25,
    color: colors.white
  }
})
