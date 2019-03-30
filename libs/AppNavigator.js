// @flow
import {createStackNavigator, createAppContainer} from 'react-navigation'
// import commonStyles from './CommonStyles'
// import {getDefaultNavigationOptions} from './AppNavigationStateHelper'
import getRoutes from './Routes'

let STACK_NAVIGATOR
let getStackNavigator = () => {
  if (STACK_NAVIGATOR) return STACK_NAVIGATOR
  var routes = getRoutes()
  Object.keys(routes).map((key: Object) => routes[key] = {screen: routes[key]})
  routes = {
    ...routes
    // 'StartContainer': {screen: StartContainer}
  }
  // var stackNavigatorConfig = {
  //   defaultNavigationOptions: getDefaultNavigationOptions(),
  //   onTransitionStart: (appNavigation: Object) => {
  //     let {route} = idx(appNavigation, _ => _.scene)
  //     if (!route) return
  //     let component = getRoutesComponent(route.routeName)
  //     if (!!component && !!component.onTransitionStart) component.onTransitionStart()
  //   }
  // headerMode: 'screen',
  // transitionConfig: (appNavigation) => getTransitionConfig(appNavigation)
  // }

  STACK_NAVIGATOR = createStackNavigator(routes) // stackNavigatorConfig
  return STACK_NAVIGATOR
}

const AppNavigator = createAppContainer(getStackNavigator())

export default AppNavigator
