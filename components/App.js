// @flow
import {PureComponent} from 'react'
import {ApolloProvider} from 'react-apollo'
import ApolloClient from 'apollo-boost'
// import {client} from '../libs/ApolloClient'
import {getStackNavigator} from '../libs/getStackNavigator'
import {setAppNavRef} from '../libs/AppNavigation'
import {createAppContainer} from 'react-navigation'
import {GQL_SIMPLE_API_KEY} from '../consts/ApiKeys'

type Props = {}
type State = {}

const AppContainer = createAppContainer(getStackNavigator())

const localClient = new ApolloClient({
  uri: GQL_SIMPLE_API_KEY
})

export default class App extends PureComponent<Props, State> {
  render (): React$Element<*> {
    return <ApolloProvider client={localClient}>
      <AppContainer ref={setAppNavRef} />
    </ApolloProvider>
  }
}
