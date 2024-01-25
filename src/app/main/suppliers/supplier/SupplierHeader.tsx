import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useFormContext } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import _ from '@lodash'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { PATHS } from 'src/app/constants/common'
import axios from 'axios'
import { Image } from 'src/app/res-types/sub/ImageType'
import { useAppDispatch } from 'app/store/store'
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice'
import {
  Supplier,
  SupplierForm,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
} from '../SuppliersApi'

/**
 * The supplier header.
 */
function SupplierHeader() {
  const methods = useFormContext()
  const [createSupplier] = useCreateSupplierMutation()
  const [updateSupplier] = useUpdateSupplierMutation()
  const navigate = useNavigate()
  const routeParams = useParams()
  const dispatch = useAppDispatch()

  const { supplierId } = routeParams
  const { formState, watch, getValues } = methods
  const { isValid, dirtyFields } = formState

  const theme = useTheme()

  const { title } = watch() as Supplier

  async function handleSaveSupplier() {
    const supplier = getValues() as SupplierForm
    const image = supplier.image as Image
    if (supplier.imageFile) {
      const formData: FormData = new FormData()
      formData.append('files', supplier.imageFile)
      const res = await axios.post('/upload', formData)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      supplier.image = res.data[0]?.id as string
    } else if (image?.id) {
      supplier.image = image.id
    } else {
      dispatch(
        showMessage({
          message: 'Please Select Image.',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          variant: 'error',
        }),
      )
      return
    }
    delete supplier.imageFile
    if (supplierId === 'new') {
      createSupplier(supplier)
        .unwrap()
        .then(data => {
          navigate(`${PATHS.SUPPLIERS}/${data.id}`)
        })
    } else {
      updateSupplier(supplier)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
      <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to={PATHS.SUPPLIERS}
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Suppliers</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {title || 'New Supplier'}
            </Typography>
            <Typography variant="caption" className="font-medium">
              Supplier Detail
            </Typography>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          onClick={handleSaveSupplier}
        >
          Save
        </Button>
      </motion.div>
    </div>
  )
}

export default SupplierHeader
