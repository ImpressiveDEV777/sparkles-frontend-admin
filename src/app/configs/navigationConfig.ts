import i18next from 'i18next'
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType'
import ar from './navigation-i18n/ar'
import en from './navigation-i18n/en'
import tr from './navigation-i18n/tr'
import { PATHS } from '../constants/common'

i18next.addResourceBundle('en', 'navigation', en)
i18next.addResourceBundle('tr', 'navigation', tr)
i18next.addResourceBundle('ar', 'navigation', ar)

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [
  {
    id: PATHS.BANNERS,
    title: 'Banners',
    icon: 'heroicons-outline:sparkles',
    type: 'item',
    url: PATHS.BANNERS,
  },
  {
    id: 'apps.ecommerce',
    title: 'Product Management',
    type: 'collapse',
    icon: 'heroicons-outline:shopping-cart',
    children: [
      {
        id: PATHS.PRODUCTS,
        title: 'Products',
        type: 'item',
        icon: 'heroicons-outline:gift',
        url: PATHS.PRODUCTS,
      },
      {
        id: PATHS.CATEGORIES,
        title: 'Categories',
        type: 'item',
        icon: 'heroicons-outline:view-list',
        url: PATHS.CATEGORIES,
      },
      {
        id: PATHS.SUB_CATEGORIES,
        title: 'Sub Categories',
        type: 'item',
        icon: 'heroicons-outline:menu-alt-2',
        url: PATHS.SUB_CATEGORIES,
      },
      {
        id: PATHS.FRAMES,
        title: 'Frames',
        type: 'item',
        icon: 'material-outline:aspect_ratio',
        url: PATHS.FRAMES,
      },
      {
        id: PATHS.FRAME_SIZES,
        title: 'Frame Size',
        icon: 'material-outline:aspect_ratio',
        type: 'item',
        url: PATHS.FRAME_SIZES,
      },
    ],
  },
  {
    id: PATHS.COUPONS,
    title: 'Coupons',
    type: 'item',
    icon: 'heroicons-outline:ticket',
    url: PATHS.COUPONS,
  },
  {
    id: PATHS.SUPPLIERS,
    title: 'Supplier',
    type: 'item',
    icon: 'heroicons-outline:truck',
    url: PATHS.SUPPLIERS,
  },
  {
    id: PATHS.WHITELABEL_APPS,
    title: 'Whitelabel Apps',
    type: 'item',
    icon: 'heroicons-outline:device-mobile',
    url: PATHS.WHITELABEL_APPS,
  },
]

export default navigationConfig
