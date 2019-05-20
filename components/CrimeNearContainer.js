// @flow
/* eslint-disable react/jsx-no-bind */
import {PureComponent} from 'react'
import {View} from 'react-native' // ActivityIndicator
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import {getCrimesNearLocation} from '../libs/CrimeHelper'
import {getPosition} from '../libs/PositionHelper'
import {goTo} from '../libs/AppNavigation'
// import {RECYCLE} from '../consts/Icons'
// import colors from '../libs/Colors'
// import IconTextButton from './IconTextButton'
import LoadingView from './LoadingView'
import CrimeView from './CrimeView'
import * as PermissionsHelper from '../libs/PermissionHelper'
import PermissionView from './PermissionView'
import SelectedCrimeContainer from './SelectedCrimeContainer'

type Props = {
  user: User
}

type State = {
  position: Object,
  crimes: Array<Crime>,
  isLoading: boolean,
  isCrimes: boolean,
  hasPermission: boolean
  // isLoadingMore: boolean
}

export default class CrimesNearContainer extends PureComponent<Props, State> {
  static routeName = 'CrimesNearContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state),
    title: 'Nära dig'
  })

  constructor (props: Props) {
    super(props)
    this.state = {
      crimes: [],
      position: null,
      isLoading: false,
      isCrimes: true,
      hasPermission: false
      // isLoadingMore: false
    }
  }

  componentDidMount () {
    this.checkPermissionAndGetCrimes()
  }

  render (): React$Element<View> {
    let {crimes, isLoading, isCrimes, hasPermission} = this.state
    if (!hasPermission) return <PermissionView onPress={this.openPermissions} />
    if (isLoading) return <LoadingView />
    return <CrimeView
      crimes={crimes}
      isLoading={isLoading}
      isCrimes={isCrimes}
      onPressCrime={this.onPressCrime}
      // ListFooterComponent={() => this.renderListFooter()}
    />
  }

  // renderListFooter = () => {
  //   let {isLoadingMore} = this.state
  //   if (isLoadingMore) return <ActivityIndicator style={{}} tintColor={colors.black} size='small' /> // <IconTextButton onPress={() => {}} text='Laddar...' name={RECYCLE} color={colors.gray} />
  //   return <IconTextButton onPress={() => this.setState({isLoadingMore: true})} text='Se äldre brott' name={RECYCLE} color={colors.gray} />
  // }

  setPositionAndCrimes = () => {
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

  checkPermissionAndGetCrimes = () => {
    PermissionsHelper.checkForLocationPermission()
      .then((status) => this.setState({hasPermission: status}))
      .then(() => {
        let {hasPermission} = this.state
        if (hasPermission) this.setPositionAndCrimes()
      })
  }

  onPressCrime = (crime: Crime) => goTo(SelectedCrimeContainer, {crime})

  openPermissions = () => PermissionsHelper.openPermissionSettings()
}
