import { DataGridPro, GridRowParams, gridClasses } from '@mui/x-data-grid-pro'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Typography,
} from '@mui/material'

import useQuery from 'src/app/hooks/useQuery'
import { useNavigate } from 'react-router'
import { PATHS } from 'src/app/constants/common'
import { convert } from 'html-to-text'

import { useAppDispatch } from 'app/store/store'
import { commonSortComparator } from 'src/app/utils/sortComparator'
import { arrayFilterOperators } from 'src/app/utils/filterOperators'
import { Category, useGetCategoriesQuery } from './CategoriesApi'
import { setSelectedIds } from './store/selectedIdsSlice'

// Define a type for the params object
type CellParams = {
  row: Category
}

export default function CategoriesAppsContent() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const query = useQuery()
  const { data: categories, isLoading } = useGetCategoriesQuery()

  const columns = [
    {
      field: 'title',
      headerName: 'Catergory Name',
      width: 200,
      renderCell: (params: CellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Box>
            <img
              src={params?.row?.Image?.url}
              style={{ width: '30px', height: '30px', objectFit: 'contain' }}
              alt="category"
            />
          </Box>
          <Box>
            <Typography variant="inherit" className="rowText">
              {params?.row?.title}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'providers',
      headerName: 'Supplier',
      width: 180,
      sortComparator: commonSortComparator,
      filterOperators: arrayFilterOperators,
      renderCell: (params: CellParams) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          {params?.row?.providers.map(provider => (
            <Chip key={provider.id} label={provider.title} />
          ))}
        </Box>
      ),
    },
    {
      field: 'whitelabelapps',
      headerName: 'WhiteLabel Apps',
      width: 220,
      sortComparator: commonSortComparator,
      filterOperators: arrayFilterOperators,
      renderCell: (params: CellParams) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          {params?.row?.whitelabelapps?.length > 0
            ? params?.row?.whitelabelapps?.map(label => (
                <Chip label={label?.title} key={label?._id} />
              ))
            : 'N/A '}
        </Box>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      renderCell: (params: CellParams) => (
        <Box>
          <Typography variant="inherit" className="rowText">
            {convert(params?.row?.description)}
          </Typography>
        </Box>
      ),
    },
  ]

  return query.get('view') === 'grid' ? (
    <Grid item xs={12} className="p-10">
      <Grid container spacing={3}>
        {categories?.map(category => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={category.id}>
            <Card sx={{ position: 'relative' }}>
              <CardContent>
                <div>
                  <Typography variant="subtitle1">WhiteLabel Apps</Typography>
                  <div className="flex flex-wrap">
                    {category?.whitelabelapps?.length > 0
                      ? category?.whitelabelapps?.map(label => {
                          return (
                            <Box pr={1} py={0.5} key={label?._id}>
                              <Chip label={label?.title} size="small" />
                            </Box>
                          )
                        })
                      : 'N/A'}
                  </div>
                </div>
              </CardContent>
              <CardActions
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end', // Align the button to the right
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  onClick={() =>
                    navigate(`${PATHS.CATEGORIES}/${category?._id}`)
                  }
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  ) : (
    <DataGridPro
      hideFooter
      checkboxSelection
      rows={categories || []}
      columns={columns}
      loading={isLoading}
      getRowHeight={() => 'auto'}
      onRowSelectionModelChange={newRowSelectionModel => {
        dispatch(setSelectedIds(newRowSelectionModel))
      }}
      onRowClick={(params: GridRowParams) => {
        navigate(`${PATHS.CATEGORIES}/${params?.id}`)
      }}
      sx={{
        [`& .${gridClasses.cell}`]: {
          py: 1,
        },
        '& .MuiDataGrid-main > div:last-child': {
          display: 'none',
        },
      }}
    />
  )
}
