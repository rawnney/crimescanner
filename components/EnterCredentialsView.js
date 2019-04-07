// @flow
import {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import TextView from './TextView'
import Button from './Button'
import colors from '../libs/Colors'
import TextInput from './TextInput'
import IconTextButton from './IconTextButton'
import {LOCK} from '../consts/Icons'
import commonStyles from '../libs/CommonStyles'
import Fonts from '../libs/Fonts'
import LoadingView from './LoadingView'

type Props = {
  switchComp: () => Promise<*>,
  handleOnConfirm: Function,
  errorMessage: *,
  isLoading: boolean,
  isSignUp?: boolean
}

type State = {
  email: string,
  password: string
}

export default class EnterCredentialsView extends PureComponent<Props, State> {
  state = {email: '', password: '', errorMessage: null}

  render (): React$Element<View> {
    let {errorMessage, isLoading, isSignUp} = this.props
    let {email, password} = this.state
    if (isLoading) return <LoadingView />
    return <View style={styles.container}>
      <TextView text={isSignUp ? 'SIGNUP' : 'LOGIN'} style={styles.title} />
      {errorMessage ? <TextView text={errorMessage} style={styles.errorMessage} /> : <View style={styles.errorMessage} />}
      <TextInput text={email} autoCapitalize='none' onChangeText={this.onChangeEmail} placeholder='Email' style={styles.textInput} />
      <TextInput text={password} autoCapitalize='none' secureTextEntry onChangeText={this.onChangePassword} placeholder='Password' style={styles.textInput} />
      <IconTextButton text={isSignUp ? 'Already have an account?' : 'Create an account'} name={LOCK} onPress={this.switchComp} />
      <Button text={isSignUp ? 'SIGNUP' : 'LOGIN'} onPress={this.onPressContinue} />
    </View>
  }

  switchComp = () => {
    let {switchComp} = this.props
    if (switchComp) switchComp()
  }

  onPressContinue = () => {
    let {handleOnConfirm} = this.props
    let {password, email} = this.state
    let credentials = {password: password, email: email}
    if (handleOnConfirm) handleOnConfirm(credentials)
  }

  onChangeEmail = (email: string) => this.setState({email})

  onChangePassword = (password: string) => this.setState({password})
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  title: {
    ...Fonts.bold,
    fontSize: 20,
    margin: commonStyles.space
  },
  errorMessage: {
    color: colors.darkPink,
    height: 40
  },
  textInput: {
    margin: commonStyles.space
  }
})
