import _ from '@lodash'
import { PartialDeep } from 'type-fest'
import { CouponForm } from '../../CouponsApi'

/**
 * The product model.
 */
const CouponModel = (data: PartialDeep<CouponForm>) =>
  _.defaults(data || {}, {
    CouponCode: '',
    appliedFor: '',
    whitelabelapps: [],
    suppliers: [],
    coupon_type: '',
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

export default CouponModel
