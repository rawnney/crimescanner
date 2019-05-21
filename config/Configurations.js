// @flow

let baseFeatureConfig = {
  enableLanguageSupport: false,
  enableVibration: false,
  enableAutoUpdateDB: false,
  enableSignUp: false,
  enablePolisenWebView: false
}

let baseConfiguration = {}

let Development = {
  ...baseConfiguration,
  name: 'Development',
  features: {
    ...baseFeatureConfig,
    enableAutoUpdateDB: true,
    enableSignUp: true,
    enablePolisenWebView: true
  }
}

let Production = {
  ...baseConfiguration,
  name: 'Production',
  features: {
    ...baseFeatureConfig,
    enableSignUp: false
  }
}

export default {
  Development,
  Production
}
