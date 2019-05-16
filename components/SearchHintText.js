// @flow
import {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import TextView from './TextView'
import colors from '../libs/Colors'
import commonStyles from '../libs/CommonStyles'

type Props = {
  style?: StyleSheet
}

export default class SearchHintText extends Component<Props> {
  render (): React$Element<View> {
    let {style} = this.props
    return <View style={[styles.hintContainer, style]}>
      <TextView text='Sök efter någonting' style={styles.hintText} />
      <TextView text='🕵️' style={styles.hintEmoji} />
    </View>
  }
}

const styles = StyleSheet.create({
  hintContainer: {
    flex: 1,
    height: 400,
    justifyContent: 'center',
    backgroundColor: colors.white
  },
  hintText: {
    alignSelf: 'center',
    fontSize: 20,
    color: colors.black,
    marginBottom: commonStyles.space
  },
  hintEmoji: {
    alignSelf: 'center',
    fontSize: 30
  }
})
