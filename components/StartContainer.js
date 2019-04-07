// @flow
import {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import TextView from './TextView'
import Button from './Button'
import colors from '../libs/Colors'
import HomeContainer from './HomeContainer'
import {goTo} from '../libs/AppNavigation'
import TextInput from './TextInput'
import IconTextButton from './IconTextButton'
import {LOCK} from '../consts/Icons'
import commonStyles from '../libs/CommonStyles'
import firebase from 'react-native-firebase'

type Props = {}
type State = {
  email: string,
  password: string,
  errorMessage: *,
  user: *
}

export default class StartContainer extends PureComponent<Props, State> {
  static routeName = 'StartContainer'
  state = {email: '', password: '', errorMessage: null, user: null}
  render (): React$Element<View> {
    let {email, password, errorMessage} = this.state
    return <View style={styles.container}>
      <TextView text='Signup' style={{margin: commonStyles.space}} />
      {errorMessage ? <TextView text={errorMessage} style={styles.errorMessage} /> : <View />}
      <TextInput text={email} autoCapitalize='none' onChangeText={this.onChangeEmail} placeholder={'Email'} style={{margin: commonStyles.space}} />
      <TextInput text={password} autoCapitalize='none' secureTextEntry onChangeText={this.onChangePassword} placeholder={'Password'} style={{margin: commonStyles.space}} />
      <TextView text='Already have an account?' style={{margin: commonStyles.space}} />
      <IconTextButton text='LOGIN' name={LOCK} onPress={this.goToLogin} />
      <Button text='SIGNUP' onPress={this.handleSignUp} />
    </View>
  }

  onChangeEmail = (email: string) => this.setState({email})

  onChangePassword = (password: string) => this.setState({password})

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        const {currentUser} = firebase.auth()
        this.setState({user: currentUser})
      })
      .then(() => {
        let {user} = this.state
        goTo(HomeContainer, {user})
      })
      .catch(error => this.setState({errorMessage: error.message}))
  }

  goToLogin = () => {}

  handleLogin = () => {
    let {email, password} = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        let {user} = this.state
        goTo(HomeContainer, {user})
      })
      .catch(error => this.setState({errorMessage: error.message}))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  errorMessage: {
    color: colors.darkPink
  }
})
