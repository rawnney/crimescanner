// @flow
import {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import colors from '../libs/Colors'
import {goTo} from '../libs/AppNavigation'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import CardButton from './CardButton'
import CrimeNearContainer from './CrimeNearContainer'
import CrimeSearchContainer from './CrimeSearchContainer'
import CrimeForumContainer from './CrimeForumContainer'
import CrimeStatisticsContainer from './CrimeStatisticsContainer'
import UserSettingsContainer from './UserSettingsContainer'
import {LOCATION_ARROW, SEARCH, COMMENT, CHART_BAR, BARCODE, COG} from '../consts/Icons'
import commonStyles from '../libs/CommonStyles'
import Icon from './Icon'

type Props = {
  user: User
}
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
      <View style={styles.wrapper}>
        <CardButton onPress={this.goToCrimeNearContainer} icon={LOCATION_ARROW} titleLangKey='crime_near_you_title' subtitleLangKey='crime_near_you_subtitle' />
        <CardButton onPress={this.goToCrimeSearchContainer} icon={SEARCH} titleLangKey='crime_search_title' subtitleLangKey='crime_search_subtitle' />
        <CardButton onPress={this.goToCrimeForumContainer} icon={COMMENT} titleLangKey='crime_forum_title' subtitleLangKey='crime_forum_subtitle' />
        <CardButton onPress={this.goToCrimeStatistics} icon={CHART_BAR} titleLangKey='crime_statistics_title' subtitleLangKey='crime_statistics_subtitle' />
        <CardButton onPress={this.goToSettings} icon={COG} titleLangKey='crime_settings_title' subtitleLangKey='crime_settings_subtitle' />
      </View>
    </View>
  }

  goToCrimeNearContainer = () => {
    let {user} = this.props
    goTo(CrimeNearContainer, {user})
  }
  goToCrimeSearchContainer = () => {
    let {user} = this.props
    goTo(CrimeSearchContainer, {user})
  }
  goToCrimeForumContainer = () => {
    let {user} = this.props
    goTo(CrimeForumContainer, {user})
  }
  goToCrimeStatistics = () => {
    let {user} = this.props
    goTo(CrimeStatisticsContainer, {user})
  }
  goToSettings = () => {
    let {user} = this.props
    goTo(UserSettingsContainer, {user})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: commonStyles.space,
    backgroundColor: colors.white
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  logo: {
    marginTop: commonStyles.space,
    justifyContent: 'center',
    alignSelf: 'center'
  }
})
