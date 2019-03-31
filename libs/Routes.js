// @flow
import StartContainer from '../components/StartContainer'
import TestContainer from '../components/TestContainer'

export default () => ({
  [StartContainer.routeName]: StartContainer,
  [TestContainer.routeName]: TestContainer
})
