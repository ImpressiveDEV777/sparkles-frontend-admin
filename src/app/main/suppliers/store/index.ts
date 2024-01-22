import { combineReducers } from '@reduxjs/toolkit'
import suppliers from './suppliersSlice'
import supplier from './supplierSlice'
import whitelabels from './whitelabelsSlice'

/**
 * The Notes store reducer.
 */
const reducer = combineReducers({
  suppliers,
  supplier,
  whitelabels,
})

export default reducer
