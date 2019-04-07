// @flow
import {NavigationActions} from 'react-navigation'

let _navigator

export let setAppNavRef = (navigatorRef: *) => {
  _navigator = navigatorRef
}

export let goTo = (comp: *, params: Object): Promise<Object> => {
  let routeName = comp.routeName
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  )
  return Promise.resolve()
}
