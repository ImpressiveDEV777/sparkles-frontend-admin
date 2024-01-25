import { Outlet } from 'react-router-dom'
import withReducer from 'app/store/withReducer'
import reducer from './store'

function SubCategoriesApp() {
  return <Outlet />
}
export default withReducer('categoriesApp', reducer)(SubCategoriesApp)
