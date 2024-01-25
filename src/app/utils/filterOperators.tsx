import { GridFilterItem, GridFilterOperator } from '@mui/x-data-grid'
import GridFilterInput from 'app/shared-components/GridFilterInput'
import StatusFilterInput from 'app/shared-components/StatusFilterInput'
import { Commons } from '../res-types/sub/CommonType'

export const commonFilterOperators: GridFilterOperator[] = [
  {
    label: 'Contains',
    value: 'above',
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      if (!filterItem.field || !filterItem.value || !filterItem.operator) {
        return null
      }

      return (params): boolean => {
        return (params.value as Commons).some(value =>
          value.title
            .toLowerCase()
            .includes((filterItem.value as string).toLowerCase()),
        )
      }
    },
    InputComponent: GridFilterInput,
    getValueAsString: (value: number) => `${value} Stars`,
  },
]

export const statusFilterOperators: GridFilterOperator[] = [
  {
    label: 'Contains',
    value: 'above',
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      if (!filterItem.field || !filterItem.value || !filterItem.operator) {
        return null
      }

      return (params): boolean => {
        return (params.value as Commons).toString() === filterItem.value
      }
    },
    InputComponent: StatusFilterInput,
    getValueAsString: (value: number) => `${value} Stars`,
  },
]
