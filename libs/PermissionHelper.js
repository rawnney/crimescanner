// @flow
import Permissions from 'react-native-permissions'
import {logger} from './Common'
import {openURL} from './WebViewHelper'

const LOCAITON = 'location'

export let checkForLocationPermission = () => checkForPermissions(LOCAITON)

let checkForPermissions = (type: string): Promise<boolean> => {
  return Permissions.request(type).then(response => {
    switch (response) {
      case 'denied':
        logger(`${'Permissions for ' + type + ' is denied'}`)
        return Promise.resolve(false)
      default:
        logger(`${'Permissions for ' + type + ' is authorized'}`)
        return Promise.resolve(true)
    }
  }).catch(error => {
    logger(error)
    return Promise.resolve(false)
  })
}

export let requestPermission = (type: string) => {
  return Permissions.checkForPermissions(type)
    .then(response => Promise.resolve(response))
}

export let openPermissionSettings = () => openURL('app-settings:')
