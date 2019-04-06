// @flow
import Permissions from 'react-native-permissions'
import {logger} from './Common'

const LOCAITON = 'location'

export let checkForLocationPermission = () => checkForPermissions(LOCAITON)

let checkForPermissions = (type: string) => {
  return Permissions.request(type).then(response => {
    switch (response) {
      case 'denied':
        logger('denied')
        return Promise.resolve(false)
      case 'restricted':
        logger('restricted')
        return Promise.resolve(false)
      case 'undetermined':
        logger('undetermined')
        return Promise.resolve(false)
      default:
        logger('authorized')
        return Promise.resolve(true)
    }
  }).catch(error => logger(error))
}

export let requestPermission = (permission: string) => {
  return Permissions.request(permission)
    .then(response => Promise.resolve(response))
}
