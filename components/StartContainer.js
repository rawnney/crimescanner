// @flow
import {PureComponent} from 'react'
import {View} from 'react-native'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import {delay} from '../libs/Common'
import {goTo} from '../libs/AppNavigation'
import firebase from 'react-native-firebase'
import HomeContainer from './HomeContainer'
import SignUpContainer from './SignUpContainer'
import commonStyles from '../libs/CommonStyles'
import {getCrimes} from '../libs/CrimeHelper'
import * as FirestoreActions from '../libs/FirestoreActions'
import Store from '../libs/Store'

type Props = {}
type State = {
  user: ?User,
}

export default class StartContainer extends PureComponent<Props, State> {
  static routeName = 'StartContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state),
    headerLeft: <View />,
    headerStyle: commonStyles.invisibleHeader
  })
  state = {user: undefined}

  componentDidMount () {
    let {config} = Store.getState()
    delay(500).then(() => firebase.auth().onAuthStateChanged(user => {
      switch (true) {
        case !!user: return goTo(HomeContainer, {user})
        default: return goTo(SignUpContainer)
      }
    }))
      .then(() => config.enableFirestore ? getCrimes().then(crimes => FirestoreActions.updateDB(crimes)) : undefined)
  }

  render (): React$Element<View> {
    return <View />
  }
}
