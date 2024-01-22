import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import createAppAsyncThunk from 'app/store/createAppAsyncThunk'
import axios from 'axios'
import { RootStateType } from 'app/store/types'
import { Supplier, Suppliers } from '../../types/SupplierType'

export type AppRootStateType = RootStateType<suppliersSliceType>

/**
 * Get suppliers from server
 */
export const getSuppliers = createAppAsyncThunk<Suppliers>(
  'suppliersApp/suppliers/getSuppliers',
  async () => {
    const response = await axios.get('/product-providers')
    return response.data as Suppliers
  },
)

const suppliersAdapter = createEntityAdapter<Supplier>({})

export const { selectAll: selectSuppliers, selectById: selectSupplierById } =
  suppliersAdapter.getSelectors(
    (state: AppRootStateType) => state.suppliersApp.suppliers,
  )

const initialState = suppliersAdapter.getInitialState({ loading: true })

/**
 * The Suppliers slice.
 */
export const suppliersSlice = createSlice({
  name: 'suppliersApp/suppliers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSuppliers.pending, state => {
      state.loading = true
    })
    builder.addCase(getSuppliers.fulfilled, (state, action) => {
      suppliersAdapter.setAll(state, action.payload)
      state.loading = false
    })
  },
})

export const selectSuppliersLoading = (state: AppRootStateType) =>
  state.suppliersApp.suppliers.loading

export type suppliersSliceType = typeof suppliersSlice

export default suppliersSlice.reducer
