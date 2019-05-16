// @flow

export let updateUser = (user: User) => ({type: 'UPDATE_USER', user})
export let changeAppState = (appState: *) => ({type: 'APP_STATE', item: {...appState}})
export let updateCrimes = (crimes: Array<Crime>) => ({type: 'UPDATE_CRIMES', crimes})
