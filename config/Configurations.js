// @flow

let baseFeatureConfig = {
  enableLanguageSupport: false,
  enableVibration: false,
  enableLogger: false
}

let baseConfiguration = {}

let Development = {
  ...baseConfiguration,
  enableLogger: true,
  name: 'Development',
  features: {
    ...baseFeatureConfig
  }
}

let Production = {
  ...baseConfiguration,
  name: 'Production',
  features: {
    ...baseFeatureConfig
  }
}

export default {
  Development,
  Production
}
