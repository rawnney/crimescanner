// @flow
import {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import colors from '../libs/Colors'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import commonStyles from '../libs/CommonStyles'
import * as AuthActions from '../libs/AuthActions'
import TextView from './TextView'
import TextInput from './TextInput'
import Button from './Button'
import Logger from '../libs/Logger'

type Props = {
  user: User
}
type State = {
  password: string
}

export default class DeleteAccountContainer extends PureComponent<Props, State> {
  static routeName = 'DeleteAccountContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state)
  })

  state = {password: ''}

  render (): React$Element<View> {
    let {password} = this.state
    return <View style={styles.container}>
      <View style={styles.textWrapper}>
        <TextView text=':(' style={styles.emoji} />
        <TextView text='Enter your password to delete your account. This action is ireversible' style={styles.subtitle} />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput text={password} autoCapitalize='none' secureTextEntry onChangeText={this.onChangePassword} placeholder='Password' style={styles.textInput} />
      </View>
      <Button text='Delete account' onPress={this.openDeleteConfirmation} disabled={password === ''} />
    </View>
  }

  onChangePassword = (password: string) => this.setState({password})

  openDeleteConfirmation = () => {
    let {password} = this.state
    AuthActions.deleteUser(password, this.onSuccess, this.onError)
  }

  onSuccess = () => {
    Logger.warn('Account successfully deleted')
  }

  onError = () => {
    Logger.warn('Error deleting account')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'space-around',
    margin: commonStyles.space
  },
  subtitle: {
    maxWidth: '85%'
  },
  emoji: {
    fontSize: 25,
    alignSelf: 'center'
  },
  inputWrapper: {
    flex: 1
  },
  textInput: {
    margin: commonStyles.space
  }
})
