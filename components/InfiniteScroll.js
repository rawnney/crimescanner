// @flow
import React, {PureComponent} from 'react'
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native'

type Props = {
  onEndReached: Function,
  onRefresh: Function,
}

type State = {
  page: number,
  isSending: boolean,
  isRefreshing: boolean
}

export default class InfiniteScroll extends PureComponent<Props, State> {
  state = {
    page: 1,
    isSending: false,
    isRefreshing: false
  }

  render (): React$Element<View> {
    let {isRefreshing} = this.state
    return <FlatList
      {...this.props}
      onEndReached={this.onEndReached}
      onRefresh={this.onRefresh}
      refreshing={isRefreshing}
      ListFooterComponent={this.renderFooter}
    />
  }

  renderFooter = (): React$Element<View> => {
    let {isSending} = this.state
    return isSending ? <ActivityIndicator size='small' style={styles.indicator} /> : <View />
  }

  onRefresh = () => {
    let {onRefresh} = this.props
    if (onRefresh) {
      this.setState({isRefreshing: true})
      onRefresh()
      this.setState({isRefreshing: false, page: 1})
    }
  }

  onEndReached = (): Promise<*> => {
    return new Promise(() => {
      let {onEndReached} = this.props
      let {page} = this.state
      page++
      this.setState({isSending: true, page: page})
      onEndReached(page)
    })
  }
}

export let styles = StyleSheet.create({
  indicator: {
    paddingTop: 25,
    paddingBottom: 25
  }
})
