import { combineReducers } from '@reduxjs/toolkit'
import whitelabels from './whitelabelsSlice'

/**
 * The Notes store reducer.
 */
const reducer = combineReducers({
  whitelabels,
})

export default reducer
