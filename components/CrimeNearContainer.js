// @flow
import {PureComponent} from 'react'
import {View} from 'react-native'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
// import TextView from './TextView'
import {getCrimesNearLocation} from '../libs/CrimeHelper'
import {getPosition} from '../libs/PositionHelper'
import LoadingScreen from './LoadingScreen'
import CrimeView from './CrimeView'

type Props = {}

type State = {
  position: Object,
  crimes: Array<Crime>,
  isLoading: boolean,
  isCrimes: boolean
}

export default class CrimesNearContainer extends PureComponent<Props, State> {
  static routeName = 'CrimesNearContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state)
  })

  state = {crimes: [], position: null, isLoading: false, isCrimes: true}

  componentDidMount () {
    this.setPositionAndCrimes()
  }
  render (): React$Element<View> {
    let {crimes, isLoading, isCrimes} = this.state
    if (isLoading) return <LoadingScreen />
    return <CrimeView
      crimes={crimes}
      isLoading={isLoading}
      isCrimes={isCrimes}
      onPressCrime={this.onPressCrime}
    />
  }

  setPositionAndCrimes = () => {
    this.setState({isLoading: true})
    getPosition()
      .then(position => {
        if (position) this.setState({position})
      })
      .then(() => {
        let {position} = this.state
        getCrimesNearLocation(position)
          .then(crimes => this.setState({crimes}))
          .then(() => {
            let {position, crimes} = this.state
            if (position && crimes) this.setState({isLoading: false})
          })
          .finally(() => this.setState({isLoading: false}))
      })
  }

  onPressCrime = (crime: Crime) => {
    // console.warn(crime)
  }
}
