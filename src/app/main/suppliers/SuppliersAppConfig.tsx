import { PATHS } from 'src/app/constants/common'
import { lazy } from 'react'

const SuppliersApp = lazy(() => import('./SuppliersApp'))
const Supplier = lazy(() => import('./supplier/Supplier'))
const Suppliers = lazy(() => import('./Suppliers'))

const SuppliersAppConfig = {
  settings: {
    layout: {
      config: {
        footer: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: PATHS.SUPPLIERS,
      element: <SuppliersApp />,
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
