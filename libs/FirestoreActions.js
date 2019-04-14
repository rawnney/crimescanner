// @flow
import firebase from 'react-native-firebase'
import Logger from '../libs/Logger'
import moment from './moment'

const db = (collection: string) => firebase.firestore().collection(collection)

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

export let bigUpdateDB = (crimes: Array<Crime>) => {
  let dates = []
  crimes.map(crime => {
    if (!dates.includes(crime.datetime)) dates.push(crime.datetime)
  })
  let sortedDates = dates.sort((a, b) => moment(b) - moment(a))
  sortedDates.forEach(date => {
    db(date).get()
      .then(snapshot => snapshot.docs.map(doc => doc.data()))
      .then(data => {
        let crimesNotInDb = crimes.filter(crime => !data.find(dbCrime => crime.id === dbCrime.id)).filter(crime => crime.datetime === date)
        if (crimesNotInDb.length === 0) return Logger.warn('Collection', date, 'is up to date.')
        return crimesNotInDb.map(crime => addCrimeToCollection(crime))
      })
      .catch(err => Logger.warn('Error getting crimes', err))
  })
}

export let updateDB = (crimes: Array<Crime>) => {
  const shallowUpdateLength = 5
  let dates = []
  crimes.map(crime => {
    if (!dates.includes(crime.datetime)) dates.push(crime.datetime)
  })
  let sortedDates = dates.sort((a, b) => moment(b) - moment(a))
  let sortedCrimes = crimes.sort((a, b) => (b.id - a.id)).slice(0, shallowUpdateLength)

  db(sortedDates[0]).orderBy('id', 'desc').limit(shallowUpdateLength).get()
    .then(snapshot => snapshot.docs.map(doc => doc.data()))
    .then(data => {
      let missingCrimes = sortedCrimes.filter(crime => !data.find(dbCrime => crime.id === dbCrime.id))
      if (missingCrimes.length === 0) return Logger.warn('Shallow update - Everything is up to date.')
      if (missingCrimes.length === sortedCrimes.length) {
        Logger.warn('Shallow update - Missing', missingCrimes.length, '- Runnign updateDB.')
        return bigUpdateDB(crimes)
      }
      missingCrimes.forEach(crime => addCrimeToCollection(crime))
      return Logger.warn('Missing', missingCrimes.length, 'crimes', missingCrimes)
    })
}

export let addCrimeToCollection = (crime: Crime) => {
  let {datetime, id} = crime
  db(datetime)
    .add(crime)
    .then(() => Logger.warn('Added crime', id, 'to collection', datetime))
    .catch(err => Logger.warn(err))
}
