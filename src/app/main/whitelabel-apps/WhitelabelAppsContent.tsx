import {
  DataGridPro,
  GridComparatorFn,
  gridClasses,
  gridStringOrNumberComparator,
} from '@mui/x-data-grid-pro'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from '@mui/material'
import { useAppSelector } from 'app/store'
import {
  commonFilterOperators,
  statusFilterOperators,
} from 'src/app/utils/filterOperators'
import useQuery from 'src/app/hooks/useQuery'
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

export default function WhitelabelAppsContent() {
  const query = useQuery()
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
      filterOperators: commonFilterOperators,
    },
    {
      field: 'providers',
      headerName: 'Supplier',
      flex: 1,
      sortComparator: supplierSortComparator,
      filterOperators: commonFilterOperators,
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
      width: 120,
      renderCell: (params: CellParams) => {
        return params?.row?.active ? 'Active' : 'Disabled'
      },
      filterOperators: statusFilterOperators,
    },
  ]
  return (
    <>
      {query.get('view') === 'grid' && (
        <Grid item xs={12} className="p-10">
          <Grid container spacing={3}>
            {whitelabels?.map(label => (
              <Grid item lg={3} md={4} sm={6} xs={12} key={label.id}>
                <Card sx={{ position: 'relative' }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={label?.icon?.url}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {label?.title}
                    </Typography>

                    <div>
                      <Typography variant="subtitle1">Suppliers</Typography>
                      <div className="flex flex-wrap">
                        {label?.providers?.length > 0
                          ? label?.providers?.map(provider => {
                              return (
                                <Box pr={1} py={0.5} key={provider?._id}>
                                  <Chip label={provider?.title} size="small" />
                                </Box>
                              )
                            })
                          : 'N/A'}
                      </div>
                    </div>
                    <div>
                      <Typography variant="subtitle1">Category</Typography>
                      <div className="flex flex-wrap">
                        {label?.product_categories?.length > 0
                          ? label?.product_categories?.map(category => {
                              return (
                                <Box pr={1} py={0.5} key={category?._id}>
                                  <Chip label={category?.title} size="small" />
                                </Box>
                              )
                            })
                          : 'N/A'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
      {query.get('view') === 'list' && (
        <DataGridPro
          hideFooter
          rows={whitelabels}
          columns={columns}
          loading={loading}
          getRowHeight={() => 'auto'}
          sx={{
            [`& .${gridClasses.cell}`]: {
              py: 1,
            },
            '& .MuiDataGrid-main > div:last-child': {
              display: 'none',
            },
          }}
        />
      )}
    </>
  )
}
