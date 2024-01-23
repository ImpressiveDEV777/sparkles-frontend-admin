import { GridFilterItem, GridFilterOperator } from '@mui/x-data-grid'
import GridFilterInput from 'app/shared-components/GridFilterInput'
import StatusFilterInput from 'app/shared-components/StatusFilterInput'
import { Provider } from '../res-types/sub/ProviderType'

export const commonFilterOperators: GridFilterOperator[] = [
  {
    label: 'Contains',
    value: 'above',
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      if (!filterItem.field || !filterItem.value || !filterItem.operator) {
        return null
      }

      return (params): boolean => {
        return (params.value as [Provider]).some(value =>
          value.title.toLowerCase().includes(filterItem.value.toLowerCase()),
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
        return (params.value as [Provider]).toString() === filterItem.value
      }
    },
    InputComponent: StatusFilterInput,
    getValueAsString: (value: number) => `${value} Stars`,
  },
]
