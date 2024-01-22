import { createSlice } from '@reduxjs/toolkit'
import createAppAsyncThunk from 'app/store/createAppAsyncThunk'
import axios, { AxiosResponse } from 'axios'
import { AsyncStateType, RootStateType } from 'app/store/types'
import { Coupon } from '../../types/CouponType'
import { Image } from '../../types/ImageType'
import CouponModel from '../coupon/models/CouponModel'

export type CouponType = {
  type: string
  whitelabelapps: string[]
  id?: string
  title: string
  image: Image | File
}

export type AppRootStateType = RootStateType<supplierSliceType>

/**
 * Get suppliers from server
 */
export const getCoupon = createAppAsyncThunk(
  'suppliersApp/supplier/getCoupon',
  async (supplierId: string) => {
    const response = await axios.get(`/product-providers/${supplierId}`)
    const data = (await response.data) as Coupon
    const res: CouponType = {
      type: data.type,
      whitelabelapps: data.whitelabelapps.map(label => label._id),
      id: data.id,
      title: data.title,
      image: data.image,
    }
    return res
  },
)

/**
 * Save supplier
 */
type SaveCouponType = {
  type: string
  whitelabelapps: string[]
  id: string
  title: string
  image: string
}
export const saveCoupon = createAppAsyncThunk(
  'suppliersApp/supplier/saveCoupon',
  async (supplierData, { getState }) => {
    const AppState = getState() as AppRootStateType

    const { id } = AppState.suppliersApp.supplier.data as CouponType
    let response: AxiosResponse
    if (id) response = await axios.put(`/product-providers/${id}`, supplierData)
    else response = await axios.post(`/product-providers`, supplierData)

    const data = (await response.data) as Coupon
    const res: CouponType = {
      type: data.type,
      whitelabelapps: data.whitelabelapps.map(label => label._id),
      id: data.id,
      title: data.title,
      image: data.image,
    }
    return res
  },
)

const initialState: AsyncStateType<CouponType> = {
  data: null,
  status: 'idle',
}

/**
 * The Coupons slice.
 */
export const supplierSlice = createSlice({
  name: 'suppliersApp/supplier',
  initialState,
  reducers: {
    resetCoupon: () => initialState,
    newCoupon: state => {
      state.data = CouponModel({})
    },
  },
  extraReducers: builder => {
    builder.addCase(getCoupon.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'succeeded'
    })
    builder.addCase(saveCoupon.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'succeeded'
    })
  },
})

export const selectCoupon = (state: AppRootStateType) =>
  state.suppliersApp.supplier

export const { newCoupon, resetCoupon } = supplierSlice.actions

export type supplierSliceType = typeof supplierSlice

export default supplierSlice.reducer
