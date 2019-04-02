// @flow
import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import ButtonWrapper from './ButtonWrapper'
import {formatCrimeDate} from '../libs/Moment'
import {getCrimeIcon} from '../libs/CrimeHelper'
import Icon from './Icon'
import commonStyles from '../libs/CommonStyles'
import LineBreak from './LineBreak'
import TextView from './TextView'
import Fonts from '../libs/Fonts'

type Props = {
  onPress: Function,
  crime: Crime
}

export default class CrimeListItem extends Component <Props> {
  render (): React$Element<View> {
    let {crime, onPress} = this.props
    let {type, datetime, location, summary} = crime
    let {name} = location
    return <ButtonWrapper onPress={onPress}>
      <View style={styles.wrapper}>
        <View style={styles.iconTypeWrapper}>
          <Icon name={getCrimeIcon(type)} iconStyle={styles.icon} />
          <TextView style={styles.title} text={type} />
        </View>
        <TextView style={styles.location} text={name} />
        <TextView style={styles.date} text={formatCrimeDate(datetime)} />
        <TextView text={summary} />
      </View>
      <LineBreak />
    </ButtonWrapper>
  }
}

export let styles = StyleSheet.create({
  wrapper: {
    paddingTop: commonStyles.space,
    paddingBottom: commonStyles.space,
    marginLeft: commonStyles.space,
    marginRight: commonStyles.space
  },
  iconTypeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: commonStyles.space
  },
  title: {
    ...Fonts.bold,
    fontSize: 18
  },
  icon: {
    padding: 0,
    marginRight: commonStyles.smallSpace
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
  }
})
