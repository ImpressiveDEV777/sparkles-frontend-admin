import { RootStateType } from 'app/store/types'
import { combineReducers } from '@reduxjs/toolkit'
import selectedIds, { selectedIdsSliceType } from './selectedIdsSlice'
import dialog, { dialogSliceType } from './dialogSlice'
import { FrameSizesApiType } from '../FrameSizesApi'

/**
 * The FrameSizes App slices.
 */

const reducer = combineReducers({
  selectedIds,
  dialog,
})

export type AppRootStateType = RootStateType<
  [selectedIdsSliceType, dialogSliceType]
> &
  FrameSizesApiType

export default reducer
