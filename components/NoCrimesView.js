// @flow
import {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import TextView from './TextView'
import colors from '../libs/colors'
import commonStyles from '../libs/CommonStyles'

type Props = {
  style?: StyleSheet
}

export default class NoCrimesView extends Component<Props> {
  render (): React$Element<View> {
    let {style} = this.props
    return <View style={[styles.container, style]}>
      <TextView langKey='no_crime_found_text' style={styles.text} />
      <TextView langKey='no_crime_found_emoji' style={styles.emoji} />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    justifyContent: 'center',
    backgroundColor: colors.white
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
    color: colors.black,
    marginBottom: commonStyles.space
  },
  emoji: {
    alignSelf: 'center',
    fontSize: 25
  }
})
