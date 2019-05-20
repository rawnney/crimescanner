// @flow
/* eslint-disable react/jsx-no-bind */
import {PureComponent} from 'react'
import {View, StyleSheet, ActivityIndicator} from 'react-native'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import {getCrimesNearLocation} from '../libs/CrimeHelper'
import {getPosition} from '../libs/PositionHelper'
import {goTo} from '../libs/AppNavigation'
import {getOneDayEarlier} from '../libs/Common'
import {SYNC_ALT} from '../consts/Icons'
import colors from '../libs/Colors'
import IconTextButton from './IconTextButton'
import LoadingView from './LoadingView'
import CrimeView from './CrimeView'
import * as PermissionsHelper from '../libs/PermissionHelper'
import * as FirestoreActions from '../libs/FirestoreActions'
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
  hasPermission: boolean,
  isLoadingMore: boolean
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
      hasPermission: false,
      isLoadingMore: false
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
      ListFooterComponent={() => this.renderListFooter()}
    />
  }

  renderListFooter = () => {
    let {isLoadingMore} = this.state
    if (isLoadingMore) return <ActivityIndicator tintColor={colors.black} size='small' style={styles.footer} />
    return <IconTextButton onPress={this.onPressLoadMore} text='Se äldre brott' name={SYNC_ALT} color={colors.gray} style={styles.footer} />
  }

  onPressLoadMore = () => {
    let {crimes, position} = this.state
    let date = getOneDayEarlier(crimes)
    let newCrimes = []
    this.setState({isLoadingMore: true})
    FirestoreActions.getCrimesForDate(date)
      .then(data => data.filter(crime => crime.location.name === position.name))
      .then((data) => newCrimes = crimes.concat(data))
      .finally((data) => this.setState({crimes: newCrimes, isLoadingMore: false}))
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

const styles = StyleSheet.create({
  footer: {
    minHeight: 60
  }
})
