import { lazy } from 'react'

const WhitelabelAppsPage = lazy(() => import('./WhitelabelAppsPage'))

/**
 * The Example page config.
 */
const WhitelabelAppsConfig = {
  settings: {
    layout: {
      footer: {
        display: false,
      },
    },
  },
  routes: [
    {
      path: 'whitelabel-apps',
      element: <WhitelabelAppsPage />,
    },
  ],
}

export default WhitelabelAppsConfig
