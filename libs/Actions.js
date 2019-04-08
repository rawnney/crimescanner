// @flow

// user
export let updateUser = (user: User) => ({type: 'UPDATE_USER', user})
// appState
export let changeAppState = (appState: *) => ({type: 'APP_STATE', item: {...appState}})
