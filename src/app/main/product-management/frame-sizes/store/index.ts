import { RootStateType } from 'app/store/types'
import { combineReducers } from '@reduxjs/toolkit'
import dialog, { dialogSliceType } from './dialogSlice'
import { FrameSizesApiType } from '../FrameSizesApi'

/**
 * The FrameSizes App slices.
 */

const reducer = combineReducers({
  dialog,
})

export type AppRootStateType = RootStateType<[dialogSliceType]> &
  FrameSizesApiType

export default reducer
