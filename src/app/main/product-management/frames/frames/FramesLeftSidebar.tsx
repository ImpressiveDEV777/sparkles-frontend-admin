import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Dialog,
} from '@mui/material'
import { useParams } from 'react-router'
import { motion } from 'framer-motion'
import { Delete, Edit } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { PATHS } from 'src/app/constants/common'
import { useAppDispatch } from 'app/store/store'
import {
  closeDialog,
  openDialog,
} from '@fuse/core/FuseDialog/store/fuseDialogSlice'
import { useState } from 'react'
import {
  useCreateFrameTypeMutation,
  useDeleteFrameTypeMutation,
  useGetFrameTypesQuery,
  useUpdateFrameTypeMutation,
} from '../FramesApi'

function FramesLeftSidebar() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [updateFrameType] = useUpdateFrameTypeMutation()
  const [createFrameType] = useCreateFrameTypeMutation()
  const [deleteFrameType] = useDeleteFrameTypeMutation()
  const routeParams = useParams()
  const [frameName, setFrameName] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const { frameTypeId } = routeParams
  const { data: frameTypes } = useGetFrameTypesQuery()

  const handleSubmit = async () => {
    if (selectedId) await updateFrameType({ id: selectedId, title: frameName })
    else await createFrameType(frameName)
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
              onClick={() => {
                setSelectedId('')
                setFrameName('')
                setOpen(true)
              }}
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
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {frameTypes?.map(type => {
            const labelId = `checkbox-list-label-${type.id}`
            return (
              <ListItem
                key={type.id}
                secondaryAction={
                  <div className="flex gap-4">
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      onClick={() => {
                        setSelectedId(type.id)
                        setFrameName(type.title)
                        setOpen(true)
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      onClick={() =>
                        dispatch(
                          openDialog({
                            children: (
                              <>
                                <DialogTitle id="alert-dialog-title">
                                  Delete Frame
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    Are you sure you want to Delete {type.title}{' '}
                                    Frame?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button
                                    onClick={() => dispatch(closeDialog())}
                                    color="primary"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      deleteFrameType(type.id).then(() =>
                                        dispatch(closeDialog()),
                                      )
                                    }
                                    color="primary"
                                    autoFocus
                                  >
                                    Delete
                                  </Button>
                                </DialogActions>
                              </>
                            ),
                          }),
                        )
                      }
                    >
                      <Delete />
                    </IconButton>
                  </div>
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
      </motion.div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {selectedId ? 'Edit' : 'New'} Frame Name
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className="py-8">
            <TextField
              value={frameName}
              onChange={event => setFrameName(event.target.value)}
              className="mt-8"
              required
              label="Frame Name"
              id="title"
              variant="outlined"
              fullWidth
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FramesLeftSidebar
