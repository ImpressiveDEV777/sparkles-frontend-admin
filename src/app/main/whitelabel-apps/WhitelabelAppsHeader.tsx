import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useAppDispatch } from 'app/store'
import { Box, IconButton, Tooltip } from '@mui/material'
import { FormatListBulleted, GridView } from '@mui/icons-material'

/**
 * The orders header.
 */
function OrdersHeader() {
  const dispatch = useAppDispatch()
  const searchText = 'useAppSelector(selectOrdersSearchText)'

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full space-y-8 sm:space-y-0 items-center justify-between py-32 px-24 md:px-32">
      <motion.span
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
      >
        <Typography className="flex text-24 md:text-32 font-extrabold tracking-tight">
          Whitelabel Apps
        </Typography>
      </motion.span>

      <div className="flex flex-1 items-center justify-end space-x-8 w-full sm:w-auto">
        <Box>
          <Tooltip title="Switch to List View" placement="top">
            <IconButton
              aria-label="list"
              // onClick={handleListView}
              // disabled={isListView}
            >
              <FormatListBulleted />
            </IconButton>
          </Tooltip>
          <Tooltip title="Switch to Grid View" placement="top">
            <IconButton
              aria-label="grid"
              // onClick={handleGridView}
              // disabled={isGridView}
            >
              <GridView />
            </IconButton>
          </Tooltip>
        </Box>
      </div>
    </div>
  )
}

export default OrdersHeader
