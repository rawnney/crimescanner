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

type State = {}

export default class CrimeView extends PureComponent<Props, State> {
  render (): React$Element<View> {
    let {crimes, isLoading} = this.props
    if (isLoading) return <LoadingScreen />
    return <View style={styles.container}>
      <FlatList
        data={crimes}
        renderItem={this.renderCrimeItem}
        ListEmptyComponent={this.renderEmptyState}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  }

  /* eslint-disable react/jsx-no-bind */
  renderCrimeItem = ({item}: Object): React$Element<View> => <CrimeListItem onPress={() => this.onPressCrime(item)} crime={item} />

  renderEmptyState = (): React$Element<View> => {
    let {isCrimes} = this.props
    if (!isCrimes) return <NoCrimesView />
    return <View />
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
  },
  contentContainerStyle: {
  }
})
