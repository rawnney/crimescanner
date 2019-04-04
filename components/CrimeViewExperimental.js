// @flow
import {PureComponent} from 'react'
import {View, StyleSheet, SectionList, FlatList} from 'react-native'
import colors from '../libs/colors'
// import LoadingScreen from './LoadingScreen'
import {keyExtractor} from '../libs/Common'
import CrimeListItem from './CrimeListItem'
// import NoCrimesView from './NoCrimesView'
import {mapTodaysCrimes, mapYesterdaysCrimes, mapOtherDaysCrimes} from '../libs/CrimeHelper'
import CrimeSectionHeader from './CrimeSectionHeader'
// import Config from '../libs/Config'

type Props = {
  crimes: Array<Object>,
  isLoading: boolean,
  onPressCrime: Function,
  isCrimes: boolean
}

type State = {
  crimes: Array<Crime>,
  isLoading: boolean
}

const SECTION_TODAY = 0
const SECTION_YESTERDAY = 1
const SECTION_OTHER = 2

export default class CrimeViewExperimental extends PureComponent<Props, State> {
  state = {crimes: [], isLoading: false}

  componentWillReceiveProps (nextProps: Props) {
    if (this.props.crimes !== nextProps.crimes) this.setState({crimes: nextProps.crimes})
    if (this.props.isLoading !== nextProps.isLoading) this.setState({isLoading: nextProps.isLoading})
  }

  render (): React$Element<View> {
    // let {isLoading, isCrimes} = this.props
    // if (isLoading) return <LoadingScreen />
    // if (!isCrimes) return <NoCrimesView />
    return <View style={styles.container}>
      {/* {Config.enableCrimeSectionList ? this.renderSectionList() : this.renderFlatList()} */}
    </View>
  }

  renderSectionList = () => {
    return <SectionList
      renderItem={this.renderCrimeListItem}
      renderSectionHeader={this.renderSectionHeader}
      sections={this.getSection()}
      keyExtractor={keyExtractor}
    />
  }

  renderFlatList = () => {
    let {crimes} = this.props
    return <FlatList
      data={crimes}
      renderItem={this.renderCrimeItemForFlatList}
      keyExtractor={keyExtractor}
    />
  }

  renderSectionHeader = ({section}: Object) => {
    let {crimes} = this.state
    let {data} = section
    if (crimes.length === 0 || data.length === 0) return <View />
    return <CrimeSectionHeader text={section.title} />
  }

  renderCrimeListItem = (data: Object) => {
    let {item, section, index} = data
    let {sectionType} = section
    switch (true) {
      case sectionType === SECTION_TODAY: return this.renderCrimeItem(index, item)
      case sectionType === SECTION_YESTERDAY: return this.renderCrimeItem(index, item)
      case sectionType === SECTION_OTHER: return this.renderCrimeItem(index, item)
      default: return <View />
    }
  }

  /* eslint-disable react/jsx-no-bind */
  renderCrimeItem = (index: number, item: Crime) => <CrimeListItem onPress={() => this.onPressCrime(item)} crime={item} key={index} />

  renderCrimeItemForFlatList = ({item}: Object) => <CrimeListItem onPress={() => this.onPressCrime(item)} crime={item} />

  getSection = () => {
    let section = [
      {title: 'Today', sectionType: SECTION_TODAY, data: this.crimesToday()},
      {title: 'Yesterday', sectionType: SECTION_YESTERDAY, data: this.crimesYesterday()},
      {title: '', sectionType: SECTION_OTHER, data: this.crimesOtherDays()}
    ]
    return section
  }

  crimesToday = () => {
    let {crimes} = this.state
    let crimesToday = mapTodaysCrimes(crimes)
    return crimesToday
  }

  crimesYesterday = () => {
    let {crimes} = this.state
    let crimesYesterday = mapYesterdaysCrimes(crimes)
    return crimesYesterday
  }

  crimesOtherDays = () => {
    let {crimes} = this.state
    let crimesOtherDays = mapOtherDaysCrimes(crimes)
    return crimesOtherDays
  }

  onPressCrime = (item: Crime) => {
    let {onPressCrime} = this.props
    if (onPressCrime) onPressCrime(item)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
})
