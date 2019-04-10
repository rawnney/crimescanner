// @flow
import {Alert} from 'react-native'
import {deleteUser} from './AuthActions'

export let deleteUserConfirmation = (password: string) => {
  Alert.alert(
    'Delete account',
    'Are you sure you want to delete your account?',
    [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      },
      {text: 'OK', onPress: () => deleteUser(password)}
    ],
    {cancelable: false}
  )
}
