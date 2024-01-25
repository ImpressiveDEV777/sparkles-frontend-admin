import { RootStateType } from 'app/store/types'
import { combineReducers } from '@reduxjs/toolkit'
import selectedIds, { selectedIdsSliceType } from './selectedIdsSlice'
import { CategoriesApiType } from '../CategoriesApi'

/**
 * The Categories App slices.
 */

const reducer = combineReducers({
  selectedIds,
})

export type AppRootStateType = RootStateType<[selectedIdsSliceType]> &
  CategoriesApiType

export default reducer
