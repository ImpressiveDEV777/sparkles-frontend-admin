import { DataGridPro, gridClasses } from '@mui/x-data-grid-pro'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { useAppDispatch } from 'app/store/store'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { Delete, Edit } from '@mui/icons-material'
import {
  closeDialog,
  openDialog,
} from '@fuse/core/FuseDialog/store/fuseDialogSlice'
import { genFrameSizeFromRatio } from 'src/app/utils/common'
import {
  FrameSize,
  useCreateFrameSizeMutation,
  useDeleteFrameSizeMutation,
  useGetAspectRatiosQuery,
  useGetFrameSizesQuery,
  useUpdateFrameSizeMutation,
} from './FrameSizesApi'
import {
  closeDialog as closeFormDialog,
  openEditDialog,
  selectEditId,
  selectOpenDialog,
} from './store/dialogSlice'

// Define a type for the params object
type CellParams = {
  row: FrameSize
}

type FormType = {
  id?: string
  size: string
  aspect_ratio: string
}

const defaultValues: FormType = {
  size: null,
  aspect_ratio: null,
}

/**
 * Form Validation Schema
 */
const schema = z.object({
  size: z.string().min(1),
  aspect_ratio: z.string().min(1),
})

export default function FrameSizesAppsContent() {
  const dispatch = useAppDispatch()
  const { data: frameSizes, isLoading } = useGetFrameSizesQuery()
  const { data: aspectRatios } = useGetAspectRatiosQuery()
  const openFormDialog = useSelector(selectOpenDialog)
  const [createFrameSize] = useCreateFrameSizeMutation()
  const [updateFrameSize] = useUpdateFrameSizeMutation()
  const [sizeCombination, setSizeCombination] = useState<
    { width: number; height: number; print_size: string }[]
  >([])
  const [deleteFrameSize] = useDeleteFrameSizeMutation()
  const editId = useSelector(selectEditId)
  const { handleSubmit, formState, control, reset, getValues } =
    useForm<FormType>({
      mode: 'onChange',
      defaultValues,
      resolver: zodResolver(schema),
    })

  const { aspect_ratio: aspectRatio, id } = getValues()
  const { isValid, dirtyFields, errors } = formState

  useEffect(() => {
    const frameSize = frameSizes?.find(frameSize => frameSize._id === editId)
    if (frameSize)
      reset({
        id: frameSize.id,
        size: frameSize.size,
        aspect_ratio: frameSize.aspect_ratio.id,
      })
    else reset(defaultValues)
  }, [editId])

  useEffect(() => {
    if (aspectRatio) {
      setSizeCombination(
        genFrameSizeFromRatio(
          aspectRatios.find(({ id }) => id === aspectRatio).title,
        ),
      )
    }
  }, [aspectRatio])

  function onSubmit(data: FormType) {
    const [width, height] = data.size.split('x').map(Number)
    if (id)
      updateFrameSize({
        id,
        width,
        height,
        size: data.size,
        aspect_ratio: data.aspect_ratio,
      })
        .unwrap()
        .then(() => {
          dispatch(closeFormDialog())
        })
    else
      createFrameSize({
        width,
        height,
        size: data.size,
        aspect_ratio: data.aspect_ratio,
      })
        .unwrap()
        .then(() => {
          dispatch(closeFormDialog())
        })
  }

  const columns = [
    {
      field: 'size',
      headerName: 'Frame Size',
      flex: 2,
    },
    {
      field: 'aspect_ratio',
      headerName: 'Aspect Ratio',
      renderCell: (params: CellParams) => params?.row?.aspect_ratio.title,
      flex: 2,
    },
    {
      field: 'width',
      headerName: 'Width',
      flex: 2,
    },
    {
      field: 'height',
      headerName: 'Height',
      flex: 2,
    },
    {
      field: 'Action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params: CellParams) => {
        return (
          <Box sx={{ display: 'flex' }}>
            <IconButton
              onClick={() => dispatch(openEditDialog(params.row._id))}
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => {
                dispatch(
                  openDialog({
                    children: (
                      <>
                        <DialogTitle id="alert-dialog-title">
                          Delete Frame Size
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Are you sure you want to Delete this Frame Size?
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
                              deleteFrameSize(params.row._id).then(() =>
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
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        )
      },
    },
  ]

  return (
    <>
      <DataGridPro
        hideFooter
        rows={frameSizes || []}
        columns={columns}
        loading={isLoading}
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
      <Dialog
        open={openFormDialog}
        onClose={() => {
          dispatch(closeFormDialog())
          reset(defaultValues)
        }}
        scroll="body"
      >
        <DialogTitle>{id ? 'Edit' : 'Add'} Frame Size</DialogTitle>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-320"
        >
          <DialogContent classes={{ root: 'p-8 pb-0 sm:p-16 sm:pb-0' }}>
            <Controller
              name="aspect_ratio"
              control={control}
              render={({ field }) => (
                <FormControl
                  error={!!errors.aspect_ratio}
                  required
                  fullWidth
                  className="my-8"
                >
                  <InputLabel>Aspect Ratio</InputLabel>
                  <Select
                    {...field}
                    variant="outlined"
                    fullWidth
                    label="Aspect Ratio"
                  >
                    {aspectRatios?.map(aspectRatio => (
                      <MenuItem key={aspectRatio.title} value={aspectRatio.id}>
                        {aspectRatio.title}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors?.aspect_ratio?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              name="size"
              control={control}
              render={({ field }) => (
                <FormControl
                  error={!!errors.size}
                  required
                  fullWidth
                  className="my-8"
                >
                  <InputLabel>Size</InputLabel>
                  <Select {...field} variant="outlined" fullWidth label="Size">
                    {sizeCombination?.map(size => (
                      <MenuItem key={size.print_size} value={size.print_size}>
                        {size.print_size}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors?.size?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </DialogContent>

          <DialogActions className="flex flex-col sm:flex-row sm:items-center justify-between py-16 sm:py-24 px-24">
            <div className="flex items-center space-x-8 mt-16 sm:mt-0">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Save
              </Button>
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
