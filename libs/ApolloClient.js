// @flow
import {GQL_SIMPLE_API_KEY} from '../consts/ApiKeys'
import {ApolloClient} from 'apollo-boost'
// import {HttpLink} from 'apollo-link-http'
// import {InMemoryCache} from 'apollo-cache-inmemory'

// const fetch = require('node-fetch')

// const httpLink = new HttpLink({uri: GQL_SIMPLE_API_KEY}, fetch)

export let client = new ApolloClient({
  uri: GQL_SIMPLE_API_KEY
  // link: httpLink,
  // cache: new InMemoryCache()
})
