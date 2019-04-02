// @flow
import {PureComponent} from 'react'
import {View, StyleSheet, FlatList} from 'react-native'
import colors from '../libs/colors'
import LoadingScreen from './LoadingScreen'
import {keyExtractor} from '../libs/Common'
import CrimeListItem from './CrimeListItem'
import NoCrimesView from './NoCrimesView'

type Props = {
  crimes: Array<Object>,
  isLoading: boolean,
  onPressCrime: Function,
  isCrimes: boolean
}

type State = {
}

export default class CrimeView extends PureComponent<Props, State> {
  render (): React$Element<View> {
    let {crimes, isLoading, isCrimes} = this.props
    if (isLoading) return <LoadingScreen />
    if (!isCrimes) return <NoCrimesView />
    return <View style={styles.container}>
      <FlatList
        data={crimes}
        renderItem={this.renderCrimeListItem}
        keyExtractor={keyExtractor}
      />
    </View>
  }
  /* eslint-disable react/jsx-no-bind */
  renderCrimeListItem = ({item}: Object) => <CrimeListItem onPress={() => this.onPressCrime(item)} crime={item} />

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
