import _ from '@lodash'
import { PartialDeep } from 'type-fest'
import { SubCategoryForm } from '../../SubCategoriesApi'

/**
 * The product model.
 */
const SubCategoryModel = (data: PartialDeep<SubCategoryForm>) =>
  _.defaults(data || {}, {
    title: '',
    active: false,
    subCategoryId: null,
    description: '',
    product_category: '',
  })

export default SubCategoryModel
