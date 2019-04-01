// @flow
import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import TextInput from './TextInput'
import {SEARCH, CROSS} from '../consts/Icons'

type Props = {
  onChangeText: Function,
  style?: StyleSheet,
  placeholder?: string,
  text?: string,
  focused?: boolean,
  onFocus?: Function,
  onPressX?: Function
}

type State = {
  text: string,
  focused: boolean
}

export default class SearchBar extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      focused: false,
      text: props.text || ''
    }
  }

  render (): React$Element<View> {
    let {style, placeholder} = this.props
    let {text} = this.state
    return (
      <View>
        <TextInput
          style={style}
          leftIcon={SEARCH}
          rightIcon={CROSS}
          hasXButton
          text={text}
          onChangeText={this.onChangeText}
          rightIconPress={this.onPressX}
          onFocus={this.onFocus}
          placeholder={placeholder}
        />
      </View>
    )
  }

  onChangeText = (text: string) => {
    var {onChangeText} = this.props
    this.setState({text})
    onChangeText(text)
  }

  onPressX = () => {
    var {onChangeText, onPressX} = this.props
    var {text} = this.state
    if (onPressX) onPressX()
    if (text.length > 0) this.setState({text: ''}, onChangeText(''))
  }

  onFocus = () => {
    let {onFocus} = this.props
    this.setState({focused: true})
    if (onFocus) onFocus()
  }
}
