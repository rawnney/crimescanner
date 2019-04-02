// @flow
import {PureComponent} from 'react'
import {View, StyleSheet, SectionList} from 'react-native'
import colors from '../libs/colors'
import LoadingScreen from './LoadingScreen'
import {keyExtractor} from '../libs/Common'
// import CrimeListItem from './CrimeListItem'
import NoCrimesView from './NoCrimesView'
import TextView from './TextView'
import {mapTodaysCrimes, mapYesterdaysCrimes} from '../libs/CrimeHelper'
import CrimeSectionHeader from './CrimeSectionHeader'

type Props = {
  crimes: Array<Object>,
  isLoading: boolean,
  onPressCrime: Function,
  isCrimes: boolean
}

type State = {
}

const SECTION_TODAY = 0
const SECTION_YESTERDAY = 1
const SECTION_OTHER = 2

export default class CrimeView extends PureComponent<Props, State> {
  render (): React$Element<View> {
    let {crimes, isLoading, isCrimes} = this.props
    if (isLoading) return <LoadingScreen />
    if (!isCrimes) return <NoCrimesView />
    return <View style={styles.container}>
      <SectionList
        renderItem={this.renderCrimeListItem} // ({item, index, section}) => <Text key={index}>{item}</Text>}
        renderSectionHeader={this.renderSectionHeader}
        sections={this.getSection()}
        keyExtractor={keyExtractor}
      />
      {/* <FlatList
        data={crimes}
        renderItem={this.renderCrimeListItem}
        keyExtractor={keyExtractor}
      /> */}
    </View>
  }

  renderSectionHeader = ({section}: Object) => {
    return <CrimeSectionHeader text={section.title} />
    // return <View>
    //   <TextView text={section.title /* section.title */} />
    // </View>
  }
  /* eslint-disable react/jsx-no-bind */
  renderCrimeListItem = (data: Object) => {
    let {item, section, index} = data
    let {sectionType} = section
    switch (true) {
      case sectionType === SECTION_TODAY: return <TextView text={item.title} key={index} />
      case sectionType === SECTION_YESTERDAY: return <TextView text={item.title} key={index} />
      case sectionType === SECTION_OTHER: return <TextView text={item.title} key={index} />
      default: return <View />
    }
    // return <CrimeListItem onPress={() => this.onPressCrime(item)} crime={item} />
  }

  getSection = () => {
    let section = [
      {title: 'Today', sectionType: SECTION_TODAY, data: this.crimesToday()},
      {title: 'Yesterday', sectionType: SECTION_YESTERDAY, data: this.crimesYesterday()},
      {title: 'Other', sectionType: SECTION_OTHER, data: ['item5', 'item6']}
    ]
    return section
  }

  crimesToday = () => {
    let {crimes} = this.props
    let crimesToday = mapTodaysCrimes(crimes)
    console.warn(crimesToday)
    return crimesToday
    // crimes.map((item, index) => item)
  }

  crimesYesterday = () => {
    let {crimes} = this.props
    let crimesYesterday = mapYesterdaysCrimes(crimes)
    console.warn(crimesYesterday)
    return crimesYesterday
    // crimes.map((item, index) => item)
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
