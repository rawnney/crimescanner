// @flow
import Config from 'react-native-config'
// import DeviceInfo from 'react-native-device-info'
import Configurations from '../config/Configurations'
// import * as DeviceModelConfig from '../config/DeviceModelConfig'
// import * as CountryConfig from '../config/CountryConfig'
// import * as LangConfig from '../config/LangConfig'
// import * as PlatformConfig from '../config/PlatformConfig'

function getConfiguration (env = Config.VP_ENVIRONMENT): Object {
  var config = Configurations[env]
  if (!config) throw new Error(`Cant find Config: '${env}'`)
  return config
}

export function mapConfiguration (config: * = getConfiguration(), user?: User): ConfigurationTypes {
  config = {...config, ...config.features}
  // config = {...config, ...LangConfig.getFeatures(config.name, user)}
  // config = {...config, ...CountryConfig.getFeatures(config.name, user)}
  // config = {...config, ...DeviceModelConfig.getFeatures(DeviceInfo.getModel())}
  // config = {...config, ...PlatformConfig.features}
  return config
}

export let isDev = (): boolean => typeof __DEV__ === 'boolean' ? __DEV__ : false

export let isNotProd = (): boolean => {
  let {name} = getConfiguration()
  return name !== 'Production' && name !== 'ProductionStage'
}

export let isDevConfig = () => {
  let {name} = getConfiguration()
  return name === 'Development'
}

export let getConfig = (user?: User): ConfigurationTypes => mapConfiguration(getConfiguration() /*, user */)

export default getConfig()
