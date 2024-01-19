import {
  DataGrid,
  GridComparatorFn,
  gridClasses,
  gridStringOrNumberComparator,
} from '@mui/x-data-grid'
import { Box, Chip, Typography } from '@mui/material'
import { useAppSelector } from 'app/store'
import { WhitelabelType } from '../types/WhitelabelType'
import {
  selectWhitelabels,
  selectWhitelabelsLoading,
} from './store/whitelabelsSlice'
import { Provider } from '../types/ProviderType'

// Define a type for the params object
type CellParams = {
  row: WhitelabelType
}

export default function BasicEditingGrid() {
  const whitelabels = useAppSelector(selectWhitelabels)
  const loading = useAppSelector(selectWhitelabelsLoading)
  const supplierSortComparator: GridComparatorFn = (v1, v2, param1, param2) => {
    return gridStringOrNumberComparator(
      (v1 as [Provider]).reduce(
        (prev, current) => `${prev}${current.title}`,
        '',
      ),
      (v2 as [Provider]).reduce(
        (prev, current) => `${prev}${current.title}`,
        '',
      ),
      param1,
      param2,
    )
  }
  const categorySortComparator: GridComparatorFn = (v1, v2, param1, param2) => {
    return gridStringOrNumberComparator(
      (v1 as [Provider]).reduce(
        (prev, current) => `${prev}${current.title}`,
        '',
      ),
      (v2 as [Provider]).reduce(
        (prev, current) => `${prev}${current.title}`,
        '',
      ),
      param1,
      param2,
    )
  }
  const columns = [
    {
      field: 'title',
      headerName: 'Whitelabel App Name',
      width: 180,
      renderCell: (params: CellParams) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Box>
              <img
                src={params?.row?.icon?.url}
                style={{ width: '30px', height: '30px' }}
                alt="title"
              />
            </Box>
            <Typography variant="inherit" className="rowText">
              {params?.row?.title}
            </Typography>
          </Box>
        )
      },
    },
    {
      field: 'product_categories',
      headerName: 'Category',
      width: 250,
      renderCell: (params: CellParams) => {
        const categories = params?.row?.product_categories
        return categories.map(category => category.title).join(', ')
      },
      sortComparator: categorySortComparator,
    },
    {
      field: 'providers',
      headerName: 'Supplier',
      flex: 1,
      sortComparator: supplierSortComparator,
      renderCell: (params: CellParams) => {
        const providers = params?.row?.providers
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            {providers.map(provider => (
              <Chip key={provider.id} label={provider.title} size="small" />
            ))}
          </Box>
        )
      },
    },
    {
      field: 'package_name',
      headerName: 'Package Name',
      width: 200,
    },
    {
      field: 'active',
      headerName: 'Status',
      width: 100,
      renderCell: (params: CellParams) => {
        return params?.row?.active ? 'Active' : 'Disabled'
      },
    },
  ]
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        hideFooter
        rows={whitelabels}
        columns={columns}
        loading={loading}
        getRowHeight={() => 'auto'}
        sx={{
          [`& .${gridClasses.cell}`]: {
            py: 1,
          },
        }}
      />
    </div>
  )
}
