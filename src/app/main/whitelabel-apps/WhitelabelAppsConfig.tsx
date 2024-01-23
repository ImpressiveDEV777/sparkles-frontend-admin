import { lazy } from 'react'

const WhitelabelApps = lazy(() => import('./WhitelabelApps'))

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
      element: <WhitelabelApps />,
    },
  ],
}

export default WhitelabelAppsConfig
