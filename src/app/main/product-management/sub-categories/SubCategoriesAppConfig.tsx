import { lazy } from 'react'
import { PATHS } from 'src/app/constants/common'

const SubCategoriesApp = lazy(() => import('./SubCategoriesApp'))
const SubCategories = lazy(() => import('./SubCategories'))
const SubCategory = lazy(() => import('./sub-category/SubCategory'))

/**
 * The E-Commerce app configuration.
 */
const SubCategoriesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: PATHS.SUB_CATEGORIES,
      element: <SubCategoriesApp />,
      children: [
        {
          path: '',
          element: <SubCategories />,
        },
        {
          path: ':subCategoryId',
          element: <SubCategory />,
        },
      ],
    },
  ],
}

export default SubCategoriesAppConfig
