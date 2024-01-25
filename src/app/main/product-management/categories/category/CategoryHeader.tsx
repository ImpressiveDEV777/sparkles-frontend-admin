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
  Category,
  CategoryForm,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '../CategoriesApi'

/**
 * The supplier header.
 */
function CategoryHeader() {
  const methods = useFormContext()
  const [createCategory] = useCreateCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const navigate = useNavigate()
  const routeParams = useParams()
  const dispatch = useAppDispatch()
  const { categoryId } = routeParams
  const { formState, watch, getValues } = methods
  const { isValid, dirtyFields } = formState

  const theme = useTheme()

  const { title } = watch() as Category

  async function handleSaveCategory() {
    const category = getValues() as CategoryForm
    const Image = category.Image as Image
    if (category.imageFile) {
      const formData: FormData = new FormData()
      formData.append('files', category.imageFile)
      const res = await axios.post('/upload', formData)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      category.Image = res.data[0]?.id as string
    } else if (Image?.id) {
      category.Image = Image.id
    } else {
      dispatch(
        showMessage({
          message: 'Please Select Category Image.',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          variant: 'error',
        }),
      )
      return
    }
    delete category.imageFile
    if (categoryId === 'new') {
      createCategory(category)
        .unwrap()
        .then(data => {
          navigate(`${PATHS.CATEGORIES}/${data.categoryId}`)
        })
    } else {
      updateCategory(category)
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
            to={PATHS.CATEGORIES}
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Categories</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {title || 'New Category'}
            </Typography>
            <Typography variant="caption" className="font-medium">
              Category Detail
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
          onClick={handleSaveCategory}
        >
          Save
        </Button>
      </motion.div>
    </div>
  )
}

export default CategoryHeader
