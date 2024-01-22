import _ from '@lodash'
import { PartialDeep } from 'type-fest'
import { SupplierType } from '../../store/supplierSlice'

/**
 * The product model.
 */
const SupplierModel = (data: PartialDeep<SupplierType>) =>
  _.defaults(data || {}, {
    type: '',
    whitelabelapps: [],
    title: '',
    image: null,
  })

export default SupplierModel
