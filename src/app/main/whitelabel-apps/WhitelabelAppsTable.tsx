import {
  DataGrid,
  GridComparatorFn,
  gridClasses,
  gridStringOrNumberComparator,
} from '@mui/x-data-grid'
import { Box, Chip, Tooltip, Typography } from '@mui/material'
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
      (v1 as [Provider])[0]?.title,
      (v2 as [Provider])[0]?.title,
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
      width: 150,
      renderCell: (params: CellParams) => {
        const categories = params?.row?.product_categories || []

        const visibleCategories = categories.slice(0, 2) // Display only the first 3 categories
        const hiddenCategories = categories.slice(2)

        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            {visibleCategories.length > 0 ? (
              <>
                <Typography>
                  {visibleCategories.map(category => category.title).join(', ')}
                </Typography>
                {hiddenCategories.length > 0 && (
                  <Tooltip
                    title={
                      <div>
                        {hiddenCategories.map(category => (
                          <div key={category.id}>{category.title}</div>
                        ))}
                      </div>
                    }
                    placement="bottom"
                  >
                    <Chip label={`+${hiddenCategories.length}`} size="small" />
                  </Tooltip>
                )}
              </>
            ) : (
              'N/A'
            )}
          </Box>
        )
      },
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
