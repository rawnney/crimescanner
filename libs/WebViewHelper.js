// @flow
import {Linking} from 'react-native'
import {isEmulator} from './Common'
import Logger from './Logger'

export let openURL = (url: string): * => {
  return Linking.canOpenURL(url).then((supported: boolean) => {
    if (!supported) {
      if (isEmulator()) Logger.warn('Can\'t open this link in emulator')
      return Promise.reject(new Error('Can\'t handle url: ' + url)).catch(() => {})
    } else
      return Linking.openURL(url)
  }).catch((err: string) => {
    return Promise.reject(new Error('An error occurred: ' + err)).catch(() => {})
  })
}
