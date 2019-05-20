// @flow
import {Component} from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import {findOccurrence, getPrevWeeksDates} from '../libs/Common'
import {getAllCrimesForDates} from '../libs/FirestoreActions'
import {goTo} from '../libs/AppNavigation'
import colors from '../libs/Colors'
import TextView from './TextView'
import LoadingView from './LoadingView'
import commonStyles from '../libs/CommonStyles'
import LineBreak from './LineBreak'
import NoCrimesView from './NoCrimesView'
import moment from '../libs/moment'
import ButtonWrapper from './ButtonWrapper'
import CrimeStatisticsExtendedContainer from './CrimeStatisticsExtendedContainer'

type Props = {
  user: User
}

type State = {
  crimes: Array<Crime>,
  isLoading: boolean,
  isNoCrimes: boolean,
  date: *
}

export default class CrimeStatisticsContainer extends Component<Props, State> {
  static routeName = 'CrimeStatisticsContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state),
    title: 'Veckans brott'
  })

  state = {isLoading: true, crimes: [], isNoCrimes: false, date: moment()}

  componentDidMount () {
    let {date} = this.state
    let dates = getPrevWeeksDates(date)
    getAllCrimesForDates(dates).then(res => {
      if (res.length === 0) this.setState({isNoCrimes: true})
      this.setState({crimes: res, isLoading: false})
    })
  }

  render (): React$Element<View> {
    let {isLoading, isNoCrimes} = this.state
    if (isLoading) return <LoadingView />
    if (isNoCrimes) return <NoCrimesView />
    return <View style={styles.container}>
      <ScrollView>
        {this.renderCrimes()}
      </ScrollView>
    </View>
  }

  renderCrimes = (): React$Element<View> => {
    let typeArrays = this.filterTypes()
    if (!typeArrays) return <View />
    return <View>
      {typeArrays.map(this.renderCrimeTypeItem)}
    </View>
  }

  /* eslint-disable react/jsx-no-bind */
  renderCrimeTypeItem = (item: Array<Crime>, index: number) => {
    let nrOfCrimes = item.length.toString()
    if (index === 0) return this.renderFeaturedCrime(item[0], index, nrOfCrimes)
    return <ButtonWrapper onPress={() => this.onPressItem(item[0])} key={index}>
      <View style={styles.listItemwrapper}>
        <TextView text={nrOfCrimes} style={styles.number} />
        <TextView text={item[0].icon} style={styles.icon} />
        <TextView text={item[0].type} style={styles.type} />
      </View>
      <LineBreak />
    </ButtonWrapper>
  }

  renderFeaturedCrime = (crime: Crime, index: number, nrOfCrimes: string): React$Element<View> => {
    return <ButtonWrapper onPress={() => this.onPressItem(crime)} key={index}>
      <View style={styles.bigListItemwrapper}>
        <TextView text={nrOfCrimes} style={styles.bigNumber} />
        <TextView text={crime.icon} style={styles.bigIcon} />
        <View style={styles.bigColumn}>
          <TextView text={crime.type} style={styles.bigType} />
          <TextView text={'Trendar i ' + this.getPopularCrimeArea()} style={styles.bigLocation} />
        </View>
      </View>
      <LineBreak />
    </ButtonWrapper>
  }
  /* eslint-enable react/jsx-no-bind */

  onPressItem = (crime: Crime): Promise<Object> => {
    let {crimes} = this.state
    if (!crime) return Promise.reject(crime)
    let {type} = crime
    let filteredCrimes = crimes.filter(crime => crime.type === type)
    return goTo(CrimeStatisticsExtendedContainer, {crimes: filteredCrimes})
  }

  getPopularCrimeArea = (): string => {
    let typeArrays = this.filterTypes()
    if (!typeArrays) return ''
    let locations: Array<string> = typeArrays[0].map(crime => crime.location.name)
    return findOccurrence(locations)
  }

  filterTypes = (): Array<Array<Crime>> => {
    let {crimes} = this.state
    let types = []
    crimes.map(crime => {
      if (!types.includes(crime.type)) types.push(crime.type)
    })

    let typeArrays = []
    types.map(type => {
      let filteredCrimes = crimes.filter(crime => crime.type === type)
      if (!typeArrays.includes(filteredCrimes)) typeArrays.push(filteredCrimes)
    })
    return typeArrays.sort((a, b) => b.length - a.length)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  listItemwrapper: {
    flex: 1,
    flexDirection: 'row',
    padding: commonStyles.space,
    alignItems: 'center'
  },
  number: {
    fontSize: 16,
    marginRight: commonStyles.smallSpace,
    minWidth: 20
  },
  icon: {
    fontSize: 16,
    padding: commonStyles.smallSpace
  },
  type: {
    fontSize: 16
  },
  bigListItemwrapper: {
    flex: 1,
    flexDirection: 'row',
    padding: commonStyles.space,
    paddingBottom: commonStyles.space,
    paddingTop: commonStyles.space * 2,
    alignItems: 'center'
  },
  bigColumn: {
    flexDirection: 'column',
    marginLeft: commonStyles.space
  },
  bigLocation: {
    fontSize: 14
  },
  bigNumber: {
    fontSize: 20,
    marginRight: commonStyles.smallSpace,
    minWidth: 20
  },
  bigIcon: {
    fontSize: 22,
    padding: commonStyles.smallSpace
  },
  bigType: {
    fontSize: 20,
    marginBottom: commonStyles.smallSpace
  }
})
