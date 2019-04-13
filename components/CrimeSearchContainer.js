// @flow
import {PureComponent} from 'react'
import {View, StyleSheet} from 'react-native'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import colors from '../libs/Colors'
import SearchBar from './SearchBar'
import CrimeView from './CrimeView'
import commonStyles from '../libs/CommonStyles'
import {findDistrict, findCrimeType, getCrimes, getCrimeParams} from '../libs/CrimeHelper'
import SelectedCrimeContainer from './SelectedCrimeContainer'
import {goTo} from '../libs/AppNavigation'

type Props = {
  user: User
}

type State = {
  crimes: Array<Crime>,
  isLoading: boolean,
  text: string,
  isCrimes: boolean
}

export default class CrimeSearchContainer extends PureComponent<Props, State> {
  static routeName = 'CrimeSearchContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state)
  })
  state = {crimes: [], isLoading: false, text: '', isCrimes: true}
  render (): React$Element<View> {
    let {crimes, isLoading, isCrimes} = this.state
    return <View style={styles.container}>
      <SearchBar onChangeText={this.searchCrime} style={styles.searchBar} placeholder={'Stöld, Trafikbrott, Rån...'} />
      <CrimeView
        crimes={crimes}
        isLoading={isLoading}
        isCrimes={isCrimes}
        onPressCrime={this.onPressCrime}
      />
      <View />
    </View>
  }

  getCrimesWithParams = (text: string): * => {
    let param
    if (findDistrict(text)) param = {location: text}
    if (findCrimeType(text)) param = {type: getCrimeParams(text)}
    if (param) {
      this.setState({isLoading: true, crimes: [], isCrimes: true})
      getCrimes(param)
        .then(crimes => {
          this.setState({crimes: crimes})
          if (!!crimes && crimes.length !== 0) return this.setState({crimes: crimes})
          return this.setState({isCrimes: false})
        })
        .then(() => this.setState({isLoading: false}))
        .finally(() => this.setState({isLoading: false}))
    }
  }

  searchCrime = (text: string) => {
    this.setState({text: text})
    if (text === '') return
    this.getCrimesWithParams(text)
  }

  onPressCrime = (crime: Crime) => {
    let {user} = this.props
    goTo(SelectedCrimeContainer, {crime, user})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  searchBar: {
    paddingTop: commonStyles.space,
    paddingBottom: commonStyles.space
  }
})
