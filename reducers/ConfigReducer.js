// @flow
import {getConfig} from '../libs/Config'
export default (state: Object = getConfig(), action: {type: string, config: Object}) => {
  switch (action.type) {
    case 'UPDATE_CONFIG': return action.config
    default: return state
  }
}
