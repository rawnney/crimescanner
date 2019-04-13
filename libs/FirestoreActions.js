// @flow
import firebase from 'react-native-firebase'
import Logger from '../libs/Logger'
// import {getCrimes} from './CrimeHelper'

const db = firebase.firestore().collection('crimes')

export let getMurder = () => {
  db.where('type', '==', 'mord')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(crime => Logger.warn(crime.id, ':', crime.data()))
    })
    .catch((error) => {
      Logger.warn('Error getting documents: ', error)
    })
}

export let getAllCrimes = (crimes: Array<Crime>) => {
  let crimeNotInDb = []
  db.get().then((querySnapshot) => {
    Logger.warn(querySnapshot)
    querySnapshot.forEach(doc => {
      crimes.find(crime => {
        if (crime.id !== doc.id) {
          Logger.warn(crime)
          crimeNotInDb.push(crime) // writeCrime(crime)
        }
      })
    }).then((doc) => Logger.warn(crimeNotInDb, doc))
  })
}

export let updateDB = (crimes: Array<Crime>) => {
  let crimeNotInDb = []
  db.get().then((querySnapshot) => {
    querySnapshot.forEach(doc => {
      crimes.find(crime => {
        if (crime.id !== doc.id) crimeNotInDb.push(crime) // writeCrime(crime)
      })
    }).then(() => Logger.warn(crimeNotInDb))
  })
}

export let writeCrime = (crime: Crime) => {
  db.add(crime)
    .then(crime => Logger.warn('Success adding crime:', crime))
    .catch(error => Logger.warn('Error adding crime:', error))
}
