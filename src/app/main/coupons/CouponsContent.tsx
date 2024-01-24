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
import { commonSortComparator } from 'src/app/utils/sortComparator'
import { commonFilterOperators } from 'src/app/utils/filterOperators'

import { Coupon, useGetCouponsQuery } from './CouponsApi'

// Define a type for the params object
type CellParams = {
  row: Coupon
}

export default function CouponsAppsContent() {
  const navigate = useNavigate()
  const query = useQuery()
  const { data: coupons, isLoading } = useGetCouponsQuery()

  const columns = [
    {
      field: 'CouponCode',
      headerName: 'Coupon Code',
      flex: 2,
      renderCell: (params: CellParams) => params?.row?.CouponCode,
    },
    {
      field: 'ImpactOnPrice',
      headerName: 'Impact on Price',
      width: 180,
      renderCell: (params: CellParams) => params?.row?.ImpactOnPrice,
    },
    {
      field: 'whitelabelapps',
      headerName: 'WhiteLabel Apps',
      width: 250,
      sortComparator: commonSortComparator,
      filterOperators: commonFilterOperators,
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
    {
      field: 'supplier',
      headerName: 'Supplier',
      flex: 2,
      renderCell: (params: CellParams) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {params?.row?.suppliers?.length > 0
              ? params?.row?.suppliers?.map(supplier => {
                  return <Chip label={supplier?.title} key={supplier?._id} />
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
        {coupons?.map(coupon => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={coupon.id}>
            <Card sx={{ position: 'relative' }}>
              <CardContent>
                <div>
                  <Typography variant="subtitle1">WhiteLabel Apps</Typography>
                  <div className="flex flex-wrap">
                    {coupon?.whitelabelapps?.length > 0
                      ? coupon?.whitelabelapps?.map(label => {
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
                  onClick={() => navigate(`${PATHS.COUPONS}/${coupon?._id}`)}
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
      rows={coupons || []}
      columns={columns}
      loading={isLoading}
      getRowHeight={() => 'auto'}
      onRowSelectionModelChange={newRowSelectionModel => {
        console.log(newRowSelectionModel)
      }}
      onRowClick={(params: GridRowParams) => {
        navigate(`${PATHS.COUPONS}/${params?.id}`)
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
