// @flow
import firebase from 'react-native-firebase'
import Logger from '../libs/Logger'

const db = (datetime: string) => firebase.firestore().collection(datetime)

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

export let updateDB = (crimes: Array<Crime>) => {
  let dates = []
  crimes.map(crime => {
    if (!dates.includes(crime.datetime)) dates.push(crime.datetime)
  })
  dates.forEach(date => {
    db(date).get()
      .then(snapshot => snapshot.docs.map(doc => doc.data()))
      .then(data => {
        let crimesNotInDb = crimes.filter(crime => !data.find(dbCrime => crime.id === dbCrime.id)).filter(crime => crime.datetime === date)
        if (crimesNotInDb.length === 0) return Logger.warn('Database is up to date.')
        return crimesNotInDb.map(crime => addCrimeToCollection(crime))
      })
      .catch(err => Logger.warn('Error getting crimes', err))
  })
}

export let addCrimeToCollection = (crime: Crime) => {
  let {datetime} = crime
  db(datetime)
    .add(crime)
    .then(() => Logger.warn('Added crime to', datetime))
    .catch(err => Logger.warn(err))
}
