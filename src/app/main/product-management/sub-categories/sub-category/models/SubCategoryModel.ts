import _ from '@lodash'
import { PartialDeep } from 'type-fest'
import { SubCategoryForm } from '../../SubCategoriesApi'

/**
 * The product model.
 */
const SubCategoryModel = (data: PartialDeep<SubCategoryForm>) =>
  _.defaults(data || {}, {
    whitelabelapps: [],
    providers: [],
    title: '',
    active: false,
    subCategoryId: null,
    description: '',
  })

export default SubCategoryModel
