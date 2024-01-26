import FuseUtils from '@fuse/utils'
import FuseLoading from '@fuse/core/FuseLoading'
import { Navigate } from 'react-router-dom'
import settingsConfig from 'app/configs/settingsConfig'
import { FuseRouteConfigsType, FuseRoutesType } from '@fuse/utils/FuseUtils'
import SignInConfig from '../main/sign-in/SignInConfig'
import SignOutConfig from '../main/sign-out/SignOutConfig'
import Error404Page from '../main/404/Error404Page'
import WhitelabelAppsConfig from '../main/whitelabel-apps/WhitelabelAppsConfig'
import SuppliersAppConfig from '../main/suppliers/SuppliersAppConfig'
import CouponsAppConfig from '../main/coupons/CouponsAppConfig'
import CategoriesAppConfig from '../main/product-management/categories/CategoriesAppConfig'
import SubCategoriesAppConfig from '../main/product-management/sub-categories/SubCategoriesAppConfig'
import FrameSizesAppConfig from '../main/product-management/frame-sizes/FrameSizesAppConfig'

const routeConfigs: FuseRouteConfigsType = [
  SuppliersAppConfig,
  CouponsAppConfig,
  CategoriesAppConfig,
  SubCategoriesAppConfig,
  WhitelabelAppsConfig,
  FrameSizesAppConfig,
  SignOutConfig,
  SignInConfig,
]

/**
 * The routes of the application.
 */
const routes: FuseRoutesType = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth,
  ),
  {
    path: '/',
    element: <Navigate to="/whitelabel-apps" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
]

export default routes
