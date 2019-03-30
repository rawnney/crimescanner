// @flow
import {PureComponent} from 'react'
import {View} from 'react-native'
import {ApolloProvider} from 'react-apollo'
import {client} from '../libs/ApolloClient'
import AppNavigator from '../libs/AppNavigator'

require('../libs/Globals')

type Props = {}
type State = {}

export default class App extends PureComponent<Props, State> {
  render (): React$Element<View> {
    return <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
  }
}
