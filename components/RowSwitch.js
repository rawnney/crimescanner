// @flow
import {PureComponent} from 'react'
import {StyleSheet, View, Switch} from 'react-native'
import colors from '../libs/Colors'
import TextView from './TextView'
import commonStyles from '../libs/CommonStyles'
import LineBreak from './LineBreak'

type Props = {
  value: boolean,
  onValueChange: Function,
  langKey?: string,
  text: string
}

type State = {
  value: boolean
}

export default class RowSwitch extends PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      value: this.props.value
    }
  }

  render (): React$Element<View> {
    let {text, langKey} = this.props
    let {value} = this.state
    return <View>
      <View style={styles.container}>
        <TextView text={text} langKey={langKey} />
        <Switch value={value} onValueChange={this.toggle} />
      </View>
      <LineBreak />
    </View>
  }

  toggle = () => {
    let {onValueChange} = this.props
    let {value} = this.state
    this.setState({value: !value})
    onValueChange(!value)
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginLeft: commonStyles.space,
    marginRight: commonStyles.space,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
