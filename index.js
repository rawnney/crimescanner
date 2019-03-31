// @flow
import {AppRegistry} from 'react-native'
import App from './components/App'
import {name as appName} from './app.json'

require('./libs/Globals')

AppRegistry.registerComponent(appName, () => App)
