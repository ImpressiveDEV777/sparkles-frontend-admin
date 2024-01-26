import { motion } from 'framer-motion'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { Button } from '@mui/material'

type FramesHeaderProps = {
  leftSidebarToggle?: () => void
  rightSidebarToggle?: () => void
}

function FramesHeader(props: FramesHeaderProps) {
  const { leftSidebarToggle, rightSidebarToggle } = props
  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full space-y-8 sm:space-y-0 items-center justify-between py-32 px-24 md:px-32">
      {leftSidebarToggle && (
        <div className="flex shrink-0 items-center">
          <IconButton onClick={leftSidebarToggle} aria-label="toggle sidebar">
            <FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
          </IconButton>
        </div>
      )}
      <motion.span
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
      >
        <Typography className="flex text-24 md:text-32 font-extrabold tracking-tight">
          Frames
        </Typography>
      </motion.span>

      <div className="flex flex-1 items-center justify-end space-x-8 w-full sm:w-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
            className="mr-2"
            // onClick={() => dispatch(openNewDialog())}
          >
            Add
          </Button>
        </motion.div>
        {rightSidebarToggle && (
          <div className="flex shrink-0 items-center">
            <IconButton
              onClick={rightSidebarToggle}
              aria-label="toggle sidebar"
            >
              <FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
            </IconButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default FramesHeader
