// @flow
import {PureComponent} from 'react'
import {View} from 'react-native'
import HomeContainer from './HomeContainer'
import {goTo} from '../libs/AppNavigation'
import firebase from 'react-native-firebase'
import SignUpContainer from './SignUpContainer'

type Props = {}
type State = {
  user: *,
}

export default class StartContainer extends PureComponent<Props, State> {
  static routeName = 'StartContainer'
  state = {user: null}

  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      switch (true) {
        case !!user: return goTo(HomeContainer)
        default: return goTo(SignUpContainer)
      }
    })
  }

  render (): React$Element<View> {
    return <View />
  }
}
