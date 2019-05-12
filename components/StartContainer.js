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

const LOADTIME = 200

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
    if (config.enableAutoUpdateDB) this.updateDatabase()
    this.checkUserStatus()
  }

  render (): React$Element<View> {
    return <View />
  }

  checkUserStatus = () => {
    let {config} = Store.getState()
    delay(LOADTIME).then(() => {
      if (!config.enableSignUp) return goTo(HomeContainer)
      return firebase
        .auth()
        .onAuthStateChanged(user => {
          switch (true) {
            case !!user: return goTo(HomeContainer, {user})
            default: return goTo(SignUpContainer)
          }
        })
    })
  }

  updateDatabase = () => {
    delay(LOADTIME)
      .then(() => getCrimes()
        .then(crimes => FirestoreActions
          .updateDB(crimes)))
  }
}
