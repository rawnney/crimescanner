// @flow
import {createStackNavigator, createAppContainer} from 'react-navigation'
import {getDefaultNavigationOptions} from './getDefaultNavigationOptions'
import withReactNavigationSupport from '../hocs/withReactNavigationSupport'
import getRoutes from './Routes'

let STACK_NAVIGATOR
export let getStackNavigator = () => {
  if (STACK_NAVIGATOR) return STACK_NAVIGATOR
  var routes = getRoutes()
  Object.keys(routes).map((key: Object) => routes[key] = {screen: withReactNavigationSupport(routes[key])})
  routes = {...routes}
  var stackNavigatorConfig = {
    initialRouteName: 'StartContainer',
    defaultNavigationOptions: getDefaultNavigationOptions(),
    headerMode: 'screen'
  }

  STACK_NAVIGATOR = createStackNavigator(routes, stackNavigatorConfig)
  return STACK_NAVIGATOR
}

export let getRoutesComponent = (routeName?: string): ?Object => routeName ? getRoutes()[routeName] : undefined

export const AppContainer = createAppContainer(getStackNavigator())
