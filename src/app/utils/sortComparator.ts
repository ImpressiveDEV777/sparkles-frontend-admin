import {
  GridComparatorFn,
  gridStringOrNumberComparator,
} from '@mui/x-data-grid-pro'
import { Common, Commons } from '../res-types/sub/CommonType'

export const commonSortComparator: GridComparatorFn = (
  v1,
  v2,
  param1,
  param2,
) => {
  return gridStringOrNumberComparator(
    (v1 as Commons).reduce((prev, current) => `${prev}${current.title}`, ''),
    (v2 as Commons).reduce((prev, current) => `${prev}${current.title}`, ''),
    param1,
    param2,
  )
}

export const titleSortComparator: GridComparatorFn = (
  v1,
  v2,
  param1,
  param2,
) => {
  return gridStringOrNumberComparator(
    (v1 as Common).title,
    (v2 as Common).title,
    param1,
    param2,
  )
}

export const normalSortComparator: GridComparatorFn = (
  v1,
  v2,
  param1,
  param2,
) => {
  return gridStringOrNumberComparator(
    v1 as string,
    v2 as string,
    param1,
    param2,
  )
}
