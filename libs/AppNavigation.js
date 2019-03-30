// @flow
import idx from 'idx'

export let goTo = (comp: *, params: Object) => {
  var paramObject = idx(this, _ => _.props.navigation.state.params)
}
