import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { useParams } from 'react-router'
import { motion } from 'framer-motion'
import { Comment } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { PATHS } from 'src/app/constants/common'
import { useGetFrameTypesQuery } from '../FramesApi'

function FramesLeftSidebar() {
  const navigate = useNavigate()
  const routeParams = useParams()
  const { frameTypeId } = routeParams
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

        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {frameTypes?.map(type => {
            const labelId = `checkbox-list-label-${type.id}`

            return (
              <ListItem
                key={type.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() => alert(5)}
                  >
                    <Comment />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  onClick={() => navigate(`${PATHS.FRAMES}/${type._id}`)}
                  selected={type._id === frameTypeId}
                >
                  <ListItemText
                    id={labelId}
                    primary={type.title}
                    color="secondary"
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
        {/* <FuseNavigation
          navigation={frameTypes?.map(type => ({
            id: type._id,
            title: type.title,
            type: 'item',
            icon: 'heroicons-outline:clipboard-list',
            url: `${PATHS.FRAMES}/${type._id}`,
          }))}
          className="px-0"
        /> */}
      </motion.div>
    </div>
  )
}

export default FramesLeftSidebar
