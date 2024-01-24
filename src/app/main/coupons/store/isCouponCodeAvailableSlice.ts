import { RootStateType } from 'app/store/types'
import { createSlice } from '@reduxjs/toolkit'
import { appSelector } from 'app/store/store'

type initialStateType = boolean

const initialState: initialStateType = false

/**
 * The isCouponCodeAvailable state slice.
 */
export const isCouponCodeAvailableSlice = createSlice({
  name: 'couponsApp/isCouponCodeAvailable',
  initialState,
  reducers: {
    setIsCouponCodeAvailable: (state, action) => action.payload as boolean,
  },
})

export const { setIsCouponCodeAvailable } = isCouponCodeAvailableSlice.actions

type AppRootStateType = RootStateType<typeof isCouponCodeAvailableSlice>

export const selectIsCouponCodeAvailableState = appSelector(
  (state: AppRootStateType) => state.couponsApp.isCouponCodeAvailable,
)

export type isCouponCodeAvailableSliceType = typeof isCouponCodeAvailableSlice

export default isCouponCodeAvailableSlice.reducer
