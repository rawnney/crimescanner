// @flow
import HomeContainer from '../components/HomeContainer'
import TestContainer from '../components/TestContainer'
import CrimeNearContainer from '../components/CrimeNearContainer'
import CrimeSearchContainer from '../components/CrimeSearchContainer'
import CrimeForumContainer from '../components/CrimeForumContainer'
import GeneralErrorContainer from '../components/GeneralErrorContainer'
import StartContainer from '../components/StartContainer'
import SignUpContainer from '../components/SignUpContainer'
import LoginContainer from '../components/LoginContainer'
import SelectedCrimeContainer from '../components/SelectedCrimeContainer'
import UserSettingsContainer from '../components/UserSettingsContainer'
import DeleteAccountContainer from '../components/DeleteAccountContainer'
import CrimeStatisticsContainer from '../components/CrimeStatisticsContainer'

export default (): Object => ({
  [StartContainer.routeName]: StartContainer,
  [HomeContainer.routeName]: HomeContainer,
  [SignUpContainer.routeName]: SignUpContainer,
  [LoginContainer.routeName]: LoginContainer,
  [CrimeNearContainer.routeName]: CrimeNearContainer,
  [CrimeSearchContainer.routeName]: CrimeSearchContainer,
  [CrimeForumContainer.routeName]: CrimeForumContainer,
  [GeneralErrorContainer.routeName]: GeneralErrorContainer,
  [TestContainer.routeName]: TestContainer,
  [UserSettingsContainer.routeName]: UserSettingsContainer,
  [SelectedCrimeContainer.routeName]: SelectedCrimeContainer,
  [DeleteAccountContainer.routeName]: DeleteAccountContainer,
  [CrimeStatisticsContainer.routeName]: CrimeStatisticsContainer
})
