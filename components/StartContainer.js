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
// import {getCrimes} from '../libs/CrimeHelper'
// import * as FirestoreActions from '../libs/FirestoreActions'

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
  state = {user: null}

  componentDidMount () {
    delay(500).then(() => firebase.auth().onAuthStateChanged(user => {
      switch (true) {
        case !!user: return goTo(HomeContainer, {user})
        default: return goTo(SignUpContainer)
      }
    }))
    // .then(() => {
    //   getCrimes().then(crimes => FirestoreActions.updateDB(crimes))
    // })
  }

  render (): React$Element<View> {
    return <View />
  }
}
