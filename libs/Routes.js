// @flow
import HomeContainer from '../components/HomeContainer'
import TestContainer from '../components/TestContainer'
import CrimesNearContainer from '../components/CrimesNearContainer'
import CrimeSearchContainer from '../components/CrimeSearchContainer'
import CrimeForumContainer from '../components/CrimeForumContainer'

export default (): Object => ({
  [HomeContainer.routeName]: HomeContainer,
  [TestContainer.routeName]: TestContainer,
  [CrimesNearContainer.routeName]: CrimesNearContainer,
  [CrimeSearchContainer.routeName]: CrimeSearchContainer,
  [CrimeForumContainer.routeName]: CrimeForumContainer
})
