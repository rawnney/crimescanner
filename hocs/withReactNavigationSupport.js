// @flow
import React from 'react'
import {getDefaultNavigationOptions} from '../libs/getDefaultNavigationOptions'
// import {logger} from '../libs/Common'
import idx from 'idx'

export default (WrappedComponent: Object) => {
  return class extends React.Component<{navigation: {state: *}}, {}> {
    static navigationOptions = WrappedComponent.navigationOptions || getDefaultNavigationOptions;
    static routeName = WrappedComponent.routeName;
    componentDidMount () {
      // var routeName = idx(this, _ => _.props.navigation.state.routeName) || 'ERROR'
      // logger('goTo(' + routeName + ')')
    }

    render (): React$Element<*> {
      var paramObject = idx(this, _ => _.props.navigation.state.params) || idx(this, _ => _.props.navigation.state.screenProps) || {}
      var params = {...this.props, ...paramObject}
      return <WrappedComponent ref='wrappedComponent' {...params} />
    }
  }
}
