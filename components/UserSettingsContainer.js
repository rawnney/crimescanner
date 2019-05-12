// @flow
import {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import colors from '../libs/Colors'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import commonStyles from '../libs/CommonStyles'
import RowSwitch from './RowSwitch'
import Store from '../libs/Store'
import * as Actions from '../libs/Actions'
import {connect} from 'react-redux'
import * as AuthActions from '../libs/AuthActions'
import IconTextButton from './IconTextButton'
import {SIGNOUT, DELETE} from '../consts/Icons'
import {goTo} from '../libs/AppNavigation'
import DeleteAccountContainer from './DeleteAccountContainer'

type Props = {
  user: User
}
type State = {}

class UserSettingsContainer extends PureComponent<Props, State> {
  static routeName = 'UserSettingsContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state)
  })

  render (): React$Element<View> {
    let {appState} = Store.getState()
    return <View style={styles.container}>
      <View style={styles.wrapper}>
        <RowSwitch text='Dark mode' value={appState.isDarkMode} onValueChange={this.toggleDarkMode} />
        {this.renderAuthenticationOptions()}
        {this.renderDevSettings()}
      </View>
    </View>
  }

  renderAuthenticationOptions = () => {
    let {config} = Store.getState()
    if (!config.enableSignUp) return <View />
    return <View>
      <IconTextButton text='Signout' name={SIGNOUT} onPress={this.logoutUser} />
      <IconTextButton text='Delete account' name={DELETE} onPress={this.goToDeleteAccountContainer} />
    </View>
  }

  renderDevSettings = () => {
    let {appState} = Store.getState()
    return <View>
      <RowSwitch text='Enable logger' value={appState.enableLogger} onValueChange={this.toggleLogger} />
    </View>
  }

  toggleLogger = (enableLogger: boolean) => Store.dispatch(Actions.changeAppState({enableLogger: enableLogger}))
  toggleDarkMode = (isDarkMode: boolean) => Store.dispatch(Actions.changeAppState({isDarkMode: isDarkMode}))
  logoutUser = () => AuthActions.signOutUser()
  goToDeleteAccountContainer = () => goTo(DeleteAccountContainer)
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
