// @flow
import {PureComponent} from 'react'
import {View, StyleSheet, FlatList} from 'react-native'
import colors from '../libs/colors'
import LoadingScreen from './LoadingScreen'
import {keyExtractor} from '../libs/Common'
import CrimeListItem from './CrimeListItem'

type Props = {
  crimes: Array<Object>,
  isLoading: boolean,
  onPressCrime: Function
}

type State = {
}

export default class CrimeView extends PureComponent<Props, State> {
  state = {}

  // componentWillReceiveProps (nextProps: Props) {
  //   if (this.props.crimes !== nextProps.crimes)
  //     this.setState({crimes: nextProps.crimes})
  // }

  render (): React$Element<View> {
    let {crimes, isLoading} = this.props
    if (isLoading) return <LoadingScreen />
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
