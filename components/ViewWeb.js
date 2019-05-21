// @flow
import {Component} from 'react'
import {StyleSheet} from 'react-native'
import {WebView} from 'react-native-webview'

type Props = {
  url: string,
  injectedJavaScript?: *,
  style?: StyleSheet,
  useWebKit?: boolean,
  startInLoadingState?: boolean
}

export default class ViewWeb extends Component<Props> {
  render (): * {
    let {url, injectedJavaScript, style, useWebKit, startInLoadingState} = this.props
    return <WebView
      source={{uri: url}}
      style={[styles.webView, style]}
      injectedJavaScript={injectedJavaScript}
      javaScriptEnabled
      originWhitelist={['*']}
      useWebKit={useWebKit}
      thirdPartyCookiesEnabled={false}
      startInLoadingState={startInLoadingState || true}
    />
  }
}

const styles = StyleSheet.create({
  webView: {
    width: '100%',
    overflow: 'hidden'
  }
})
