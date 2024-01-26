import FuseNavigation from '@fuse/core/FuseNavigation'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { Button, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useGetFrameTypesQuery } from '../FramesApi'

function FramesLeftSidebar() {
  const { data: frameTypes } = useGetFrameTypesQuery()
  return (
    <div className="flex-auto border-l-1">
      <div className="mb-24 mt-40 mx-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.1 } }}
        >
          <div className="mt-32">
            <Button
              variant="contained"
              color="secondary"
              className="w-full"
              // onClick={handleOpenDialog}
              startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
            >
              ADD FRAME
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mb-24"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
      >
        <Typography
          className="px-28 py-10 uppercase text-12 font-600"
          color="secondary.main"
        >
          FOLDERS
        </Typography>
        <FuseNavigation
          navigation={frameTypes?.map(type => ({
            id: type._id,
            title: type.title,
            type: 'item',
            icon: 'heroicons-outline:clipboard-list',
          }))}
          className="px-0"
        />
      </motion.div>
    </div>
  )
}

export default FramesLeftSidebar
