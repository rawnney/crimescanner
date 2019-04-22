// @flow
import {Component} from 'react'
import {WebView} from 'react-native-webview'

export default class ViewWeb extends Component<*> {
  render (): * {
    return (
      <WebView
        source={{uri: 'https://polisen.se/aktuellt/handelser/2019/april/21/21-april-2228-sammanfattning-natt-vasterbottens-lan/'}}
        style={{marginTop: 20}}
      />
    )
  }
}
