// @flow
import React from 'react'
// import PropTypes from 'prop-types'
import {Dimensions, Text, StyleSheet} from 'react-native'

const {width, height} = Dimensions.get('window')
const flattenStyle = StyleSheet.flatten
const realWidth = height > width ? width : height

type Props = {
  style: StyleSheet,
  children: string,
  deviceBaseWidth: number
}

const ScalableText = ({deviceBaseWidth, style, children, ...props}: Props) => {
  const fontSize = flattenStyle(style).fontSize || 14
  const lineHeight = flattenStyle(style).lineHeight || fontSize * 1.2
  const scaledFontSize = Math.round(fontSize * realWidth / deviceBaseWidth)
  const scaledLineHeight = Math.round(lineHeight * realWidth / deviceBaseWidth)

  return <Text style={[style, {fontSize: scaledFontSize, lineHeight: scaledLineHeight}]} {...props}>
    {children}
  </Text>
}

ScalableText.defaultProps = {deviceBaseWidth: 375}

export default ScalableText
