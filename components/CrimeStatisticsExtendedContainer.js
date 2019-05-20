// @flow
import React, {Component} from 'react'
import {View} from 'react-native'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import CrimeView from './CrimeView'
import SelectedCrimeContainer from './SelectedCrimeContainer'
import {goTo} from '../libs/AppNavigation'

type State = {
}

type Props = {
  crimes: Array<Crime>
}

export default class CrimeStatisticsExtendedContainer extends Component<Props, State> {
  static routeName = 'CrimeStatisticsExtendedContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state)
  })

  render (): React$Element<View> {
    let {crimes} = this.props
    return <CrimeView
      crimes={crimes}
      isLoading={false}
      isCrimes
      onPressCrime={this.onPressCrime}
    />
  }

  onPressCrime = (crime: Crime) => goTo(SelectedCrimeContainer, {crime})
}
