// @flow
import {Component} from 'react'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
import {StyleSheet} from 'react-native'
import commonStyles from '../libs/CommonStyles'
import ViewWeb from './ViewWeb'

type Props = {
  url: string
}

export default class CrimeWebContainer extends Component<Props> {
  static routeName = 'CrimeWebContainer'
  static navigationOptions = (state: *) => ({
    ...getDefaultNavigationOptions(state)
  })

  render (): * {
    let {url} = this.props
    return <ViewWeb url={url} style={styles.webView} />
  }
}

const styles = StyleSheet.create({
  webView: {
    height: commonStyles.vHeight - commonStyles.navBarHeightAndStatusBarHeight
  }
})
