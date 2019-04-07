// @flow
import {PureComponent} from 'react'
import {View} from 'react-native'
import HomeContainer from './HomeContainer'
import {goTo} from '../libs/AppNavigation'
import firebase from 'react-native-firebase'
import LoadingView from './LoadingView'
import EnterCredentialsView from './EnterCredentialsView'
import LoginContainer from './LoginContainer'
import commonStyles from '../libs/CommonStyles'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'

type Props = {}
type State = {
  errorMessage: *,
  user: *,
  isLoading: boolean
}

export default class SignUpContainer extends PureComponent<Props, State> {
  static routeName = 'SignUpContainer'
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
      switchComp={this.goToLogin}
      handleOnConfirm={this.handleSignUp}
      errorMessage={errorMessage}
      isLoading={isLoading}
      isSignUp
    />
  }

  handleSignUp = (credentials: Object) => {
    let {email, password} = credentials
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        let {currentUser} = firebase.auth()
        this.setState({user: currentUser})
      })
      .then(() => {
        let {user} = this.state
        goTo(HomeContainer, {user})
      })
      .catch(error => this.setState({errorMessage: error.message}))
  }

  goToLogin = () => goTo(LoginContainer)
}
