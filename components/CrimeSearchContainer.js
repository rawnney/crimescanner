// @flow
import {PureComponent} from 'react'
import {View, StyleSheet} from 'react-native'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import colors from '../libs/colors'
import SearchBar from './SearchBar'
import CrimeView from './CrimeView'
import commonStyles from '../libs/CommonStyles'
import {findDistrict, findCrimeType, getCrimesWithParams} from '../libs/CrimeHelper'

type Props = {}

type State = {
  crimes: Array<Crime>,
  isLoading: boolean,
  text: string,
  badRes: boolean
}

export default class CrimeSearchContainer extends PureComponent<Props, State> {
  static routeName = 'CrimeSearchContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state)
  })
  state = {crimes: [], isLoading: false, text: '', badRes: false}
  render (): React$Element<View> {
    let {crimes, isLoading} = this.state
    return <View style={styles.container}>
      <SearchBar onChangeText={this.searchCrime} style={styles.searchBar} placeholder={'Stöld, Trafikbrott, Rån...'} />
      <CrimeView
        crimes={crimes}
        isLoading={isLoading}
        // badRes
        onPressCrime={this.onPressCrime}
      />
      <View />
    </View>
  }

  getCrimesWithParams = (text: string): * => {
    let request
    if (findDistrict(text)) request = {location: text}
    if (findCrimeType(text)) request = {type: text}
    if (request) {
      this.setState({isLoading: true, badRes: false})
      getCrimesWithParams(request)
        .then(crimes => {
          if (!!crimes && crimes.length !== 0) this.setState({crimes: crimes})
          else this.setState({badRes: true})
        })
        .then(() => this.setState({isLoading: false}))
    }
  }

  searchCrime = (text: string) => {
    this.setState({text: text})
    this.getCrimesWithParams(text)
  }

  onPressCrime = (item: Crime) => {}

  // filterList = (text: string) => {
  //   let {crimes} = this.state
  //   // this.setState({text: text})
  //   if (!crimes) return
  //   let filteredCrimes = crimes.filter(crime => {
  //     let {type, location} = crime
  //     let {name} = location
  //     type = type.toLowerCase()
  //     name.toLowerCase()
  //     let combine = type + name
  //     let combineReverse = name + type
  //     let formTxt = text.toLowerCase().replace(/[ ,.]/g, '')
  //     if (combine.toLowerCase().includes(formTxt)) return true
  //     if (combineReverse.toLowerCase().includes(formTxt)) return true
  //     return false
  //   })
  //   return this.setState({filteredCrimes: filteredCrimes})
  // }
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
