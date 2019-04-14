// @flow
import {PureComponent} from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import colors from '../libs/Colors'
import {getCrimes} from '../libs/CrimeHelper'
import TextView from './TextView'
import LoadingView from './LoadingView'

type Props = {
  user: User
}

type State = {
  crimes: Array<Crime>,
  loading: boolean
}

export default class CrimeStatisticsContainer extends PureComponent<Props, State> {
  static routeName = 'CrimeStatisticsContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state)
  })

  state = {loading: true, crimes: []}

  componentDidMount () {
    getCrimes().then(crimes => {
      this.setState({crimes: crimes, loading: false})
    })
  }

  render (): React$Element<View> {
    let {loading} = this.state
    if (loading) return <LoadingView />
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

  renderCrimeTypeItem = (item: Array<Crime>, index: number) => {
    return <View key={index}>
      <TextView text={item.length.toString()} />
      <TextView text={item[0].type} />
    </View>
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
  }
})
