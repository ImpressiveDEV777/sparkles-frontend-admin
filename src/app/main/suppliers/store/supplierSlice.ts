import { createSlice } from '@reduxjs/toolkit'
import createAppAsyncThunk from 'app/store/createAppAsyncThunk'
import axios, { AxiosResponse } from 'axios'
import { AsyncStateType, RootStateType } from 'app/store/types'
import { Supplier } from '../../types/SupplierType'
import { Image } from '../../types/ImageType'
import SupplierModel from '../supplier/models/SupplierModel'

export type SupplierType = {
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
export const getSupplier = createAppAsyncThunk(
  'suppliersApp/supplier/getSupplier',
  async (supplierId: string) => {
    const response = await axios.get(`/product-providers/${supplierId}`)
    const data = (await response.data) as Supplier
    const res: SupplierType = {
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
type SaveSupplierType = {
  type: string
  whitelabelapps: string[]
  id: string
  title: string
  image: string
}
export const saveSupplier = createAppAsyncThunk(
  'suppliersApp/supplier/saveSupplier',
  async (supplierData, { getState }) => {
    const AppState = getState() as AppRootStateType

    const { id } = AppState.suppliersApp.supplier.data as SupplierType
    let response: AxiosResponse
    if (id) response = await axios.put(`/product-providers/${id}`, supplierData)
    else response = await axios.post(`/product-providers`, supplierData)

    const data = (await response.data) as Supplier
    const res: SupplierType = {
      type: data.type,
      whitelabelapps: data.whitelabelapps.map(label => label._id),
      id: data.id,
      title: data.title,
      image: data.image,
    }
    return res
  },
)

const initialState: AsyncStateType<SupplierType> = {
  data: null,
  status: 'idle',
}

/**
 * The Suppliers slice.
 */
export const supplierSlice = createSlice({
  name: 'suppliersApp/supplier',
  initialState,
  reducers: {
    resetSupplier: () => initialState,
    newSupplier: state => {
      state.data = SupplierModel({})
    },
  },
  extraReducers: builder => {
    builder.addCase(getSupplier.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'succeeded'
    })
    builder.addCase(saveSupplier.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'succeeded'
    })
  },
})

export const selectSupplier = (state: AppRootStateType) =>
  state.suppliersApp.supplier

export const { newSupplier, resetSupplier } = supplierSlice.actions

export type supplierSliceType = typeof supplierSlice

export default supplierSlice.reducer
