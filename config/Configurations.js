// @flow

let baseFeatureConfig = {
  enableLanguageSupport: false,
  enableVibration: false,
  enableFirestore: false,
  enableSignUp: false
}

let baseConfiguration = {}

let Development = {
  ...baseConfiguration,
  name: 'Development',
  features: {
    ...baseFeatureConfig,
    enableFirestore: true,
    enableAutoUpdateDB: true,
    enableSignUp: false
  }
}

let Production = {
  ...baseConfiguration,
  name: 'Production',
  features: {
    ...baseFeatureConfig,
    enableFirestore: true,
    enableSignUp: false
  }
}

export default {
  Development,
  Production
}
