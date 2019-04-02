// @flow
import HomeContainer from '../components/HomeContainer'
import TestContainer from '../components/TestContainer'
import CrimeNearContainer from '../components/CrimeNearContainer'
import CrimeSearchContainer from '../components/CrimeSearchContainer'
import CrimeForumContainer from '../components/CrimeForumContainer'
import GeneralErrorContainer from '../components/GeneralErrorContainer'

export default (): Object => ({
  [HomeContainer.routeName]: HomeContainer,
  [TestContainer.routeName]: TestContainer,
  [CrimeNearContainer.routeName]: CrimeNearContainer,
  [CrimeSearchContainer.routeName]: CrimeSearchContainer,
  [CrimeForumContainer.routeName]: CrimeForumContainer,
  [GeneralErrorContainer.routeName]: GeneralErrorContainer
})
