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

type Props = {}
type State = {
  user: *,
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
      // console.warn(user)
      switch (true) {
        case !!user: return goTo(HomeContainer)
        default: return goTo(SignUpContainer)
      }
    }))
  }

  render (): React$Element<View> {
    return <View />
  }
}
