// @flow
import {Component} from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import colors from '../libs/Colors'
import TextView from './TextView'
import LoadingView from './LoadingView'
import commonStyles from '../libs/CommonStyles'
import LineBreak from './LineBreak'
import {findOccurrence, getPrevWeeksDates} from '../libs/Common'
import {getAllCrimesForDates} from '../libs/FirestoreActions'

type Props = {
  user: User
}

type State = {
  crimes: Array<Crime>,
  loading: boolean,
  brand: Array<Crime>
}

export default class CrimeStatisticsContainer extends Component<Props, State> {
  static routeName = 'CrimeStatisticsContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state)
  })

  state = {loading: true, crimes: [], brand: []}

  componentDidMount () {
    let dates = getPrevWeeksDates()
    getAllCrimesForDates(dates).then(res => this.setState({crimes: res, loading: false}))
    // getCrimes().then(crimes => {
    //   this.setState({crimes: crimes, loading: false})
    // })
  }

  render (): React$Element<View> {
    let {loading} = this.state
    if (loading) return <LoadingView />
    return <View style={styles.container}>
      <ScrollView>
        {/* <TextView text={'Den här veckan'} />
        <TextView text={'brand ' + brand.length} /> */}
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

  renderCrimeTypeItem = (item: Array<Crime>, index: number) => {
    let nrOfCrimes = item.length.toString()
    // if (index === 0) return this.renderFeaturedCrime(item[index], index, nrOfCrimes)
    return <View key={index}>
      <View style={styles.listItemwrapper}>
        <TextView text={nrOfCrimes} style={styles.number} />
        <TextView text={item[0].icon} style={styles.icon} />
        <TextView text={item[0].type} style={styles.type} />
      </View>
      <LineBreak />
    </View>
  }

  renderFeaturedCrime = (crime: Crime, index: number, nrOfCrimes: string): React$Element<View> => {
    return <View key={index}>
      <View style={styles.bigListItemwrapper}>
        <TextView text={nrOfCrimes} style={styles.bigNumber} />
        <TextView text={crime.icon} style={styles.bigIcon} />
        <View style={styles.bigColumn}>
          <TextView text={crime.type} style={styles.bigType} />
          <TextView text={'Trendar i ' + this.getPopularCrimeArea()} style={styles.bigLocation} />
        </View>
      </View>
      <LineBreak />
    </View>
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
    types.forEach(type => {
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
    marginRight: commonStyles.smallSpace
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
    marginRight: commonStyles.smallSpace
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
