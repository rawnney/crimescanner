// @flow
import HomeContainer from '../components/HomeContainer'
import TestContainer from '../components/TestContainer'
import CrimeNearContainer from '../components/CrimeNearContainer'
import CrimeSearchContainer from '../components/CrimeSearchContainer'
import CrimeForumContainer from '../components/CrimeForumContainer'
import GeneralErrorContainer from '../components/GeneralErrorContainer'
import StartContainer from '../components/StartContainer'

export default (): Object => ({
  [StartContainer.routeName]: StartContainer,
  [HomeContainer.routeName]: HomeContainer,
  [CrimeNearContainer.routeName]: CrimeNearContainer,
  [CrimeSearchContainer.routeName]: CrimeSearchContainer,
  [CrimeForumContainer.routeName]: CrimeForumContainer,
  [GeneralErrorContainer.routeName]: GeneralErrorContainer,
  [TestContainer.routeName]: TestContainer
})
