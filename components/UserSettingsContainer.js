// @flow
import {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import colors from '../libs/Colors'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import commonStyles from '../libs/CommonStyles'
import RowSwitch from './RowSwitch'
import Store from '../libs/Store'
import * as Actions from '../libs/Actions'
import getColorTheme from '../libs/getColorTheme'
import {connect} from 'react-redux'

type Props = {}
type State = {}

class UserSettingsContainer extends PureComponent<Props, State> {
  static routeName = 'UserSettingsContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state)
  })

  render (): React$Element<View> {
    let isDarkMode = getColorTheme().isDarkMode
    return <View style={styles.container}>
      <View style={styles.wrapper}>
        <RowSwitch text='Dark mode' value={isDarkMode} onValueChange={this.toggle} />
      </View>
    </View>
  }

  toggle = (isDarkMode: boolean) => Store.dispatch(Actions.changeAppState({isDarkMode: isDarkMode}))
}

export default connect(state => state)(UserSettingsContainer)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: commonStyles.space,
    backgroundColor: colors.white
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start'
  }
})
