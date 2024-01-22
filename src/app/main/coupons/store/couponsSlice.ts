import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import createAppAsyncThunk from 'app/store/createAppAsyncThunk'
import axios from 'axios'
import { RootStateType } from 'app/store/types'
import { Coupon, Coupons } from '../../types/CouponType'

export type AppRootStateType = RootStateType<couponsSliceType>

/**
 * Get coupons from server
 */
export const getCoupons = createAppAsyncThunk<Coupons>(
  'couponsApp/coupons/getCoupons',
  async () => {
    const response = await axios.get('/product-providers')
    return response.data as Coupons
  },
)

const couponsAdapter = createEntityAdapter<Coupon>({})

export const { selectAll: selectCoupons, selectById: selectCouponById } =
  couponsAdapter.getSelectors(
    (state: AppRootStateType) => state.couponsApp.coupons,
  )

const initialState = couponsAdapter.getInitialState({ loading: true })

/**
 * The Coupons slice.
 */
export const couponsSlice = createSlice({
  name: 'couponsApp/coupons',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCoupons.pending, state => {
      state.loading = true
    })
    builder.addCase(getCoupons.fulfilled, (state, action) => {
      couponsAdapter.setAll(state, action.payload)
      state.loading = false
    })
  },
})

export const selectCouponsLoading = (state: AppRootStateType) =>
  state.couponsApp.coupons.loading

export type couponsSliceType = typeof couponsSlice

export default couponsSlice.reducer
