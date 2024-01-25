import _ from '@lodash'
import { PartialDeep } from 'type-fest'
import { CategoryForm } from '../../CategoriesApi'

/**
 * The product model.
 */
const CategoryModel = (data: PartialDeep<CategoryForm>) =>
  _.defaults(data || {}, {
    CategoryCode: '',
    appliedFor: '',
    whitelabelapps: [],
    suppliers: [],
    category_type: '',
    ImpactOnPrice: 'none',
    discount_amount: 0,
    expiryType: '',
    noOfDays: null,
    startDate: new Date(),
    expiryDate: new Date(),
    wantToNotifyUser: false,
    subject: '',
    message: '',
    provider_products: [],
  })

export default CategoryModel
