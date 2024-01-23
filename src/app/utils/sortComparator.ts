import {
  GridComparatorFn,
  gridStringOrNumberComparator,
} from '@mui/x-data-grid-pro'
import { Commons } from '../main/types/CommonType'

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
