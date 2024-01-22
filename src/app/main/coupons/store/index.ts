import { combineReducers } from '@reduxjs/toolkit'
import coupons from './couponsSlice'
import coupon from './couponSlice'
import whitelabels from './whitelabelsSlice'

/**
 * The Notes store reducer.
 */
const reducer = combineReducers({
  coupons,
  coupon,
  whitelabels,
})

export default reducer
