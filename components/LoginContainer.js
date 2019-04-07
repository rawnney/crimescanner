// @flow
import {PureComponent} from 'react'
import {View} from 'react-native'
import HomeContainer from './HomeContainer'
import {goTo} from '../libs/AppNavigation'
import firebase from 'react-native-firebase'
import LoadingView from './LoadingView'
import EnterCredentialsView from './EnterCredentialsView'
import SignUpContainer from './SignUpContainer'
import commonStyles from '../libs/CommonStyles'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'

type Props = {}
type State = {
  errorMessage: *,
  user: *,
  isLoading: boolean
}

export default class LoginContainer extends PureComponent<Props, State> {
  static routeName = 'LoginContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state),
    headerLeft: <View />,
    headerStyle: commonStyles.invisibleHeader
  })

  state = {errorMessage: null, user: null, isLoading: false}

  render (): React$Element<View> {
    let {errorMessage, isLoading} = this.state
    if (isLoading) return <LoadingView />
    return <EnterCredentialsView
      switchComp={this.goToSignUp}
      handleOnConfirm={this.handleLogin}
      errorMessage={errorMessage}
      isLoading={isLoading}
    />
  }

  goToSignUp = () => goTo(SignUpContainer)

  handleLogin = (credentials: Object) => {
    let {password, email} = credentials
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        let {user} = this.state
        return goTo(HomeContainer, {user})
      })
      .catch(error => this.setState({errorMessage: error.message}))
  }
}
