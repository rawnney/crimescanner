// @flow
import CustomNavHeader from '../components/CustomNavHeader'

export let getDefaultNavigationOptions = (headerProps: *) => {
  return {
    header: (headerProps: Object) => <CustomNavHeader {...headerProps} />,
    gesturesEnabled: true,
    component: {},
    routeName: '',
    props: {}
  }
}
