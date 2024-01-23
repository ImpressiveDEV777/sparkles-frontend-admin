import _ from '@lodash'
import { PartialDeep } from 'type-fest'
import { SupplierForm } from '../../SuppliersApi'

/**
 * The product model.
 */
const SupplierModel = (data: PartialDeep<SupplierForm>) =>
  _.defaults(data || {}, {
    type: '',
    whitelabelapps: [],
    title: '',
    image: null,
  })

export default SupplierModel
