import { GridFilterItem, GridFilterOperator } from '@mui/x-data-grid'
import GridFilterInput from 'app/shared-components/GridFilterInput'
import StatusFilterInput from 'app/shared-components/StatusFilterInput'
import { Common, Commons } from '../res-types/sub/CommonType'

export const arrayFilterOperators: GridFilterOperator[] = [
  {
    label: 'contains',
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

export const titleFilterOperators: GridFilterOperator[] = [
  {
    label: 'contains',
    value: 'above',
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      if (!filterItem.field || !filterItem.value || !filterItem.operator) {
        return null
      }

      return (params): boolean => {
        return (params.value as Common)?.title
          .toLowerCase()
          .includes((filterItem.value as string).toLowerCase())
      }
    },
    InputComponent: GridFilterInput,
    getValueAsString: (value: number) => `${value} Stars`,
  },
]

export const statusFilterOperators: GridFilterOperator[] = [
  {
    label: 'contains',
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
