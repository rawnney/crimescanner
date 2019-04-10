// @flow
import firebase from 'react-native-firebase'
import Logger from '../libs/Logger'

export let signInWithEmailAndPassword = (credentials: Object): Promise<User> => {
  let {password, email} = credentials
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => Promise.resolve(user))
    .catch(error => Promise.reject(error))
}

export let createUserWithEmailAndPassword = (credentials: Object): Promise<User> => {
  let {email, password} = credentials
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      let {currentUser} = firebase.auth()
      Promise.resolve(currentUser)
    })
    .catch(error => Promise.reject(error))
}

export let signOutUser = () => {
  return firebase.auth().signOut()
    .then(() => Promise.resolve())
    .catch((error) => Promise.reject(error))
}

export let deleteUser = (password: string, onSuccess: Function, onError: Function) => {
  var user = firebase.auth().currentUser
  var credentials = firebase.auth.EmailAuthProvider.credential(user.email, password)
  user.reauthenticateWithCredential(credentials)
    .then(() => user.delete())
    .then(() => onSuccess())
    .catch((error) => {
      Logger.warn(error)
      onError()
    })
}
