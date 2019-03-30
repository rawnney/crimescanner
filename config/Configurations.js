// @flow

let baseFeatureConfig = {
  enableLanguageSupport: false,
  enableVibration: false
}

let baseConfiguration = {}

let Development = {
  ...baseConfiguration,
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
