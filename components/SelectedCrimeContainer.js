// @flow
import React, {Component} from 'react'
import {ScrollView, View, StyleSheet} from 'react-native'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import {openURL} from '../libs/WebViewHelper'
import {INFO_CIRCLE} from '../consts/Icons'
import commonStyles from '../libs/CommonStyles'
import Icon from './Icon'
import TextView from './TextView'
import LineBreak from './LineBreak'
import Fonts from '../libs/Fonts'
import IconTextButton from './IconTextButton'
import colors from '../libs/Colors'

type State = {}

type Props = {
  crime: Crime
}

export default class SelectedCrimeContainer extends Component<Props, State> {
  static routeName = 'SelectedCrimeContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state)
  })

  render (): React$Element<View> {
    let {crime} = this.props
    let {type, location, summary, icon, displayTime} = crime
    let {name} = location
    return <View style={[styles.container]}>
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.iconTypeWrapper}>
            <Icon name={icon} iconStyle={styles.icon} />
            <TextView text={type} style={styles.type} />
          </View>
          <TextView text={name} style={styles.location} />
          <TextView text={displayTime} style={styles.date} />
          <TextView text={summary} style={styles.summary} />
          <IconTextButton name={INFO_CIRCLE} text='Läs mer på polisens hemsida' horisontal onPress={this.onPressUrl} style={styles.link} color={colors.gray} />
          {/* <TextView text={content} /> */}
        </View>
        <LineBreak />
      </ScrollView>
    </View>
  }

  onPressUrl = () => {
    let {crime} = this.props
    let {url} = crime
    if (url) openURL(url)
  }
}

export let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    paddingBottom: commonStyles.space,
    paddingTop: commonStyles.space,
    marginLeft: commonStyles.space,
    marginRight: commonStyles.space
  },
  iconTypeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: commonStyles.space
  },
  icon: {
    padding: 0,
    marginRight: commonStyles.smallSpace
  },
  summary: {
    paddingBottom: commonStyles.smallSpace
  },
  type: {
    ...Fonts.semiBold,
    fontSize: 20
  },
  location: {
    ...Fonts.semiBold,
    fontSize: 16,
    marginBottom: 5
  },
  date: {
    ...Fonts.light,
    fontSize: 16,
    marginBottom: commonStyles.smallSpace
  },
  link: {
    paddingLeft: 0
  }
})
