// @flow
import {PureComponent} from 'react'
import {Provider} from 'react-redux'
import {setAppNavRef} from '../libs/AppNavigation'
import {createStore} from '../libs/Store'
import {AppContainer} from '../libs/getStackNavigator'

type Props = {}
type State = {}

let store = createStore()

export default class App extends PureComponent<Props, State> {
  render (): React$Element<*> {
    return <Provider store={store}>
      <AppContainer ref={setAppNavRef} />
    </Provider>
  }
}
