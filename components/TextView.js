// @flow
import React, {Component} from 'react'
import {View, StyleSheet, DeviceEventEmitter} from 'react-native'
import ScalableText from './ScalableText'
import Fonts from '../libs/Fonts'
import {getText} from '../libs/TextHelper'
import {isEmulator, transformText} from '../libs/Common'

type Props = {
  text?: string,
  langKey?: string,
  values?: Array<*>,
  textTransform?: 'uppercase'|'capitalize'|'lowercase',
  style?: StyleSheet
}

type State = {
  text: string
}

export default class TextView extends Component <Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {text: this.getText(props) || ''}
  }

  componentDidMount () {
    DeviceEventEmitter.addListener('onLangChange', () => this.setState({text: this.getText(this.props)}))
  }

  componentWillReceiveProps (nextProps: *, nextState: *) {
    this.setState({text: this.getText(nextProps)})
  }

  shouldComponentUpdate (nextProps: *, nextState: *): boolean {
    return true
  }

  render (): React$Element<View> {
    let {style} = this.props
    var {text} = this.state
    return <View>
      <ScalableText style={[{...Fonts.regular}, style]}>
        {text.toString()}
      </ScalableText>
    </View>
  }

  getText (props: Props): string {
    var {text, langKey, values, textTransform} = props
    text = text || this.getTextFromLangKey(langKey, values)
    if (textTransform) return transformText(text)
    return text
  }

  getTextFromLangKey (langKey: string = '', values: Array<*> = []): string {
    var text = getText(langKey, values)
    // eslint-disable-next-line
    if (isEmulator() && text === '' && langKey !== '') console.warn(`Cant find text id: ${langKey}`)
    return text
  }
}
