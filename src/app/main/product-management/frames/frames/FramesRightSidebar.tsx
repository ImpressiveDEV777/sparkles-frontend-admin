import { Box, Typography, IconButton } from '@mui/material'
import { useParams } from 'react-router'
import { DataGridPro, gridClasses } from '@mui/x-data-grid-pro'
import { Delete, Edit } from '@mui/icons-material'
import { FrameTypeSize, useGetFrameTypeSizesQuery } from '../FramesApi'

function FramesRightSidebar() {
  const routeParams = useParams()
  const { frameTypeId } = routeParams
  const { data: frameTypes } = useGetFrameTypeSizesQuery(frameTypeId)
  type CellParams = {
    row: FrameTypeSize
  }
  const columns = [
    {
      field: 'frameSize',
      headerName: 'Frame Size',
      renderCell: (params: CellParams) => params?.row?.frame_size.size,
    },
    {
      field: 'price',
      headerName: 'Whole Sale Price',
      renderCell: (params: CellParams) => params?.row?.price,
    },
    {
      field: 'markup',
      headerName: 'Markup',
      renderCell: (params: CellParams) => params?.row?.mark_up,
    },
    {
      field: 'store_profit',
      headerName: 'Store Profit',
      renderCell: (params: CellParams) => params?.row?.store_profit,
    },
    {
      field: 'final_price',
      headerName: 'Final Price',
      renderCell: (params: CellParams) => params?.row?.final_price,
    },
    {
      field: 'Action',
      headerName: 'Action',
      renderCell: (params: CellParams) => {
        return (
          <Box sx={{ display: 'flex' }}>
            <IconButton
            // onClick={() => {
            //   const { row } = params
            //   setOpenAddNew({
            //     ...row,
            //   })
            // }}
            >
              <Edit />
            </IconButton>

            <IconButton
            // onClick={() => {
            //   setOpenDelete(params.row.id)
            // }}
            >
              <Delete />
            </IconButton>
          </Box>
        )
      },
    },
  ]

  return (
    <div className="px-12 py-24">
      <Typography variant="h6" className="px-16">
        Size List
      </Typography>
      <DataGridPro
        hideFooter
        rows={frameTypes || []}
        columns={columns}
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
    </div>
  )
}

export default FramesRightSidebar
