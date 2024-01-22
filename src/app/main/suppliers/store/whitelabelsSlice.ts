import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import createAppAsyncThunk from 'app/store/createAppAsyncThunk'
import axios from 'axios'
import { RootStateType } from 'app/store/types'
import { Whitelabel, Whitelabels } from '../../types/WhitelabelType'

export type AppRootStateType = RootStateType<whitelabelsSliceType>

/**
 * Get suppliersApp from server
 */
export const getSuppliersWhitelabels = createAppAsyncThunk<Whitelabels>(
  'suppliersApp/whitelabels/getSuppliersWhitelabels',
  async () => {
    const response = await axios.get('/whitelabelapps')
    return response.data as Whitelabels
  },
)

const whitelabelsAdapter = createEntityAdapter<Whitelabel>({})

export const {
  selectAll: selectSuppliersAppWhitelabels,
  selectById: selectSuppliersAppWhitelabelById,
} = whitelabelsAdapter.getSelectors(
  (state: AppRootStateType) => state.suppliersApp.whitelabels,
)

const initialState = whitelabelsAdapter.getInitialState({ loading: true })

/**
 * The E-Commerce suppliersApp slice.
 */
export const whitelabelsSlice = createSlice({
  name: 'suppliersApp/whitelabels',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSuppliersWhitelabels.pending, state => {
      state.loading = true
    })
    builder.addCase(getSuppliersWhitelabels.fulfilled, (state, action) => {
      whitelabelsAdapter.setAll(state, action.payload)
      state.loading = false
    })
  },
})

export const selectWhitelabelsLoading = (state: AppRootStateType) =>
  state.suppliersApp.whitelabels.loading

export type whitelabelsSliceType = typeof whitelabelsSlice

export default whitelabelsSlice.reducer
