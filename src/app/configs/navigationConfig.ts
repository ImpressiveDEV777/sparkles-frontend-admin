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
    id: PATHS.COUPONS,
    title: 'Coupons',
    type: 'item',
    icon: 'heroicons-outline:clipboard-list',
    url: PATHS.COUPONS,
  },
  {
    id: PATHS.SUPPLIERS,
    title: 'Supplier',
    type: 'item',
    icon: 'heroicons-outline:clipboard-list',
    url: PATHS.SUPPLIERS,
  },
  {
    id: PATHS.WHITELABEL_APPS,
    title: 'Whitelabel Apps',
    type: 'item',
    icon: 'heroicons-outline:clipboard-list',
    url: PATHS.WHITELABEL_APPS,
  },
]

export default navigationConfig
