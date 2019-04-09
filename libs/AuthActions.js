// @flow
import firebase from 'react-native-firebase'

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

// export let deleteUser = () => {
//   return firebase.auth().delete()
//     .then(() => Promise.resolve())
//     .catch((error) => Promise.reject(error))
// }
