import { Outlet } from 'react-router-dom'
import withReducer from 'app/store/withReducer'
import reducer from './store'

function FrameSizesApp() {
  return <Outlet />
}
export default withReducer('frameSizesApp', reducer)(FrameSizesApp)
