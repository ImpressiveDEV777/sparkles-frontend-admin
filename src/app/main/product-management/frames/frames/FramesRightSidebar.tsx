import { Box, IconButton } from '@mui/material'
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
      headerName: 'Size',
      width: 60,
      renderCell: (params: CellParams) => params?.row?.frame_size.size,
    },
    {
      field: 'price',
      width: 50,
      headerName: 'Price',
      renderCell: (params: CellParams) => params?.row?.price,
    },
    {
      field: 'markup',
      width: 65,
      headerName: 'Markup',
      renderCell: (params: CellParams) => params?.row?.mark_up,
    },
    {
      field: 'store_profit',
      width: 90,
      headerName: 'Store Profit',
      renderCell: (params: CellParams) => params?.row?.store_profit,
    },
    {
      field: 'final_price',
      width: 60,
      headerName: 'F-Price',
      renderCell: (params: CellParams) => params?.row?.final_price,
    },
    {
      field: 'Action',
      headerName: 'Action',
      width: 80,
      renderCell: () => {
        return (
          <Box sx={{ display: 'flex' }}>
            <IconButton
              // onClick={() => {
              //   const { row } = params
              //   setOpenAddNew({
              //     ...row,
              //   })
              // }}
              size="small"
            >
              <Edit />
            </IconButton>

            <IconButton
              size="small"
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
