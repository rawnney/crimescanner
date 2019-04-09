// @flow
import Permissions from 'react-native-permissions'
import Logger from './Logger'
import {openURL} from './WebViewHelper'
import {LOCAITON} from './Consts'

export let checkForLocationPermission = () => checkForPermissions(LOCAITON)

let checkForPermissions = (type: string): Promise<boolean> => {
  return Permissions.request(type).then(response => {
    switch (response) {
      case 'denied':
        Logger.warn(`${'Permissions for ' + type + ' is denied'}`)
        return Promise.resolve(false)
      default:
        Logger.warn(`${'Permissions for ' + type + ' is authorized'}`)
        return Promise.resolve(true)
    }
  }).catch(error => {
    Logger.warn(error)
    return Promise.resolve(false)
  })
}

export let openPermissionSettings = () => openURL('app-settings:')
