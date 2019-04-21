// @flow
import colors from '../libs/Colors'
import {Component} from 'react'
import {View, StyleSheet, StatusBar} from 'react-native'
import {STATUS_BAR_DARK} from '../libs/Consts'
import {hasNotch} from '../libs/Common'
import BackButton from './BackButton'
import commonStyles from '../libs/CommonStyles'

type Props = {
  scene: {
    descriptor: {
      options: Object
    }
  }
}

type State = {}

export default class CustomNavHeader extends Component<Props, State> {
  render (): React$Element<View> {
    let {scene} = this.props
    let {options} = scene.descriptor
    if (!options) return <View style={styles.container} />
    let {headerRight, headerLeft, headerStyle, headerBarTint} = options
    return <View style={[styles.container, hasNotch() ? styles.notch : undefined, headerStyle]}>
      <StatusBar barStyle={headerBarTint || STATUS_BAR_DARK} />
      <View style={styles.headerLeft}>
        {headerLeft || <BackButton />}
      </View>
      <View style={styles.headerRight}>
        {headerRight}
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    elevation: -5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0,
    width: '100%',
    height: commonStyles.navBarHeightAndStatusBarHeight,
    borderColor: colors.transparent
  },
  notch: {
    marginTop: commonStyles.notchSpace
  },
  headerLeft: {
    top: 10,
    alignItems: 'flex-start'
  },
  headerRight: {
    top: 10,
    alignItems: 'flex-end'
  }
})
