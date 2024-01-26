import { createSlice } from '@reduxjs/toolkit'
import { appSelector } from 'app/store/store'
import { AppRootStateType } from '.'

const initialState: {
  id?: string
  openDialog: boolean
} = { openDialog: false }

/**
 * The Contacts App Contacts slice.
 */
export const dialogSlice = createSlice({
  name: 'frameSizesApp/dialog',
  initialState,
  reducers: {
    openNewDialog: () => ({ openDialog: true }),
    openEditDialog: (state, action) => ({
      openDialog: true,
      id: action.payload as string,
    }),
    closeDialog: () => initialState,
  },
})

export const { openNewDialog, openEditDialog, closeDialog } =
  dialogSlice.actions

export const selectOpenDialog = appSelector(
  (state: AppRootStateType) => state.frameSizesApp.dialog.openDialog,
)
export const selectEditId = appSelector(
  (state: AppRootStateType) => state.frameSizesApp.dialog.id,
)

const dialogReducer = dialogSlice.reducer

export type dialogSliceType = typeof dialogSlice

export default dialogReducer
