// @flow
import {createStackNavigator} from 'react-navigation'
import getRoutes from './Routes'
import {getDefaultNavigationOptions} from './getDefaultNavigationOptions'

let STACK_NAVIGATOR
export let getStackNavigator = () => {
  if (STACK_NAVIGATOR) return STACK_NAVIGATOR
  var routes = getRoutes()
  Object.keys(routes).map((key: Object) => routes[key] = {screen: routes[key]})
  routes = {...routes}
  var stackNavigatorConfig = {
    defaultNavigationOptions: getDefaultNavigationOptions(),
    headerMode: 'screen'
  }

  STACK_NAVIGATOR = createStackNavigator(routes, stackNavigatorConfig)
  return STACK_NAVIGATOR
}
