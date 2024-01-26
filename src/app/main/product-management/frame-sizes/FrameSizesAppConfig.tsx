import { lazy } from 'react'
import { PATHS } from 'src/app/constants/common'

const FrameSizesApp = lazy(() => import('./FrameSizesApp'))
const FrameSizes = lazy(() => import('./FrameSizes'))

/**
 * The E-Commerce app configuration.
 */
const FrameSizesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: PATHS.FRAME_SIZES,
      element: <FrameSizesApp />,
      children: [
        {
          path: '',
          element: <FrameSizes />,
        },
      ],
    },
  ],
}

export default FrameSizesAppConfig
