import lazyWithReducer from 'app/store/lazyWithReducer'
import { PATHS } from 'src/app/constants/common'
import reducer from './store'
import Suppliers from './Coupons'
import Supplier from './coupon/Coupon'

const SuppliersAppPage = lazyWithReducer(
  'suppliersApp',
  () => import('./CouponsApp'),
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
