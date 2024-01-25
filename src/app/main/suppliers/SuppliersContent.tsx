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
import { commonSortComparator } from 'src/app/utils/sortComparator'
import { arrayFilterOperators } from 'src/app/utils/filterOperators'
import { Supplier, useGetSuppliersQuery } from './SuppliersApi'

// Define a type for the params object
type CellParams = {
  row: Supplier
}

export default function SupplierAppsContent() {
  const navigate = useNavigate()
  const query = useQuery()
  const { data: suppliers, isLoading } = useGetSuppliersQuery()

  const columns = [
    {
      field: 'title',
      headerName: 'Supplier Name',
      flex: 1,
      renderCell: (params: CellParams) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Box>
              <img
                src={params?.row?.image?.url}
                style={{ width: '30px', height: '30px' }}
                alt="Supplier Name"
              />
            </Box>
            <Box>
              <Typography variant="inherit" className="rowText">
                {params?.row?.title}
              </Typography>
            </Box>
          </Box>
        )
      },
    },
    {
      field: 'whitelabelapps',
      headerName: 'WhiteLabel Apps',
      flex: 1,
      sortComparator: commonSortComparator,
      filterOperators: arrayFilterOperators,
      renderCell: (params: CellParams) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {params?.row?.whitelabelapps?.length > 0
              ? params?.row?.whitelabelapps?.map(label => {
                  return <Chip label={label?.title} key={label?._id} />
                })
              : 'N/A '}
          </Box>
        )
      },
    },
  ]
  return query.get('view') === 'grid' ? (
    <Grid item xs={12} className="p-10">
      <Grid container spacing={3}>
        {suppliers?.map(category => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={category.id}>
            <Card sx={{ position: 'relative' }}>
              <CardMedia
                sx={{ height: 140 }}
                image={category?.image?.url}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {category?.title}
                </Typography>

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
                    navigate(`${PATHS.SUPPLIERS}/${category?._id}`)
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
      rows={suppliers || []}
      columns={columns}
      loading={isLoading}
      getRowHeight={() => 'auto'}
      onRowClick={(params: GridRowParams) => {
        navigate(`${PATHS.SUPPLIERS}/${params?.id}`)
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
