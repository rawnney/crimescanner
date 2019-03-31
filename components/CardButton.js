// @flow
import {PureComponent} from 'react'
import {View, StyleSheet} from 'react-native'
import ButtonWrapper from './ButtonWrapper'
import Icon from './Icon'
import TextView from './TextView'
import colors from '../libs/colors'
import commonStyles from '../libs/CommonStyles'
import Fonts from '../libs/Fonts'

type Props = {
  onPress: Function,
  icon: string,
  titleLangKey: string,
  subtitleLangKey: string
}

type State = {}

export default class CardButton extends PureComponent<Props, State> {
  render (): React$Element<View> {
    let {onPress, icon, titleLangKey, subtitleLangKey} = this.props
    return <ButtonWrapper onPress={onPress} style={styles.container}>
      <View style={styles.iconWrapper}>
        <Icon name={icon} color={colors.white} />
      </View>
      <View style={styles.textWrapper}>
        <TextView langKey={titleLangKey} style={styles.title} />
        <TextView langKey={subtitleLangKey} style={styles.subtitle} />
      </View>
    </ButtonWrapper>
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.deepSparkle,
    margin: commonStyles.smallSpace
  },
  iconWrapper: {
    flex: 0.6,
    alignItems: 'center'
  },
  textWrapper: {
    flex: 1,
    marginRight: commonStyles.space
  },
  title: {
    ...Fonts.bold,
    fontSize: 16,
    color: colors.white,
    marginBottom: commonStyles.smallSpace
  },
  subtitle: {
    color: colors.white
  }
})
