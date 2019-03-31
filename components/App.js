// @flow
import {PureComponent} from 'react'
import {ApolloProvider} from 'react-apollo'
import {client} from '../libs/ApolloClient'
import {getStackNavigator} from '../libs/getStackNavigator'
import {setAppNavRef} from '../libs/AppNavigation'
import {createAppContainer} from 'react-navigation'

type Props = {}
type State = {}

const AppContainer = createAppContainer(getStackNavigator())

export default class App extends PureComponent<Props, State> {
  render (): React$Element<*> {
    return <ApolloProvider client={client}>
      <AppContainer ref={setAppNavRef} />
    </ApolloProvider>
  }
}
