import _ from '@lodash'
import { PartialDeep } from 'type-fest'
import { CategoryForm } from '../../CategoriesApi'

/**
 * The product model.
 */
const CategoryModel = (data: PartialDeep<CategoryForm>) =>
  _.defaults(data || {}, {
    whitelabelapps: [],
    providers: [],
    title: '',
    active: false,
    categoryId: null,
    description: '',
  })

export default CategoryModel
