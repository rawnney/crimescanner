// @flow
import {Linking} from 'react-native'
import {isEmulator, logger} from './Common'

export let openURL = (url: string): * => {
  return Linking.canOpenURL(url).then((supported: boolean) => {
    if (!supported) {
      if (isEmulator()) logger('Can\'t open this link in emulator')
      return Promise.reject(new Error('Can\'t handle url: ' + url)).catch(() => {})
    } else
      return Linking.openURL(url)
  }).catch((err: string) => {
    return Promise.reject(new Error('An error occurred: ' + err)).catch(() => {})
  })
}
