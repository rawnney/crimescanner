// @flow
import {PureComponent} from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import colors from '../libs/colors'
import TextView from './TextView'
import {getCrimesNearLocation} from '../libs/CrimeHelper'
import {getPosition} from '../libs/PositionHelper'
import LoadingScreen from './LoadingScreen'

type Props = {}

type State = {
  position: Object,
  crimes: Array<Object>,
  isLoading: boolean
}

export default class CrimesNearContainer extends PureComponent<Props, State> {
  static routeName = 'CrimesNearContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state)
  })

  state = {crimes: [], position: null, isLoading: false}

  componentDidMount () {
    this.setPositionAndCrimes()
  }
  render (): React$Element<View> {
    let {crimes, isLoading} = this.state
    if (isLoading) return <LoadingScreen />
    console.warn(crimes)
    return <View style={styles.container}>
      <ScrollView>
        {crimes ? crimes.map((item, index) => {
          return <TextView key={index} text={item.name} />
        }) : <View />}
      </ScrollView>
    </View>
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
          .then(crimes => this.setState({crimes}))
          .then(() => {
            let {position, crimes} = this.state
            if (position && crimes) this.setState({isLoading: false})
          })
      })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
})
