// @flow
import {PureComponent} from 'react'
import {View} from 'react-native'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import {delay} from '../libs/Common' // getPrevWeeksDates
import {goTo} from '../libs/AppNavigation'
import firebase from 'react-native-firebase'
import HomeContainer from './HomeContainer'
import SignUpContainer from './SignUpContainer'
import commonStyles from '../libs/CommonStyles'
import {getCrimes} from '../libs/CrimeHelper'
import * as FirestoreActions from '../libs/FirestoreActions'
// import * as Actions from '../libs/Actions'
import Store from '../libs/Store'
// import moment from '../libs/moment'
import LoadingView from './LoadingView'
// import Logger from '../libs/Logger'

type Props = {}
type State = {
  user: ?User,
  isLoading: boolean
}

const LOADTIME = 200

export default class StartContainer extends PureComponent<Props, State> {
  static routeName = 'StartContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state),
    headerLeft: <View />,
    headerStyle: commonStyles.invisibleHeader
  })
  state = {user: undefined, isLoading: true}

  componentDidMount () {
    let {config} = Store.getState()
    if (config.enableAutoUpdateDB) this.updateDatabase()
    this.checkUserStatus()
  }

  render (): React$Element<View> {
    return <LoadingView />
  }

  checkUserStatus = () => {
    let {config} = Store.getState()
    delay(LOADTIME).then(() => {
      if (!config.enableSignUp) return this.goToHomeContainer()
      return firebase
        .auth()
        .onAuthStateChanged(user => {
          switch (true) {
            case !!user: return this.goToHomeContainer()
            default: return this.goToSignUpContainer()
          }
        })
    })
  }

  updateDatabase = () => {
    delay(LOADTIME)
      .then(() => getCrimes()
        .then(crimes => FirestoreActions.updateDB(crimes)))
      // .then(() => FirestoreActions.getAllCrimesForDates(getPrevWeeksDates(moment())))
      // .then((crimes) => this.updateCrimeState(crimes))
      // .finally(() => this.goToHomeContainer())
  }

  goToHomeContainer = (): Promise<Object> => {
    let {user} = this.state
    return goTo(HomeContainer, {user})
  }

  goToSignUpContainer = (): Promise<Object> => {
    return goTo(SignUpContainer)
  }

  // updateCrimeState = (crimes: Array<Crime>) => {
  //   Store.dispatch(Actions.updateCrimes(crimes))
  //     .finally(() => this.setState({isLoading: false}))
  // }
}
