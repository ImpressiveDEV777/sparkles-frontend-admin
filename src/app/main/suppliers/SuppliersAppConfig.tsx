import lazyWithReducer from 'app/store/lazyWithReducer'
import { PATHS } from 'src/app/constants/common'
import reducer from './store'
import Suppliers from './Suppliers'
import Supplier from './supplier/Supplier'

const SuppliersAppPage = lazyWithReducer(
  'suppliersApp',
  () => import('./SuppliersApp'),
  reducer,
)

const SuppliersAppConfig = {
  settings: {
    layout: {
      footer: {
        display: false,
      },
    },
  },
  routes: [
    {
      path: PATHS.SUPPLIERS,
      element: <SuppliersAppPage />,
      children: [
        {
          path: '',
          element: <Suppliers />,
        },
        {
          path: ':supplierId',
          element: <Supplier />,
        },
      ],
    },
  ],
}

export default SuppliersAppConfig
