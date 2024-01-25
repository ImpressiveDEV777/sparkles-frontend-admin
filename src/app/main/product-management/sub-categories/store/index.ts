import { RootStateType } from 'app/store/types'
import { combineReducers } from '@reduxjs/toolkit'
import selectedIds, { selectedIdsSliceType } from './selectedIdsSlice'
import { SubCategoriesApiType } from '../SubCategoriesApi'

/**
 * The SubCategories App slices.
 */

const reducer = combineReducers({
  selectedIds,
})

export type AppRootStateType = RootStateType<[selectedIdsSliceType]> &
  SubCategoriesApiType

export default reducer
