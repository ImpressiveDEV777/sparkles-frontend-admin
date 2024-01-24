import { lazy } from 'react'
import { PATHS } from 'src/app/constants/common'

const CouponsApp = lazy(() => import('./CouponsApp'))
const Coupons = lazy(() => import('./Coupons'))
const Coupon = lazy(() => import('./coupon/Coupon'))

/**
 * The E-Commerce app configuration.
 */
const CouponsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: PATHS.COUPONS,
      element: <CouponsApp />,
      children: [
        {
          path: '',
          element: <Coupons />,
        },
        {
          path: ':couponId',
          element: <Coupon />,
        },
      ],
    },
  ],
}

export default CouponsAppConfig
