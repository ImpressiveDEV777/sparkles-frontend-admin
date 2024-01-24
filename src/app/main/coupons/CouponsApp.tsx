import { Outlet } from 'react-router-dom'
import withReducer from 'app/store/withReducer'
import reducer from './store'

function CouponsApp() {
  return <Outlet />
}
export default withReducer('couponsApp', reducer)(CouponsApp)
