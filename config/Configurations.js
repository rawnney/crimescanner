// @flow

let baseFeatureConfig = {
  enableLanguageSupport: false,
  enableVibration: false,
  enableLogger: false,
  enableFirestore: false
}

let baseConfiguration = {}

let Development = {
  ...baseConfiguration,
  name: 'Development',
  features: {
    ...baseFeatureConfig,
    enableLogger: true,
    enableFirestore: true
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
