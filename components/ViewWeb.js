// @flow
import {Component} from 'react'
import {StyleSheet} from 'react-native'
import {WebView} from 'react-native-webview'

type Props = {
  url: string,
  injectedJavaScript: *,
  style: StyleSheet
}

export default class ViewWeb extends Component<Props> {
  render (): * {
    let {url, injectedJavaScript, style} = this.props
    // let injectedJavaScript = `window.postMessage(document.querySelectorAll("text-body editorial-html")); true`
    return <WebView
      source={{uri: url}}
      style={[styles.webview, style]}
      injectedJavaScript={injectedJavaScript}
      javaScriptEnabled
      originWhitelist={['*']}
    />
  }
}

const styles = StyleSheet.create({
  webview: {
    height: 200,
    marginTop: 20
  }
})
