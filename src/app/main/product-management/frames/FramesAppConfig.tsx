import { lazy } from 'react'
import { PATHS } from 'src/app/constants/common'

const FrameSizesApp = lazy(() => import('./FramesApp'))
const FrameSizes = lazy(() => import('./frames/Frames'))

/**
 * The E-Commerce app configuration.
 */
const FramesAppConfig = {
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
      path: PATHS.FRAMES,
      element: <FrameSizesApp />,
      children: [
        {
          path: '',
          element: <FrameSizes />,
        },
        {
          path: ':frameTypeId',
          element: <FrameSizes />,
        },
      ],
    },
  ],
}

export default FramesAppConfig
