import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { Box, IconButton, Tooltip } from '@mui/material'
import { FormatListBulleted, GridView } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import useQuery from 'src/app/hooks/useQuery'

type CommonHeaderProps = {
  title: string
  url: string
}

export default function CommonHeader({ title, url }: CommonHeaderProps) {
  const query = useQuery()

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full space-y-8 sm:space-y-0 items-center justify-between py-32 px-24 md:px-32">
      <motion.span
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
      >
        <Typography className="flex text-24 md:text-32 font-extrabold tracking-tight">
          {title}
        </Typography>
      </motion.span>

      <div className="flex flex-1 items-center justify-end space-x-8 w-full sm:w-auto">
        <Box>
          <Tooltip title="Switch to List View" placement="top">
            <IconButton
              aria-label="list"
              component={Link}
              type="file"
              color="primary"
              to={`${url}?view=list`}
              disabled={query.get('view') === 'list'}
            >
              <FormatListBulleted />
            </IconButton>
          </Tooltip>
          <Tooltip title="Switch to Grid View" placement="top">
            <IconButton
              aria-label="grid"
              component={Link}
              to={`${url}?view=grid`}
              disabled={query.get('view') === 'grid'}
            >
              <GridView />
            </IconButton>
          </Tooltip>
        </Box>
      </div>
    </div>
  )
}
