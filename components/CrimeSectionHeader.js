// @flow
import {PureComponent} from 'react'
import {View, StyleSheet} from 'react-native'
import TextView from './TextView'
import colors from '../libs/Colors'
import commonStyles from '../libs/CommonStyles'

type Props = {
  langKey?: string,
  text?: string
}

type State = {}

export default class CrimeSectionHeader extends PureComponent<Props, State> {
  render (): React$Element<View> {
    let {text, langKey} = this.props
    return <TextView text={text} langKey={langKey} style={styles.header} />
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: commonStyles.space,
    fontSize: 20,
    fontWeight: '600',
    color: colors.black
  }
})
