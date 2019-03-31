// @flow
import {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import TextView from './TextView'
import colors from '../libs/colors'
import Button from './Button'
import TestContainer from './TestContainer'
import {goTo} from '../libs/AppNavigation'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import CardButton from './CardButton'
import CrimesNearContainer from './CrimesNearContainer'
import {LOCATION_ARROW} from '../consts/Icons'

type Props = {}
type State = {}

export default class HomeContainer extends PureComponent<Props, State> {
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state),
    headerLeft: <View />
  })
  static routeName = 'HomeContainer'
  render (): React$Element<View> {
    return <View style={styles.container}>
      <TextView text='Logo' style={styles.logo} />
      <CardButton onPress={this.goToCrimesNearContainer} icon={LOCATION_ARROW} titleLangKey='crime_near_you_title' subtitleLangKey='crime_near_you_subtitle' />
      <CardButton onPress={this.goToCrimesNearContainer} icon={LOCATION_ARROW} titleLangKey='crime_near_you_title' subtitleLangKey='crime_near_you_subtitle' />
      {/* <Button text='text' onPress={this.goToTest} /> */}
    </View>
  }

  goToCrimesNearContainer = () => {
    goTo(CrimesNearContainer)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  logo: {
    justifyContent: 'center',
    alignSelf: 'center'
  }
})
