// @flow
import HomeContainer from '../components/HomeContainer'
import TestContainer from '../components/TestContainer'
import CrimesNearContainer from '../components/CrimesNearContainer'

export default () => ({
  [HomeContainer.routeName]: HomeContainer,
  [TestContainer.routeName]: TestContainer,
  [CrimesNearContainer.routeName]: CrimesNearContainer
})
