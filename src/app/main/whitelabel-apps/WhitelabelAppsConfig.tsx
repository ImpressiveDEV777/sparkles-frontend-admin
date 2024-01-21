import lazyWithReducer from 'app/store/lazyWithReducer'
import reducer from './store/whitelabelsSlice'

const WhitelabelAppsPage = lazyWithReducer(
  'whitelabels',
  () => import('./WhitelabelAppsPage'),
  reducer,
)

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
