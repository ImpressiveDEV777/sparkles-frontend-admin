import { DataGridPro, GridRowParams, gridClasses } from '@mui/x-data-grid-pro'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from '@mui/material'

import useQuery from 'src/app/hooks/useQuery'
import { useNavigate } from 'react-router'
import { PATHS } from 'src/app/constants/common'
import { convert } from 'html-to-text'

import { useAppDispatch } from 'app/store/store'
import {
  categoryFilterOperators,
  statusFilterOperators,
} from 'src/app/utils/filterOperators'
import { SubCategory, useGetSubCategoriesQuery } from './SubCategoriesApi'
import { setSelectedIds } from './store/selectedIdsSlice'

// Define a type for the params object
type CellParams = {
  row: SubCategory
}

export default function SubCategoriesAppsContent() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const query = useQuery()
  const { data: subCategories, isLoading } = useGetSubCategoriesQuery()

  const columns = [
    {
      field: 'title',
      headerName: 'Sub Category Name',
      width: 220,
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
      field: 'product_category',
      headerName: 'Catergory Name',
      width: 190,
      filterOperators: categoryFilterOperators,
      renderCell: (params: CellParams) => (
        <Box>
          <Typography variant="inherit" className="rowText">
            {params?.row?.product_category?.title}
          </Typography>
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
    {
      field: 'active',
      headerName: 'Status',
      width: 120,
      renderCell: (params: CellParams) =>
        params?.row?.active ? 'Active' : 'Disabled',
      filterOperators: statusFilterOperators,
    },
  ]

  return query.get('view') === 'grid' ? (
    <Grid item xs={12} className="p-10">
      <Grid container spacing={3}>
        {subCategories?.map(subCategory => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={subCategory.id}>
            <Card sx={{ position: 'relative' }}>
              {subCategory?.active && (
                <Chip
                  label="Active"
                  color="primary"
                  size="small"
                  sx={{ position: 'absolute', right: '10px', top: '10px' }}
                />
              )}
              <CardMedia
                sx={{ height: 140 }}
                image={subCategory?.Image?.url}
                title="green iguana"
              />
              <CardContent>
                <div>
                  <Typography variant="subtitle1">
                    {subCategory.title}
                  </Typography>
                  <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: subCategory.description,
                    }}
                  />
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
                    navigate(`${PATHS.SUB_CATEGORIES}/${subCategory?._id}`)
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
      rows={subCategories || []}
      columns={columns}
      loading={isLoading}
      getRowHeight={() => 'auto'}
      onRowSelectionModelChange={newRowSelectionModel => {
        dispatch(setSelectedIds(newRowSelectionModel))
      }}
      onRowClick={(params: GridRowParams) => {
        navigate(`${PATHS.SUB_CATEGORIES}/${params?.id}`)
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
