import { RootStateType } from 'app/store/types'
import { combineReducers } from '@reduxjs/toolkit'
import selectedIds, { selectedIdsSliceType } from './selectedIdsSlice'
import isCouponCodeAvailable, {
  isCouponCodeAvailableSliceType,
} from './isCouponCodeAvailableSlice'
import { CouponsApiType } from '../CouponsApi'

/**
 * The Coupons App slices.
 */

const reducer = combineReducers({
  selectedIds,
  isCouponCodeAvailable,
})

export type AppRootStateType = RootStateType<
  [selectedIdsSliceType, isCouponCodeAvailableSliceType]
> &
  CouponsApiType

export default reducer
