// @flow
import {PureComponent} from 'react'
import {View} from 'react-native'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import {getCrimesNearLocation} from '../libs/CrimeHelper'
import {getPosition} from '../libs/PositionHelper'
import LoadingScreen from './LoadingScreen'
import CrimeView from './CrimeView'
import * as PermissionsHelper from '../libs/PermissionHelper'
import PermissionView from './PermissionView'

type Props = {}

type State = {
  position: Object,
  crimes: Array<Crime>,
  isLoading: boolean,
  isCrimes: boolean,
  hasPermission: boolean
}

export default class CrimesNearContainer extends PureComponent<Props, State> {
  static routeName = 'CrimesNearContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state)
  })

  constructor (props: Props) {
    super(props)
    this.state = {
      crimes: [],
      position: null,
      isLoading: false,
      isCrimes: true,
      hasPermission: false
    }
  }

  componentDidMount () {
    let {hasPermission} = this.state
    this.checkPermission()
      .then(() => {
        if (hasPermission === true) this.setPositionAndCrimes()
      })
  }

  render (): React$Element<View> {
    let {crimes, isLoading, isCrimes, hasPermission} = this.state
    if (!hasPermission === false) return <PermissionView onPress={this.openPermissions} />
    if (isLoading) return <LoadingScreen />
    return <CrimeView
      crimes={crimes}
      isLoading={isLoading}
      isCrimes={isCrimes}
      onPressCrime={this.onPressCrime}
    />
  }

  setPositionAndCrimes = () => {
    let {hasPermission} = this.state
    if (hasPermission === false) return
    this.setState({isLoading: true})
    getPosition()
      .then(position => {
        if (position) this.setState({position})
      })
      .then(() => {
        let {position} = this.state
        getCrimesNearLocation(position)
          .then(crimes => {
            this.setState({crimes: crimes})
            if (!!crimes && crimes.length !== 0) return this.setState({crimes: crimes})
            return this.setState({isCrimes: false})
          })
          .then(() => {
            let {position, crimes} = this.state
            if (position && crimes) this.setState({isLoading: false})
          })
          .finally(() => this.setState({isLoading: false}))
      })
  }

  async checkPermission () {
    const responseCheck = await PermissionsHelper.checkForLocationPermission()
    if (responseCheck) this.setState({hasPermission: responseCheck})
  }

  onPressCrime = (crime: Crime) => {
    // console.warn(crime)
  }

  openPermissions = () => PermissionsHelper.openPermissionSettings()
}
