import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import createAppAsyncThunk from 'app/store/createAppAsyncThunk'
import axios from 'axios'
import { RootStateType } from 'app/store/types'
import { WhitelabelType, WhitelabelsType } from '../../types/WhitelabelType'

export type AppRootStateType = RootStateType<whitelabelsSliceType>

/**
 * Get whitelabels from server
 */
export const getWhitelabels = createAppAsyncThunk<WhitelabelsType>(
  'whitelabels/getWhitelabels',
  async () => {
    const response = await axios.get('/whitelabelapps')
    return response.data as WhitelabelsType
  },
)

const whitelabelsAdapter = createEntityAdapter<WhitelabelType>({})

export const {
  selectAll: selectWhitelabels,
  selectById: selectWhitelabelById,
} = whitelabelsAdapter.getSelectors(
  (state: AppRootStateType) => state.whitelabels,
)

const initialState = whitelabelsAdapter.getInitialState({ loading: true })

/**
 * The E-Commerce whitelabels slice.
 */
export const whitelabelsSlice = createSlice({
  name: 'whitelabels',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getWhitelabels.pending, state => {
      state.loading = true
    })
    builder.addCase(getWhitelabels.fulfilled, (state, action) => {
      whitelabelsAdapter.setAll(state, action.payload)
      state.loading = false
    })
  },
})

export const selectWhitelabelsLoading = (state: AppRootStateType) =>
  state.whitelabels.loading

export type whitelabelsSliceType = typeof whitelabelsSlice

export default whitelabelsSlice.reducer
