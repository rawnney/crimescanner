// @flow
import {PureComponent, View, StyleSheet} from 'react-native'
import ButtonWrapper from './ButtonWrapper'
import Icon from './Icon'
import TextView from './TextView'

type Props = {
  onPress: () => Promise<*>,
  icon: string,
  titleLangKey: string,
  subtitleLangKey: string
}

type State = {}

export default class CardButton extends PureComponent<Props, State> {
  render (): React$Element<View> {
    let {onPress, icon, titleLangKey, subtitleLangKey} = this.props
    return <ButtonWrapper onPress={onPress} style={styles.container}>
      <Icon name={icon} style={styles.iconStyle} />
      <View style={styles.textWrapper}>
        <TextView langKey={titleLangKey} />
        <TextView text={subtitleLangKey} />
      </View>
    </ButtonWrapper>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconStyle: {
    flex: 1
  },
  textWrapper: {
    flex: 1
  }
})
