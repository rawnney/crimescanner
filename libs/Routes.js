// @flow
import HomeContainer from '../components/HomeContainer'
import TestContainer from '../components/TestContainer'

export default () => ({
  [HomeContainer.routeName]: HomeContainer,
  [TestContainer.routeName]: TestContainer
})
