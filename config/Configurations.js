// @flow

let baseFeatureConfig = {
  enableLanguageSupport: false,
  enableVibration: false,
  enableLogger: false,
  enableFirestore: false,
  enableSignUp: false
}

let baseConfiguration = {}

let Development = {
  ...baseConfiguration,
  name: 'Development',
  features: {
    ...baseFeatureConfig,
    enableLogger: true,
    enableFirestore: true,
    enableSignUp: true
  }
}

let Production = {
  ...baseConfiguration,
  name: 'Production',
  features: {
    ...baseFeatureConfig,
    enableLogger: false,
    enableFirestore: true,
    enableSignUp: false
  }
}

export default {
  Development,
  Production
}
