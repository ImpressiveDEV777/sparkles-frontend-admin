import { lazy } from 'react'
import { PATHS } from 'src/app/constants/common'

const CategoriesApp = lazy(() => import('./CategoriesApp'))
const Categories = lazy(() => import('./Categories'))
const Category = lazy(() => import('./category/Category'))

/**
 * The E-Commerce app configuration.
 */
const CategoriesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: PATHS.CATEGORIES,
      element: <CategoriesApp />,
      children: [
        {
          path: '',
          element: <Categories />,
        },
        {
          path: ':categoryId',
          element: <Category />,
        },
      ],
    },
  ],
}

export default CategoriesAppConfig
