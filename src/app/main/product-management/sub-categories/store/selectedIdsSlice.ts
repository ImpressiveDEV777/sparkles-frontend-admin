import { createSlice } from '@reduxjs/toolkit'
import { appSelector } from 'app/store/store'
import { AppRootStateType } from '.'

const initialState: string[] = []

/**
 * The Contacts App Contacts slice.
 */
export const selectedIdsSlice = createSlice({
  name: 'subCategoriesApp/selectedIds',
  initialState,
  reducers: {
    setSelectedIds: (state, action) => action.payload as string[],
    resetSelectedIds: () => initialState,
  },
})

export const { setSelectedIds, resetSelectedIds } = selectedIdsSlice.actions

export const selectSelectedIds = appSelector(
  (state: AppRootStateType) => state.subCategoriesApp.selectedIds,
)
const selectedIdsReducer = selectedIdsSlice.reducer

export type selectedIdsSliceType = typeof selectedIdsSlice

export default selectedIdsReducer
