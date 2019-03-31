// @flow
import {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import colors from '../libs/colors'
import {goTo} from '../libs/AppNavigation'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import CardButton from './CardButton'
import CrimesNearContainer from './CrimesNearContainer'
import CrimeSearchContainer from './CrimeSearchContainer'
import CrimeForumContainer from './CrimeForumContainer'
import CrimeStatisticsContainer from './CrimeStatisticsContainer'
import {LOCATION_ARROW, SEARCH, COMMENT, CHART_BAR, BARCODE} from '../consts/Icons'
import Icon from './Icon'
import commonStyles from '../libs/CommonStyles'

type Props = {}
type State = {}

export default class HomeContainer extends PureComponent<Props, State> {
  static routeName = 'HomeContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state),
    headerLeft: <View />,
    headerStyle: commonStyles.invisibleHeader
  })
  render (): React$Element<View> {
    return <View style={styles.container}>
      <Icon name={BARCODE} size={50} style={styles.logo} />
      <CardButton onPress={this.goToCrimesNearContainer} icon={LOCATION_ARROW} titleLangKey='crime_near_you_title' subtitleLangKey='crime_near_you_subtitle' />
      <CardButton onPress={this.goToCrimeSearchContainer} icon={SEARCH} titleLangKey='crime_search_title' subtitleLangKey='crime_search_subtitle' />
      <CardButton onPress={this.goToCrimeForumContainer} icon={COMMENT} titleLangKey='crime_forum_title' subtitleLangKey='crime_forum_subtitle' />
      <CardButton onPress={this.goToCrimeStatistics} icon={CHART_BAR} titleLangKey='crime_statistics_title' subtitleLangKey='crime_statistics_subtitle' />
    </View>
  }
  goToCrimesNearContainer = () => goTo(CrimesNearContainer)
  goToCrimeSearchContainer = () => goTo(CrimeSearchContainer)
  goToCrimeForumContainer = () => goTo(CrimeForumContainer)
  goToCrimeStatistics = () => goTo(CrimeStatisticsContainer)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: commonStyles.space,
    backgroundColor: colors.white
  },
  logo: {
    justifyContent: 'center',
    alignSelf: 'center'
  }
})
